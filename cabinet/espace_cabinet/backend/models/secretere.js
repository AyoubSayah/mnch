const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


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


secretSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

secretSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('secrt', secretSchema);