<h1 align="center">
    <a href="https://github.com/ha4219/term-project"/>
    OSS TERM PROJECT
</h1>

 

## ๐ Setup

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

## ๐งModel change

- ๋ชจ๋ธ ๋ณ๊ฒฝ ๋ฐฉ๋ฒ

  ํ์ฌ ํ๋ก์ ํธ๋ hyo1 directory์ ์๋ pca.pkl, minmax_scaler.pkl, gmm.pkl์ ๋ถ๋ฌ์ค๊ณ  ์์ต๋๋ค. ๊ทธ๋ ๊ธฐ์ ํด๋น ํ์ผ์ ๋ณ๊ฒฝํ๊ฑฐ๋ ์๋๋ฉด model์ hyo1 ํด๋์ ์ฌ๋ ค์ ํด๋น path๋ฅผ ์์ ํด์ฃผ๋ ๋ฐฉ๋ฒ์ด ์์ต๋๋ค.

  ![load](https://github.com/ha4219/term-project/blob/main/assets/model_load.png)

