from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import FoodView, FoodNameView


food_list = FoodView.as_view({
    'get': 'list'
})

food_name_list = FoodNameView.as_view({
    'get': 'list'
})

food_detail = FoodView.as_view({
    'get': 'retrieve',
})

urlpatterns = format_suffix_patterns([
    path('foods/', food_list, name='food_list'),
    path('foods/<str:pk>/', food_detail, name='food_detail'),
    path('foodNames/', food_name_list, name='food_name_list'),
])