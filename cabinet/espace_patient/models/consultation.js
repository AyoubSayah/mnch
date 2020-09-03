const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const consSchema = new Schema({
    id_appointment : {
        type: Schema.Types.ObjectId, ref: 'appoi'
    },
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    id_doctor : {
        type: Schema.Types.ObjectId, ref: 'doctor'
    },
    archived: { type: Boolean ,default :false }, 
    files : [
        {file : String}
    ]
}, { timestamps: true });



module.exports = mongoose.model('consultation', consSchema);