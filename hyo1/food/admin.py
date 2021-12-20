from django.contrib import admin
from food import models


@admin.register(models.Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ['name', 'serving', 'carbohydrate', 'sugars', 'protein', 'province',
                    'saturated_fatty_acids', 'cholesterol', 'salt', 'label']
    search_fields = ['name']

