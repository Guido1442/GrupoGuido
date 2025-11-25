# AIDA – Adminstración Integral de Datos Académicos

## Deploy en Render

Esta aplicación se encuentra deployada en https://aida-i12y.onrender.com/

Credenciales: `admin` / `admin123`

## Ejecución local

Para ejecutar la aplicación localmente en Windows, seguir los siguientes pasos.

1. Ejecutar en Postgres, línea a línea, el contenido de /recursos/creacion-db.sql
2. Ejecutar en Postgres el contenido de /recursos/creacion-esquema.sql
3. Ejecutar en Postgres el contenido de /recursos/crearTablas.sql
4. Ubicarse en el directorio `src` de este proyecto y abrir una consola de comandos (evitar Powershell!)
5. Ejecutar `npm install`.
6. Ejecutar `.\buildearServidor.bat`
7. Ejecutar `.\..\recursos\ejemplo-local-sets.bat` para cargar las enviroment variables
8. Ubicarse afuera del directorio actual mediante `cd ..`
9. Ejecutar `node dist\servidor.js`
10. Abrir http://localhost:3000 en tu navegador favorito :)

Para crear el usuario admin de la aplicación, ejecutar el siguiente comando:
```
curl -X POST http://localhost:3000/api/v0/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"admin123\",\"nombre\":\"Administrador\",\"email\":\"admin@aida.com\"}"
```

## Ejecutar CLI y Polar

# Ver AIDA_CARPETA_INTERCAMBIO

Para ejecutar CLI, seguir los siguientes pasos.
1. Seguir los pasos del 1 hasta el 8 para la ejecucion local
2. Hacer cd dist
3. Si va a ejecutar el comando para cargar alumnos ejecutar node cli.js --archivo XXXX.csv
4. El archivo XXXX.csv se debe encontrar en dist/trabajo/entrada
5. Si va a ejecutar lu o fecha ejecute node cli.js --lu par o node cli.js --fecha par donde par representa el parametro

Para ejecutar Polar, seguir los siguiente pasos.
1. Seguir los pasos del 1 hasta el 8 para la ejecucion local
2. Hacer cd dist
3. Crear un archivo generacionCertificados.csv del cuya primera fila sea tipo,parametro y en cada fila siguiente introduzca los certificados que quiera generar, sea fecha o lu en la primer columna y el parametro en la segunda siempre separados por coma
4. Para ejecutar carga, en la primer columna debe ir archivo y en la segunda el nombre del archivo .csv sin espacio entre la coma y el nombre del archivo al igual que en lu y fecha
5. Ejecute node polar.js, entre en el generacionCertificado.csv y aprete crtl+s

En ambos casos vera los certificados generados en la carpeta dist/trabajo/salida

## Envío de mails

Nuestra versión extendida del proyecto cuenta con envio de emails. Esta funcionalidad se implementó con la libreria [`nodemailer`](https://www.npmjs.com/package/nodemailer).

El correo se envía automáticamente al alumno cuando se detecta que aprobó su última materia y se le notifica que el título está en trámite.

Debido a restricciones de firewall en Render, el envío de mails solo funciona al ejecutar la aplicación de manera local. Al ejecutar la aplicación en Render, se _simula_ el envío de correos mediante el servicio [`mailtrap.io`](https://mailtrap.io). Por lo que se recomienda probar esta funcionalidad de manera local.

Con el propósito de enviar emails reales, se creó una cuenta dedicada de Gmail, denominada `aidadb2025@gmail.com`. Al tratarse de un repositorio público, las credenciales no están incluidas de manera explícita.

Para probar esta funcionalidad, se debe fijar la variable de entorno llamada `TOKEN_MAIL`. Consta de 16 letras minúsculas, separadas por espacios cada 4 letras, alcanzando un total de 19 caracteres.

El valor a utilizar es `TOKEN_MAIL=basa rstk higr XXXX`, pero el último grupo de cuatro caracteres debe ser "Filtro Búsquedas Y Visualización".

Luego, seguir los siguientes pasos para simular la finalización de una carrera y recibir el correo:
1. Crear, mediante el frontend de la aplicación, un nuevo alumno cuyo email será el que reciba el correo.
2. Crear nuevas materia y carrera, vinculándolas entre sí.
3. Vincular la carrera con el alumno
4. Crear la cursada aprobada (nota >=4) para el alumno y materia en cuestión.
5. Se recibirá el correo en breve. Revisar la carpeta de spam en caso de ser necesario.

