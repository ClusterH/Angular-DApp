export class User {
  address: string;
  transferAddress: string;
  balance: number;
  amount: string;
  remarks: string;

  constructor() {
    this.address = '';
    this.transferAddress = '';
    this.balance = 0;
    this.amount = '';
    this.remarks = '';
  }
}