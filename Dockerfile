FROM python:3.10-alpine3.16

WORKDIR /app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY backend ./

COPY .env ./

EXPOSE 8001

CMD ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]