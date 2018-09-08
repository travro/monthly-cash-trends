export class Transaction{
  constructor(
    public id: number,
    public date: Date,
    public vendor: string,
    public amt: number,
    public category?: string
  ){}


}
