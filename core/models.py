from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_enabled = models.BooleanField(default=True)
    is_cooperative=models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = ['is_cooperative','email']

class Address(models.Model):
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)

class Customer(models.Model):
    GENDER_CHOICES=(('M','Male'),('F','Female'),('O','Others'))
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    gender=models.CharField(max_length=1,choices=GENDER_CHOICES)
    account=models.OneToOneField(User,on_delete=models.CASCADE)

class image(models.Model):
    image=models.ImageField(upload_to='user/images')
    user = models.OneToOneField(User,on_delete=models.CASCADE)