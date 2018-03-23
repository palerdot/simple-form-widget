// validators for step 1 and step2 fields
import _ from 'lodash'

import moment from 'moment'

const amountValidator = function (amount) {
  // using global 'isFinite'
  return !_.isEmpty(amount) && isFinite(amount)
}

const invoiceAmountValidator = function (invoice_amount, deal_amount) {
  if (!isFinite(invoice_amount) || !isFinite(deal_amount)) {
    return false
  }
  return invoice_amount > deal_amount
}

const nameValidator = function (name) {
  return !_.isEmpty(name) && /^[a-zA-Z ]*$/g.test(name)
}

const dateValidator = function (date) {
  return date
}

// validator for repayment date
// should be atleast one day greater than issue date
const repaymentDateValidator = function (issue_date, repayment_date) {
  if (!issue_date || !repayment_date) {
    return false
  }
  
  return moment(repayment_date).isAfter(issue_date)
}



export { amountValidator, nameValidator, dateValidator, repaymentDateValidator, invoiceAmountValidator }