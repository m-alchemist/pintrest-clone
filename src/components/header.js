import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import AddImage from './add_image';
const ROOT_URL='http://pintrest-clone-malchemist.herokuapp.com';
class Header extends Component {

  renderLinks(){

    if(this.props.authenticated){

      //show link to sign out
    return  (
      <div className='text-xs-right'>
      <div className='navbar-li'>


      <li className="nav-item" >
      <Link to='/myimages' className='  nav-link' >
      <p>My Images</p>
      </Link>
        </li>

    <li className="nav-item" >
      <a className='nav-link' href={`${ROOT_URL}/logout`}> <p> Sign out  </p>  </a>
        </li>



            </div>

        </div>
            )
    }
    else{
     return( <li className="nav-item text-xs-right" key={1}>
        <a href={`${ROOT_URL}/login`} className=' nav-link' >
        <button className='button_twitter' > <div className='twitter-bird'><i className="fa fa-twitter text-primary" aria-hidden="true"></i> </div>Sign In With Twitter </button>
        </a>
      </li>)
    }
  }
  renderDropdown(){
    if(this.props.authenticated){
      return(  <li className="dropdown">
           <a href="javascript:void(0)" className="dropbtn">+ Image</a>
           <div className="dropdown-content">
              <AddImage />
           </div>
        </li>)
    }
  }

  render(){
    return (
      <nav className='nav navbar-light '>
      <div className=''>
        <Link to='/' className=' navbar-brand' ><i className="fa fa-pinterest pintrest-icon fa-2x text-xs-center" aria-hidden="true"></i>
    </Link>
        </div>
        {this.renderDropdown()}



      <ul className="nav navbar-nav nav-text">

        {this.renderLinks()}

      </ul>
        </nav>
    )
  }
}


function mapStateToProps(state){

  return {
    authenticated:state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
