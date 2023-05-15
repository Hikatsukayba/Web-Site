from rest_framework import routers
from .views import UserViewSet,AddressViewSet,ImageViewSet
from rest_framework_nested.routers import NestedDefaultRouter

router = routers.DefaultRouter()
router.register('users',UserViewSet)
cus_router=NestedDefaultRouter(router,'users',lookup='user')
cus_router.register('address',AddressViewSet,basename='address')
cus_router.register('images',ImageViewSet,basename='image')

urlpatterns = router.urls+cus_router.urls