# Features
Boilerplate for a TypeScript REST API (Express) performing CRUD operations with TypeORM. Swagger enabled. (/swagger-ui)

![Swagger-UI](https://i.ibb.co/QQwk6QB/typescript-rest-swagger.png)

## Configuration

DB configuration: ```/ormconfig.json```

```
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "test",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}
```

## Initial setup
```
npm install
```

## Swagger Docs Generation

```
npm run swagger
```

## Build & Run
```
npm run build && npm run start
```

## Docker build and run
```
npm run build
docker-compose up -d
```

## Test
```
npm run test
```

### Test with coverage reports:
```
npm run test:coverage
```

The coverage report will be saved under ```./reports/coverage``` folder.

