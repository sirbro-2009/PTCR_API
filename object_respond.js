const {date,month,year,fullDate,isLeap,editTime,returnTime} = require("./time_tool")
const {duhrCalc,fadjrCalc,assrClac, magrebCalc,ishaCalc,SunriseCalc} = require("./prayer_time")
const {theResault} = require("./hydjri_modules")
///
const methods = [
  {
    id: "MWL",
    name: { ar: "رابطة العالم الإسلامي", en: "Muslim World League" },
    fajr: 18,
    isha: 17,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "ISNA",
    name: { ar: "أمريكا الشمالية", en: "Islamic Society of North America" },
    fajr: 15,
    isha: 15,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "Egypt",
    name: { ar: "مصر", en: "Egyptian General Authority of Survey" },
    fajr: 19.5,
    isha: 17.5,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "Karachi",
    name: { ar: "كراتشي / الحنفية", en: "University of Islamic Sciences, Karachi" },
    fajr: 18,
    isha: 18,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 2,
  },
  {
    id: "Makkah",
    name: { ar: "أم القرى", en: "Umm al-Qura, Makkah" },
    fajr: 18.5,
    isha: null,
    ishaInterval: 90,
    ishaRamadanInterval: 120,
    asr: 1,
  },
  {
    id: "Kuwait",
    name: { ar: "الكويت", en: "Kuwait" },
    fajr: 18,
    isha: 17.5,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "Qatar",
    name: { ar: "قطر", en: "Qatar" },
    fajr: 18,
    isha: null,
    ishaInterval: 90,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "Singapore",
    name: { ar: "سنغافورة", en: "Majlis Ugama Islam Singapura" },
    fajr: 20,
    isha: 18,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "France",
    name: { ar: "فرنسا", en: "Union des organisations islamiques de France" },
    fajr: 12,
    isha: 12,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "Algeria",
    name: { ar: "الجزائر", en: "Algeria" },
    fajr: 18,
    isha: 17,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
    Maghrib:3,
  },
  {
    id: "Morocco",
    name: { ar: "المغرب", en: "Morocco" },
    fajr: 19,
    isha: 17,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
  {
    id: "Tunisia",
    name: { ar: "تونس", en: "Tunisia" },
    fajr: 18,
    isha: 18,
    ishaInterval: null,
    ishaRamadanInterval: null,
    asr: 1,
  },
]
class Content{
    constructor(lat,lon,timeZone,offSet,methodId){
    let {id,name,fajr,isha,ishaInterval,ishaRamadanInterval,asr,Maghrib} = methods[methodId>11?0:methodId]
    let fOff,dOff,assOff,mafOff,ishaOff,sunriseOff
    if(offSet){[fOff,dOff,assOff,mafOff,ishaOff,sunriseOff] = offSet.split(",")}
    let finalMagOff = parseInt((Maghrib||0))+parseInt(mafOff||0)
    this.times ={
            Fajr:fadjrCalc(fajr,lat,lon,timeZone,parseInt(fOff||0)),
            Sunrise:SunriseCalc(lat,lon,timeZone,parseInt(sunriseOff||0)),
            Dhuhr: duhrCalc(lon,timeZone,parseInt(dOff||0)),
            Asr:assrClac(asr,lat,lon,timeZone,parseInt(assOff||0)),
            Maghrib:magrebCalc(lat,lon,timeZone,finalMagOff),
            Isha:ishaCalc((theResault.hedjriMonth==="رمضان"?ishaRamadanInterval:ishaInterval),isha,lat,lon,timeZone,parseInt(ishaOff||0),parseInt((mafOff||0)+(Maghrib||0)))
    }
    this.date = theResault
    this.Informations  ={
        method:name,
        fadjrDeg : fajr,
        ishaDeg:isha,
    }
    let array = []
    for (let i = 0; i < methods.length; i++) {
        let e = methods[i]
    array.push({
        name:e.name,
        id:i,
        fajr_Angel: e.fajr+"°",
        isha_Angel: e.isha+"°",
        ishaInterval: e.ishaInterval ||"no",
        ishaRamadanInterval: e.ishaRamadanInterval ||"no",
        Government_reshuffle_of_magreb:e.Maghrib ||"no",
        
    })
    }
    this.directions_of_methods = array
    this.offSet = {
            Fajr:(fOff||0),
            Sunrise:(sunriseOff||0),
            Dhuhr: (dOff||0),
            Asr:(assOff||0),
            Maghrib:(mafOff||0),
            Isha:(ishaOff||0)
    }
    }
}
let newObg = (lat,lon,timeZone,offSet,methodId)=>{return new Content(lat,lon,timeZone,offSet,methodId)}
module.exports = {newObg}