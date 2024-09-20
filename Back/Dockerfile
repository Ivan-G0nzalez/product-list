FROM python:3.10-alpine

WORKDIR /app

COPY .. ./

RUN apk update && \
    apk add --no-cache poppler-utils file gcc musl-dev

RUN pip install --upgrade pip --no-cache-dir

RUN pip install -r /app/requirements.txt --no-cache-dir

RUN pip install gunicorn

CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--timeout", "1200"]
