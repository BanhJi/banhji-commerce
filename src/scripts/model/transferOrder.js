/*
 * Last modified : 3/10/21, 10:04 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

export default class TransferOrder {
  constructor(data = {}) {
    this.id = data.id || ''
    this.number = data.number || ''
    this.abbr = data.abbr || ''
    this.materialType = data.materialType || {}
    this.description = data.description || ''
    this.structure = data.structure || ''
    this.transactionDate = data.transactionDate || ''
    this.sequcencing = data.sequcencing || ''
    this.type = data.type || ''
    this.date = data.date || new Date().toISOString().substr(0, 10)
    this.fWarehouse = data.fWarehouse || {}
    this.tWarehouse = data.tWarehouse || {}
    this.monthOf = data.monthOf || new Date().toISOString().substr(0, 7)
    this.itemLines = data.itemLines || []
    this.location = data.location || {}
    this.saleChannel = data.saleChannel || {}
    this.project = data.project || {}
    this.segment = data.segment || {}
  }

  constuct(data) {
    this.constructor(data);
  }
}
