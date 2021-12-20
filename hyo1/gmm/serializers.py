from rest_framework import serializers
from food.models import Food
from gmm.models import Predict, Label


class PredictSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = (
            'name', 'serving', 'carbohydrate', 'sugars', 'protein', 'province',
            'saturated_fatty_acids', 'cholesterol', 'salt'
        )