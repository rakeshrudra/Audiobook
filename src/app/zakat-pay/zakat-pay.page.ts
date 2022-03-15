import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zakat-pay',
  templateUrl: './zakat-pay.page.html',
  styleUrls: ['./zakat-pay.page.scss'],
})
export class ZakatPayPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
//helper function for getting
 getValue(id) {
  var value = document.getElementById(id).value;
  if (value == "" || isNaN(value)) {
    return 0;
  } else {
    return parseFloat(value);
  }
}

 calculate() {

  // The price of about 3oz of gold
  var amt_nisab = 5301;
  var amt_home = this.getValue("amount_home");
  var amt_bank = this.getValue("amount_bank");
  var amt_shares = this.getValue("amount_shares");
  var amt_merchandise = this.getValue("amount_merchandise");
  var amt_gold = this.getValue("amount_gold");
  var amt_property = this.getValue("amount_property");
  var amt_other = this.getValue("amount_other");
  var amt_debts = this.getValue("amount_debts");
  var amt_expenses = this.getValue("amount_expenses");

  // The sum of all of your different assets that you've had for the last
  // lunar year
  var amt_assets_gross = amt_home + amt_bank + amt_shares + amt_merchandise + amt_gold + amt_property + amt_other;

  // Gross assets minus the liabilities you have. Again these are typically
  // immediate liabilities. Not the totality of a large loan like a mortgage
  var amt_assets_net = amt_assets_gross - amt_debts - amt_expenses;
  var amt_eligable = 0;

  // If this net amount is bigger than the nisab, then it's eligible
  // to have Zakat assessed against it
  if (amt_assets_net > amt_nisab ) {
    amt_eligable = Math.ceil(amt_assets_net);
  }

  // Zakat is 2.5% of ones eligible wealth if it above
  // Nisab
  var amt_zakat = Math.ceil(amt_eligable * .025);

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
alert(amt_zakat)

}

}
