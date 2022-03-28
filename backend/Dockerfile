FROM python:3.10-alpine3.15
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
RUN set -ex \
    && pip install --upgrade pip \
    && apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk add jpeg-dev zlib-dev libjpeg
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .