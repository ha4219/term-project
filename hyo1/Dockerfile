FROM python:3
ENV PYTHONUNBUFFERED 1

ARG ALLOWED_HOSTS

ENV ALLOWED_HOSTS $ALLOWED_HOSTS

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
EXPOSE 8000
RUN pip install -r requirements.txt
COPY . /backend/
RUN python manage.py makemigrations
RUN python manage.py migrate