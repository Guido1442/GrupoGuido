@echo off
SETLOCAL

CALL npx tsc

IF NOT EXIST "..\dist" (MKDIR "..\dist")
COPY /Y "crearGenerico.html" "..\dist\"
COPY /Y "editarGenerico.html" "..\dist\"
COPY /Y "login.html" "..\dist\"
COPY /Y "style.css" "..\dist\"
COPY /Y "styleMenu.css" "..\dist\"

MKDIR "..\dist\trabajo\salida" 2>nul

ENDLOCAL