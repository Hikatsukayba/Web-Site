from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from order.models import OrderItem


class Cooperative(models.Model):
    ice = models.PositiveBigIntegerField(primary_key=True,validators=[MaxValueValidator(10000)])
    name = models.CharField(max_length=100)
    description = models.TextField()
    address = models.TextField()
    phone=models.CharField(max_length=255,null=True)
    date_created=models.DateTimeField(auto_now_add=True,null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class CoopImage(models.Model):
    image=models.ImageField(upload_to='cooperative/image',default='cooperative/images/logo.png')
    coop=models.ForeignKey(Cooperative,on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    bio = models.FloatField(validators=[MaxValueValidator(100),MinValueValidator(0)])
    date_created=models.DateTimeField(auto_now_add=True,null=True)
    stock=models.IntegerField()
    cooperative = models.ForeignKey(Cooperative, on_delete=models.CASCADE,related_name='coop')

class ItemsSubCategory(models.Model):
    subcategory=models.ForeignKey(SubCategory,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)

class CustomProduct(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    dead_line=models.DateTimeField()
    date_post=models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    cooperative = models.ForeignKey(Cooperative, on_delete=models.CASCADE,null=True)



class Review(models.Model):
    text = models.TextField()
    rating=models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)])
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_post=models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

class Rating(models.Model):
    rate = models.FloatField(validators=[MinValueValidator(0),MaxValueValidator(5)])
    product=models.ForeignKey(Product,on_delete=models.CASCADE)


class Imges(models.Model):
    image=models.ImageField(upload_to='product/images')
    product= models.ForeignKey(Product,on_delete=models.CASCADE,null=True,related_name='image')


class Like(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='like')
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)