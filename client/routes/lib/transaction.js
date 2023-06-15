const crypto = require('crypto');
const {TextEncoder} = require('text-encoding/lib/encoding')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')
const {createContext,CryptoFactory} = require('sawtooth-sdk/signing');

var encoder = new TextEncoder('utf8')


// function to hash data
function hash(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
}


function writeToStore(context, address, data){
        dataBytes = encoder.encode(data)
        let entries = {
        [address]: dataBytes
      }
    return context.setState(entries);
    
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