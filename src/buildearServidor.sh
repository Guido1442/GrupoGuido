#!/usr/bin/env bash
set -e
npm install typescript
cd src
npx tsc -p .

cd ..

mkdir -p dist

cd dist

mkdir -p trabajo
mkdir -p recursos

cd trabajo

mkdir -p salida
mkdir -p entrada

cd ..
cd ..


cp -f src/crearGenerico.html dist/
cp -f src/editarGenerico.html dist/
cp -f src/login.html dist/
cp -f src/style.css dist/
cp -f src/styleMenu.css dist/
cp -f ../recursos/plantilla-certificado.html dist/recursos/

