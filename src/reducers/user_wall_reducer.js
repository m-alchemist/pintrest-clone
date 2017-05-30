import {FETCH_PUBLIC_IMAGES,FETCH_USER_WALL} from '../actions/types';
 // FETCH_MESSAGE,FETCH_USER,CLEAR_MESSAGE
export default function(state=[],action){

  switch(action.type){



      case FETCH_USER_WALL:

        return action.payload.data.user;



    default:
      return state;
  }


}
