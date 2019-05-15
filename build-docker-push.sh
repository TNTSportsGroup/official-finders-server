#!/usr/bin/env bash
npm run build
docker build -t officialfinders/official-finders-server-prod:latest .
docker push officialfinders/official-finders-server-prod:latest