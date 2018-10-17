export class Transaction{
  constructor(
    public id: number,
    public date: Date,
    public vendor: string,
    public amount: number,
    public category?: string
  ){}


}
