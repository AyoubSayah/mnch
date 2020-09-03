const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const secretSchema = new Schema({
    nom: String,
    prenom: String,
    email: { type: String, required: true },
    password: String,
    id_doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    numtel :String
}, { timestamps: true });



module.exports = mongoose.model('secrt', secretSchema);