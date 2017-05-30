import {AUTH_USER,UNAUTH_USER,FETCH_PUBLIC_IMAGES,FETCH_USER,FETCH_USER_WALL} from './types';
import {browserHistory} from 'react-router';
import axios from 'axios';
const ROOT_URL='https://pintrest-clone-malchemist.herokuapp.com/'
export function checkForAuthentication(){
  return function(dispatch){
      axios.get(`${ROOT_URL}authentication`)
      .then((response)=>{

        if(response.data.token){
        localStorage.setItem('token',response.data.token)
        dispatch({type:AUTH_USER})
      }

      })
  }


  }
export function addImage(body,callback){

  return function(dispatch){
    axios.post(`${ROOT_URL}add`,body)
    .then((response)=>{
      dispatch(
        {type:FETCH_PUBLIC_IMAGES,
        payload:response.data}
      )
    })
    .then(()=>callback())
  }

}
export function fetchPublicImagesList(){
    return function(dispatch){
      axios.get(`${ROOT_URL}publicimages`)
    .then((response)=>{
      dispatch(
        {type:FETCH_PUBLIC_IMAGES,
        payload:response.data}

      )
    })
  }
}
export function likeImage(body,callback){

  return function(dispatch){

    axios.post(`${ROOT_URL}likeimage`,body)
    .then((response)=>{


    dispatch(
      {type:FETCH_USER,
      payload:response}

    )})
    .then(()=>{callback()})
  }
}
export function removeImage(body,callback){

  return function(dispatch){

    axios.post(`${ROOT_URL}removeimage`,body)
    .then((response)=>{

    dispatch(
      {type:FETCH_USER,
      payload:response}

    )})
    .then(()=>{callback()})
  }
}
export function fetchUserData(){
  return function(dispatch){
    axios.get(`${ROOT_URL}user`)
    .then((response)=>{
    dispatch(
      {type:FETCH_USER,
      payload:response}

    )})
  }
}
export function fetchUserWall(body,callback){

  return function(dispatch){
    axios.post(`${ROOT_URL}userwall`,body)
    .then((response)=>{
      dispatch({
        type:FETCH_USER_WALL,
        payload:response
      })


    })
    .then(()=>  callback())
  }
}
