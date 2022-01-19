export default class EmploymentRecord {
    constructor(data = {}) {
        this.applyOvertime  = data.applyOvertime || ''
        this.benefit        = data.benefit || []
        this.currency       = data.currency || {}
        this.date           = data.date || ''
        this.department     = data.department || {}
        this.employee       = data.employee || {}
        this.employmentId   = data.employmentId || '',
        this.group          = data.group        || ''
        this.id             = data.id || ''
        this.location       = data.location || {}
        this.loggedUser     = data.loggedUser || {}
        this.natureContract = data.natureContract || {}
        this.natureRecord   = data.natureRecord || {}
        this.natureSalary   = data.natureSalary || {}
        this.position       = data.position     || {}
        this.salary         = data.salary || 0
        this.salaryType     = data.salaryType || ''
        this.segment        = data.segment || []
        this.startingTime   = data.startingTime || 0
        this.status         = data.status || 1
        this.workDay        = data.workDay || {}
    }
    constuct(data) {
        this.constructor(data);
    }
}