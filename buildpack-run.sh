#!/bin/bash

set -euo pipefail
set -x

# Ya que los buildpacks de heroku no corren con sub directorios este script
# palea eso con un bello hack:
#
# El build de heroku tiene 4 buildpacks que corren en orden:
# 1. buildpack-run
# 2. heroku/nodejs
# 3. buildpack-run
# 4. heroku/gradle

# 1. Corre el script, que como no existe /dist ejecuta el then que copia
#    el contenido de /front a /
# 2. Corre nodejs que buildea el front y deja la carpeta /dist como resultado
# 3. Corre el script por segunda vez, que como si existe /dist ejecuta el else
#    el cual: mueve assets a dist porque es necesario para la app, borra /src
#    porque choca con los archivos del back, copia /back a / y finalmente muevo
#    /dist a la carpeta correcta para que spring lo sirva como archivos
#    estaticos
# 4. Corre gradle y buildea el back agregando los archivos del front

# if no existe dist
if ! [ -e dist ]; then
  cp -vr front/. .
else
  mv -v src/assets dist/assets
  rm -rf src
  cp -vr back/. .
  mv -v dist src/main/resources/static
fi

