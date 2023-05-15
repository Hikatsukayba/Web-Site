from django_filters.rest_framework import FilterSet,DateFromToRangeFilter
from .models import ItemsSubCategory, Product



class ProductFilter(FilterSet):
    date_created=DateFromToRangeFilter(field_name='date_created')
    class Meta:
        model = Product
        fields = {
            'price':['gt','lt'],
            'bio':['gt','lt'],
            'cooperative__address':['exact'],
            'cooperative__user__is_enabled':['exact']
        }

class SubCategoryFilter(FilterSet):
   class Meta:
       model=ItemsSubCategory
       fields={
           'subcategory':['exact']
       }