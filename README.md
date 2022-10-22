<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Overview
[Nest.js](https://github.com/nestjs/nest)를 이용하여 재고 관리 시스템을 만들어봅니다.

<br/>

> 오류 해결 과정은 [블로그 포스팅](https://velog.io/@dongvelop/series/nestjs)를 통해 확인할 수 있습니다.

<br/>

본 프로젝트는 개인 정보 보호를 위해 생략된 파일들이 있습니다.

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

- `src/auth/auth.module.ts`
  ```typescript
  @Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: '[자신이 원하는 시크릿 키]', //토큰 생성시 사용.
        signOptions: {
          expiresIn: 60 * 60,
        },
      }),
      TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
  })
  export class AuthModule {}
  ```



<br/>

- `src/auth/auth.module.ts`
  ```typescript
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(User)
      private userRepository: UserRepository,
    ) {
      super({
        secretOrKey: '[위에서 작성한 시크릿 키와 동일하게 입력]', // 토큰이 유효한지 체크할 때 사용.
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰을 AuthHeader에서 BearerToken 타입으로 가져옴.
      });
    }

    async validate(payload) {
      const { username } = payload;
      const user: User = await this.userRepository.findOne({
        where: { username: username },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    }
  }

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
