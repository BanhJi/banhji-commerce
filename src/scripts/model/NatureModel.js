export default class NatureModel {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.code = data.code || ''
            this.color = data.color || ''
            this.thumb = data.thumb || ''
        } else {
            this.id = ''
            this.name = ''
            this.code = ''
            this.color = ''
            this.thumb = ''
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}