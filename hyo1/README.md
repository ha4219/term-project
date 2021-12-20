<h1 align="center">
    <a href="https://github.com/ha4219/term-project"/>
    OSS TERM PROJECT
</h1>

 

## 📋 Setup

- install package

  ```shell
  $ pip install -r requirements.txt
  ```

- env set

  ```shell
  export DJANGO_SECRET=
  ```

- run

  ```shell
  $ python manage.py runserver
  ```

## 🚧Model change

- 모델 변경 방법

  현재 프로젝트는 hyo1 directory에 있는 pca.pkl, minmax_scaler.pkl, gmm.pkl을 불러오고 있습니다. 그렇기에 해당 파일을 변경하거나 아니면 model을 hyo1 폴더에 올려서 해당 path를 수정해주는 방법이 있습니다.

  ![load](https://github.com/ha4219/term-project/blob/main/assets/load_model.png)

