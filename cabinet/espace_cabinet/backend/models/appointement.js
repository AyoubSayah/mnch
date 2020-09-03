const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const appoiSchema = new Schema({
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    id_doctor : {
        type: Schema.Types.ObjectId, ref: 'doctor'
    },
    date : {type : String , default: Date.now().toString()},
    prix : { type : Number , default : 00},
    cancel : { type : Boolean , default : false},
    statue : { type : Boolean , default : false},
    payed : { type : Boolean , default : false}
}, { timestamps: true });



module.exports = mongoose.model('appoi', appoiSchema);

