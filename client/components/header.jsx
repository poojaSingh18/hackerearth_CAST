import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const styles={
 toolbarStyle:{
  padding: '5px 24px 0px 15px',
  backgroundColor: '#000',
  height: 70,
 },
 toolbarGroupStyle:{
  margin: '10px 0px',
 },
 toolbarSeparatorStyle:{
  top: 0,
  height: 41,
  backgroundColor: '#bdbdbd',

 },
 toolbarTitleStyle:{
  marginLeft: 16,
  lineHeight: '39px',
  letterSpacing: 1,
  color: '#bdbdbd',
 }
}
export default class Header extends React.Component {
  constructor(props) {
   super(props);
 }

 render() {
    return (
       <div>
         <Toolbar style={styles.toolbarStyle}>
           <ToolbarGroup style={styles.toolbarGroupStyle}>
             <img src="../images/cast_company_logo.png" alt="logo" id="headerLogoStyle" />
             <ToolbarSeparator style={styles.toolbarSeparatorStyle} />
             <ToolbarTitle style={styles.toolbarTitleStyle} text="TechScan" />
           </ToolbarGroup>
         </Toolbar>
       </div>
    )
 }
}
