import { Topic } from './topic';
import { User } from './user';

export class Appointment {
  constructor(
    public id: number,
    public description: string,
    public price: number,
    public proposed_time: string,
    public status: string,
    public tutor_id: number,
    public student_id: number | null,
    public topic_id: number,
    public tutor?: User,
    public student?: User | null,
    public topic?: Topic,
  ) {}
}
