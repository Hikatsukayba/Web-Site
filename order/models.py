from django.db import models
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from uuid import uuid4
from core.models import Address

class ShoppingCart(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True)
    quantity = models.PositiveIntegerField()

class CartItem(models.Model):
    cart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE, related_name='items')
    quantity = models.PositiveSmallIntegerField()
    cont_type = models.ForeignKey(ContentType,on_delete=models.PROTECT)
    cont_id=models.PositiveIntegerField()
    cont_object=GenericForeignKey('cont_type','cont_id')


class Order(models.Model):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    cost=models.DecimalField(max_digits=10,decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=(
        ('cc', 'Credit Card'),
        ('pp', 'PayPal'),
        ('pr','Pay in Recive')
    ),default='pr')

class OrderItem(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE,related_name='order')
    cont_type = models.ForeignKey(ContentType,on_delete=models.PROTECT,related_name='product')
    cont_id=models.PositiveIntegerField()
    cont_object=GenericForeignKey('cont_type','cont_id')

class Shipping(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)
    date_shipped = models.DateTimeField(auto_now_add=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_paid = models.DateTimeField(auto_now_add=True)


class CreditCard(models.Model):
    card_number = models.CharField(max_length=16)
    expiry_date = models.DateField()
    cvv = models.CharField(max_length=3)
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE)
    customer = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)



class PayPalAccount(models.Model):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE)
    email = models.EmailField()

    def __str__(self):
        return self.email

