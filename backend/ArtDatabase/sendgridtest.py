import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv
load_dotenv()
print(os.getenv('SENDGRID_API_KEY'))

m = Mail(from_email="jaco.smith589@gmail.com", to_emails="emersonsartgallery@gmail.com", subject = 'testing', html_content='<strong>Faaaart</strong>')

try:
    g = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
    r = g.send(m)
    print(r.status_code)
    print(r.body)
    print(r)
except Exception as e:
    print(e.message)
