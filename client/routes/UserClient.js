const crypto = require('crypto');
const {TextEncoder} = require('text-encoding/lib/encoding')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')
const {createContext,CryptoFactory} = require('sawtooth-sdk/signing');

const {createTransaction} = require('./lib/processor')

const {hash,getPatientAddress,getDoctoraddress} = require('./lib/transaction')
const fetch = require('node-fetch');


FAMILY_NAME='MediChain'

class Patient{


  constructor(key){

    if(key !== null){

      const context = createContext('secp256k1');
      const secp256k1pk = Secp256k1PrivateKey.fromHex(key.trim());
      this.signer = new CryptoFactory(context).newSigner(secp256k1pk);
      this.publicKey = this.signer.getPublicKey().asHex();
      }
    
    
  }



    addPatient(Key,id,name,age,gender,paddress,hospital,doctor,observation,disease,medicine){

        let address = getPatientAddress(id,Key,doctor)
        let action = "Add"
        let payload = [action,id,name,age,gender,paddress,hospital,doctor,observation,disease,medicine,Key].join(',')
        createTransaction(FAMILY_NAME,[address],[address],Key,payload)
    }
  



      deletePatient(id,key,did){

        let address = getPatientAddress(id,key,did)
        console.log("address .....................is ",address)
        let action = "Delete"
        let payload = [action,id,key,did].join(',')
        createTransaction(FAMILY_NAME,[address],[address],key,payload)
        
      }

/**
 * Get state from the REST API
 * @param {*} address The state address to get
 * @param {*} isQuery Is this an address space query or full address
 */
  async getState (address, isQuery) {
    console.log("address is......................",address)
    let stateRequest = 'http://rest-api:8008/state';
    if(address) {
      if(isQuery) {
        stateRequest += ('?address=')
      } else {
        stateRequest += ('/address/');
      }
      stateRequest += address;
    }
    let stateResponse = await fetch(stateRequest);
    console.log("sate response-------------------------------------",stateResponse)
    let stateJSON = await stateResponse.json();
    console.log("json__________________________",stateJSON)
    return stateJSON;
    
  }

  async getPatientsLists(did,sid) {

    let PatientListAddress = hash(did).substr(0, 6) + hash(sid).substr(0,6);
    console.log(PatientListAddress);
    return this.getState(PatientListAddress, true);
  }

  async getPatientLists1(id) {
    let PatientListAddress = hash(id).substr(0, 6);
    return this.getState(PatientListAddress, true);
  }
  

}

module.exports = {Patient};
