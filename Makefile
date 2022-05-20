help:
	@echo "usage: make help|install|run"

install:
	sh ./bin/node-docker.sh npm i

run:
	sh ./bin/node-docker.sh npm run serve
