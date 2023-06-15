
const {TextDecoder} = require('text-encoding/lib/encoding')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')
const {createContext,CryptoFactory} = require('sawtooth-sdk/signing');
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const {hash , writeToStore ,getPatientAddress} = require('./lib/transaction')
const { TransactionProcessor } = require('sawtooth-sdk/processor');



const FAMILY_NAME = "MediChain"
const NAMESPACE = hash(FAMILY_NAME).substring(0, 6)
const URL = 'tcp://validator:4004';
var decoder = new TextDecoder('utf8')




function addPatient (context,id,name,age,gender,paddress,hospital,doctor,observation,disease,medicine,key) {
    
    let patient_Address = getPatientAddress(id,key,doctor)  
    let patient_detail =[id,name,age,gender,paddress,hospital,doctor,observation,disease,medicine]  
    return writeToStore(context,patient_Address,patient_detail)
}

function deletePatient(context,id,key,did){
    console.log("Deleting Patient")
    let address = getPatientAddress(id,key,did)
   console.log("address",address)
   return context.deleteState([address])
  }

                                                                                                                                                                                                             
class Patients extends TransactionHandler{
    constructor(){
        
        super(FAMILY_NAME, ['1.0'], [NAMESPACE]);


    }
//apply function
    apply(transactionProcessRequest, context){
        let PayloadBytes = decoder.decode(transactionProcessRequest.payload)
        let Payload = PayloadBytes.toString().split(',')
        let action = Payload[0]
        if (action == "Add"){

            return addPatient(context,Payload[1],Payload[2],Payload[3],Payload[4],Payload[5],Payload[6],Payload[7],Payload[8],Payload[9],Payload[10],Payload[11])
      
        }
        else if( action == "Delete"){

            return deletePatient(context,Payload[1],Payload[2],Payload[3])
        }
        
        
    }
}

const transactionProcesssor = new TransactionProcessor(URL);
transactionProcesssor.addHandler(new Patients);
transactionProcesssor.start();


