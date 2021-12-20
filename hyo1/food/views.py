from django.shortcuts import render
from .models import Food
from .serializers import FoodSerializer, FoodNameSerializer
from rest_framework import viewsets


class FoodView(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


class FoodNameView(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodNameSerializer
