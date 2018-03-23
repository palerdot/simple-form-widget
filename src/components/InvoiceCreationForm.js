// Step 2 => Invoice Creation form
// modelled as stateless component
import React from 'react'

import _ from 'lodash'

import styles from '../utils/styles'

// material ui stuffs
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

// import validators
import { amountValidator, nameValidator, dateValidator } from '../utils/validators'

const InvoiceCreationForm = function (props) {
  return (
    <div>
      <h3>CREATE AN INVOICE</h3>

      {/* invoice name */}
      <div>
        <TextField
          hintText="Enter invoice name ..."
          hintStyle={styles.errorStyle}
          
          floatingLabelText="Name *"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.underlineStyle}

          errorText={nameValidator(props.name) ? null : 'Please enter a valid name'}
          value={props.name || ''}
          onChange={_.throttle((event, newValue) => {
            props.onNameChange(newValue)
          }, 200)}
        />
      </div>

      {/* issue date */}
      <div>
        <div style={styles.dateLabel}>Issue Date *</div>
        <DatePicker 
          value={props.issue_date || null}
          hintText="Enter issue date" 
          container="inline"
          maxDate={new Date()}

          onChange={(event, date) => {
            props.onIssueDateChange(date)
          }}
        />
        <div className='error-msg'>
        {
          dateValidator(props.issue_date) ? null : 'Please enter a valid issue date'
        }
        </div>
      </div>

      {/* repayment date */}
      <div>
        <div style={styles.dateLabel}>Repayment Date *</div>
        <DatePicker 
          value={props.repayment_date || null}
          hintText="Enter repayment date" 
          container="inline"
          minDate={props.issue_date || null}

          onChange={(event, date) => {
            props.onRepaymentDateChange(date)
          }}
        />
        <div className='error-msg'>
        {
          props.isRepaymentDateValid ? null : 'Repayment date should be after issue date'
        }
        </div>
      </div>

      {/* deal amount */}
      <div>
        <TextField
          hintText="Enter deal amount ..."
          hintStyle={styles.errorStyle}

          floatingLabelText="Amount *"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineFocusStyle={styles.underlineStyle}

          errorText={props.invoiceAmountValidator() ? null : 'Invoice amount should be more than deal amount'}
          value={props.amount || ''}
          onChange={_.throttle((event, newValue) => {
            props.onAmountChange(newValue)
          }, 200)}
        />
      </div>

      <div>
        <RaisedButton
          backgroundColor="blue"
          label="Previous"
          labelColor="#FFFFFF"
          labelPosition="after"
          icon={<FontIcon className="material-icons">chevron_left</FontIcon>}
          style={{margin: 12}}
          onClick={props.previousHandler}
        />

        <RaisedButton
          backgroundColor="blue"
          label="Submit"
          labelColor="#FFFFFF"
          labelPosition="before"
          style={{margin: 12}}
          onClick={props.submitHandler}
        />
      </div>

    </div>
  )
}

export default InvoiceCreationForm