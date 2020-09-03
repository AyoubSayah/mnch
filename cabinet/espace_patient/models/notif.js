const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const notifSchema = new Schema({

    id_user : String,
   patient : { type : Boolean , default : false},
   doctor : { type : Boolean , default : false} ,
   secretary : { type : Boolean , default : false} ,
   admin : { type : Boolean , default : false} ,
   new : { type : Boolean , default : true} ,
   body : String , 
   url : String
}, { timestamps: true });



module.exports = mongoose.model('notif', notifSchema);

