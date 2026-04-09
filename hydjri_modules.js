const { getDate, getMonth, getYear, getFullDate, isLeap, editTime, returnTime } = require("./time_tool")
let date = getDate()
let month = getMonth()
let year = getYear()
const hijriMonths = [
                    { ar: "محرم",        en: "Muharram" },
                    { ar: "صفر",         en: "Safar" },
                    { ar: "ربيع الأول",  en: "Rabi al-Awwal" },
                    { ar: "ربيع الثاني", en: "Rabi al-Thani" },
                    { ar: "جمادى الأولى",  en: "Jumada al-Awwal" },
                    { ar: "جمادى الثانية", en: "Jumada al-Thani" },
                    { ar: "رجب",         en: "Rajab" },
                    { ar: "شعبان",       en: "Shaban" },
                    { ar: "رمضان",       en: "Ramadan" },
                    { ar: "شوال",        en: "Shawwal" },
                    { ar: "ذو القعدة",   en: "Dhu al-Qadah" },
                    { ar: "ذو الحجة",    en: "Dhu al-Hijjah" },
]
const weekDays = [
    { ar: "الأحد",     en: "Sunday" },
    { ar: "الاثنين",   en: "Monday" },
    { ar: "الثلاثاء",  en: "Tuesday" },
    { ar: "الأربعاء",  en: "Wednesday" },
    { ar: "الخميس",   en: "Thursday" },
    { ar: "الجمعة",   en: "Friday" },
    { ar: "السبت",    en: "Saturday" },
]
let hedjriYear = parseInt((year-622)/0.97)
function toHijri(year, month, day,offSet) {

  const JD = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4)
           + Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12)
           - Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4)
            + day - 32075;
  const l = JD - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719)
          + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50)
           - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hMonth = Math.floor((24 * l3) / 709);
  const hDay   = l3 - Math.floor((709 * hMonth) / 24)+(offSet||-2);
  const hYear  = 30 * n + j - 30;
    return {
        hedjriYear:hedjriYear,
        hedjriMonth:(hijriMonths[hMonth-1]).ar,
        hedjriDate:hDay,
        hedjriDay:weekDays[new Date().getDay()].ar,
        fullHedjriDay:`${hedjriYear} ${weekDays[new Date().getDay()].ar} ${hDay} ${(hijriMonths[hMonth-1]).ar}`
    }
}
let theResault = toHijri(year,parseInt(month),parseInt(date),-2)
module.exports = {theResault}