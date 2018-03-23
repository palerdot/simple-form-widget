// Step 1 => Deal Creation form
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

const DealCreationForm = function (props) {
  return (
    <div>
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
          <h3>CREATE A DEAL</h3>

          {/* deal name */}
          <div>
            <TextField
              hintText="Enter deal name ..."
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

          {/* deal date */}
          <div>
            <div style={styles.dateLabel}>Deal Date *</div>
            <DatePicker
              value={props.deal_date || null} 
              hintText="Enter deal date" 
              container="inline"
              maxDate={new Date()}

              onChange={(event, date) => {
                props.onDateChange(date)
              }}
            />
            <div className='error-msg'>
            {
              dateValidator(props.deal_date) ? null : 'Please enter a valid deal date'
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

              errorText={amountValidator(props.amount) ? null : 'Please enter a valid amount'}
              value={props.amount || ''}
              onChange={_.throttle((event, newValue) => {
                props.onAmountChange(newValue)
              }, 200)}
            />
          </div>
        </div>
        {
          props.info_component
        }
      </div>
      <div>
        <RaisedButton
          backgroundColor="blue"
          label="Next"
          labelColor="#FFFFFF"
          labelPosition="before"
          icon={<FontIcon className="material-icons">chevron_right</FontIcon>}
          style={{margin: 12}}
          onClick={props.nextHandler}
        />
      </div>
    </div>
  )
}

export default DealCreationForm