from rest_framework import serializers
from cooperative.serializers import CooperativeSerializer, SimpleProduitserializer
from cooperative.models import Cooperative, Like, Product
from .models import Customer, User, Address,image
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password




class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ImageSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=image
        fields=['id','image']   

class UserSerializer(serializers.ModelSerializer):
    information=serializers.SerializerMethodField()
    # whish=serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id','username','email','is_enabled','is_cooperative','information']
        extra_kwargs = {'password': {'write_only': True},
                        'username':{'read_only':True}
                    }
    def get_information(self,user):
        if user.is_cooperative:
            try:
                qs=Cooperative.objects.get(user_id=user.id)
                ser=CooperativeSerializer(qs)
                return ser.data
            except ObjectDoesNotExist:
                return None
        else:
            try:
                qs = Customer.objects.get(account_id=user.id)
                ser = CustomerSerializers(qs)
                return  ser.data
            except ObjectDoesNotExist:
                return None
  



class CreateCustomerSerializers(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id','email','username','email','password','is_cooperative']
    def save(self,**kwargs):
        user = super(CreateCustomerSerializers, self).save()
        user.set_password(self.validated_data["password"])
        user.save()
        return user

class CustomerSerializers(serializers.ModelSerializer):
    class Meta:
        model= Customer
        fields='__all__'
    