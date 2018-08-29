export class Transaction{
  constructor(
    public date: Date,
    public description: string,
    public category: string,
    public amt: number
  ){}

}
