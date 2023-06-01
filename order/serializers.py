from django.contrib.contenttypes.models import ContentType
from django.db import transaction
from rest_framework import serializers
from cooperative.serializers import SimpleProduitserializer
from core.models import User
from core.serializers import AddressSerializer
from .models import CartItem, Order, ShoppingCart, Shipping, Payment, CreditCard, PayPalAccount,OrderItem

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'

class PayPalAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayPalAccount
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ShippingSerializer(serializers.ModelSerializer):
    shipping_adress=serializers.SerializerMethodField
    class Meta:
        model = Shipping
        fields = '__all__'
    
    def get_shipping_adress(self,item):
        xt=ContentType.objects.get(model='Address')
        model = xt.model_class()
        pro = model.objects.filter(id=item.cont_id)
        ser = AddressSerializer(pro,many=True)
        return ser.data

class ItemsCartSerialiser(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields =['id','product','quantity']

    def get_product(self,item):
        xt=ContentType.objects.get(model='Product')
        model = xt.model_class()
        pro = model.objects.get(id=item.cont_id)
        ser = SimpleProduitserializer(pro,many=False)
        return ser.data

class ShoppingCartSerializer(serializers.ModelSerializer):
    items=ItemsCartSerialiser(read_only=True,many=True)
    id=serializers.UUIDField(read_only=True)
    class Meta:
        model = ShoppingCart
        fields = ['id','items']

class OrderItemSerializer(serializers.ModelSerializer):
    cont_object= serializers.SerializerMethodField()
    class Meta:
        model=OrderItem
        fields=['id','cont_object','quantity']

    def get_cont_object(self,item):
        xt=ContentType.objects.get(model='product')
        model = xt.model_class()

        pro = model.objects.get(id=item.cont_id)
        ser = SimpleProduitserializer(pro,many=False)
        return ser.data

class OrderSerializer(serializers.ModelSerializer):
    items=serializers.SerializerMethodField()
    shipping = ShippingSerializer()
    payment = PaymentSerializer()

    class Meta:
        model = Order
        fields = ['id','payment','shipping','items']

    def get_items(self,order):
        items=OrderItem.objects.filter(order_id=order.id)
        ser=OrderItemSerializer(items,many=True)
        return ser.data
    
    # def get_shipping(self,order):
    #     if  Shipping.objects.filter(order_id=order.id)==None:
    #         return 'Doesnt set address for shipping'
    #     else:
    #         shi =Shipping.objects.get(order_id=order.id) 
    #         print(shi.__dict__)
    #         ser = ShippingSerializer(shi,many=False)
    #         return ser.data
        
    # def get_payment(self,order):
    #         print(order.__dict__)
    #     if  Payment.objects.get(order_id=order.id).DoesNotExist():
    #         return 'Doesnt set your method payment'
    #     else:
    #         pay =Payment.objects.get(order_id=order.id) 
    #         ser = PaymentSerializer(pay,many=False)
    #         return ser.data

class CreateOrederSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()
    class Meta:
        model = Order
        fields = ['cart_id','payment_method']


    def validate_cart_id(self, cart_id):
        if not ShoppingCart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError('Not cart id gevin')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('items messing')
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            client = User.objects.get(id=self.context['user_id'])
            cart_items = CartItem.objects.filter(cart_id=self.validated_data['cart_id'])
            costa=0
            for item in cart_items:
                costa +=item.quantity*item.cont_object.price
            order = Order.objects.create(customer=client,cost=costa)
            for item in cart_items:
                OrderItem.objects.create(order=order,
                                         cont_object=item.cont_object,
                                         quantity=item.quantity,
                                         price=item.cont_object.price)
            # if OrderItem.objects.filter(order_id=order.id).count()>10:
            #     Shipping.objects.create(order_id=order.id,shipping_cost=20,address_id=1)
            # else:
            #     Shipping.objects.create(order_id=order.id,shipping_cost=10,address_id=1)
            # amount=0
            # for item in cart_items:
            #     amount+=item.cont_object.price*item.quantity
            ShoppingCart.objects.filter(pk=self.validated_data['cart_id']).delete()
            return order


class AddItemserializer(serializers.ModelSerializer):
    cont_id=serializers.IntegerField()

    def create(self, validated_data):
        cart_id = self.context['cart_id']
        product_id = self.validated_data['cont_id']
        quantity = self.validated_data['quantity']
        contype=ContentType.objects.get(model='Product')
        model=contype.model_class()
        product= model.objects.get(id=product_id)
        try:
            cart_item = CartItem.objects.get(
                cart_id=cart_id, cont_type=contype,cont_id=product_id)
            cart_item.quantity += quantity
            cart_item.save()
            cart_item= CartItem.objects.filter(
                cart_id=cart_id)
            self.instance = cart_item
        except CartItem.DoesNotExist:
            cart_id = self.context['cart_id']
            self.instance = CartItem.objects.create(
                cart_id=cart_id,cont_object=product,quantity=self.validated_data['quantity'])
           
        return self.instance
    


    class Meta:
        model = CartItem
        fields = ['id',  'cont_id','quantity']

class UpdateCartitem(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']
