import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(8888);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:8888');
  });
  afterAll(() => {
    app.close();
  });
  describe('SignUp & Login', () => {
    describe('SignUp', () => {
      const dto: CreateUserDto = {
        email: 'sample1234@email.com',
        password: 'Zaq!2wsx',
      };
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/users')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/users')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/users').expectStatus(400);
      });
      it('should create', () => {
        return pactum
          .spec()
          .post('/users')
          .withBody(dto)
          .expectStatus(201)
          .stores('createdUserId', 'id')
          .inspect();
      });
      it('should fail if a user with the same email already exists', () => {
        return pactum.spec().post('/users').withBody(dto).expectStatus(409);
      });
    });
    describe('Login', () => {
      const dto: LoginDto = {
        email: 'sample1234@email.com',
        password: 'Zaq!2wsx',
      };
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/users')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/users')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw if no accessToken provided', () => {
        return pactum.spec().post('/users').expectStatus(400);
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('fetchedAccessToken', 'accessToken');
      });
    });
  });
  describe('User', () => {
    describe('FindAll', () => {
      it('should throw if no accessToken provided', () => {
        return pactum.spec().get('/users').expectStatus(401);
      }),
        it('should findAll', () => {
          return pactum
            .spec()
            .get('/users')
            .withBearerToken('$S{fetchedAccessToken}')
            .expectStatus(200);
        });
    });
    describe('FindOneById', () => {
      it('should throw if no accessToken provided', () => {
        return pactum.spec().get('/users/$S{createdUserId}').expectStatus(401);
      });
      it('should throw if no user with provided id', () => {
        return pactum
          .spec()
          .get('/users/1234567890')
          .withBearerToken('$S{fetchedAccessToken}')
          .expectStatus(404);
      });
      it('should findOneById', () => {
        return pactum
          .spec()
          .get('/users/$S{createdUserId}')
          .withBearerToken('$S{fetchedAccessToken}')
          .expectStatus(200);
      });
    });
    describe('Update', () => {
      const dto: UpdateUserDto = {
        email: 'sample1234@email.com',
        username: 'sample5678',
        selfIntroduction: 'Hello, I am sample5678',
      };
      it('should throw if no accessToken provided', () => {
        return pactum
          .spec()
          .patch('/users/$S{createdUserId}')
          .withBody(dto)
          .expectStatus(401);
      });
      it('should throw if no user with provided id', () => {
        return pactum
          .spec()
          .patch('/users/1234567890')
          .withBody(dto)
          .withBearerToken('$S{fetchedAccessToken}')
          .expectStatus(404);
      });
      it('should update', () => {
        return pactum
          .spec()
          .patch('/users/$S{createdUserId}')
          .withBody(dto)
          .withBearerToken('$S{fetchedAccessToken}')
          .expectStatus(200);
      });
    });
    describe('Remove', () => {
      it('should throw if no accessToken provided', () => {
        return pactum
          .spec()
          .delete('/users/$S{createdUserId}')
          .expectStatus(401);
      });
      it('should throw if no user with provided id', () => {
        return pactum
          .spec()
          .delete('/users/1234567890')
          .withBearerToken('$S{fetchedAccessToken}')
          .expectStatus(404);
      });
      it('should remove', () => {
        return pactum
          .spec()
          .delete('/users/$S{createdUserId}')
          .withBearerToken('$S{fetchedAccessToken}')
          .expectStatus(200);
      });
    });
  });

  describe('Posts', () => {
    describe('Create', () => {
      it.todo('should create');
    });
    describe('FindAll', () => {
      it.todo('should findAll');
    });
    describe('FindAllByUser', () => {
      it.todo('should findAllByUser');
    });
    describe('FindOneById', () => {
      it.todo('should findOneById');
    });
    describe('Update', () => {
      it.todo('should update');
    });
    describe('Remove', () => {
      it.todo('should remove');
    });
  });
});
