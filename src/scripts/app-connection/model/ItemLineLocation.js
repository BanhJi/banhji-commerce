
import locationModel from "@/scripts/model/Location.js"
export default class ItemLineLocation {
    constructor(data = {}) {
        this.isAddNew = data.isAddNew || false
        this.location = data.location || Object.assign({}, new locationModel());
        this.locationPartner = data.locationPartner  || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}