 const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


// doctor Schema
const doctorSchema = new Schema({
    nom : String,
    prenom : String ,
    email: { type: String, lowercase: true },
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

doctorSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

doctorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('doctor', doctorSchema);