const router = require('express').Router()
const secrt = require('../models/secretere')
const doctor = require('../models/doctor')
const user = require ('../models/user')
const appointement =require('../models/appointement')
const notif =require('../models/notif')
var Mailgun = require('mailgun-js');
 
const API_KEY = '8e08a5276f34c68eb3562fe7773772fc-ffefc4e4-4e0750b6';
const DOMAIN = 'sandbox2ec9a3a58ebc46d3af7259d0ad002097.mailgun.org';
////////////////////////////////////////////////////////////////Register
router.post('/registerSec',(req,res)=>{
    var sec = new secrt({
      nom : req.body.nom,
      prenom : req.body.prenom,
      email : req.body.email,
      password : secrt.generateHash(req.body.password),
      numtel : req.body.numtel,
      id_doctor : null
    })
    sec.save((err , data)=>{
      if(err){console.log(err)}
      else{
        var n = new notif ({
            id_user : null,
            admin  :true ,
            body : "la secretaire "+data.nom+" a envoyé une demande d'inscription",
            url : "http://localhost:4200/admin/secretaries"
          })
          n.save((err)=>{})
          res.json(data)}
    })
})
 ////////////////////////////////////////////////////////////////login 
router.post('/loginSec',(req,res)=>{
    secrt.findOne({email : req.body.email},(err,results)=>{
        if (err){console.log(err)}
        else{
        if(!results){
            res.json('secretary introuvable !')
        }else{
            if (!results.validPassword(req.body.password)){
            res.json('Mot de passe incorrect !')
            }
            else{
            res.json(results)
            }
        }
        }
    }).populate('id_doctor')
})

///////////////////////////////////////////////////////// Update Profile
router.post('/updateProfile/:id',(req,res)=>{
    secrt.findByIdAndUpdate({_id :req.params.id},{
      nom : req.body.nom,
      prenom : req.body.prenom,
      email : req.body.email,
      password : secrt.generateHash(req.body.password),
      numtel : req.body.numtel,
    },(err,results)=>{
      if(err) {
        console.log(err)
      }else{
        secrt.findById({_id : results.id},(err,data)=>{
            res.json(data)
        }).populate('id_doctor')
      }
    })
  })
////////////////////////////////////////////////////////////////list Rv
router.get('/listRv/:id',(req,res)=>{
    appointement.find({id_doctor : req.params.id },(err,results)=>{
        if(err){console.log(err)}
        else{
            res.json(results)
        }
    }).populate('id_doctor').populate('id_patient')
})

////////////////////////////////////////////////////////////////accepter RV
router.post('/acceptRv/:id',async(req,res)=>{
  appointement.findByIdAndUpdate({_id : req.params.id},{
      prix : req.body.prix,
      statue : true
  },(err,data)=>{
      var n = new notif ({
          id_user : data.id_patient,
          patient  :true ,
          body : "Votre rendez vous a été accepté",
          url : "http://localhost:4000/mesRV/"+data.id_patient
        })
      n.save((err)=>{})
       user.findById(n.id_user ,(err,patient)=>{
    
      
      const mailgun = new Mailgun({apiKey: API_KEY , domain: DOMAIN });
      console.log(patient.email);
      const data1 = {
        from: 'secetaire<me@samples.mailgun.org>',
        to: patient.email,
        subject: 'demande accépte',
        html: "<h3>votre demande est accepte:</h3>"
    };
    try{
      mailgun.messages().send(data1, function (error, body) {
    console.log(body);
    })
    
      }catch(err){
          console.log(err);
      }
      res.json('Rendez vous accepté')
  })
})
})

////////////////////////////////////////////////////////////////cancel RV
router.get('/cancelRv/:id',(req,res)=>{
  appointement.findByIdAndUpdate({_id : req.params.id},{
      cancel : true
  },(err,data)=>{
      var n = new notif ({
          id_user : data.id_patient,
          patient  :true ,
          body : "Votre rendez vous a été réfuser",
          url : "http://localhost:4000/mesRV/"+data.id_patient
        })
       
        const mailgun = new Mailgun({apiKey: API_KEY , domain: DOMAIN });

    
      user.findById(n.id_user ,(err,patient)=>{
        const data1 = {
          
          from: 'secetaire<me@samples.mailgun.org>',
          to: patient.email,
          subject: 'demande refuser',
          html: "<h3>Votre rendez vous a été réfuser</h3>"
      };
      try{
        mailgun.messages().send(data1, function (error, body) {
      
      
      })
      
        }catch(err){
            
            res.send(err)
        }
      n.save((err)=>{})
      res.json('Rendez vous annulé')
  })
})
})



module.exports = router;