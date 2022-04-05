const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");
const axios = require('axios')
const https = require('https')

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
   res.render("index");
});

app.get("/scan", (req, res) => {
   // const url = req.body.url;

   // // If the input is null return "Empty Data" error
   // if (url.length === 0) {
   //    res.send("Empty Data!");
   // }
   // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
   // It shall be returned as a png image format
   // In case of an error, it will save the error inside the "err" variable and display it
      const options = {
      hostname: 'api.zebedee.io',
      port: 443,
      path: '/v1/withdrawal-requests',
      method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.API_KEY
         }
      }
      
      const req2 = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      
         // res.on('data', d => {
         //    // process.stdout.write(d)
         //    //res.render("scan", { d });
         // })
      })

   // curl --location --request POST 'https://api.zebedee.io/v0/withdrawal-requests' \
   // --header 'Content-Type: application/json' \
   // --header 'apikey: API_KEY' \
   // --data-raw '{
   // 	"expiresIn": 300,
   // 	"amount": "12000",
   // 	"description": "My Withdrawal Description",
   // 	"internalId": "11af01d092444a317cb33faa6b8304b8",
   // 	"callbackUrl": "https://your-website.com/callback"
   // }'

      // Let us return the QR code image as our response and set it to be the source used in the webpage
      
});

const port = 8001;
app.listen(port, () => console.log("Server at 8001"));

