<h1 align="center">
    <a href="https://github.com/ha4219/term-project"/>
    OSS TERM PROJECT
</h1>




## Contents

- [개요](#-개요)
- [데이터 가공](#-데이터-가공l)
- [모델 학습](#-모델-학습)

 

## 🎉 개요

![Logo](https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)

- [LINK](http://ec2-54-180-149-10.ap-northeast-2.compute.amazonaws.com/)

- 1일 권장 섭취량 대비 필요한 영양성분을 보충해주는 음식 군집을 도출하는 프로젝트



## 🔥 데이터 가공

1. 데이터 준비

   - [식품의약품안전처의 식품영양성분 데이터베이스](https://www.foodsafetykorea.go.kr/fcdb/)의 음식의 영양데이터를 기반으로 데이터베이스를 구성한다. 데이터베이스의 각 레코드는 음식별로 번호, 해당 음식 군, 제공단위, 1회 제공량(g), 열량(kcal), 탄수화물(g), 단백질(g), 지방(g), 나트륨(mg), 등 241개를 가지며 총 개의 음식 영양성분 정보를 포함한다.

2. 데이터 가공

   1. feature selection

      241개의 feature 중 식품의약품안전처의 영양표시 가이드라인을 참고하여 1일 영양성분 기준치 33개 중 데이터베이스에 없는 크롬을 제외한 32개 영양성분을 선택한다.

      ![0](https://github.com/ha4219/term-project/blob/main/assets/0.png)

   2. 한글 값 수정

      데이터에 한글이 적혀있는 값 또는 오타를 수정한다. 식품의약품안전처의 영양표시 가이드라인[[1\]](#_ftn1) 에0으로 표시 가능한 값 범위에 따라 한글로 적혀있는 값을 0으로 바꾼다. 

      ![1](https://github.com/ha4219/term-project/blob/main/assets/1.png)

    3. 영양성분 단위 변환

       총 식이섬유, 콜레스테롤, 칼륨, 철, 비타민A, 비타민 C, 비타민 K, 나이아신, 비타민B1, 비타민B2, 비타민 B6, 비타민 B12, 판토텐산, 구리, 망간의 단 1일 영양성분 기준치의 단위로 변환한다.

       ![2](https://github.com/ha4219/term-project/blob/main/assets/2.png)

       4. 모든 행이 결측치인 행 제거

       모든 행이 결측치인 행은 학습에 도움이 안 되므로 제거한다.

       5. 중복 값 제거

       다른 년도에 조사한 같은 식품명을 가진 음식이 5,853개가 있어 최신 년도을 제외하고 제거한다.

       6. 2차 Feature Selection

       32개의 feature 중 결측치 비율이 낮은 탄수화물, 총당류, 단백질, 지방, 총 포화 지방산, 콜레스테롤, 나트륨을 선택한다.

       ![3](https://github.com/ha4219/term-project/blob/main/assets/3.png)

       7. 1일 영양성분 기준치 미만 및 1회제공량 20g 초과 식품 선택

       본 프로젝트는 1일 권장 섭취량 대비 부족한 영양성분을 보충해주는 음식 군집을 도출하는 것을 목표로 하므로 1일 영양성분 기준치를 초과하는 데이터는 제외한다. 또한, 1회 제공량이 20g 이하 식품은 대부분의 feature가 결측치이므로 제거한다.

       ![4](https://github.com/ha4219/term-project/blob/main/assets/4.png)

       8. 데이터 필터링

       크롤링 또는 음식 군을 이용하여 소스, 잼, 장류, 음료수, 사탕, 껌 등 음식이 아닌 식품을 필터링하여 최종적으로 음식 영양성분 데이터15,353개를 얻는다.

       ![5](https://github.com/ha4219/term-project/blob/main/assets/5.png)

       ![image-20211220221213581](C:\Users\ha421\AppData\Roaming\Typora\typora-user-images\image-20211220221213581.png)

       9. Data Scaling

       영양성분들이 서로 다른 범위의 크기를 가진다.  0에 가까운 값을 가지는 데이터가 많아 minmax scaler를 사용하여 정규화를 했다. 

       ![6](https://github.com/ha4219/term-project/blob/main/assets/6.png)

       10. Dimension Reduction

        PCA을 사용하여 k=3일 때 데이터 분산이 80% 보존되며 3차원 시각화하여 데이터를 볼 수 있기 때문에 3차원 차원 축소를 선택한다. 3차원으로 축소된 데이터를 inverse_transform을 이용해 구한 재구성오차 MSE는 0.00508이다.

        ![7](https://github.com/ha4219/term-project/blob/main/assets/7.png)



## 💡모델 학습

1. Gaussian mixture model

   클러스터 개수(k)에 따라 BIC, AIC 점수를 그래프로 확인하니 k = 10부터 약 69,000으로 수렴했다. 따라서 클러스터 개수가 10개 보다 클 경우 성능 향상이 미미하므로 클러스터의 개수를 10개 선택했다

   ![8](https://github.com/ha4219/term-project/blob/main/assets/8.png)

    하이퍼 파라미터를 n_components=10, n_init=15, random_state=42로 하여 모델을 학습시킨 결과, 2번 클러스터에 데이터 인스턴스2,533개가 가장 많이 군집화되었고 8번 클러스터에 2,194개 데이터 인스턴스가 군집화되었다. 9번 클러스터에는 606개의 데이터 인스턴스가 가장 적게 포함되었다. 

   ![9](https://github.com/ha4219/term-project/blob/main/assets/9.png)

    | 클러스터 번호 | 개수 |
    | ------------- | ---- |
    | 0             | 922  |
    | 1             | 979  |
    | 2             | 2533 |
    | 3             | 1796 |
    | 4             | 1692 |
    | 5             | 1671 |
    | 6             | 1626 |
    | 7             | 1334 |
    | 8             | 2194 |
    | 9             | 606  |

    ​	BIC, AIC도 음수이며 각 클러스터에 데이터 인스턴스가 골고루 군집화되었다. 3차원 시각화 결과 데이터 인스턴스가 중심에 몰려있어 정확한 군집화는 확인하기 어려우나 2차원 시각화 결과 대부분의 인스턴스가 잘 군집화되었다.

    ![3dplot](https://github.com/ha4219/term-project/blob/main/assets/10.png)

    ![tsne](https://github.com/ha4219/term-project/blob/main/assets/11.png)
