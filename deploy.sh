#!/bin/bash
PROJECT="project_name"
yarn run build && rsync --progress -r dist/* hosting_meierlink@calcium.locum.ru:projects/$PROJECT
