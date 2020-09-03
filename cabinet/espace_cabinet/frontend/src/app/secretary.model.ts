export interface secretary {
  _id: string,
  nom: string,
    prenom: string,
    email: { type: string, unique: true, lowercase: true },
    password: string,
    id_doctor: {
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
      spec: string,
      bio: string,
      id_secrt: string
    },
    numtel :string
}
