import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Masonry from 'react-masonry-component';
import {browserHistory} from 'react-router';
var masonryOptions = {
    transitionDuration: 0
};
class PublicImages extends Component{
  componentWillMount(){
    this.props.fetchPublicImagesList()
    this.props.fetchUserData();
  }
  onLike(image){

      this.props.likeImage(image,()=>{
        this.props.fetchUserData()
        this.props.fetchPublicImagesList()
      });
  }
  getUserWall(image){
    var body={userId:image.user._id};
    this.props.fetchUserWall(body,()=>{
      browserHistory.push(`/user/${image.user._id}`)
    })
  }
  renderHeart(image){

    const id=image._id;
    var count=image.likes.length;
    var className='grey-heart';
    var exists=false;
    if(this.props.authenticated && this.props.userData){
      this.props.userData.images.map((image)=>{
        if(image._id==id){
          exists=true;
        }
      })

      if(exists){

        return(<div className={className}  >
                    <div className='likes-counter'>{count}</div><i className="fa fa-heart " aria-hidden="true"></i>
              </div>)
      }
    }
    if(this.props.userData){
        this.props.userData.likedImages.map((likedImage)=>{
          if(likedImage._id==id){

              className='red-heart';
          }
        })

  }


    return(<div className={className} onClick={this.onLike.bind(this, image)} >
                <div className='likes-counter'>{count}</div><i className="fa fa-heart " aria-hidden="true"></i>
          </div>)


  }

  renderPublicImages(){

    return this.props.publicImagesList.map((image)=>{
      return(

      <div className="container" key={image._id}>
  <img className='pintrest-card-image' src={image.url}/ >
  <div className="overlay">
    {this.renderHeart(image)}
  <p className='text '>
    <img className='profile-image' onClick={this.getUserWall.bind(this,image)}
     src={image.user.twitter.profileImage}
     />

      {image.description}
  </p>
  </div>
</div>
  )
    })
  }
  render(){
    return (

        <Masonry
                   className={'my-gallery-class '} // default ''
                   elementType={'div'} // default 'div'
                   options={masonryOptions} // default {}
                   disableImagesLoaded={false} // default false
                   updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
               >
                    {this.renderPublicImages()}
               </Masonry>
           )
  }
}
function mapStateToProps(state){

  return{
    publicImagesList:state.publicImagesList,
    userData: state.auth.userData,
    authenticated:state.auth.authenticated



  }
}

export default connect(mapStateToProps,actions)(PublicImages)
