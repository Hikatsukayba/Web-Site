from rest_framework.pagination import PageNumberPagination


class Productpagination(PageNumberPagination):
    page_size = 10