import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import * as actions from '../actions/index';
 class AddImage extends Component{
  constructor(props){
  super(props);
  this.state={
    imageUrl:'',
    description:''
    }
  }
onInputChange=(event)=>{
  const body=event.target.value;
  this.setState({imageUrl:body});

  }
  onInputChange2=(event)=>{
    const body=event.target.value;
    this.setState({description:body});
    }

handleFormSubmit=(event)=>{
  event.preventDefault();
    // we need to make a request
    var url=this.state.imageUrl;
    var description=this.state.description;

    function IsValidImageUrl(url){
        var image = new Image();
        image.src = url;
        if (!image.complete) {
            return false;
        }
        else if (image.height === 0) {
            return false;
        }
        return true;
    }



    if(!IsValidImageUrl(url)){
      url='https://i1.ytimg.com/vi/Q1UQ5hspwYg/hqdefault.jpg'
    }

  this.props.addImage({url,description},()=>{
    this.props.fetchUserData();
    this.props.fetchPublicImagesList();
  });
  this.setState({imageUrl:'',description:''});
}


  render(){
    return (<div>
      <div className='card'>

      <form onSubmit={this.handleFormSubmit}>
      <input className='form-control search-bar' onChange={this.onInputChange} value={this.state.imageUrl } placeholder='Enter Image Url ...'/>
      <input className='form-control search-bar' onChange={this.onInputChange2} value={this.state.description}placeholder='Enter Image Description ...'/>
      <button type='submit' className=' button btn-primary'>Submit</button>

      </form>
      <img className='card-image' src={this.state.imageUrl} />
    </div>
    </div>)
  }


}
export default connect (null,actions)(AddImage)
