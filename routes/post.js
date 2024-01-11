const mongoose = require('mongoose');



// Define the schema
const postSchema = new mongoose.Schema({
  user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
  },
  title:String,
  description:String,
  image:String,
  
});




module.exports =  mongoose.model('post', postSchema);
