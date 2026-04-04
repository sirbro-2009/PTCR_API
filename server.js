const express = require('express')
const app = express()
const port = 3000
//const {duhrCalc,fadjrCalc,assrClac, magrebCalc,ishaCalc,SunriseCalc} = require("./prayer_time")
const {newObg} = require("./object_respond")
app.get("/PTCR-Api",(req,res)=>{
let {lat,lon,timeZone,offset,methodId,} = req.query
let newLat = parseFloat(lat)
let newLon = parseFloat(lon)
let newTimeZone = parseInt(timeZone)
let newmethodId = parseInt(methodId||0)
res.json(
newObg(newLat,newLon,newTimeZone,offset,newmethodId)
)

})
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))
