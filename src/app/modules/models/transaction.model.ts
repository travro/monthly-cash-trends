export class Transaction{
  constructor(
    public id: number,
    public date: Date,
    public description: string,
    public category: string,
    public amt: number
  ){}

}
