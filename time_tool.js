const theDate = new Date(Date.now())
function editTime(value){
    return value >= 10 ? value : `0${value}`
} 
function getDate(){
    const theDate = new Date()
    return editTime(theDate.getDate())
}
function getMonth(){
    const theDate = new Date()
    return editTime(theDate.getMonth()+1)
}
function getYear(){
    const theDate = new Date()
    return editTime(theDate.getFullYear())
}
function getFullDate(){
    return `${getDate()}-${getMonth()}-${getYear()}`
}
function isLeap(){
    return new Date().getFullYear() % 4 === 0
}
let returnTime = (reuslt,offset,isInterVal)=>{
let resArr = reuslt.toString().split(".")
let [hours,min] = resArr
let numbredHours = Number(hours)
let finalmins = parseInt((reuslt-Number(hours))*60)+(offset||0) + (isInterVal||0)
if(finalmins >=60){

let value = Math.floor(finalmins/60)
numbredHours = numbredHours + value
if(numbredHours >=24){
numbredHours = numbredHours-24
}
finalmins = finalmins - 60*value
}

return `${editTime(numbredHours)}:${editTime(finalmins)}`
}
module.exports  = {getDate,getMonth,getYear,getFullDate,isLeap,editTime,returnTime}
