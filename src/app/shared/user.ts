export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: string,
    public education: string,
    public contact_info: string,
    public created_at: string,
    public updated_at: string
  ) {}
}
