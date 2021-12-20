<h1 align="center">
    <a href="https://github.com/ha4219/term-project"/>
    OSS TERM PROJECT
</h1>




## Contents

- [Title](#-title)
- [Skill](#-skill)
- [Development Stack](#-development Stack)
- [Description](#-description)
- [Production Environment](#-Production Environment)
- [Example](#-example)
- [License](#-license)



 

## 🎉 Title

![Logo](https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)
유저의 부족한 영양소를 기반으로 음식을 추천해주는 Application

- Food Recommand For You
- [LINK](http://ec2-54-180-149-10.ap-northeast-2.compute.amazonaws.com/)



## 💡 Skill

| backend                                                      | frontend                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/django_line_logo_icon_146560.png"  style="width:200px"/> | ![React](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png) |





## 📋 Development Stack

- Python 3.7

- Django 3.0.0

- node 14.17.6

- npm 7.22.0

- React 17.0.2

  

## 🐧Description

- 이 프로젝트는 영양소 기반 음식 군집을 추천해주기 위해 non-supervised learning 중 하나인 clustering을 사용했습니다.
- 데이터는 식품의약품안전처에서 제공해주는 데이터를 사용했고 모델은 현재 Gaussian Mixture Model 사용하고 있습니다. 해당 내용은 note에 참고해주시면 감사하겠습니다.
- Backend는 Django REST framework를 사용해 API를 구축했습니다.
- Frontend는 React를 사용해 개발했습니다. 

![project structure](https://github.com/ha4219/term-project/blob/main/assets/project_structure.png)



## 🚀 Production Environment

- AWS EC2
- nginx



## 📖 Getting Started

1. Clone this repository.

   ```shell
   $ git clone https://github.com/ha4219/term-project.git
   $ cd term-project
   ```

2. [Set up Backend]()

3. [Set up Frontend]()

## 📱 Example

![example](https://github.com/ha4219/term-project/blob/main/assets/example.png)

## 📄 License

This Project is MIT licensed, as found in the LICENSE file.

