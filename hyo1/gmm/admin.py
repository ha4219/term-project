from django.contrib import admin
from gmm.models import Label, Predict


@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = [
        'index',
    ]


@admin.register(Predict)
class PredictAdmin(admin.ModelAdmin):
    list_display = [
        'food',
        'label'
    ]