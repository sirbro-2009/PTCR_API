const theDate = new Date(Date.now())
let date = editTime(theDate.getDate())
let month = editTime(theDate.getMonth()+1)
let year = editTime(theDate.getFullYear())
function editTime(value){
    return value >= 10 ? value : `0${value}`
} 
setInterval(() => {
date = editTime(theDate.getDate())
month = editTime(theDate.getMonth()+1)
year = editTime(theDate.getFullYear())
}, 1000);
let fullDate  = `${date}-${month}-${year}`
let isLeap = year%4===0?true:false
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
module.exports  = {date,month,year,fullDate,isLeap,editTime,returnTime}
