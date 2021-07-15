const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const request = require("request")

const app = express()
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.FName;
    const lastName = req.body.LName;
    const email = req.body.Email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:
                    {
                        FNAME: firstName,
                        LNAME: lastName
                    }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/b38bf022c0";

    const options = {
        method: "POST",
        auth: "prateek:b2e78f38ee42a7fbe4373a848b3abc9e-us6"
    }

    const request = https.request(url, options, function (response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{res.sendFile(__dirname + "/failure.html")}

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
        
    })

    // request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server started at port 3000");
});

// API KEY
// b2e78f38ee42a7fbe4373a848b3abc9e-us6

// USER ID
// b38bf022c0