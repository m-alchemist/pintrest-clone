const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const ImageSchema=new Schema({
  url: String,
  description:String,
  date:{type: Date },
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    likes: [{type: Schema.Types.ObjectId, ref: 'user', default:[]}]




});

const Image=mongoose.model('image', ImageSchema);

module.exports=Image;
