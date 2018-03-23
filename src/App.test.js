import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import renderer from 'react-test-renderer'

// import our step creation components
import InvoiceInfoForm from './components/InvoiceInfoForm'

// import validators
import { 
  amountValidator, 
  nameValidator, 
  invoiceAmountValidator,
  dateValidator,
  repaymentDateValidator,
} from './utils/validators'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('should render info form', () => {
  const component = renderer.create(
    <InvoiceInfoForm 
      name='step 2 name'
      amount={23}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// sample tested
// test if it is a valid name
test('should test if given name is valid', () => {
  let valid_name = 'valid step two name'
  expect(nameValidator(valid_name)).toBe(true)
})

test('should test if given name is invalid', () => {
  let invalid_name = 'valid step 2 name'
  expect(nameValidator(invalid_name)).toBe(false)
})

test('invoice amount should be greater than deal amount', () => {
  let invoice_amount = 25
  let deal_amount = 21
  expect(invoiceAmountValidator(invoice_amount, deal_amount)).toBe(true)
})
