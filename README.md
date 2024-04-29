<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clonar el repositorio.
```
https://github.com/dromerof/TesloShop.git
```

2. Ejecutar.
``` 
yarn install
```

3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

4. Llenar las variables de entorno definidas en el .env

5. Levantar la base de datos
```
docker-compose up -d
```

6. Ejecutar la aplicación en dev:
```
yarn start: dev
```
7. Ejecutar SEED para llenar la base de datos.
```
localhost:3001/api/seed
```