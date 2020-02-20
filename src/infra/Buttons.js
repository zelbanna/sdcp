import React from 'react';

// ***************************** Button ********************************

export const MenuButton = (props) => {
 const className = ('className' in props) ? `menu ${props.className}` : 'menu';
 const view = ('icon' in props) ? <img src={props.icon} alt={props.title} /> : props.title
 return <button className={className} title={props.title} form={props.form} onClick={props.onClick} style={props.style}>{view}</button>
}

export const NavButton = (props) => {
 return <li className={props.className}><button className={('className' in props) ? `nav ${props.className}` : 'nav'} onClick={props.onClick}>{props.title}</button></li>
}

export const InfoButton = (props) => {
 return <button className={('className' in props) ? `info type-${props.type} ${props.className}` : `info type-${props.type}`} onClick={props.onClick} title={props.title}/>
}

export const TextButton = (props) => {
 return <button className={('className' in props) ? `text ${props.className}` : 'text'} onClick={props.onClick} title={props.title}>{props.text}</button>
}
