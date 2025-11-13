#!/usr/bin/env bash
set -e
npm install typescript
npx tsc -p .

cd ..

mkdir -p dist

cp -f src/crearGenerico.html dist/
cp -f src/editarGenerico.html dist/
cp -f src/login.html dist/
cp -f src/style.css dist/
cp -f src/styleMenu.css dist/

