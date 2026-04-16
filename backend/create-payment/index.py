import json
import os
import uuid
import psycopg2

def handler(event: dict, context) -> dict:
    """Создаёт платёж в ЮKassa и возвращает URL страницы оплаты"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    try:
        body = json.loads(event.get('body', '{}'))
    except Exception:
        body = {}

    customer_name = body.get('name', '').strip()
    customer_email = body.get('email', '').strip()
    card_name = body.get('card_name', '')
    card_emoji = body.get('card_emoji', '')
    card_full = body.get('card_full', '')
    amount = int(body.get('amount', 199))

    if not customer_email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email обязателен'})
        }

    shop_id = os.environ.get('YUKASSA_SHOP_ID', '')
    secret_key = os.environ.get('YUKASSA_SECRET_KEY', '')

    idempotency_key = str(uuid.uuid4())

    import urllib.request
    import base64

    credentials = base64.b64encode(f"{shop_id}:{secret_key}".encode()).decode()

    return_url = body.get('return_url', 'https://poehali.dev')

    payment_data = {
        "amount": {"value": f"{amount}.00", "currency": "RUB"},
        "confirmation": {"type": "redirect", "return_url": return_url},
        "capture": True,
        "description": f"Таро-сертификат «{card_name}» для {customer_name or customer_email}",
        "metadata": {
            "customer_name": customer_name,
            "customer_email": customer_email,
            "card_name": card_name,
            "card_emoji": card_emoji,
            "card_full": card_full[:500] if card_full else ''
        }
    }

    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=json.dumps(payment_data).encode('utf-8'),
        headers={
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/json',
            'Idempotence-Key': idempotency_key
        },
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode('utf-8'))

    payment_id = result['id']
    confirmation_url = result['confirmation']['confirmation_url']

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.orders (payment_id, status, amount, customer_name, customer_email, card_name, card_emoji, card_full) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (payment_id, 'pending', amount, customer_name, customer_email, card_name, card_emoji, card_full)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'payment_url': confirmation_url, 'payment_id': payment_id})
    }
