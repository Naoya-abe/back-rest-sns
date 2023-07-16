import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

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
  describe('SignUp & SignIn', () => {
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
        return pactum.spec().post('/users').withBody(dto).expectStatus(201);
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
      it('should throw if no body provided', () => {
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
      it('should findAll', () => {
        return pactum
          .spec()
          .get('/users')
          .withBearerToken('$S{fetchedAccessToken}')
          .expectStatus(200);
      });
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
