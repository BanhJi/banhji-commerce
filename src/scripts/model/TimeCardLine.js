import store from "@/store"
const institute = store.state.institute.institute

export default class TimeCardLine {
    constructor(data = {}) {
        this.timeFormat     = 'hh:mm:ss tt' 
        this.date               = data.date || ''
        this.employeeUid        = data.employeeUid || ''
        this.employeeId         = data.employeeId || ''
        this.employeeName       = data.employeeName || ''
        this.timeTable          = data.timeTable || ''
        this.clockedIn          = data.clockedIn || ''
        this.clockedOut         = data.clockedOut || ''
        this.overTimeWeekend    = data.overTimeWeekend || 0
        this.overTimeHoliday    = data.overTimeHoliday || 0
        this.overTimeNight      = data.overTimeNight
        this.paidHours          = data.paidHours || 0
        this.workTime           = data.workTime || ''
        this.workDay            = data.workDay || 0
        this.dateFormat         = data.dateFormat || institute.dateFormat
    }
    constuct(data) {
        this.constructor(data);
    }
}