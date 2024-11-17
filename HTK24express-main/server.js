//Fil för att hantera Express server
const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const portNr = 5000
const filePath = "./jsonData.json"

//Konfigurera server med Body-parser
const application = new express()
application.use(bodyParser.json())
application.use(bodyParser.urlencoded({extended:false}))

//Starta upp server
application.listen(portNr, () => {
  console.log(`Nu ligger servern på portNr ${portNr} och lyssnar efter inkommande requests`)
})

//Get-request på root-address för att returnera index.html
application.get("", (req, res) => {
  //Returnera Hello World
  //res.send("Hejsan")
  res.sendFile("./index.html", {root: __dirname})
})

application.post("/data", (req, res) => {
  //Denna payload innehåller 2 st attribut, name och age
  const data = req.body

  //console.log(data)
  //Skriver ut data till konsol
  console.log(data["name"])
  console.log(data.age)

  //Hämta befintlig data från .json fil
  fs.readFile(filePath, "utf-8", (err, fetchJson) => {
    if (err) console.log(err)
    
    let lista = JSON.parse(fetchJson)

    //Push Post-Payload till lista
    lista.push(data)
  
    //Spara lista till .json fil
    fs.writeFile(filePath, JSON.stringify(lista, null, 4), (err) => {
      //Om error, skriv ut error
      if (err) console.log(err)
    })
  })
  

  //Retunerar meddelande till klient
  res.send(`Hejsan ${data["name"]}, då är ${data["age"]} år gammal`)
})

//Get-Endpoint som returnerar JSON data
application.get("/data", (req, res) => {
  //Hämta JSON data från fil
  fs.readFile(filePath, "utf-8", (err, fetchJson) => {
    if (err) res.send(err)

    res.send(fetchJson)
  })
})

//Get-Endpoint för About.html
application.get("/about", (req, res)=> {
  res.sendFile("./about.html", {root: __dirname})
})

//Get-Endpoint för About.html
application.get("/script", (req, res)=> {
  res.sendFile("./script.js", {root: __dirname})
})