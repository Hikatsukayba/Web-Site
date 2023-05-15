from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.db import transaction
from django.http import HttpResponse
from rest_framework import serializers
from rest_framework.exceptions import APIException
from .models import Category, CoopImage, Cooperative, Imges, ItemsSubCategory, Like, Product, Rating, Review, SubCategory
from .signals import cooperative_created





        

class ImageSer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Imges
        fields=['id','image']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id','text','rating','date_post']



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SubcategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False,read_only=True)
    class Meta:
        model = SubCategory
        fields = '__all__'

class ItemsSubCategorySerializer(serializers.ModelSerializer):
    category=serializers.SerializerMethodField()
    subcategory=serializers.SerializerMethodField()
    product=serializers.SerializerMethodField()
    class Meta:
        model=ItemsSubCategory
        fields=['id','category','subcategory','product']

    def get_product(self,item):
        pro=Product.objects.filter(id=item.product_id)
        ser=SimpleProduitserializer(pro,many=True)
        return ser.data
    def get_subcategory(self,item):
        pro=SubCategory.objects.get(id=item.subcategory_id)
        ser=SubcategorySerializer(pro)
        return ser.data['name']
    def get_category(self,item):
        sub=SubCategory.objects.get(id=item.subcategory_id)
        cat=Category.objects.get(id=sub.category_id)
        ser=CategorySerializer(cat)
        return ser.data['name']

class ImageCooSer(serializers.ModelSerializer):
    class Meta:
        model=CoopImage
        fields=['id','image']
    
class CooperativeSerializer(serializers.ModelSerializer):
    image=serializers.SerializerMethodField()
    class Meta:
        model = Cooperative
        fields=['ice','name','description','address','phone','date_created','image']
    
    def get_image(self,coop):
        try:
            qs=CoopImage.objects.filter(coop_id=coop.ice)
            ser=ImageCooSer(qs,many=True)
            return ser.data
        except Exception:
            return 'dont have image'
    def save(self ,**kwargs):
        user_id = self.context['user_id']
        cop = Cooperative.objects.only('user_id').all().values_list()     
        print(cop)
        list=[]
        for c in cop:
            list.append(c)
        if user_id in list:
            raise APIException(detail={'error':'you are already have cooperative.'})
        else:
            cooperative_created.send(self.__class__,user=user_id)
            print('dddff')
            return Cooperative.objects.create(user_id=user_id, **self.validated_data)
         
class SimpleProduitserializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    rate=serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id','rate', 'title','stock','bio','images', 'price','date_created']

    def get_images(self,product):
        pro = Imges.objects.filter(product_id=product.id)
        ser = ImageSer(pro,many=True)
        return ser.data
    def get_rate(self, product):
        if Rating.objects.get(product_id=product.id).DoesNotExist()== True:
            return 0
        else:
            rev = Rating.objects.get(product_id=product.id)
            ser= RatingSerializer(rev,read_only=True)
            return ser.data['rate']

class LikeSerializers(serializers.ModelSerializer):
    product=SimpleProduitserializer(read_only=True)
    class Meta:
        model=Like
        fields=['product']
    


class OrderCoserializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class ProductSerializer(serializers.ModelSerializer):
    subcategory=serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    rating=serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id','subcategory','title','stock','description','price','bio','images','rating','like','reviews','date_created']

    def get_images(self,product):
        pro = Imges.objects.filter(product_id=product.id)
        ser = ImageSer(pro,many=True)
        return ser.data

    def get_subcategory(self,product):
        pro = ItemsSubCategory.objects.filter(product_id=product.id)
        ser = ItemsSubCategorySerializer(pro,many=True)
        return ser.data
    
    def get_like(self,product):
        pro = Like.objects.filter(product_id=product.id).count()
        return pro
    def get_reviews(self, product):
        rev = Review.objects.filter(product_id=product.id)
        ser= ReviewSerializer(rev,many=True)
        return ser.data
    def get_rating(self, product):
        if Rating.objects.get(product_id=product.id).DoesNotExist()== True:
            return 0
        else:
            rev = Rating.objects.get(product_id=product.id)
            ser= RatingSerializer(rev,read_only=True)
            return ser.data['rate']
    
    def create(self,validated_data, **kwargs):
        cop=self.context['cop_id']
        sub=self.context['request']['sub']
        pro=Product.objects.create(cooperative_id=cop,**validated_data)
        if sub != None:
            for s in sub:
                ItemsSubCategory.objects.create(product_id=pro.id,subcategory_id=s)   
        Rating.objects.create(rate=0,product_id=pro.id)
        return pro



    