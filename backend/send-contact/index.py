import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    """Принимает заявку с контактной формы и отправляет её на почту key.arcana@mail.ru"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        body = {}

    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    service = body.get('service', '').strip()
    message = body.get('message', '').strip()

    if not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email обязателен'})
        }

    notify_email = os.environ.get('NOTIFY_EMAIL', 'key.arcana@mail.ru')

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_pass = os.environ.get('SMTP_PASS', '')

    subject = f"✦ Новая заявка KeyArcana — {name or email}"

    html = f"""
<html>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
  <div style="max-width:560px;margin:0 auto;background:#1a0e2e;border-radius:8px;padding:30px;color:#f0e6c8;">
    <h2 style="color:#FFCC33;margin-top:0;">✦ Новая заявка с сайта KeyArcana</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#c9a96e;width:140px;">Имя:</td><td style="padding:8px 0;">{name or '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#c9a96e;">Email клиента:</td><td style="padding:8px 0;"><a href="mailto:{email}" style="color:#FFCC33;">{email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#c9a96e;">Услуга:</td><td style="padding:8px 0;">{service or '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#c9a96e;vertical-align:top;">Вопрос:</td><td style="padding:8px 0;">{message or '—'}</td></tr>
    </table>
    <hr style="border-color:rgba(255,204,51,0.2);margin:20px 0;">
    <p style="font-size:12px;color:#8a7a9b;margin:0;">Ответьте клиенту напрямую на: <a href="mailto:{email}" style="color:#FFCC33;">{email}</a></p>
  </div>
</body>
</html>
"""

    if smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = smtp_user
            msg['To'] = notify_email
            msg.attach(MIMEText(html, 'html', 'utf-8'))

            with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, notify_email, msg.as_string())
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'})
            }
    else:
        print(f"[CONTACT] {name} <{email}> | {service} | {message}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True})
    }
