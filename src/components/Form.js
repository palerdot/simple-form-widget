// main form module
// will encapsulate the two steps - step1 and step2 and holds all the state
import React from 'react'

// import lodash
import _ from 'lodash'

// moment
import moment from 'moment'

// import our step creation components
import DealCreationForm from './DealCreationForm'
import InvoiceCreationForm from './InvoiceCreationForm'
import InvoiceInfoForm from './InvoiceInfoForm'

// import validators
import { 
  amountValidator, 
  nameValidator, 
  invoiceAmountValidator,
  dateValidator,
  repaymentDateValidator,
} from '../utils/validators'

class Form extends React.Component {
  constructor(props) {
    super(props)
    // set the state
    // when using as part of larger app, most of this can be ported to state management lib like 'redux'
    this.state = {
      finished: false,
      current_step: 'step1',
      // tracks if we need to show step 1 in info mode (to show details from step 2)
      step_1_info_mode: false,
      // step 1 states
      step_1_name: false,
      step_1_deal_date: false,
      step_1_amount: false,
      // step 2 states
      step_2_name: false,
      step_2_issue_date: false,
      step_2_repayment_date: false,
      step_2_amount: false,
    }
  }

  // helper functions to calculate style for current selected step
  _getStepStyle(name) {
    return this.state.current_step === name
  }

  // -------------------------------------------------------------------
  // START: step 1 form handlers
  _handleStepOneNext() {
    // calculate if all the step 1 fields are valid
    let is_step_1_valid = this._isStepOneValid()
    if (is_step_1_valid) {
      // move to step 1
      this.setState({
        current_step: 'step2'
      })
    }
  }

  // handle name change
  _handleStepOneNameChange(value) {
    // set state
    this.setState({
      step_1_name: value
    })
  }

  _handleStepOneDealDateChange(date) {
    // set state
    this.setState({
      step_1_deal_date: date
    }) 
  }

  // step 1 amount change
  _handleStepOneAmountChange(amount) {
    this.setState({
      step_1_amount: amount
    })
  } 

  // END: step 1 form handlers
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // START: step 2 form handlers

  // handle name change
  _handleStepTwoNameChange(value) {
    // set state
    this.setState({
      step_2_name: value
    })
  }

  _handleStepTwoIssueDateChange(date) {
    // set state
    this.setState({
      step_2_issue_date: date
    }) 
  }

  _handleStepTwoRepaymentDateChange(date) {
    // set state
    this.setState({
      step_2_repayment_date: date
    }) 
  }

  // step 2 amount change
  _handleStepTwoAmountChange(amount) {
    this.setState({
      step_2_amount: amount
    })
  }

  // will validate invoice amount
  _invoiceAmountValidator() {
    return amountValidator(this.state.step_1_amount) && amountValidator(this.state.step_2_amount) && (this.state.step_2_amount > this.state.step_1_amount)
  }

  _handlerStepTwoPrevious() {
    let is_step_2_valid = this._isStepTwoValid()
    if (!is_step_2_valid) {
      // go to step 1
      this.setState({
        current_step: 'step1',
        step_1_info_mode: true
      })
    }
  }

  _handleSubmit() {
    if (!this._isStepOneValid()) {
      alert('step 1 not valid')
      return
    }
    if (!this._isStepTwoValid()) {
      alert('step 2 not valid')
      return
    }
    if (this._isStepOneValid() && this._isStepTwoValid()) {
      alert('both steps are valid. form will be submitted')
    }
  }
  // END: step 2 form handlers
  // -------------------------------------------------------------------

  // general helpers
  _isStepOneValid() {
    return !!nameValidator(this.state.step_1_name) 
              && !!dateValidator(this.state.step_1_deal_date) 
              && !!amountValidator(this.state.step_1_amount)
  }

  _isStepTwoValid() {
    console.log(!!repaymentDateValidator(this.state.step_2_issue_date, this.state.step_2_repayment_date), !!invoiceAmountValidator(this.state.step_2_amount, this.state.step_1_amount) )
    return !!nameValidator(this.state.step_2_name) 
              && !!dateValidator(this.state.step_2_issue_date) 
              && !!repaymentDateValidator(this.state.step_2_issue_date, this.state.step_2_repayment_date) 
              && !!invoiceAmountValidator(this.state.step_2_amount, this.state.step_1_amount) 
  }

  render() {
    return (
      <div>
        <div className="steps-header">
          <span className={this._getStepStyle('step1') ? 'active' : null}>Step 1</span>
          <span className={this._getStepStyle('step2') ? 'active' : null}>Step 2</span>
        </div>
        <form>
          {
            this.state.current_step === 'step1'
              ? 
              (
                <DealCreationForm
                  name={this.state.step_1_name}
                  info_component={
                    this.state.step_1_info_mode
                    ? (
                        <InvoiceInfoForm 
                          name={this.state.step_1_name}
                          issue_date={this.state.step_2_issue_date}
                          repayment_date={this.state.step_2_repayment_date}
                          amount={this.state.step_2_amount}
                        />
                      )
                    : null
                  }
                  deal_date={this.state.step_1_deal_date}
                  amount={this.state.step_1_amount}
                  nextHandler={() => this._handleStepOneNext()}
                  onNameChange={(value) => this._handleStepOneNameChange(value)}
                  onDateChange={(value) => this._handleStepOneDealDateChange(value)}
                  onAmountChange={(value) => this._handleStepOneAmountChange(value)}
                />
              )
              :
              (
                <InvoiceCreationForm
                  name={this.state.step_2_name}
                  issue_date={this.state.step_2_issue_date}
                  repayment_date={this.state.step_2_repayment_date}
                  isRepaymentDateValid={repaymentDateValidator(this.state.step_2_issue_date, this.state.step_2_repayment_date)}
                  amount={this.state.step_2_amount}
                  onNameChange={(value) => this._handleStepTwoNameChange(value)}
                  onIssueDateChange={(value) => this._handleStepTwoIssueDateChange(value)}
                  onRepaymentDateChange={(value) => this._handleStepTwoRepaymentDateChange(value)}
                  onAmountChange={(value) => this._handleStepTwoAmountChange(value)}
                  invoiceAmountValidator={() => this._invoiceAmountValidator()} 
                  previousHandler={() => this._handlerStepTwoPrevious()}
                  submitHandler={() => this._handleSubmit()}
                />      
              )
          }
          
          
        </form>
      </div>
    )
  }
}

export default Form