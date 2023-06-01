from django.shortcuts import render, get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.contenttypes.models import ContentType
from order.models import OrderItem
from order.serializers import OrderItemSerializer
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import APIException
from .permission import IsCooperative
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from .models import Cooperative, ItemsCategory, ItemsSubCategory, Product,Imges, Like, Review, Rating, Category, SubCategory
from .filters import ProductFilter, SubCategoryFilter
from .pagination import Productpagination
from .serializers import CooperativeSerializer, ItemsSubCategorySerializer, LikeSerializers, OrderCoserializer, ProductSerializer, ImageSer, ReviewSerializer, RatingSerializer, CategorySerializer, SimpleProduitserializer, SubcategorySerializer
ImageSer



class SimpleProductViewset(viewsets.ModelViewSet):
    queryset=Product.objects.all()
    serializer_class=SimpleProduitserializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class=ProductFilter
    pagination_class=Productpagination
    search_fields = ['title', 'description']
    ordering_fields = ['price','date_created']


class ImageProduitViewset(viewsets.ModelViewSet):
    queryset=Imges.objects.all()
    serializer_class = ImageSer

    def create(self, request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)



class ItemCategoryViewset(viewsets.ModelViewSet):
    queryset=ItemsSubCategory.objects.all()
    serializer_class = ItemsSubCategorySerializer


class CooperativeViewSet(viewsets.ModelViewSet):
    queryset=Cooperative.objects.all()
    serializer_class = CooperativeSerializer
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['date_created']

    @action(detail=False,permission_classes=[IsCooperative,IsAuthenticated])
    def orders(self,order):
        try:
        # print(order.__dict__)
            co=Cooperative.objects.get(user_id=self.request.user.id)
            qs = Product.objects.filter(cooperative_id=co.ice)
            ids=[]
            for q in qs:
                ids.append(q.id)
            queryset=OrderItem.objects.filter(cont_type=ContentType.objects.get_for_model(Product),cont_id__in=ids)
            ser =OrderItemSerializer(queryset,read_only=True,many=True)
            return Response(ser.data)
        except Exception:
            Response('dont have')
    
    @action(detail=False,permission_classes=[IsCooperative,IsAuthenticated])
    def products(self,produc):   
        try: 
            co=Cooperative.objects.get(user_id=self.request.user.id)
            product = Product.objects.filter(cooperative_id=co.ice)
            serializer= ProductSerializer(product,many=True)
            return Response(serializer.data)
        except Exception:
            Response('dont have product')
    
    @action(detail=False,permission_classes=[IsCooperative,IsAuthenticated])
    def dashbord(self, request, *args, **kwargs):
        qs = Cooperative.objects.get(user_id=request.user.id)
        ser=CooperativeSerializer(qs,many=False)
        return Response(ser.data)
    @action(detail=True, methods=['POST'])
    def AddProduct(self, request, *args, **kwargs):
        print(request.__dict__)

    def create(self, request, *args, **kwargs):
        self.serializer_classes=[IsAuthenticated]
        try:
            serializer = CooperativeSerializer(
                data=request.data,
                context={'user_id': self.request.user.id,
                        'image':request.image,
                        })
        except:
            serializer = CooperativeSerializer(
                data=request.data,
                context={'user_id': self.request.user.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LikeViewset(CreateModelMixin,
                  RetrieveModelMixin,
                  DestroyModelMixin,
                  GenericViewSet):
    queryset=Like.objects.none()
    serializer_class=LikeSerializers
    
    def create(self, request, *args, **kwargs):
        if Like.objects.filter(user_id=request.user.id,product_id=self.kwargs['product_pk']).exists()==False:
            Like.objects.create(user_id=request.user.id,product_id=self.kwargs['product_pk'])
        return Response('ok')

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class=ProductFilter
    pagination_class=Productpagination
    search_fields = ['title', 'description']
    ordering_fields = ['price','date_created']
    @action(detail=True, methods=['POST'])
    def AddProduct(self, request, *args, **kwargs):
        print(request.POST.getlist('sub'))
        qs=Cooperative.objects.get(user_id=request.user.id)
        ser=ProductSerializer(data={
            'title':request.POST.get('title'),
            'stock':request.POST.get('stock'),
            'price':request.POST.get('price'),
            'bio':request.POST.get('bio'),
            'description':request.POST.get('description'),   
        },context={'cooperative':qs.ice})
        ser.is_valid(raise_exception=True)
        ser.save()
        images=request.FILES.getlist('image')
        subcategory=request.POST.getlist('sub')
        cat=ItemsCategory.objects.create(product_id=ser.data['id'],category_id=request.POST.get('cat'))
        for img in images:
            Imges.objects.create(image=img,product_id=ser.data['id'])
        return Response(ser.data)
    

    def destroy(self, request, *args, **kwargs):
        self.permission_classes=[IsCooperative]
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.permission_classes=[IsCooperative]
        return super().update(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        if IsCooperative.has_permission:
            cop =Cooperative.objects.get(user_id=request.user.id)
            ser=ProductSerializer(data=request.data,
                                  context={'cop_id':cop.ice,'request':request.data})
            ser.is_valid(raise_exception=True)
            ser.save()
            return Response(ser.data)
        else:
            raise APIException('You are not cooperative')
    

class ImagesViewSet(viewsets.ModelViewSet):
    serializer_class = ImageSer
    def get_queryset(self):
        qs=Imges.objects.filter(product_id=self.kwargs['product_pk'])
        return qs
        

    def create(self, request, *args, **kwargs):
        print(request.__dict__)
        qs=Imges.objects.create(product_id=self.kwargs['product_pk'])
        ser=ImageSer(qs,data=request.data,context={'request': request})
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)


class ReviewsViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ['date_post']


    def get_queryset(self):
        print(self.__dict__)
        qs=Review.objects.filter(product_id=self.kwargs['product_pk'])
        return qs
    
    def create(self, request, *args, **kwargs):
        self.permission_classes=[IsAuthenticated]
        ref=0
        rev=Review.objects.create(user_id=1,rating=request.data['rating'],product_id=kwargs['product_pk'])
        ser = ReviewSerializer(rev,data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save()
        t=Review.objects.filter(product_id=kwargs['product_pk'])
        ser = ReviewSerializer(t,many=True)
        for a in ser.data:
            ref+= a['rating'] 
        n = Review.objects.filter(product_id=kwargs['product_pk']).count()
        qs=Rating.objects.get(product_id=kwargs['product_pk'])
        if  qs.DoesNotExist()==True:
            rate=Rating.objects.create(product_id=kwargs['product_pk'],rate=(ref/n))
            ser = RatingSerializer(rate)
        else:
            Rating.objects.filter(id=qs.id).update(id=qs.id,rate=(ref/n))
        return Response(ser.data)

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderCoViewset(viewsets.ModelViewSet):
    serializer_class=OrderItemSerializer
    

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubcategorySerializer
