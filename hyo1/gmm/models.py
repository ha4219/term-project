from django.db import models
from food.models import Food


class Label(models.Model):
    index = models.IntegerField(primary_key=True)


class Predict(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    label = models.ForeignKey('Label', on_delete=models.CASCADE)
