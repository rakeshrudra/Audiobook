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
    gold_rate: [null, [Validators.min(0), Validators.required]],
    silver_rate: [null, [Validators.min(0), Validators.required]],
    amount_home: [0, Validators.min(0)],
    amount_bank: [0, Validators.min(0)],
    amount_shares: [0, Validators.min(0)],
    amount_merchandise: [0, Validators.min(0)],
    amount_gold: [0, Validators.min(0)],
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

    let gold_amount = 87 * this.calcuLate.value.gold_rate;
    let silver_amount = 609 * this.calcuLate.value.silver_rate;

    this.nisab = silver_amount;

    if (silver_amount > gold_amount) {
      this.nisab = gold_amount;
    }

    if (this.calcuLate.valid) {
      this.total = this.calcuLate.value.amount_home + this.calcuLate.value.amount_bank + this.calcuLate.value.amount_shares + this.calcuLate.value.amount_merchandise + this.calcuLate.value.amount_gold + this.calcuLate.value.amount_property + this.calcuLate.value.amount_other;

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
