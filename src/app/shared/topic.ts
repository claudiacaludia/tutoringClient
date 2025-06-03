import {Subject} from './subject';

export class Topic {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public subject_id: number,
    public subject?: Subject
  ) {}
}
