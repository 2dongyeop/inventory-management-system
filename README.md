<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Overview
[Nest.js](https://github.com/nestjs/nest)를 이용하여 재고 관리 시스템을 만들어봅니다.

<br/>

> 오류 해결 과정은 [블로그 포스팅](https://velog.io/@dongvelop/Nest.js-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-%EB%AA%A8%EC%9D%8C)를 통해 확인할 수 있습니다.

<br/>

본 프로젝트는 개인 정보 보흐를 위해 생략된 파일들이 있습니다.

- `src/configs/typeorm.config.ts`
  ```typescript
  import { TypeOrmModuleOptions } from '@nestjs/typeorm';

  export const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 15432, //postgres's default port : 5432 
    username: '[username]',
    password: '[password]',
    database: '[dbname]',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],

    synchronize: true,
  };
  ```

<br/>

- `docker/.env`
  ```env
  DB_NAME=[위에서 작성한 dbname]
  DB_USER=[위에서 작성한 username]
  DB_PASSWORD=[위에서 작성한 password]
  POSTGRES_HOME=./postgres
  ```

<br/>

- `docker/docker-compose.yml`
  ```yml
  version: '3.9'
  services:
    database:
      image: postgres
      container_name: [dbname]
      environment:
        POSTGRES_DB: "${DB_NAME}"
        POSTGRES_USER: "${DB_USER}"
        POSTGRES_PASSWORD: "${DB_PASSWORD}"
        POSTGRES_INITDB_ARGS: "--encoding=UTF-8 --lc-collate=C"
      ports:
        - 15432:5432
      volumes:
        - "${POSTGRES_HOME}/data/:/var/lib/postgresql/data/"
  ```



<br/>

<br/>

## Installation

```bash
$ npm install
```

<br/>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<br/>

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<br/>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

<br/>

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

<br/>

## License

Nest is [MIT licensed](LICENSE).
