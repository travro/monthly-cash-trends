export class Transaction{
  constructor(
    public id: number,
    public date: Date,
    public description: string,
    public amt: number,
    public category?: string,
  ){}

}
