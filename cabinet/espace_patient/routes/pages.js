const router = require('express').Router()
const doctor = require('../models/doctor');
const Claim = require('../models/claim');
const Appoi = require('../models/appointement')
const User = require('../models/user');
const secrt = require('../models/secretere');
const message = require('../models/message');
const multer  = require('multer')
const upload = require('../config/multer_cofig');
const consultation = require('../models/consultation');
const { exists } = require('../models/user');
const user = require('../models/user');
const claim = require('../models/claim');
const notif =require('../models/notif')

//details docteur
router.get('/detail/:id',(req,res)=>{
    doctor.findById({_id : req.params.id}).populate('id_secrt').exec((err,doc)=>{
        if(err){console.log(err)}
        else{
            res.render('detail_doc.hbs',{doc : doc})
        }
    })
})


/////////////////////////////////////////////////rv
 //LIST ALL RV           
router.get('/mesRV/:id',(req,res)=>{
    Appoi.find({id_patient : req.params.id , payed : false},(err,rv)=>{
        if(err){
            console.log(err)
        }else{
            var notfound = false 
            if(rv.length == 0){
                notfound = true
            }
            res.render('mes_rendvous.hbs',{ rv , notfound })            
        }
    }).populate('id_doctor')
}) 

//cancel rv
router.get('/cancel/:id',(req,res)=>{
    Appoi.findByIdAndDelete({_id : req.params.id},(err)=>{
        res.redirect('back')
    })
})

//from rv to consult
router.post('/makeconsultation/:id',(req,res)=>{
    Appoi.findByIdAndUpdate({_id : req.params.id},{
        payed : true
    },(err,data)=>{
        if(err){
            console.log(err)
        }else{
            var c = new consultation({
                id_appointment : req.params.id,
                id_patient : data.id_patient,
                id_doctor : data.id_doctor,
                files : []
            }).save((err)=>{})
            var n = new notif ({
                id_user : data.id_doctor,
                doctor  :true ,
                body : "Vous avez une nouvelle consultation",
                url : "http://localhost:4200/doctor/consultations"
              })
            n.save((err)=>{})
        }
        res.redirect('/acceuil')
    })
})

//rendez vous 
router.post('/rendezVous/:id',(req,res)=>{
    Appoi.findOne({id_patient : req.user.id , id_doctor : req.params.id ,statue : false},(err,data)=>{
       var appoi = new Appoi({
           id_patient : req.user.id ,
           id_doctor : req.params.id,
           date : req.body.date
       })
      
       if (data != null){
           req.flash('error','rendez vous déja approuvé')
           res.redirect('/acceuil')
       }else{
           appoi.save((err,results)=>{
               if(err){
                   console.log(err)
               }else{
                doctor.findById({_id : req.params.id},(err , doc)=>{
                    if(err){console.log(err)}
                    else {
                        //secret notif
                        var n1 = new notif ({
                            id_user : doc.id_secrt,
                            secretary  :true ,
                            body : "Un nouvau rendez vous a traiter",
                            url : "http://localhost:4200/secretary/Rendezvous"
                          })
                        n1.save((err)=>{})
                        //admin notif
                        var n = new notif ({
                            id_user : null,
                            admin  :true ,
                            body : "Un nouvau rendez vous pour Dr : "+doc.nom+" "+doc.prenom,
                            url : "http://localhost:4200/admin/doctors"
                          })
                        n.save((err)=>{})
                    }
                })
                req.flash('succes','Demande de rendez vous envoyée  voir Mes rendez-vous')
                res.redirect('/acceuil')
               }
           })
       }
   })
})
//reposter rv
router.post('/reposterrv/:id',(req,res)=>{
    Appoi.findOneAndUpdate({id_patient : req.user.id , id_doctor : req.params.id ,statue : false},{
        date : req.body.date,
        cancel : false 
    },(err,data)=>{
        if(err){ console.log(err) }
        else{
            req.flash('succes','Date modifiée')
            res.redirect('back')
        }
    })
})

//////////////////////////////////////////////////////////////////////Reclamation
//post reclamation
router.post('/postClaim/:id',(req,res)=>{
    var claim = new Claim({
        id_patient : req.params.id,
        objectif : req.body.objectif,
        description : req.body.description
    })
    claim.save((err)=>{
        if(err){
            console.log(err)
        }else{
            var n = new notif ({
                id_user : null,
                admin  :true ,
                body : "Une nouvelle réclamation recu ",
                url : "http://localhost:4200/admin/claims"
              })
            n.save((err)=>{})
            req.flash('succes','Réclamation envoyée avec succée ')
            res.redirect('/acceuil')
        }
    })
})

//LIST ALL CLAIM        
router.get('/mesREC/:id',(req,res)=>{
    Claim.find({id_patient : req.params.id},(err,claim)=>{
        if(err){
            console.log(err)
        }else{
            var notfound = false
            if(claim.length == 0){
               notfound = true ; 
            }
            res.render('mes_reclamation.hbs',{claim ,notfound})
        }
    })
})

//DELETE CLAIM  
router.get('/deleteClaim/:id',(req,res)=>{
    Claim.findByIdAndRemove({_id : req.params.id},(err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('back')
        }
    })
})

///////////////////////////////////////////////////////////// consult
router.get('/dossier/:id',(req,res)=>{
    consultation.find({id_patient : req.params.id },(err,data)=>{
        if(err){
            console.log(err)
        }else{
            var notexist = false
            if(data.length == 0 ){
                notexist = true
            }
            res.render('mes_dossiers.hbs',{data , notexist})
        }
    }).populate('id_appointment').populate('id_doctor')
})






//UPDATE USER INFOS
router.post('/updateUser/:id',upload.single('myfile'),(req,res)=>{
  let picture = req.file;
  async function pic() {
    let promise = new Promise((resolve, reject) => {
      if (picture == undefined) {
      User.findById ({_id : req.params.id},(err,data)=>{
        if (data.photo) {
          resolve (data.photo);
        }else{
          resolve(null);
        }
      });
      }else{
        resolve (req.file.filename);
      }
  });
    return await promise;
  }
  pic().then((mypic) => {
    User.findByIdAndUpdate({_id : req.params.id},{
		nom  :req.body.nom,
		prenom : req.body.prenom,
		numtel : req.body.numtel,
		adress :{
			street : req.body.street,
			city : req.body.city ,
			zip : req.body.zip
        },
        photo : mypic
	  },(err,data)=>{
      if(err){console.log(err)}
      else{
        req.flash('succes','Informations modifiées aves succés')
        res.redirect('/acceuil')
      }
	  })
  })
})


//////////////////////////////////////////////////////////////////////messages
//send messages
router.post('/sendmsg/:id',(req,res)=>{
    message.findOne({id_patient : req.params.id , id_doctor : req.body.id_doctor},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            if (!data){
                var msg = new message({
                    id_patient : req.params.id,
                    id_doctor : req.body.id_doctor,
                    sujet : req.body.sujet,
                    conversation : [{
                        msg : req.body.msg,
                        fromPatient : true

                    }]
                })
                msg.save((err)=>{})
            }else{
                message.findByIdAndUpdate({_id : data.id},{
                    $push : {conversation : {
                        msg : req.body.msg,
                        fromPatient : true
                    }}
                },(err,result)=>{})
            }
            var n = new notif ({
                id_user : req.body.id_doctor,
                doctor  :true ,
                body : "Vous avez un nouvau message",
                url : "http://localhost:4200/doctor/messages"
              })
            n.save((err)=>{})
        }
        // go to messages
        res.redirect('back')
    })
})

//list message 
router.get('/listmsg/:id',(req,res)=>{
    message.find({id_patient : req.params.id},(err,data)=>{
        var notfound = false
        if(data.length == 0){
            notfound = true
        }
        res.render('messages.hbs',{data , notfound})
    }).populate('id_doctor')
})


////////////////////////////////////////////////Facture
router.get('/print/:id',(req,res)=>{
    consultation.findById({_id : req.params.id},(err,data)=>{
        console.log(data)
        res.render('infoFacture.hbs',{data})
    }).populate('id_appointment').populate('id_patient').populate('id_doctor')
})


////////////////////////////////////////////Delete user
router.get('/deleteUser',async (req,res)=>{
    try{
        await user.findByIdAndDelete({_id : req.user.id})
        await message.findOneAndDelete({ id_patient : req.user.id})
        await claim.deleteMany({ id_patient : req.user.id})
        await Appoi.deleteMany({ id_patient : req.user.id})
        res.redirect('acceuil')
    }catch(ex){
        console.log('error',ex)
    }
})
module.exports = router;