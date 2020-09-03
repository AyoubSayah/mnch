const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// doctor Schema
const doctorSchema = new Schema({
    nom : String,
    prenom : String ,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    adress: {
        street: String,
        city: String,
        zip: String
    },
    numtel :String,
    man: { type: Boolean ,default :true }, 
    accepted: { type: Boolean ,default :false }, 
    spec: String,
    bio: String,
    id_secrt: {
        type: Schema.Types.ObjectId,
        ref: 'secrt'
    },
}, { timestamps: true });



module.exports = mongoose.model('doctor', doctorSchema);