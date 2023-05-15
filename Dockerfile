FROM python:3.11.0

ENV POYTHONBUFFERED 1

WORKDIR /Backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENV LISTEN_PORT=8000

EXPOSE 8000

CMD ["python","manage.py","runserver"]