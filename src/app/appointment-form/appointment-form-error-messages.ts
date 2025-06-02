export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const AppointmentFormErrorMessages = [
  new ErrorMessage('description', 'required', 'Eine Beschreibung muss angegeben werden'),
  new ErrorMessage('price', 'required', 'Ein Preis muss angegeben werden'),
  new ErrorMessage('proposed_time', 'required', 'Es muss ein Termin angegeben werden'),
  new ErrorMessage('proposed_time', 'pastDate', 'Der Termin muss in der Zukunft liegen'),
  new ErrorMessage('status', 'required', 'Es muss ein Status angegeben werden'),
  new ErrorMessage('topic', 'required', 'Es muss ein Thema angegeben werden'),
];
