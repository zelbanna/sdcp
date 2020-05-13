import React, { Fragment } from 'react';
import { StateLeds } from './UI.jsx';
import styles from './input.module.css';

const auto_label = (props) => (props.label) ? props.label : props.id;

const input_template = (type,props) =>   <Fragment key={'template_'+props.id}><label htmlFor={props.id} title={props.title} className={styles.label}>{auto_label(props)}:</label><input className={styles.input} type={type} id={props.id} name={props.id} onChange={props.onChange} value={(props.value !== null) ? props.value : ''} placeholder={props.placeholder} title={props.extra} size={props.size} /></Fragment>
const line_template = (content,props) => <Fragment key={'template_'+props.id}><label htmlFor={props.id} title={props.title} className={styles.label}>{auto_label(props)}:</label>{content}</Fragment>

//
// Display Only
//
export const TextLine = (props) =>  line_template(<span id={props.id} style={props.style} title={props.extra} className={styles.span}>{props.text}</span>,props);
export const StateLine = (props) => line_template(StateLeds(props),props);

//
// Inputs
//
export const TextInput = (props) => input_template('text',props);
export const UrlInput = (props) => input_template('url',props);
export const EmailInput = (props) => input_template('email',props);
export const PasswordInput = (props) => input_template('password',props);
export const DateInput = (props) => input_template('date',props);
export const TimeInput = (props) => input_template('time',props);

export const TextAreaInput = (props) => <Fragment key={'fraginput_'+props.id}><label htmlFor={props.id} className={styles.label} title={props.title}>{auto_label(props)}:</label><textarea id={props.id} name={props.id} onChange={props.onChange} className={styles.textarea} value={props.value} /></Fragment>
export const CheckboxInput = (props) => <Fragment key={'fraginput_'+props.id}><label htmlFor={props.id} className={styles.label} title={props.title}>{auto_label(props)}:</label><input type='checkbox' id={props.id} name={props.id} onChange={props.onChange} defaultChecked={props.value} placeholder={props.placeholder} title={props.extra} className={styles.checkbox} /></Fragment>
export const RadioInput = (props) => <Fragment key={'fraginput_'+props.id}><label htmlFor={props.id} className={styles.label} title={props.title}>{auto_label(props)}:</label><div>{
  props.options.map((opt,idx) => <Fragment key={'fragradio_'+props.id+'_'+idx}>
   <label htmlFor={'radio_input_'+props.id+'_'+idx}>{opt.text}</label>
   <input type='radio' key={'radio_input_'+props.id+'_'+idx} id={'radio_input_'+props.id+'_'+idx} name={props.id} onChange={props.onChange} value={opt.value} checked={(props.value.toString() === opt.value.toString()) ? 'checked' : ''}/>
  </Fragment>)
 }</div></Fragment>
export const SelectInput = (props) => <Fragment key={'fraginput_'+props.id}>
  <label htmlFor={props.id} title={props.title} className={styles.label}>{auto_label(props)}:</label>
  <select name={props.id} onChange={props.onChange} value={(props.value !== null && props.value !== undefined) ? props.value : 'NULL'} className={styles.input}>
  {(props.value === null || props.value === undefined) && props.children.find(child => child.props.value === 'NULL') === undefined && <option value='NULL'>{'<Empty>'}</option>}
  {props.children}
  </select>
 </Fragment>

export const SearchInput = (props) => <input type='text' className={styles.searchfield} onChange={props.searchHandler} value={props.value} placeholder={props.placeholder} autoFocus />
