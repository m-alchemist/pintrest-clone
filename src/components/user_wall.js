import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Masonry from 'react-masonry-component';
import Header from './header';
import {browserHistory} from 'react-router';
var masonryOptions = {
    transitionDuration: 0
};
class UserWall extends Component{
  componentDidMount(){


    var body={userId:this.props.Id}
    this.props.fetchUserWall(body,()=>{
      this.props.fetchUserData();

    });
    if(this.props.authenticated && this.props.userData){
      if(this.props.userData._id==this.props.Id){
        browserHistory.push('/myimages')
      }
    }

  }
  onLike(image){

      this.props.likeImage(image,()=>{
        this.props.fetchUserData()
      var body={userId:this.props.Id}
        this.props.fetchUserWall(body,()=>{
          
        })
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

  renderUserWall(){
  if(this.props.userWall){
    if(this.props.userWall.images)
    return this.props.userWall.images.map((image)=>{
      return(

          <div className="container" key={image._id}>
                <img className='pintrest-card-image' src={image.url}/ >
                <div className="overlay">
                {this.renderHeart(image)}
              <p className='text '>
                <img className='profile-image' onClick={this.getUserWall.bind(this,image)}
                 src={this.props.userWall.twitter.profileImage}
                 />

                  {image.description}
              </p>
                </div>
            </div>
        )
      })
    }
  }
  render(){
    if(!this.props.userWall){
      return (<div> loading....</div>)
    }

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
                    {this.renderUserWall()}
               </Masonry>
               </div>
           )
  }
}
function mapStateToProps(state,ownProps){

  return{
    userWall:state.userWall,
    Id:ownProps.params.id,
    userData:state.auth.userData,
    authenticated:state.auth.authenticated


  }
}

export default connect(mapStateToProps,actions)(UserWall)
