import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header.jsx';
import Content from './languageMenu.jsx';

export default class App extends React.Component{
render(){
  return(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Header />
        <Content />
      </div>
     </MuiThemeProvider>
  );
}
}
