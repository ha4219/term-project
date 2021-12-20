from django.db import models


class Food(models.Model):
    name = models.CharField(max_length=100, primary_key=True, unique=True)
    serving = models.DecimalField(max_digits=20, decimal_places=10)
    carbohydrate = models.DecimalField(max_digits=20, decimal_places=10)
    sugars = models.DecimalField(max_digits=20, decimal_places=10)
    protein = models.DecimalField(max_digits=20, decimal_places=10)
    province = models.DecimalField(max_digits=20, decimal_places=10)
    saturated_fatty_acids = models.DecimalField(max_digits=20, decimal_places=10)
    cholesterol = models.DecimalField(max_digits=20, decimal_places=10)
    salt = models.DecimalField(max_digits=20, decimal_places=10)
    label = models.IntegerField(default=0)
