
# BloodChain

BloodChain is a helthcare blockchain which is used to store the data of Doners, their treatment details and etc.


## Getting Started

The medical field is one of the important field where the data is being given more importance because wrong data or information can harm someone's life.So the data they store are given more importance and are need to be handled more safely. This is the place where the blockchain can help us to solve the problem. The data can be stored and managed using the blockchain technology. That is we can create a blockchain for storing and managing the data of Doners. So that the Hopsitals and as well as the Doners can verify that the data  is the data that is originated from the orignal place or from a valid person.


### Prerequisites

In order to run the project you need to install,

==>   sudo apt-get install npm
```
```
==>   npm install node
```
```
==>   sudo apt-get install docker
```

### Running

To run the project open a terminal in the root folder and run the command given below, this will automatically runn other command inside it.

    ```
    	==>  cd /BloodChain
    ```
    
       ==>  sudo docker-compose up

    ```
this will automatically runns your project.

Login to the validator container using command

```
==>   sudo docker exec -it validator bash

```
using command create a key, you will get a private key nd a public key with the below command
```


==>   sawtooth keygen key1

```
display the key using

```
==>  cat /root/.sawtooth/keys/key1.priv

```
Using this private key you can login to the Hopsital [Dashboard](http://localhost:3000/dlogin)

#### Permissioning the keys

In the validator container, type the following command to give permissions

```
sawtooth identity policy create --key ~/.sawtooth/keys/my_key.priv policy_1 "PERMIT_KEY current publickey​" “PERMIT_KEY ​public key of the generated key​” --url http://rest-api:8008
```


## Working

1. After running the command sudo docker-compose up go to you web browser and go to [http://localhost:3000](http://localhost:3000) 
here you will get a screen to choose whether you are a Hopsital or a Doner choose Doner if you are one. Then click [Doner](http://localhost:3000/search) then you will get a search window there you can enter your id that is the Doner Id that will be here uniquely an aadhar Id then click the search button. Then if any matching data is found on the blockchain then the data will be retrieved to you in a table of lists. This is the only part where the Doner can access their data. And the only part visible or accessible to the visitors.


2. When you navigate back to the [root url](http://localhost:3000) you can see another button called [Hopsital](http://localhost:3000/hlogin) press the button and you can get to a Hopsital login page where you need to enter the generated Private Key. The validator will chech for mathcing key and finds one the will create a session for you and redirect you to the Hopsitals Dashboard, where there is two options to add the Doner details and to list the Doner details.
When you press the [add](http://localhost:3000/DonerForm) you will get a form for adding the details of the Doner with thier Doner id and the form is only added if there  is correct  sessionstorage key.Complete the form details and press the add Donerdetails button then the data will be added to the chain.


3. Hopsitals can view the Doner details by using their Id. Navigate back to the Hopsital Dashboard And go to the list page. There you will get a serch box there enter the Hopsitals Unique id and press search button. The the list of Doners the Hopsital has treated will be listed in to a table. The other thing is that a Doner will be having multiple records, the multiple records are being added to the state by appending the data but not able to show the appended data. It can be viewed on the terminal window


4. After completeing the adding or listing funtion you can clear the session by using logout buttion this will automatically calls a logout function that clears any session storage.


5. Doners can view their data by going to list page from the roothome page and searchbox enter your Hopsitals id and next your id you will get the details in a table. But the other thing is that a Doner will be having multiple records, the multiple records are being added to the state by appending the data, but not able to show the appended data. It can be viewed on the terminal window.






# CHDB3P17


### Ashique M K

