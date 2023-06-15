var express = require('express');
var{ Patient }= require('./UserClient')
var router = express.Router();


//roothome
router.get('/', function(req, res, next) {
  res.
  render('home', { title: 'Dashboards' });
});


//login validation
router.post('/',(req,res)=>{
  var Key = req.body.privateKey;
  var client = new Patient(Key);
  res.send({ done:1, privatekey: Key, message: "your privatekey is "+ Key });
});


//doctorhome
router.get('/dhome', function(req, res, next) {
    res.render('doctorHome', { title: 'Dashboards' }); 
});


//patientform
router.get('/patientForm', function(req, res, next) {
  res.render('dform', { title: 'PatientForm' });
});

//common search
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search' });
});

//doctor search
router.get('/dsearch', function(req, res, next) {
  res.render('dsearch', { title: 'Dashboard Search' });
});


//Delete
router.get('/delete', function(req, res, next) {
  res.render('delete', { title: 'Dashboard Delete' });
});


//Patient List
router.get('/patientList', function(req, res, next) {
  res.render('patientList', { title: 'List patient' });
});


//login
router.get('/dlogin', function(req, res, next) {
  res.render('dlogin', { title: 'Login' });
});


//login validation
router.post('/login',function(req,res,next){

let key = req.body.dId;
var client = new Patient(key);
res.send('/dhome');

})



//list Doctor search result
router.post('/dlistPatient', async (req,res)=>{
  
  var id = req.body.sId;
  var Client = new Patient(null);
  let stateData = await Client.getPatientLists1(id);
  let patientList = [];
  storedDataLength = stateData.data.length;
  for(i = 0; i < storedDataLength; i++){
    let patientData = stateData.data[i].data;
    let decodedPatients = Buffer.from(patientData, 'base64').toString()
    let PatientDetails = decodedPatients.split(',')
    patientList.push({
      id: PatientDetails[0].split("[ ")[1],
      name: PatientDetails[1],
      age: PatientDetails[2],
      gender: PatientDetails[3],
      paddress: PatientDetails[4],
      hospital: PatientDetails[5],
      doctor: PatientDetails[6],
      observation: PatientDetails[7],
      disease: PatientDetails[8],
      medicine: PatientDetails[9].split("]")[0]
    });
  }
  console.log("Patient List", patientList);
  res.render("dpatientList",{listing : patientList});
});


//list visitor search result
router.post('/listPatient', async (req,res)=>{
  
  var sid = req.body.sId;
  var did = req.body.dId;
  console.log(sid,did)
  var Client = new Patient(null);
  let stateData = await Client.getPatientsLists(did,sid);
  // console.log("sate data is :",stateData)
  let patientList = [];
  storedDataLength = stateData.data.length;
  console.log("Stored data........................",storedDataLength)
  for(i = 0; i < storedDataLength; i++){
    let patientData = stateData.data[i].data;
    let decodedPatients = Buffer.from(patientData, 'base64').toString()
    let PatientDetails = decodedPatients.split(',')
    console.log(PatientDetails)
    patientList.push({
      id: PatientDetails[0].split("[ ")[1],
      hospital: PatientDetails[5],
      doctor: PatientDetails[6],
      observation: PatientDetails[7],
      disease: PatientDetails[8],
      medicine: PatientDetails[9].split("]")[0]
    });
  }
  console.log("Patient List", patientList);


  res.render("patientList",{listing : patientList});  

});


//add patient
router.post('/addPatients',function(req, res){

  try{
    let key = req.body.key
    let id= req.body.PatientId
    let name = req.body.PatientName
    let age = req.body.PatientAge
    let gender = req.body.PatientGender
    let paddress = req.body.PatientAddress
    let hospital = req.body.ConsultingHospital
    let doctor = req.body.ConsultingDoctor
    let observation = req.body.PatientObservation
    let disease = req.body.PatientDisease
    let medicine = req.body.PrescribedMedicine
    console.log("Data sent to REST API",key,id,name,age,gender,paddress,hospital,doctor,observation,disease,medicine);
    var client = new Patient(null);
    // var tpclient = new Patients(key)
    client.addPatient(key,id,name,age,gender,paddress,hospital,doctor,observation,disease,medicine)
    res.send({message: "Data successfully added"});
  
  }catch(e){
    console.log("error", e);
  }
})


//delete function
router.post('/deleteitem',async function(req,res){

  var sid = req.body.sId;
  var did = req.body.dId;
  var key = req.body.Key;

  console.log(sid,did,key)
  var Client = new Patient(null);
  await Client.deletePatient(sid,key,did)
  res.send({text: "Data successfully deleted"})


})


module.exports = router;