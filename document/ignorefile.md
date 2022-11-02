## Ignore file list

 본 프로젝트는 개인 정보 보호를 위해 생략된 파일들이 있습니다.
- `src/configs/typeorm.config.ts`
  ```typescript
  import { TypeOrmModuleOptions } from '@nestjs/typeorm';
  import * as config from 'config';

  const dbConfig = config.get('db');

  export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],

    synchronize: dbConfig.synchronize,
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
  import { Module } from '@nestjs/common';
  import { AuthController } from './auth.controller';
  import { AuthService } from './auth.service';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from './user.entity';
  import { JwtModule } from '@nestjs/jwt';
  import { PassportModule } from '@nestjs/passport';
  import { JwtStrategy } from './jwt.strategy';
  import * as config from 'config';

  const jwtConfig = config.get('jwt');
  @Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET || jwtConfig.secret, //토큰 생성시 사용.
        signOptions: {
          expiresIn: jwtConfig.expiresIn,
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

- `src/auth/jwt.strategy.ts`
  ```typescript
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(User)
      private userRepository: UserRepository,
    ) {
      super({
        secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'), // 토큰이 유효한지 체크할 때 사용.
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

- `config/default.yml`
  ```yml
  server:
    port: 3000

  db:
    type: 'postgres'
    port: 15432 
    database: '[위에서 작성한 dbname]'

  jwt:
    expiresIn: 3600
  ```

<br/>

- `config/development.yml`
  ```yml
  db:
    host: 'localhost'
    username: '[위에서 작성한 username]'
    password: '[위에서 작성한 password]'
    synchronize: true

  jwt:
    secret: '[위에서 작성한 시크릿 키]'
  ```

<br/>

- `production.yml`
  ```yml
  db:
    synchronize: false
  ```
