import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });
  afterAll(() => {
    app.close();
  });
  describe('Users', () => {
    describe('Create', () => {
      it.todo('should create');
    });
    describe('FindAll', () => {
      it.todo('should findAll');
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
  describe('Auth', () => {
    describe('Login', () => {
      it.todo('should login');
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
