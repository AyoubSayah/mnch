const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const messageSchema = new Schema({
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    id_doctor : {
        type: Schema.Types.ObjectId, ref: 'doctor'
    },
    sujet : String,
    conversation : [
        {msg : String , date : {type : Date , default : Date.now},fromPatient :Boolean}
    ]
    
}, { timestamps: true });



module.exports = mongoose.model('messages', messageSchema);

