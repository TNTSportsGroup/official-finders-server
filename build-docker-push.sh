#!/usr/bin/env bash

docker build -t officialfinders/official-finders-server-dev:latest -f Dockerfile.dev .
docker push officialfinders/official-finders-server-dev:latest