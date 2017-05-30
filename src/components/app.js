import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import * as actions from '../actions/index';
import {connect} from 'react-redux';
import Header from './header';
import AddImage from './add_image';
import PublicImages from './public_images';
 class App extends Component {
  renderText(){
    this.props.checkForAuthentication();
  }
  render() {
    this.renderText();
    return (
      <div>

      <Header/>
      <PublicImages/>



      </div>
    );
  }
}
export default connect(null,actions)(App)
