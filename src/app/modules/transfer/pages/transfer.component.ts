import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models';
import { TransferService } from '../services';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [TransferService]
})
export class TransferComponent implements OnInit {
  formSubmitted = false;
  userForm: FormGroup;
  user = new User();

  accountValidationMessages = {
    transferAddress: [
      { type: 'required', message: 'Transfer Address is required' },
      { type: 'minlength', message: 'Transfer Address must be 42 characters long' },
      { type: 'maxlength', message: 'Transfer Address must be 42 characters long' }
    ],
    amount: [
      { type: 'required', message: 'Amount is required' },
      { type: 'pattern', message: 'Amount must be a positive number' }
    ],
    remarks: [
      { type: 'required', message: 'Remarks are required' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.createForms();
    this.getAccountAndBalance();
  }

  createForms() {
    this.userForm = this.fb.group({
      transferAddress: new FormControl(this.user.transferAddress, Validators.compose([
        Validators.required,
        Validators.minLength(42),
        Validators.maxLength(42)
      ])),
      amount: new FormControl(this.user.amount, Validators.compose([
        Validators.required,
        Validators.pattern('^[+]?([.]\\d+|\\d+[.]?\\d*)$')
      ])),
      remarks: new FormControl(this.user.remarks, Validators.compose([
        Validators.required
      ]))
    });
  }

  isValidInput(fieldName): boolean {
    return this.userForm.controls[fieldName].invalid &&
      (this.userForm.controls[fieldName].dirty || this.userForm.controls[fieldName].touched);
  }

  getAccountAndBalance = () => {
    // this.user.address = '0xd8d0101f83e79fb4e8d21134f5325e64816bd6a0';
    // this.user.balance = 0;

    // const that = this;
    this.transferService.getUserBalance().
      then((retAccount: any) => {
        this.user.address = retAccount.account;
        this.user.balance = retAccount.balance;
        console.log('transfer.components :: getAccountAndBalance :: that.user');
        console.log(this.user);
      }).catch((error) => {
        console.log(error);
      });

    // TODO: service call
    this.transferService.transferEther(this.userForm.value).
      then(() => { }).catch((error) => {
        console.log(error);
      });
  }

  submitForm() {
    if (this.userForm.invalid) {
      alert('transfer.components :: submitForm :: Form invalid');
      return;
    } else {
      console.log(`transfer.components :: submitForm :: ${this.
        userForm.value}`);
      console.log(this.userForm.value);
      // TODO: service call
      this.transferService.transferEther(this.userForm.value).
        then(function () { }).catch(function (error) {
          console.log(error);
        });
    }
  }

}
