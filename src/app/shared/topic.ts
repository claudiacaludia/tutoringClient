export class Topic {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public subject_id: number,
    public created_at: string,
    public updated_at: string
  ) {}
}
