import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import publicImagesReducer from './public_images_reducer';
import userWallReducer from './user_wall_reducer';
const rootReducer = combineReducers({
  auth:authReducer,
  publicImagesList:publicImagesReducer,
  userWall:userWallReducer

});

export default rootReducer;
