import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zakat-pay',
  templateUrl: './zakat-pay.page.html',
  styleUrls: ['./zakat-pay.page.scss'],
})
export class ZakatPayPage implements OnInit {

  payableAmount = 0;
  pAmount = 0;
  total = 0;
  calcuLate: FormGroup  = this._fb.group({
    amount_home :[0],
    amount_bank :[0],
    amount_shares :[0],
    amount_merchandise :[0],
    amount_gold :[0],
    amount_property :[0],
    amount_other :[0],
    amount_debts :[0],
    amount_expenses :[0]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {

  }
//helper function for getting
calculateZaqat(){

  this.total = this.calcuLate.value.amount_home+this.calcuLate.value.amount_bank+this.calcuLate.value.amount_shares+this.calcuLate.value.amount_merchandise+this.calcuLate.value.amount_gold+this.calcuLate.value.amount_property+this.calcuLate.value.amount_other;

  let debt = this.calcuLate.value.amount_debts+this.calcuLate.value.amount_expenses;

  this.pAmount = this.total-debt;

  this.payableAmount = this.pAmount*.025;

}

}
