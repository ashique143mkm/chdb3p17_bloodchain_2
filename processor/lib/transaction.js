const crypto = require('crypto');
const {TextEncoder} = require('text-encoding/lib/encoding')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')
const {createContext,CryptoFactory} = require('sawtooth-sdk/signing');

var encoder = new TextEncoder('utf8')

// function to hash data
function hash(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
}


function modifyData(context, address, msg)
{
    let msgBytes=encoder.encode(msg);
    let entries = {
        [address]: msgBytes 
      }
    return context.setState(entries);
}


function writeToStore(context, address, msg){
   
  
    return context.getState([address]).then((addressValues) => {
            console.log("Alert "+addressValues[address].toString())
            var previous_data =0;
            previous_data = addressValues[address];
          if (previous_data == '' || previous_data == null) {
           console.log("Empty data")
           var msgBytes="[ "+ msg + "]";
          
          } else {
            var msgBytes = previous_data.toString()
            msgBytes=msgBytes.substring(0, msgBytes.length - 1);
            msgBytes=msgBytes + ","+ msg +" ]"
                     
            console.log("test data-2===="+msgBytes)
           
          }
            
          return modifyData(context ,address , msgBytes);
        });
   
    
}





function getPatientAddress(id,key,doctor){
    const context = createContext('secp256k1');
    let dkey = Secp256k1PrivateKey.fromHex(key)
    let signer = new CryptoFactory(context).newSigner(dkey);
    let publicKeyHex = signer.getPublicKey().asHex()    
    let keyHash  = hash(publicKeyHex)
    let dhash = hash(doctor)
    let idHash = hash(id)
    return dhash.slice(0,6) +idHash.slice(0,6)+keyHash.slice(0,58)
}





module.exports = {
hash,
writeToStore,
getPatientAddress
}