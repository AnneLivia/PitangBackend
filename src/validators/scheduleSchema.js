import JoiImported from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiImported.extend(JoiDate);

// durante o registro, apenas o nome, a data de nascimento
// e a hora e data do agendamento são requeridos
const postSchema = Joi.object({
  name: Joi.string().required().min(2).max(50)
    .trim()
    .messages({
      'string.base': 'O campo de nome deve ser algum tipo de texto',
      'string.min': 'O campo de nome deve ter no mínimo 2 caracteres',
      'string.max': 'O campo de nome deve ter no máximo 50 caracteres',
      'string.empty': 'O campo de nome precisa ser preenchido',
      'any.required': 'O campo de nome é obrigatório',
    }),
  birthDate: Joi.date().required().format('MM/DD/YYYY').messages({
    'date.base': 'O campo de data de nascimento deve ser uma data válida',
    'date.format': 'O campo de data de nascimento deve ser no formato MM/DD/YYYY',
    'any.required': 'O campo de data de nascimento é obrigatório',
  }),
  dateTimeAppointment: Joi.date().required().format('MM/DD/YYYY HH:mm').messages({
    'date.base': 'O campo de data e hora do agendamento deve ser uma data e hora válida',
    'date.format': 'O campo de data e hora do agendamento deve ser no formato MM/DD/YYYY HH:MM',
    'any.required': 'O campo de data e hora do agendamento é obrigatório',
  }),
});

// nenhum dos dados são obrigatórios na atualização
const putSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim()
    .messages({
      'string.base': 'O campo de nome deve ser algum tipo de texto',
      'string.empty': 'O campo de nome precisa ser preenchido',
      'string.min': 'O campo de nome deve ter no mínimo 2 caracteres',
      'string.max': 'O campo de nome deve ter no máximo 50 caracteres',
    }),
  birthDate: Joi.date().format('MM/DD/YYYY').messages({
    'date.base': 'O campo de data de nascimento deve ser uma data válida',
    'date.format': 'O campo de data de nascimento deve ser no formato MM/DD/YYYY',
  }),
  dateTimeAppointment: Joi.date().format('MM/DD/YYYY HH:mm').messages({
    'date.base': 'O campo de data e hora do agendamento deve ser uma data e hora válida',
    'date.format': 'O campo de data e hora do agendamento deve ser no formato MM/DD/YYYY HH:MM',
  }),
  statusAppointment: Joi.string().valid(
    'AGENDADO',
    'ATENDIDO',
    'NÃO ATENDIDO',
  ).messages({
    'string.base': 'O campo de status deve ser algum tipo de texto',
    'any.only': 'O campo de status deve ser AGENDADO, ATENDIDO ou NÃO ATENDIDO',
  }),
  resultText: Joi.string().max(140).trim().messages({
    'string.base': 'O campo de resultado deve ser algum tipo de texto',
    'string.max': 'O campo de resultado deve ter no máximo 140 caracteres',
    'string.empty': 'O campo de resultado não pode ser vazio',
  }),
});

export { postSchema, putSchema };
