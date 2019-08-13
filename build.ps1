#!/bin/bash
cd lightbar
npm run build
cd ..
python manage.py collectstatic --noinput --clear
git add --all