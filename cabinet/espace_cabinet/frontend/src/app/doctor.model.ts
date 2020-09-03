export interface doctor {
  _id: string,
  nom : string,
    prenom : string ,
    email: { type: string, unique: true, lowercase: true },
    password: string,
    adress: {
        street: string,
        city: string,
        zip: string
    },
    numtel :string,
    man: { type: Boolean ,default :true }, 
    accepted: { type: Boolean ,default :false }, 
    spec: string,
    bio: string,
  id_secrt: {
    _id: string,
    nom: string,
    prenom: string,
    email: {type: string, unique: true, lowercase: true  },
    password: string,
    id_doctor: string,
    numtel :string
  }
}