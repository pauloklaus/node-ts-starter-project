# Node+TypeScript Starter Project

## Project creation

Based on the book by [Basarat](https://basarat.gitbook.io/typescript/).

* [Original github repository](https://github.com/basarat/typescript-book)

### Install TypeScript

```sh
npm install -D typescript @types/node nodemon ts-node tsconfig-paths
```

### Init TypeScript basic config file

```sh
npx tsc --init --rootDir ./ --outDir dist --esModuleInterop --resolveJsonModule --lib es6,dom  --module commonjs
```

Source: [https://aka.ms/tsconfig]

Set path alias:

```json
{
  "rootDir": "./",
  "baseUrl": "./src",
  "paths": {
    "@/*": [ "./*" ]
  }
}
```

In the [package.json](package.json), set nodemon parameters to fix path alias at compile time:

```json
{
  "scripts": {
    "build:live": "nodemon -r tsconfig-paths/register --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts",
  }
}
```

### Install jest

```sh
npm i -D jest @types/jest ts-jest
```

Create a [jest.config.js](jest.config.js) file:

```javascript
module.exports = {
  "roots": [
    "tests",
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
}
```

To run tests:

```sh
npm run test
# or
npm run test:watch
```

Finally, add the new scripts in the [package.json](package.json) file:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watchAll"
  }
}
```

Source: [https://basarat.gitbook.io/typescript/intro-1/jest]

### Install prettier

```sh
npm install -D prettier
```

Then, add the scripts in the [package.json](package.json) file:

```json
{
  "scripts": {
    "prettier:base": "prettier --parser typescript --single-quote",
    "prettier:check": "npm run prettier:base -- --list-different \"src/**/*.{ts,tsx}\"",
    "prettier:write": "npm run prettier:base -- --write \"src/**/*.{ts,tsx}\""
  }
}
```

To run:

```sh
npm run prettier:check
npm run prettier:write
```

Source: [https://basarat.gitbook.io/typescript/intro-2/prettier]

### Install husky

```sh
npm install -D husky
```

Add the new **precommit** script in the [package.json](package.json) file:

```json
{
  "scripts": {
    "precommit": "npm run prettier:write"
  }
}
```

Source: [https://basarat.gitbook.io/typescript/intro-2/husky]

### Install ESLint

```sh
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-jest
```

Create a [.eslintrc.js](.eslintrc.js) file:

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules:  {
    // Overwrite rules specified from the extended configs e.g. 
    // "@typescript-eslint/explicit-function-return-type": "off",
  }
}
```

Next, add the new **lint** script in the [package.json](package.json) file:

```json
{
  "scripts": {
    "lint": "eslint \"src/**\""
  }
}
```

And finally, create a vscode [settings.json](.vscode/settings.json) file:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript"
  ]
}
```

To run:

```sh
npm run lint
```

Source: [https://basarat.gitbook.io/typescript/intro-2/eslint]

### Install standard-version

```sh
npm install -D standard-version
```

Add the new **release** script in the [package.json](package.json) file:

```json
{
  "scripts": {
    "release": "standard-version",
    "postrelease": "git push --follow-tags origin master && npm publish"
  }
}
```

To run:

```sh
npm run release
# or
npm run release -- --release-as minor
```

Source:

* [https://www.conventionalcommits.org/en/v1.0.0/]
* [https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines]
