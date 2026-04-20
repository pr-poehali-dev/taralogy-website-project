import json
import os
import psycopg2
import urllib.request
import base64
from datetime import datetime

def send_email_with_pdf(to_email: str, customer_name: str, card_name: str, card_emoji: str, card_full: str):
    """Отправляет письмо с PDF-сертификатом через встроенный email"""
    html_body = f"""
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><title>Ваш таро-сертификат</title></head>
<body style="background:#1a0e2e;color:#f0e6c8;font-family:'Georgia',serif;max-width:600px;margin:0 auto;padding:20px;">
  <div style="text-align:center;border-bottom:1px solid #FFCC33;padding-bottom:20px;margin-bottom:30px;">
    <h1 style="color:#FFCC33;font-size:28px;letter-spacing:4px;">✦ KeyArcana ✦</h1>
    <p style="color:#c9a96e;font-size:13px;letter-spacing:2px;">ИМЕННОЙ ТАРО-СЕРТИФИКАТ</p>
  </div>

  <div style="text-align:center;margin-bottom:30px;">
    <div style="font-size:64px;margin-bottom:16px;">{card_emoji}</div>
    <h2 style="color:#FFCC33;font-size:26px;margin-bottom:8px;">{card_name}</h2>
    <p style="color:#c9a96e;font-size:14px;letter-spacing:1px;">Карта специально для {customer_name or 'вас'}</p>
  </div>

  <div style="background:rgba(102,51,153,0.15);border:1px solid rgba(255,204,51,0.3);border-radius:8px;padding:24px;margin-bottom:24px;">
    <h3 style="color:#FFCC33;font-size:14px;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">✦ Полная расшифровка</h3>
    <p style="line-height:1.8;font-size:15px;color:#e8d5b0;">{card_full}</p>
  </div>

  <div style="border:1px solid rgba(255,204,51,0.2);border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
    <p style="color:#c9a96e;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Аффирмация дня</p>
    <p style="color:#FFCC33;font-size:17px;font-style:italic;line-height:1.6;">«Я открываюсь мудрости карт и доверяю своему пути»</p>
  </div>

  <div style="text-align:center;padding-top:20px;border-top:1px solid rgba(255,204,51,0.2);">
    <p style="color:#8a7a9b;font-size:11px;">© KeyArcana · Этот сертификат создан специально для вас</p>
    <p style="color:#8a7a9b;font-size:11px;">Вопросы: <a href="https://t.me/keyarcana" style="color:#FFCC33;">@keyarcana</a></p>
  </div>
</body>
</html>
"""
    mail_data = {
        "to": to_email,
        "subject": f"✦ Ваш таро-сертификат: {card_name}",
        "html": html_body
    }

    internal_url = os.environ.get('MAIL_SERVICE_URL', '')
    if not internal_url:
        return False

    req = urllib.request.Request(
        internal_url,
        data=json.dumps(mail_data).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except Exception:
        return False


def handler(event: dict, context) -> dict:
    """Webhook от ЮKassa: получает уведомление об оплате и отправляет сертификат на email"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': 'bad json'}

    event_type = body.get('event', '')
    payment_obj = body.get('object', {})

    if event_type != 'payment.succeeded':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': 'ok'}

    payment_id = payment_obj.get('id', '')
    metadata = payment_obj.get('metadata', {})

    customer_email = metadata.get('customer_email', '')
    customer_name = metadata.get('customer_name', '')
    card_name = metadata.get('card_name', '')
    card_emoji = metadata.get('card_emoji', '🃏')
    card_full = metadata.get('card_full', '')

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"UPDATE {schema}.orders SET status='paid', paid_at=%s WHERE payment_id=%s",
        (datetime.utcnow(), payment_id)
    )
    conn.commit()
    cur.close()
    conn.close()

    if customer_email and card_full:
        send_email_with_pdf(customer_email, customer_name, card_name, card_emoji, card_full)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'status': 'ok'})
    }