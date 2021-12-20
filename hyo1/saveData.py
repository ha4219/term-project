import pandas as pd

import os
## Python이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hyo1.settings")
## 이제 장고를 가져와 장고 프로젝트를 사용할 수 있도록 환경을 만듭니다.
import django
django.setup()
from food.models import Food
from gmm.models import Predict, Label

# length = len(data)
#
# for index, row in data.iterrows():
#     if Food.objects.filter(name=row['식품명']):
#         continue
#     Food.objects.create(name=row['식품명'], serving=row['1회제공량'], carbohydrate=row['탄수화물(g)'],\
#                         sugars=row['총당류(g)'], protein=row['단백질(g)'], province=row['지방(g)'], \
#                         saturated_fatty_acids=row['총 포화 지방산(g)'], cholesterol=row['콜레스테롤(㎎)'],\
#                         salt=row['나트륨(㎎)'])


# for food in Food.objects.all():
#     food.delete()

# from sklearn.externals import joblib
import joblib
import numpy as np

scaler = joblib.load(filename='minmax_scaler.pkl')
pca = joblib.load(filename='pca.pkl')
gmm = joblib.load(filename='gmm.pkl')


for food in Food.objects.all():
    next = np.array([food.carbohydrate, food.sugars, food.protein, food.province, food.saturated_fatty_acids,\
                    food.cholesterol, food.salt]).reshape(1, 7)
    next = scaler.transform(next)
    next = pca.transform(next)
    next = gmm.predict(next)
    # label = Label.objects.get(index=next[0])
    food.label = next[0]
    food.save()
