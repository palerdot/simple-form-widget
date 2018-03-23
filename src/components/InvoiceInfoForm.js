// will be used to show the info of step2 alongside with step1
import React from 'react'

import _ from 'lodash'

import moment from 'moment'

import styles from '../utils/styles'

const InvoiceInfoForm = function (props) {
  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'column', marginLeft: '29px'}}>
      <h3>INVOICE INFO</h3>

      <div style={styles.dateLabel}>Issue Date:</div>
      <div style={styles.infoValue}>{props.issue_date ? moment(props.issue_date).format('DD-MM-YYYY') : ''}</div>

      <div style={styles.dateLabel}>Repayment Date:</div>
      <div style={styles.infoValue}>{props.repayment_date ? moment(props.repayment_date).format('DD-MM-YYYY') : ''}</div>

      <div style={styles.dateLabel}>Amount:</div>
      <div style={styles.infoValue}>{props.amount}</div>
    </div>
  )
}

export default InvoiceInfoForm