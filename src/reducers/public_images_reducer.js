import {FETCH_PUBLIC_IMAGES,FETCH_USER_WALL} from '../actions/types';
 // FETCH_MESSAGE,FETCH_USER,CLEAR_MESSAGE
export default function(state=[],action){

  switch(action.type){


    case FETCH_PUBLIC_IMAGES:

        var images=action.payload.images;

      return images;




    default:
      return state;
  }


}
