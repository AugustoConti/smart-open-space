<h1 align="center">
  Smart Open Space
</h1>
<p align="center">
  <img src="/other/logo.svg" width="150" height="150" />
</p>
<p align="center">
  Organizá tu Open Space! :sunglasses:
</p>

<hr />

[![Heroku][heroku-badge]][heroku]
[![Build Status][build-badge]][build]
[![Dependabot Status][dependabot-badge]][dependabot]
[![Backlog][backlog-badge]][backlog]
[![License: GPLv3][license-badge]][license]
[![Issues][issues-badge]][issues]

## 📖 Índice
- [👎 Problema](#-problema)
- [🏆 Solución](#-solución)
- [🎉 Diferencial](#-diferencial)
- [🔧 Instalación](#-instalación)
- [📜 Documentación](#-documentación)
- [👮 Licencia](#-licencia)

## 👎 Problema
- Los asistentes de un Open Space no logran captar los datos de una charla, en la agenda se cambian de sala u horario, se superponen charlas del mismo tópico, y algunas salas suelen llenarse muy rápido.

## 🏆 Solución
- **Smart Open Space** es una web app que permite ver los datos de una charla por un proyector mientras su orador está
exponiendo, me ofrece una agenda actualizada y, optimizada por tópicos y agrupando las charlas muy requeridas en espacios más grandes.

## 🎉 Diferencial
- A diferencia del método actual, Pizarrón + Google SpreedSheet, el nuestro no requiere carga manual, se encuentra siempre actualizado, y sugiere optimizaciones inteligentes.

## 🔧 Instalación
### Antes de empezar, vas a necesitar:
  - [Git][git]
  - [JDK 8 update 60 o superior][java8] (Asegurate que la variable de entorno `JAVA_HOME` apunte a la carpeta `jdk1.8.0` que sacaste de la descarga del JDK).
  - [NodeJS][node]
  - [Yarn][yarn]

### Clonar el repo
```bash
git clone git@github.com:AugustoConti/smart-open-space.git
cd smart-open-space
```

### Levantar backend
```bash
cd back && ./gradlew bootRun
```

### Levantar frontend
```bash
cd front && yarn && yarn watch
```

## 📜 Documentación

### Diagrama de Arquitectura

#### Visualización del Open Space

![Diagrama de arquitectura](/other/Arquitectura.png)

- Frontend:
  - **App.js**: Punto de entrada de la aplicación.
  - **Routes**: Detecta la ruta, y elige que componente que corresponde renderizar.
  - **OpenSpace.js**: Renderiza la pantalla con los datos del Open Space.
  - **os-client.js**: Conseguir los datos del Open Space, conectandose con el backend.
- Backend:
  - **OpenSpaceController**: Exponer los endpoints del OpenSpaceService, como REST-Json.
  - **OpenSpaceService**: Exponer un servicio para manipular un Open Space.
  - **OpenSpaceRepository**: Persistir y recuperar objetos OpenSpace de la base de datos.
  - **OpenSpace**: Objeto que representa un Open Space.

### Casos de uso
#### Entrega 1
![Caso de uso entrega 1](/other/CasoDeUso.png)

#### Entrega 2
![Caso de uso entrega 2](/other/CasoDeUso2.png)

#### Entrega 3
![Caso de uso entrega 3](/other/CasoDeUso3.png)

## 👮 LICENCIA
- [GPLv3](LICENSE)

[backlog]: https://trello.com/b/A3IsSe1r/smartopenspace
[backlog-badge]: https://img.shields.io/badge/trello-backlog-blue?style=flat-square&logo=trello
[build]: https://travis-ci.org/AugustoConti/smart-open-space
[build-badge]: https://img.shields.io/travis/AugustoConti/smart-open-space?logo=travis&style=flat-square
[dependabot]: https://dependabot.com
[dependabot-badge]: https://api.dependabot.com/badges/status?host=github&repo=AugustoConti/smart-open-space
[git]: https://help.github.com/set-up-git-redirect
[heroku]: https://smartopenspace.herokuapp.com
[heroku-badge]: https://img.shields.io/badge/heroku-deploy-ff69b4?style=flat-square&logo=heroku
[issues]: https://github.com/AugustoConti/smart-open-space/issues
[issues-badge]: https://img.shields.io/github/issues-raw/AugustoConti/smart-open-space?style=flat-square
[java8]: https://www.oracle.com/technetwork/java/javase/downloads/index.html
[license]: LICENCIA
[license-badge]: https://img.shields.io/github/license/AugustoConti/smart-open-space?style=flat-square
[node]: https://nodejs.org
[yarn]: https://yarnpkg.com/en/docs/install
