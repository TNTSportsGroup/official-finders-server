#!/usr/bin/env bash

docker build -t officialfinders/official-finders-server-prod:latest .
docker push officialfinders/official-finders-server-prod:latest