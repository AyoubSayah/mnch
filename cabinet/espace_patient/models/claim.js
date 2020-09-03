const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const claimSchema = new Schema({
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    objectif : String ,
    description : String,
    answer :{type :String , default :""}
}, { timestamps: true });



module.exports = mongoose.model('claim', claimSchema);