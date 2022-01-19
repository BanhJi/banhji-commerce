import store from "@/store"
const institute = store.state.institute.institute

export default class TimeCard {
    constructor(data = {}) {
        this.timeFormat             = 'hh:mm:ss tt' 
        this.monthOf                = data.monthOf || ''
        this.timeCardLine           = data.timeCardLine || []
        this.totalWork              = data.totalWork || 0
        this.totalOverTimeWeekend   = data.totalOverTimeWeekend || 0
        this.totalOverTimeHoliday   = data.totalOverTimeHoliday || 0
        this.totalOverTimeNight     = data.totalOverTimeNight || 0
        this.segment                = data.segment || {}
        this.segmentId              = data.segmentId || ''
        this.location               = data.location || {}
        this.locationId             = data.locationId || ''
        this.dateFormat             = data.dateFormat || institute.dateFormat
    }
    constuct(data) {
        this.constructor(data);
    }
}