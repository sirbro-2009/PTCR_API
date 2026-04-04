let toRad = (arg)=>{return ((Math.PI*arg)/(180))}
let toDeg = (arg)=>{return ((arg*180)/(Math.PI))}
let sin = (arg)=>{return Math.sin(toRad(arg))}
let cos = (arg)=>{return Math.cos(toRad(arg))}
let acos = (arg)=>{return toDeg(Math.acos(arg))}
let aCot = (arg)=>{return toDeg(Math.atan(1/arg))}
let cosH = (arg,lat,sloar_declinationValue)=>{return (sin(arg)-sin(lat)*sin(sloar_declinationValue))/(cos(lat)*cos(sloar_declinationValue))}
module.exports = {toDeg,toRad,sin,cos,acos,aCot,cosH}