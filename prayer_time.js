let {toDeg,toRad,sin,cos,acos,aCot,cosH} = require("./Math_modules")
const sloarDeclination = require("./own_modules/assets/sloar_declination.json")
const { getDate, getMonth, getYear, isLeap, editTime, returnTime } = require("./time_tool")

function getEquationOfTime() {
    const currentDate = parseInt(getDate())
    const currentMonth = parseInt(getMonth())
    const currentIsLeap = isLeap()
    
    let equation_of_time
    if(currentIsLeap){
        equation_of_time = require("./own_modules/assets/equation_of_time.json")
    } else {
        equation_of_time = require("./own_modules/assets/leap_year_equation_of_time.json")
    }
    
    let nowEquation_of_time, dayIndex, sloar_declinationValue
    equation_of_time.forEach((e) => {
        if(e.day === currentDate && e.month === currentMonth){
            nowEquation_of_time = e.equation_of_time_minutes / 60
            dayIndex = e.day_of_year - 1
            sloar_declinationValue = sloarDeclination[dayIndex]
        }
    })
    return { nowEquation_of_time, sloar_declinationValue }
}
const { nowEquation_of_time, sloar_declinationValue } = getEquationOfTime()
////
let solarNooN = (log)=>{return 12-(log/15)-nowEquation_of_time}
//fadjr
function fadjrCalc(fadjrDeg,lat,log,timeZone,offset){
const { nowEquation_of_time, sloar_declinationValue } = getEquationOfTime()
let h = acos(cosH(-fadjrDeg,lat,sloar_declinationValue))
let fadjrTime = (solarNooN(log))-(h/15)+ timeZone
return returnTime(fadjrTime,offset)
}
///magreb
function SunriseCalc(lat,log,timeZone,offset){
    const { nowEquation_of_time, sloar_declinationValue } = getEquationOfTime()
let h = acos(cosH(-0.8335,lat,sloar_declinationValue))
let magrebTime = solarNooN(log) - (h/15) + timeZone
return returnTime(magrebTime,offset)
}
//duhr
function duhrCalc(log,timeZone,offset){
    const { nowEquation_of_time, sloar_declinationValue } = getEquationOfTime()
let reuslt = (solarNooN(log)+timeZone)
return returnTime(reuslt,offset)
}
//assr
function assrClac(assrSchool,lat,log,timeZone,offset){
    const { nowEquation_of_time, sloar_declinationValue } = getEquationOfTime()
const doctrine =assrSchool||1
//shadow
let shadowAtnoon = Math.abs(lat-sloar_declinationValue)

///assr deg
let cotA = doctrine + Math.tan(toRad(shadowAtnoon))
let assrAngel = aCot(cotA)
let h = acos(cosH(assrAngel,lat,sloar_declinationValue))
///time
let assrTime = solarNooN(log) + (h/15) + timeZone
return returnTime(assrTime,offset)
}
///magreb
function magrebCalc(lat,log,timeZone,offset){
    const { nowEquation_of_time, sloar_declinationValue } = getEquationOfTime()
let h = acos(cosH(-0.8335,lat,sloar_declinationValue))
let magrebTime = solarNooN(log) + (h/15) + timeZone
return returnTime(magrebTime,offset)
}
function ishaCalc(isInterVal,ishaDeg,lat,log,timeZone,offset,magOffset){
    const { nowEquation_of_time, sloar_declinationValue } = getEquationOfTime()
if(!isInterVal){
let h = acos(cosH(-ishaDeg,lat,sloar_declinationValue))
let ishaTime = solarNooN(log) + (h/15) + timeZone
return returnTime(ishaTime,offset)
}
if(isInterVal){
let h = acos(cosH(-0.8335,lat,sloar_declinationValue))
let magrebTime = solarNooN(log) + (h/15) + timeZone 
return returnTime(magrebTime,magOffset,isInterVal)
}
}
module.exports = {duhrCalc,fadjrCalc,assrClac,magrebCalc,ishaCalc,SunriseCalc}