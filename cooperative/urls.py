from django.urls import path, re_path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from . import views



router = DefaultRouter()
router.register('imagesproducts',views.ImageProduitViewset, basename='image')
router.register('cooperative',views.CooperativeViewSet, basename='cooperative')
router.register('products',views.ProductViewSet, basename='product')
router.register('subcategory',views.SubcategoryViewSet, basename='subcategory')
router.register('category',views.CategoryViewSet, basename='category')
router.register('simple-product',views.SimpleProductViewset, basename='simple-product')
routs_product=NestedDefaultRouter(router,'products',lookup='product')
router_coo= NestedDefaultRouter(router,'cooperative',lookup='cooperative')
router_coo.register('orders',views.OrderCoViewset,basename='order')
routs_product.register('reviews',views.ReviewsViewSet,basename='review')
routs_product.register('images',views.ImagesViewSet,basename='image')
routs_product.register('like',views.LikeViewset,basename='like')

urlpatterns = router.urls+routs_product.urls+router_coo.urls