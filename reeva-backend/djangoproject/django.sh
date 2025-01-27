#!/bin/bash

echo "Create migrations"
python manage.py makemigrations djangoapp
python manage.py makemigrations projects
python manage.py makemigrations tasks
echo "-------------------"

echo "Migrate"
python manage.py migrate
echo "-------------------"

echo "Start server"
python manage.py runserver 0.0.0.0:8000
echo "-------------------"