This folder contains the tests to be run when running 'npm run test'.
To disable a test, move it to ./tests/testignore.

Test ignores were configured in package.json as:
> ```
> ... ,
>"jest": {
>"testEnvironment": "node",
>"testPathIgnorePatterns": [
>"testignore"
>]
>},
>...,