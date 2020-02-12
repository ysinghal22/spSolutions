var express = require("express");

var app = express();

var port = 3000;


app.listen(port, (err, data)=>{
    console.log("listening at ", port)
})


app.post('/api/test', async (req, res) => {

    const payload = JSON.parse(req.body);


    var valid = await validEmail(payload.email)
    var splitNameArray = await splitName(payload.full_name)
    var response = {
        isEmailValid: valid,
        name: splitNameArray
    }
    res.status(200).send(response);
})

function validEmail(email) {
    return new Promise((resolve, reject)=>{

        if(email.lastCharAt('@') != -1 && email.lastCharAt('.') != -1){
            resolve(true)
        } else {
            resolve(false)
        }
    })
}

function splitName(name) {
    var splitName = name.split(" ");
    return splitName
}