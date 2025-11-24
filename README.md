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
8. Ejecutar `node .\..\dist\servidor.js`
9. Abrir http://localhost:3000 en tu navegador favorito :)

Para crear el usuario admin de la aplicación, ejecutar el siguiente comando:
```
curl -X POST http://localhost:3000/api/v0/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"admin123\",\"nombre\":\"Administrador\",\"email\":\"admin@aida.com\"}"
```

## Envío de mails

Nuestra versión extendida del proyecto cuenta con envio de emails. Esta funcionalidad se implementó con la libreria [`nodemailer`](https://www.npmjs.com/package/nodemailer).

El correo se envía automáticamente al alumno cuando se detecta que aprobó su última materia y se le notifica que el título está en trámite.

Debido a restricciones impuestas por Render, el envío de mails solo funciona al ejecutar la aplicación de manera local. Al ejecutar la aplicación en Render, solo se _simula_ el envío de correos mediante el servicio [`mailtrap.io`](https://mailtrap.io).
