import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  nisab = 0;
  register_slot_submited = false;

  calcuLate: FormGroup = this._fb.group({
    gold_rate: [0, [Validators.min(0), Validators.required]],
    silver_rate: [0, [Validators.min(0), Validators.required]],
    amount_home: [0, Validators.min(0)],
    amount_bank: [0, Validators.min(0)],
    amount_shares: [0, Validators.min(0)],
    amount_merchandise: [0, Validators.min(0)],
    gold_24: this._fb.group({
      qty: [0, Validators.min(0)],
      amount: [null, [Validators.min(1),Validators.required]]
    }),
    gold_22: this._fb.group({
      qty: [0, Validators.min(0)],
      amount: [0, Validators.min(0)]
    }),
    gold_20: this._fb.group({
      qty: [0, Validators.min(0)],
      amount: [0, Validators.min(0)]
    }),
    silver: this._fb.group({
      qty: [0, Validators.min(0)],
      amount: [null, [Validators.min(0),Validators.required]]
    }),
    amount_property: [0, Validators.min(0)],
    amount_other: [0, Validators.min(0)],
    amount_debts: [0, Validators.min(0)],
    amount_expenses: [0, Validators.min(0)]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {

  }
  //helper function for getting
  calculateZaqat() {
    this.pAmount = 0;
    this.payableAmount = 0;
    this.register_slot_submited = true;
    this.calcuLate.markAsTouched();

    let gold_amount = 87 * this.calcuLate.value.gold_24.amount;
    let silver_amount = 609 * this.calcuLate.value.silver.amount;

    this.nisab = silver_amount;

    if (silver_amount > gold_amount) {
      this.nisab = gold_amount;
    }

    if (this.calcuLate.valid) {

      console.log(this.calcuLate.value)

      let goldSilverVal = this.calcuLate.value.gold_24.qty*this.calcuLate.value.gold_24.amount;
       goldSilverVal = goldSilverVal+this.calcuLate.value.gold_22.qty*this.calcuLate.value.gold_22.amount;
       goldSilverVal = goldSilverVal+this.calcuLate.value.gold_20.qty*this.calcuLate.value.gold_20.amount;
       goldSilverVal = goldSilverVal+this.calcuLate.value.silver.qty*this.calcuLate.value.silver.amount;

      this.total = this.calcuLate.value.amount_home + this.calcuLate.value.amount_bank + this.calcuLate.value.amount_shares + this.calcuLate.value.amount_merchandise + goldSilverVal+ this.calcuLate.value.amount_property + this.calcuLate.value.amount_other;

      let debt = this.calcuLate.value.amount_debts + this.calcuLate.value.amount_expenses;

      this.pAmount = this.total - debt;


      if (this.pAmount > this.nisab) {
        this.payableAmount = this.pAmount * .025;
      } else {
        this.payableAmount = 0;
      }

    }
  }

}
