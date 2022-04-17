// Jest possui suporte experimental para o ECMAScript Modules (ESM).
// por esse motivo, foi colocado no package.json o NODE_OPTIONS=--experimental-vm-modules
// e foi instalado o cross-env, para ser possivel setar variáveis ambientes no windows

import supertest from 'supertest';
import mongoose from 'mongoose';
import {
  setMinutes, setHours, format, addHours,
} from 'date-fns';
import app from '../src/app.js';

// conectando com o banco de dados de teste
beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL_TEST);
});

// Ao finalizar todos os testes, remover o bd
afterAll(async () => {
  // Removes the current database, deleting the associated data files.
  await mongoose.connection.db.dropDatabase();
  // Closes the connection
  await mongoose.connection.close();
});

describe('POST /api/schedules', () => {
  describe('When passing appointment\'s required data', () => {
    afterAll(async () => {
      // Deletando o documento criado da collection schedule.
      await mongoose.model('schedule').deleteMany({});
    });

    it('should respond with a 200 status code and return scheduled appointment\'s data with an ID', async () => {
      const response = await supertest(app).post('/api/schedules').send({
        name: 'Jane Doe',
        birthDate: '01/16/1997',
        dateTimeAppointment: '07/13/2022 22:00',
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });
  });

  describe('When birthdate is not in MM/DD/YYYY format', () => {
    it('should respond with a 400 status code', async () => {
      const response = await supertest(app).post('/api/schedules').send({
        name: 'Jane Doe',
        birthDate: '1997-01-16T02:00:00.000Z',
        dateTimeAppointment: '07/13/2022 22:00',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('When date and time of appointment is not in MM/DD/YYYY HH:MM format', () => {
    it('should respond with a 400 status code', async () => {
      const response = await supertest(app).post('/api/schedules').send({
        name: 'Jane Doe',
        birthDate: '01/16/1997',
        dateTimeAppointment: '07-13-2022 22',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('When name is missing', () => {
    it('should respond with a 400 status code', async () => {
      const response = await supertest(app).post('/api/schedules').send({
        birthDate: '01/16/1997',
        dateTimeAppointment: '07/13/2022 22:00',
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('When birthdate is missing', () => {
    it('should respond with a 400 status code', async () => {
      const response = await supertest(app).post('/api/schedules').send({
        name: 'Jane Doe',
        dateTimeAppointment: '07/13/2022 22:00',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('When date and time of the appointment is missing', () => {
    it('should respond with a 400 status code', async () => {
      const response = await supertest(app).post('/api/schedules').send({
        name: 'Jane Doe',
        birthDate: '01/16/1997',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('When none of the required data is informed', () => {
    it('should responde with a 400 status code', async () => {
      const response = await supertest(app).post('/api/schedules').send();
      expect(response.statusCode).toBe(400);
    });
  });

  describe('When the limit of 2 patients for the same time is achieved', () => {
    afterAll(async () => {
      // Deletando o documento criado da collection schedule.
      await mongoose.model('schedule').deleteMany({});
    });

    it('should respond with a 400 status code', async () => {
      // primeiro agendamento para o mesmo Horário
      await supertest(app).post('/api/schedules').send({
        name: 'Jane Doe',
        birthDate: '01/16/1997',
        dateTimeAppointment: '07/13/2022 22:00',
      });

      // segundo agendamento para o mesmo horário
      await supertest(app).post('/api/schedules').send({
        name: 'John Doe',
        birthDate: '08/10/1940',
        dateTimeAppointment: '07/13/2022 22:00',
      });

      // tentativa do terceiro agendamento para o mesmo horário
      const response = await supertest(app).post('/api/schedules').send({
        name: 'Jane Q. Public',
        birthDate: '07/15/2010',
        dateTimeAppointment: '07/13/2022 22:00',
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('When the limit of 20 appointments per day is achieved', () => {
    it('should respond with a 400 status code', async () => {
      const dateTime = setHours(setMinutes(new Date('05/25/2022'), 0), 0);
      // inserindo 20 agendamentos para o dia 25/05/2022, e iniciando as 00:00 horas.
      for (let i = 0; i <= 19; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await supertest(app).post('/api/schedules').send({
          name: `Person ${i}`,
          birthDate: '10/10/2010',
          // adicionando as horas para a data, de 0 horas a 19 horas == 20 agendamentos
          dateTimeAppointment: format(addHours(dateTime, i), 'MM/dd/yyyy HH:mm'),
        });
      }

      const response = await supertest(app).post('/api/schedules').send({
        name: 'Person 21',
        birthDate: '10/10/2010',
        dateTimeAppointment: format(addHours(dateTime, 20), 'MM/dd/yyyy HH:mm'),
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
