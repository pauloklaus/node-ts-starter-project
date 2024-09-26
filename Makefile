DOCKER_BIN=docker run -it --rm -v ${PWD}:/project -w /project node:20-alpine

help:
	@echo "make help|install|audit|test|test:watch|prettier:check|prettier:write|start"

install:
	@${DOCKER_BIN} npm install

audit:
	@${DOCKER_BIN} npm audit

test:
	@${DOCKER_BIN} npm run test

test-watch:
	@${DOCKER_BIN} npm run test:watch

prettier-check:
	@${DOCKER_BIN} npm run prettier:check

prettier-write:
	@${DOCKER_BIN} npm run prettier:write

lint:
	@${DOCKER_BIN} npm run lint

start:
	@${DOCKER_BIN} npm run build:live

shell:
	@${DOCKER_BIN} sh
