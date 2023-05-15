from time import sleep
from celery import shared_task
from templated_mail.mail import BaseEmailMessage
from django.core.mail import send_mail,send_mass_mail,BadHeaderError,EmailMessage

@shared_task
def send_email_co(me):
    email = EmailMessage('Hello', 'World', to=['user@gmail.com'])
    email.send()