import {AUTH_USER,UNAUTH_USER,FETCH_USER} from '../actions/types';
 // FETCH_MESSAGE,FETCH_USER,CLEAR_MESSAGE
export default function(state={authenticated:false},action){

  switch(action.type){


    case AUTH_USER:

      return {...state, authenticated:true } ;

    case UNAUTH_USER:
      return {...state,authenticated:false  };
    case FETCH_USER:
      
      return{...state,userData: action.payload.data.user};


    default:
      return state;
  }


}
