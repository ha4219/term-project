from django.shortcuts import render
from food.models import Food
from gmm.models import Predict
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import PredictSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets


@api_view(['POST'])
def predict_list(request):
    import joblib
    import json
    import numpy as np
    print(request.data)
    data = np.array([request.data['carbohydrate'],
                     request.data['sugars'],
                     request.data['protein'],
                     request.data['province'],
                     request.data['saturated_fatty_acids'],
                     request.data['cholesterol'],
                     request.data['salt'],
                     ])

    scaler = joblib.load(filename='minmax_scaler.pkl')
    pca = joblib.load(filename='pca.pkl')
    gmm = joblib.load(filename='gmm.pkl')

    next = data.reshape(1, 7)
    next = scaler.transform(next)
    next = pca.transform(next)
    next = gmm.predict(next)

    queryset = Food.objects.filter(label=next[0])
    serializer = PredictSerializer(queryset, many=True)
    return Response(serializer.data, status=200)

# class PredictList(generics.ListAPIView):
#     serializer_class = PredictSerializer
#
#     def get_queryset(self):
#         import joblib
#         import json
#         import numpy as np
#         print(self.request.data)
#         data = np.array([self.request.data['carbohydrate'],
#                          self.request.data['sugars'],
#                          self.request.data['protein'],
#                          self.request.data['province'],
#                          self.request.data['saturated_fatty_acids'],
#                          self.request.data['cholesterol'],
#                          self.request.data['salt'],
#                          ])
#         print(data)
#
#         scaler = joblib.load(filename='minmax_scaler.pkl')
#         pca = joblib.load(filename='pca.pkl')
#         gmm = joblib.load(filename='gmm.pkl')
#
#         next = data.reshape(1, 7)
#         next = scaler.transform(next)
#         next = pca.transform(next)
#         next = gmm.predict(next)

# class PredictView(viewsets.ModelViewSet):
#     serializer_class = PredictSerializer
#
#     def post(self, request):
#         print(request.data)
#         queryset = Food.objects.all()
#         return Response(request.data, status=200)