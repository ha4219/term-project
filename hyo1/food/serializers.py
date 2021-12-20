from rest_framework import serializers
from .models import Food


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = (
            'name', 'serving', 'carbohydrate', 'sugars', 'protein', 'province',
            'saturated_fatty_acids', 'cholesterol', 'salt'
        )


class FoodNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = (
            'name',
        )


class FoddDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = (
            'name', 'serving', 'carbohydrate', 'sugars', 'protein', 'province',
            'saturated_fatty_acids', 'cholesterol', 'salt', 'label',
        )