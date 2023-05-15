from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from .views import CartitemViewset, GetShoppingCartViewSet, OrderViewSet, ShoppingCartViewSet, ShippingViewSet, PaymentViewSet,\
 CreditCardViewSet, PayPalAccountViewSet,OrderItemsViewSet

router = routers.DefaultRouter()
router.register(r'orders', OrderViewSet,basename='orders')
router.register(r'shoppingcarts', ShoppingCartViewSet,basename='shoppingcart')
router.register(r'creditcards', CreditCardViewSet,basename='creditCard')
router.register(r'getshoppingcarts', GetShoppingCartViewSet,basename='get-shoppingcart')
router.register(r'paypalaccounts', PayPalAccountViewSet,basename='paypal')
routs_order=NestedDefaultRouter(router,'orders',lookup='order')
route_cart=NestedDefaultRouter(router,'shoppingcarts',lookup='shoppingcart')
routs_order.register(r'shippings', ShippingViewSet,basename='shipping')
routs_order.register(r'payments', PaymentViewSet,basename='payment')
route_cart.register('itemscart',CartitemViewset,basename='item')
routs_order.register('items',OrderItemsViewSet,basename='items')

urlpatterns = router.urls + routs_order.urls+route_cart.urls