import React, { Fragment } from 'react';
import { StateMap } from './Generic.js';

const auto_label = (props) => (props.label) ? props.label : props.id.charAt(0).toUpperCase() + props.id.substring(1);
const input_template = (type,props) => <Fragment key={'fraginput_'+props.id}><label htmlFor={props.id} title={props.title} className={props.className}>{auto_label(props)}:</label><input type={type} id={props.id} name={props.id} onChange={props.onChange} value={(props.value !== null) ? props.value : ''} placeholder={props.placeholder} title={props.extra} /></Fragment>

//
// Display Only
//
export const TextLine = (props) =>  <Fragment key={'fragline_'+props.id}><label htmlFor={props.id} title={props.title}>{auto_label(props)}:</label><span id={props.id} style={props.style} title={props.extra}>{props.text}</span></Fragment>
export const StateLine = (props) => <Fragment key={'fragline_'+props.id}><label htmlFor={props.id} title={props.title}>{auto_label(props)}:</label>{ (Array.isArray(props.state)) ? <div key={'state_line_multi_' + props.id} className='states'>{props.state.map((val,idx) => <StateMap key={'state_line_state_' + props.id + '_' + idx} state={val} />)}</div> : <StateMap key={'state_line_state_' + props.id} state={props.state} /> }</Fragment>
export const DivLine = (props) =>   <Fragment key={'fragline_'+props.id}><label htmlFor={props.id} title={props.title}>{auto_label(props)}:</label><div id={props.id} style={props.style} title={props.extra}>{props.content}</div></Fragment>
//
// Inputs
//
export const SelectInput = (props) => {
 if ((props.value === null || props.value === undefined) && props.options.find(opt => opt.value === 'NULL') === undefined)
  props.options.push({value:"NULL",text:"<Empty>"})
 return <Fragment key={'fraginput_'+props.id}><label htmlFor={props.id} title={props.title}>{auto_label(props)}:</label><select name={props.id} onChange={props.onChange} value={(props.value !== null && props.value !== undefined) ? props.value : "NULL"}>{ props.options.map((opt,index) => <option key={'select_input_option_' + props.id + '_'+ index} value={opt.value}>{opt.text}</option>) }</select></Fragment>
}

export const TextInput = (props) => input_template('text',props);
export const UrlInput = (props) => input_template('url',props);
export const EmailInput = (props) => input_template('email',props);
export const PasswordInput = (props) => input_template('password',props);
export const DateInput = (props) => input_template('date',props);
export const TimeInput = (props) => input_template('time',props);
export const CheckboxInput = (props) => <Fragment key={'fraginput_'+props.id}><label htmlFor={props.id} title={props.title}>{auto_label(props)}:</label><input type='checkbox' id={props.id} name={props.id} onChange={props.onChange} defaultChecked={props.value} placeholder={props.placeholder} title={props.extra} /></Fragment>
export const RadioInput = (props) => <Fragment key={'fraginput_'+props.id}><label htmlFor={props.id} title={props.title}>{auto_label(props)}:</label><div>{
  props.options.map((opt,idx) => <Fragment key={'fragradio_'+props.id+'_'+idx}>
   <label htmlFor={'radio_input_'+props.id+'_'+idx}>{opt.text}</label>
   <input type='radio' key={'radio_input_'+props.id+'_'+idx} id={'radio_input_'+props.id+'_'+idx} name={props.id} onChange={props.onChange} value={opt.value} checked={(props.value.toString() === opt.value.toString()) ? 'checked' : ''}/>
  </Fragment>)
 }</div></Fragment>