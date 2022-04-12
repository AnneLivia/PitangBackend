import mongoose from 'mongoose';

const ScheduleSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    dateTimeAppointment: { type: Date, required: true },
    statusAppointment: {
      type: String,
      enum: {
        values: ['AGENDADO', 'ATENDIDO', 'NÃO ATENDIDO'],
        message: '{VALUE} is not supported',
      },
      required: true,
      default: 'AGENDADO',
    },
    resultText: { type: String },
  },
  {
    timestamps: true,
  },
);

const ScheduleModel = mongoose.model('schedule', ScheduleSchema);

export default ScheduleModel;
