export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const AppointmentFormErrorMessages = [
  new ErrorMessage('description', 'required', 'Description is required'),
  new ErrorMessage('price', 'required', 'Price is required'),
  new ErrorMessage('proposed_time', 'required', 'Appointment time is required'),
  new ErrorMessage('proposed_time', 'pastDate', 'Time must be in the future'),
  new ErrorMessage('status', 'required', 'Status is required'),
  new ErrorMessage('topic', 'required', 'Topic is required'),
];
