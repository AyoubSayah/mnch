export interface message {
    _id: string,
    id_patient : string,
    id_doctor : string,
    sujet : String,
    conversation : [
        {msg : string , date : {type : Date , default : Date},fromPatient :Boolean}
    ]
  }
  