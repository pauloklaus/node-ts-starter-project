#!/bin/sh
docker run -it --rm --network bridge -v "$PWD":/app -w /app -p 8080:8080 node:16-alpine $*
