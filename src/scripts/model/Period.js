export default class Period {
    constructor(data = {}) {
        this.id = data.id || ''
        this.paymentPeriod = data.paymentPeriod || []
        this.hourPerDay = data.hourPerDay || ''
        this.overtimeForWeekend =  data.overtimeForWeekend || ''
        this.overtimeForNationalHoliday = data.overtimeForNationalHoliday || ''
        this.dayToPayroll   =  data.dayToPayroll = 0
        this.workingDay = data.workingDay || 0
        this.overtimeNight  = data.overtimeNight || 0
        this.nightTime = data.nightTime || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}