
function viewData() {
    window.location.href='/listView';

}



//login
function login(){

    const Key = document.getElementById('dId').value;
    if(Key.length === 0){
        alert("please enter the Key");
    }
    else{
        $.post('/',{ privateKey : Key ,privateKey1 : this.data_key },(data, textStatus, jqXHR)=>{
            if(data.done =1){
                sessionStorage.clear();
                sessionStorage.setItem("privatekey",data.privatekey);
                pk = sessionStorage.getItem("privatekey");
                alert(data.message);
                window.location.href='/dhome';
            }
            else{
                window.location.href='/dlogin';
            }
            
        },'json');
    }
}


//form function
function addPatients(event){
    event.preventDefault();
    let privKey = sessionStorage.getItem("privatekey");
    let data1 = document.getElementById('PatientId').value;
    let data2 = document.getElementById('PatientName').value;
    let data3 = document.getElementById('PatientAge').value;
    let data4 = document.getElementById('PatientGender').value;
    let data5 = document.getElementById('PatientAddress').value;
    let data6 = document.getElementById('ConsultingHospital').value;
    let data7 = document.getElementById('ConsultingDoctor').value;
    let data8 = document.getElementById('PatientObservation').value;
    let data9 = document.getElementById('PatientDisease').value;
    let data10 = document.getElementById('PrescribedMedicine').value;

    console.log(privKey)

    $.post('/addPatients',{ key: privKey, PatientId: data1, PatientName: data2, PatientAge: data3, PatientGender: data4, PatientAddress: data5, ConsultingHospital: data6, ConsultingDoctor: data7, PatientObservation: data8, PatientDisease: data9, PrescribedMedicine: data10} ,'json');
    
}


//search function
function search(){
    
    event.preventDefault();
    var sid = document.getElementById('sId').value;
    var did = document.getElementById('dId').value;

    console.log(sid);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if(sId != null){
        $.post('/listPatient',{sId:sid, dId:did},'json');
    }else{
        window.location.href= '/';
    }
}


//logout
function logout(){


    sessionStorage.clear()
    window.location.href='/dlogin';

}

function deletefun(){
    event.preventDefault();
    let sid = document.getElementById('sId').value;
    let did = document.getElementById('dId').value;
    let privKey = sessionStorage.getItem("privatekey");
    if(sid !== null && did !== null && privKey !== null){
        $.post('/deleteitem',{sId:sid, dId:did, Key:privKey},function(data){
            if(data.status != 202)
                alert(data.text)
                window.location.href="/delete"
        },'json')
    }else{
        window.location.href = '/delete'
        
    }
    

}