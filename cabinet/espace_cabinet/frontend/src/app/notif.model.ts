export interface notif {
    _id: string,
    patient: { type: Boolean ,default :false },
    doctor: { type: Boolean ,default :false },
    secretary:{ type: Boolean ,default :false },
    admin:{ type: Boolean ,default :false },
    new:{ type: Boolean ,default :true },
    id_user:string,
    body:string,
    url:string   
}
