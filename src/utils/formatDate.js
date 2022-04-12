import datefnstz from 'date-fns-tz';

const { zonedTimeToUtc, format } = datefnstz;

/**
   * @description Padroniza uma data para o formato UTC-3 - timezone de São Paulo
   * @param {*} date
   * @returns data UTC-3 no formato dd/MM/yyyy HH:mm;
*/

const formatDate = (date) => {
  const dateIso = new Date(date).toISOString();

  const dateUtc = zonedTimeToUtc(dateIso, 'America/Sao_Paulo');

  return format(dateUtc, 'dd/MM/yyyy HH:mm');
};

export default formatDate;
