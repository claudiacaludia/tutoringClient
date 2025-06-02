import {Appointment} from './appointment';

export class AppointmentFactory {
  static empty() : Appointment {
    return new Appointment(0, '', 0, '', '', 0, null, 0, );
  }

  static fromObject(rawAppointment: any): Appointment {
    return new Appointment(
      rawAppointment.id,
      rawAppointment.description,
      rawAppointment.price,
      rawAppointment.proposed_time,
      rawAppointment.status,
      rawAppointment.tutor_id,
      rawAppointment.student_id,
      rawAppointment.topic_id,
      rawAppointment.created_at,
      rawAppointment.updated_at,
    );
  }
}
