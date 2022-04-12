/* eslint-disable class-methods-use-this */
import ScheduleModel from '../models/ScheduleModel.js';
import { BadRequest, NotFound } from '../utils/CustomError.js';
import formatDate from '../utils/formatDate.js';

class ScheduleController {
  MAX_PER_DAY_VACANCIES = 20;

  MAX_PER_HOUR_VACANCIES = 2;

  async index(req, res) {
    // ordenando por data e hora de atendimento
    const schedules = await ScheduleModel.find({})
      .sort('dateTimeAppointment')
      .lean();

    res.json(schedules);
  }

  async store(req, res, next) {
    const { name, birthDate, dateTimeAppointment } = req.body;
    // para evitar espaços extras
    const nameTrim = name.trim();

    // como o intervalo de tempo entre um agendamento e outro é de 1 hora
    // os horários para agendamento serão exatos, horas inteiras, sem minutos.
    // ex: 00:00, 19:00, 20:00, etc.
    // como a data e hora foi passado neste formato: dd/mm/yyyy hh:mm,
    // então basta separar pelo espaço e depois por ':', para obter horas e os minutos.
    // [0] é data, [1] é a hora

    const [, minute] = dateTimeAppointment.split(' ')[1].split(':');

    if (minute !== '00') {
      return next(
        new BadRequest(
          'Horário inválido. O agendamento deve ser efetuado em um horário exato '
          + 'e o intervalo entre um agendamento e o outro é de 1 hora',
        ),
      );
    }

    // transformando a data passada na requisição para UTC - dd/MM/yyyy HH:mm
    // para assim verificar a disponibilidade para o dia e horário
    const dateTimeAppointmentUTC = formatDate(dateTimeAppointment);

    const schedules = await ScheduleModel.find().lean();

    // buscando todos os usuários para o mesmo dia e hora
    const conflicts = schedules.filter((schedule) => (
      formatDate(schedule.dateTimeAppointment) === dateTimeAppointmentUTC
    ));

    // checando se tem espaço para mais atendimentos nesta data (max = 20)
    let cont = 0;
    schedules.forEach((schedule) => {
      // checando apenas a data
      const onlyDateSchedule = formatDate(schedule.dateTimeAppointment).split(' ')[0];
      const onlyDateSelected = dateTimeAppointmentUTC.split(' ')[0];

      if (onlyDateSchedule === onlyDateSelected) cont += 1;
    });

    if (cont >= this.MAX_PER_DAY_VACANCIES) {
      return next(
        new BadRequest(
          `O sistema atingiu seu número máximo de pacientes para esta data. (MAX = ${this.MAX_PER_DAY_VACANCIES})`,
        ),
      );
    }

    // existe um limite para agendamentos no mesmo horário
    if (conflicts.length >= this.MAX_PER_HOUR_VACANCIES) {
      return next(
        new BadRequest(
          `O limite de ${this.MAX_PER_HOUR_VACANCIES} pacientes simultâneos foi alcançado para este horário nesta data`,
        ),
      );
    }

    // se chegou aqui, então os dados podem ser armazenados no bd
    try {
      const schedule = await ScheduleModel.create({
        name: nameTrim,
        birthDate,
        dateTimeAppointment,
      });

      res.json(schedule);
    } catch (err) {
      console.error(err);
      next(new BadRequest('Erro Inesperado'));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;

    try {
      const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        },
      );

      if (!updatedSchedule) { return next(new NotFound('Este agendamento não foi encontrado')); }

      res.json(updatedSchedule);
    } catch (err) {
      console.error(err);
      next(new BadRequest('Erro Inesperado'));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      if (await ScheduleModel.findByIdAndRemove(id)) { return res.json({ message: 'Removido com sucesso!' }); }

      next(new NotFound('Este agendamento não foi encontrado'));
    } catch (error) {
      console.error(error);
      next(new BadRequest('Erro Inesperado'));
    }
  }
}

export default ScheduleController;
