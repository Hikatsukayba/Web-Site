from django_filters.rest_framework import FilterSet,DateFromToRangeFilter,ChoiceFilter
from .models import Order



class OrderFilter(FilterSet):
    paymnet_method=ChoiceFilter(choices=(
        ('cc', 'Credit Card'),
        ('pp', 'PayPal'),
        ('pr','Pay in Recive')
    ))
    class Meta:
        model = Order
        fields = ['payment_method']