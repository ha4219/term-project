from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from gmm.views import predict_list
# from gmm.views import PredictView


# predict_list = PredictView.as_view({
#     'post': 'list'
# })

urlpatterns = format_suffix_patterns([
    path('predict/', predict_list, name='predict_list'),
])