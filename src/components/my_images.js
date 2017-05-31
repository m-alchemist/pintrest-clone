import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Masonry from 'react-masonry-component';
import Header from './header';
import {browserHistory} from 'react-router';
var masonryOptions = {
    transitionDuration: 0
};
class MyImages extends Component{
  componentWillMount(){
    if(!this.props.authenticated){
      browserHistory.push('/')
    }
    else{
    this.props.fetchUserData();
  }
  }
  onX(image){

      this.props.removeImage(image,()=>{
        this.props.fetchUserData()
        this.props.fetchPublicImagesList()


      });
  }
  renderX(image){


      if(this.props.userData){
    return(<div className='text-danger' onClick={this.onX.bind(this, image)} >
              <div className=' x-btn '><i className="fa fa-times-circle" aria-hidden="true"></i></div>
          </div>)
        }


  }
  getUserWall(image){
    var body={userId:image.user._id};
    this.props.fetchUserWall(body,()=>{
      browserHistory.push(`/user/${this.props.userData._id}`)
    })
  }
  renderHeart(image){

    const id=image._id;
    var count=0;
    if(image.likes){
      count=image.likes.length;
    }



    var className='grey-heart';

        return(<div className={className}  >
                    <div className='likes-counter'>{count}</div><i className="fa fa-heart " aria-hidden="true"></i>
              </div>)

  }
  renderMyImages(){
  if(this.props.userData){
    return this.props.userData.images.map((image)=>{
      return(

      <div className="container" key={image._id}>
  <img className='pintrest-card-image' src={image.url}/ >
  <div className="overlay">
  {this.renderHeart(image)}
<p className='text '>
  <img className='profile-image' onClick={this.getUserWall.bind(this,image)}
   src={this.props.userData.twitter.profileImage}
   />

    {image.description}
</p>
  {this.renderX(image)}


  </div>
</div>
  )
    })
  }
  }
  render(){

    return (
      <div>
          <Header/>
        <Masonry
                   className={'my-gallery-class '} // default ''
                   elementType={'div'} // default 'div'
                   options={masonryOptions} // default {}
                   disableImagesLoaded={false} // default false
                   updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
               >
                    {this.renderMyImages()}
               </Masonry>
               </div>
           )
  }
}
function mapStateToProps(state){

  return{
  userData: state.auth.userData,
    authenticated:state.auth.authenticated


  }
}

export default connect(mapStateToProps,actions)(MyImages)
