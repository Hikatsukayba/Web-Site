from rest_framework.viewsets import ModelViewSet,GenericViewSet
from rest_framework.response import Response
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .filters import OrderFilter
from core.models import User
from .models import CartItem, Order, Shipping, ShoppingCart, Payment, CreditCard, PayPalAccount,OrderItem
from .serializers import AddItemserializer, CreateOrederSerializer, ItemsCartSerialiser, OrderItemSerializer, OrderSerializer, ShippingSerializer, ShoppingCartSerializer,\
     PaymentSerializer, CreditCardSerializer, PayPalAccountSerializer, UpdateCartitem

class OrderViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class=OrderFilter
    permission_classes=[IsAuthenticated]
    ordering_fields = ['date']

    def create(self, request, *args, **kwargs):
        serializer = CreateOrederSerializer(
            data=request.data,
            context={'user_id': self.request.user.id})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderSerializer
        elif self.request.method == 'POST':
            return CreateOrederSerializer

    def get_queryset(self):
        user = self.request.user
        if self.kwargs:
            order = Order.objects.filter(id=self.kwargs['pk'])
            print(order.__dict__)
            return order
        elif user.is_staff:
            return Order.objects.all()
        else:
            return Order.objects.filter(customer_id=user.id)

class OrderItemsViewSet(ModelViewSet):
    serializer_class=OrderItemSerializer

    def get_queryset(self):
        return OrderItem.objects.filter(order_id=self.kwargs['order_pk'])

class ShippingViewSet(ModelViewSet):
    queryset = Shipping.objects.all()
    serializer_class = ShippingSerializer

    

class ShoppingCartViewSet(CreateModelMixin,
                  RetrieveModelMixin,
                  DestroyModelMixin,
                  GenericViewSet):
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer

    def create(self, request, *args, **kwargs):
        cart=ShoppingCart.objects.create(customer_id=request.user.id,quantity=0)
        ser =ShoppingCartSerializer(cart)
        return Response(ser.data)

class GetShoppingCartViewSet(ModelViewSet):
    serializer_class = ShoppingCartSerializer
    def update(self, request, *args, **kwargs):
        qs=ShoppingCart.objects.filter(id=kwargs['pk']).update(customer_id=self.request.user.id)
        return Response('ok')
    
    def get_queryset(self):
        qs=ShoppingCart.objects.filter(customer_id=self.request.user.id)
        return qs
    
class CartitemViewset(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddItemserializer
        elif self.request.method == 'PATCH':
            return UpdateCartitem
        return ItemsCartSerialiser

    def get_serializer_context(self):
        return {'cart_id': self.kwargs['shoppingcart_pk']}

    def get_queryset(self):
        return CartItem.objects\
            .filter(cart_id=self.kwargs['shoppingcart_pk'])\


class orderitemViewset(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        return OrderItemSerializer

    def get_serializer_context(self):
        return {'order_id': self.kwargs['order_pk']}

    def get_queryset(self):
        return OrderItem.objects\
            .filter(order_id=self.kwargs['order_pk'])\
            .select_related('product')

class PaymentViewSet(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class CreditCardViewSet(ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

class PayPalAccountViewSet(ModelViewSet):
    queryset = PayPalAccount.objects.all()
    serializer_class = PayPalAccountSerializer

