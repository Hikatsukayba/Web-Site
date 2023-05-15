from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from cooperative.models import Cooperative
from cooperative.serializers import CooperativeSerializer
from .models import Customer, User, Address, image
from .serializers import CustomerSerializers, UserSerializer, AddressSerializer, ImageSerializers

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.none()
    serializer_class = UserSerializer

    @action(detail=False,methods=['GET','PUT'])
    def me(self, request):
        custommer = User.objects.get(id=request.user.id)
        if request.method == 'GET':
            custommerSer = UserSerializer(custommer)
            if custommer.is_cooperative:
                try:
                    qs=Cooperative.objects.get(user_id=custommer.id)
                    ser=CooperativeSerializer(qs)
                    return Response({**custommerSer.data,'cooperative':ser.data})
                except ObjectDoesNotExist:
                    return Response({**custommerSer.data,'cooperative':None})
            else:
                try:
                    qs = Customer.objects.get(account_id=request.user.id)
                    ser = CustomerSerializers(qs)
                    return Response({**custommerSer.data, 'customer': ser.data})
                except ObjectDoesNotExist:
                    return Response({**custommerSer.data, 'customer': None})
        elif request.method == 'PUT':
            custommerSer = UserSerializer(custommer, data=request.data)
            custommerSer.is_valid(raise_exception=True)
            custommerSer.save()
            return Response(custommerSer.data)


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        qs=Address.objects.filter(customer_id=self.request.user.id)
        ser=AddressSerializer(qs,many=True)
        return ser.data


class ImageViewSet(viewsets.ModelViewSet):
    serializer_class=ImageSerializers
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        qs=image.objects.filter(user_id=self.request.user.id)
        ser=ImageSerializers(qs,many=True)
        return ser.data
