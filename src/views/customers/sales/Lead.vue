<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col class="bigSide py-0 pr-2" sm="8" cols="12" style="transition: .3s ease-in;"
                                       :class="{'hide_big_bar_class':isHideBar}">
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t('lead') }}</h2>
                                        <v-icon v-if="isHideBar"
                                                @click="cancel()"
                                                style="cursor: pointer;  font-size: 40px;"
                                                color="grey--text"
                                                class="float-right"
                                        >close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }"><v-icon
                                            size="22"
                                            class="arr_icon"
                                            @click="hide_smallsitebar"
                                            v-if="isHideBar"> mdi-chevron-left-circle
                                              </v-icon><v-icon size="22"
                                                               class="arr_icon"
                                                               @click="hide_smallsitebar"
                                                               v-if="!isHideBar"> mdi-chevron-right-circle
                                              </v-icon></span>
                                    </v-card>
                                    <v-card outlined dense class="no_border" color="white">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label ">{{ $t('name_of_lead') }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="transaction.nameOfLead"
                                                    outlined
                                                    :rules="[v => !!v || 'Lead Name is required']"
                                                    required
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label ">{{ $t('date') }}</label>
                                                <app-datepicker
                                                    :initialDate="transaction.transactionDate"
                                                    @emitDate="transaction.transactionDate = $event"/>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">

                                                <label class="label ">{{ $t('expected_revenue') }} {{
                                                        currency
                                                    }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    type="number"
                                                    min="1"
                                                    :rules="[v => !! parseFloat(v)>0 || ' is required']"
                                                    v-model="transaction.total"
                                                    outlined
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-card outlined dense class="no_border" color="white">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label class="label">{{ $t('customer_name') }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="transaction.customerName"
                                                    :rules="[v => !!v || 'Customer Name is required']"
                                                    outlined
                                                />
                                                <label class="label">{{ $t('sale_rep') }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="transaction.employee"
                                                    :items="employees"
                                                    item-value="id"
                                                    :item-text="item =>`${item.name}`"
                                                    return-object
                                                    placeholder="Sale Rep"
                                                    outlined=""
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label class="label ">{{ $t('customer_email') }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="transaction.customerEmail"
                                                    outlined
                                                />
                                                <label class="label mb-0">{{ $t('segment') }}</label>
                                                <v-select class="mt-1"
                                                          v-model="transaction.segment"
                                                          :items="segments"
                                                          item-value="id"
                                                          :item-text="item =>`${item.code} - ${item.name}`"
                                                          return-object
                                                          tage="Segment"
                                                          placeholder="Segment"
                                                          outlined=""
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label class="label ">{{ $t('customer_phone') }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="transaction.customerPhone"
                                                    outlined
                                                />
                                                <label class="label">{{ $t('location') }}</label>
                                                <v-select class="mt-1"
                                                          v-model="transaction.location"
                                                          :items="locations"
                                                          item-value="id"
                                                          :item-text="item =>`${item.code} - ${item.name}`"
                                                          return-object
                                                          tage="Location"
                                                          placeholder="bu/location"
                                                          outlined=""/>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-btn color="grayBg"
                                               outlined
                                               class=" text-capitalize  black--text float-left"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <!--                    <v-btn color="primary"-->
                                        <!--                           class="ml-2 float-right text-capitalize  white&#45;&#45;text"-->
                                        <!--                           @click="saveNew">-->
                                        <!--                      {{ $t('save_new') }}-->
                                        <!--                    </v-btn>-->
                                        <v-btn color="primary"
                                               class="float-right white--text text-capitalize"
                                               :disabled="btnDisabled"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                        <v-btn color="secondary"
                                               style="margin-right: 10px !important"
                                               class="white--text float-right text-capitalize"
                                               @click="saveNew" :hidden="hiddenButton">{{ $t("save_new") }}
                                        </v-btn>

                                    </v-card>
                                </v-col>
                                <v-col class="smallSide pl-2" sm="4" cols="12" style="transition: .3s ease-in;"
                                       :class="{'hide_small_bar_class':isHideBar}">
                                    <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                        class="text-uppercase float-right mt-n3">
                      <span class="pointer" @click="Help('lead')">
                          {{ $t('help') }}
                      </span>
                                        <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1"
                                        >close
                                        </v-icon>
                                    </h3>

                                    <div v-if="!isHideBar" class="small_sidebar mt-8 px-4 grayBg">
                                        <label class="label">{{ $t('number') }}</label>
                                        <div class="mt-1 d-flex mr-0">

                                            <div class="code_text flex-1 text-bold">{{
                                                    transaction.transactionType.abbr
                                                }}
                                            </div>
                                            <v-text-field class="flex-2 custom-border "
                                                          v-model="transaction.number"
                                                          outlined
                                                          :disabled="true"
                                                          :rules="[v => !!v || 'Number is required']"
                                                          required/>

                                            <v-icon color="black" size="30" style="height:40px;"
                                                    class="border_qrcode ml-2"
                                                    :disabled="disabledMe"
                                                    @click="generateNumber">mdi-qrcode
                                            </v-icon>

                                        </div>
                                        <label class="label">{{ $t('note') }}</label>
                                        <v-textarea
                                            class="mt-1"
                                            v-model="transaction.transactionNote"
                                            outlined
                                            no-resize
                                            height="116px"
                                            placeholder="Note"
                                        />
                                        <p class="mb-0 detial_smallside_p font_14">{{ $t('lead_desc') }}</p>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from '@/i18n';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import Transaction from "@/scripts/model/Transaction"

const settingsHandler = require("@/scripts/settingsHandler")
const employeeHandler = require("@/scripts/employeeHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const prefixHandler = require("@/scripts/prefixHandler")
const locationHandler = require("@/scripts/locationHandler")
const transactionHandler = require("@/scripts/transactionHandler")
import {ShowResource} from '@/observable/store'
import instituteHandler from "@/scripts/instituteHandler";
import currencyHandler from "@/scripts/currency/handler/currencyHandler";
import saleQuoteHandler from "@/scripts/transactionHandler";
// import kendo from "@progress/kendo-ui";

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

const transaction = new Transaction({})
export default {
    name: "CreditPurchase",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        isEdit: false,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        alert: false,
        files: [],
        errors: [],
        // Form validation
        valid: true,
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        transaction: transaction,
        transactionDate: new Date().toISOString().substr(0, 10),
        segments: [],
        //employee
        employees: [],
        transactionType: [],
        locations: [],
        isSaveNew: false,
        saveOption: '',
        company: {},
        maxRules: [
            (v) => {
                const total = parseFloat(transaction.total) || 0
                window.console.log('total', total)
                if (total <= 0) {
                    return v + ' Must be greater than zero'
                } else {
                    return true
                }
            }
        ],
        btnDisabled: false
    }),
    methods: {
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.transaction.transactionDate).toISOString().substr(0, 10)
                    const baseCurrency = this.company.baseCurrency || {}
                    const code = baseCurrency.code || ''
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const xRate = res.data.data[0]
                                this.transaction.exchangeRate = xRate
                                this.transaction.txnRate = xRate.rate || 1
                            }
                        })
                    }
                }, 10)
            })
        },
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(cookie.instituteId).then(res => {
                        this.company = res
                        this.loadTransactionRate()
                    })
                    resolve('resolved');
                }, 10);
            });
        },
        Help(key_search) {
            ShowResource(key_search)
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                this.isEdit = true
                await this.loadViewLead()
            } else {
                this.clear()
            }
        },
        async loadLocation() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.locations = []
                    locationHandler.list().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.locations = res.data.data
                            if (this.locations.length > 0) {
                                if (this.$route.params.id !== undefined || this.$route.params.id != '') {
                                    this.transaction.location = this.locations[0]
                                }
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 10)
            })
        },
        async loadPrefix() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    prefixHandler.get('sale lead').then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.transactionType = res.data.data
                            if (this.transactionType.length > 0) {
                                if (this.$route.params.id !== undefined || this.$route.params.id != '') {
                                    this.transaction.transactionType = this.transactionType[0]
                                    this.generateNumber()
                                }
                            }
                        }

                    })
                }, 10);
            })
        },
        generateNumber() {
            let data = {
                abbr: this.transaction.transactionType.abbr,
                structure: this.transaction.transactionType.structure,
                transactionDate: this.transaction.transactionDate,
                sequcencing: this.transaction.transactionType.sequcencing,
                prefixSeparator: this.transaction.transactionType.prefixSeparator || '',
                numberSeparator: this.transaction.transactionType.numberSeparator || '',
                format: this.transaction.transactionType.format || 5,
                type: 'Sale Lead',
            }
            billingHandler.lastNumber(data).then(response => {
                if (response.data.statusCode === 200) {
                    const res = response.data.data
                    const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.transaction.transactionType.format)
                    const number = res.suffix + this.transaction.transactionType.numberSeparator + lastNumber
                    this.transaction.number = number
                    this.showLoading = false
                }
            }).catch(e => {
                this.showLoading = false
                this.errors.push(e)
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        savePrint() {
        },
        saveNew() {
            this.isSaveNew = true
            this.saveOption = 'saveNew'
            this.save()
        },
        saveClose() {
            this.isSaveNew = false
            this.saveOption = 'saveClose'
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    let data = {
                        "id": this.transaction.id ? this.transaction.id : '',
                        "type": 'Sale Lead',
                        "number": this.transaction.number ? this.transaction.number : '',
                        "abbr": this.transaction.transactionType.abbr ? this.transaction.transactionType.abbr : '',
                        "transactionDate": this.transaction.transactionDate ? this.transaction.transactionDate : new Date().toISOString().substr(0, 10),
                        "validityDate": '',
                        "monthOf": '',
                        "customer": {
                            "name": this.transaction.customerName,
                            "nameOfLead": this.transaction.nameOfLead,
                            "phone": this.transaction.customerPhone,
                            "email": this.transaction.customerEmail,
                        },
                        "transactionType": this.transaction.transactionType ? this.transaction.transactionType : '',
                        "paymentTerm": {},
                        "discountPromotion": {},
                        "priceLevel": {},
                        "segment": this.transaction.segment ? this.transaction.segment : {},
                        "location": this.transaction.location ? this.transaction.location : {},
                        "project": {},
                        "saleChannel": {},
                        "billingAddress": {},
                        "deliveryAddress": {},
                        "deliveryDateTime": '',
                        "transactionNote": this.transaction.transactionNote ? this.transaction.transactionNote : '',
                        "subTotal": this.transaction.total ? this.transaction.total : 0,
                        "total": this.transaction.total ? this.transaction.total : 0,
                        "amount": (this.transaction.total || 0),
                        "exchangeAmount": (this.transaction.total || 0) * (this.transaction.txnRate || 1),
                        "discountTotal": 0,
                        "loggedUser": this.loggedUser,
                        "specificDiscountTotal": 0,
                        "deliveryFee": 0,
                        "totalTaxAmount": 0,
                        "currentBalance": 0,
                        "balance": 0,
                        "creditLimit": 0,
                        "saveOption": this.saveOption,
                        "status": 1, //1 open, 0 used,
                        "approvedBy": {},
                        "rejectedBy": {},
                        "formTemplate": '',
                        "specificDiscountItem": {},
                        "otherCharge": [],
                        "otherChargeAmount": 0,
                        "itemLines": [],
                        "taxListTotal": [],
                        "progressingStatus": '',
                        "txnList": [],
                        "publicLink": '',
                        "usedDateAt": '',
                        "deletedAt": '',
                        "deleted": 0,
                        "createdAt": new Date().toISOString().substr(0, 10),
                        "saleOrderType": 0,
                        "employee": this.transaction.employee,
                        "supplier": {},
                        "txnRate": 1,
                        "exchangeRate": {},
                        "form": 1,
                        "lead": {},
                        "routeView": "",
                        "exspectedDate": '',
                    }
                    transactionHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            if (this.isSaveNew == true) {
                                setTimeout(() => {
                                    this.clear()
                                }, 10)
                            } else {
                                window.history.go(-1)
                            }
                            this.showLoading = false
                            this.$refs.form.reset()
                            this.$snotify.success('Successfully')
                            this.destroy()
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 10);
            })
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    settingsHandler.getSeg().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.segments = res.data.data
                            if (this.segments.length > 0) {
                                if (this.$route.params.id !== undefined || this.$route.params.id != '') {
                                    this.transaction.segment = this.segments[0]
                                }
                            }
                            // this.segmentList = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 10)
            })
        },
        async loadEmployeeCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employees = []
                    employeeHandler.center(undefined).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.employees = res.data.data
                            if (this.employees.length > 0) {
                                this.transaction.employee = this.employees[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 10)
            })
        },
        cancel() {
            this.$swal({
                title: i18n.t('msg_title_warning'),
                text: i18n.t('msg_discard'),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t('cancel'),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t('discard'),
            }).then((result) => {
                window.console.log(result)
                if (result.value) {
                    this.$router.go(-1);
                }
            });
        },
        clear() {
            this.isEdit = false
            //set default segment
            let s = {}
            if (this.segments.length > 0) {
                s = this.segments[0]
            }
            //set default location
            let l = {}
            if (this.locations.length > 0) {
                l = this.locations[0]
            }
            //set default employee
            let e = {}
            if (this.employees.length > 0) {
                e = this.employees[0]
            }
            //transaction type
            let tt = {}
            if (this.transactionType.length > 0) {
                tt = this.transactionType[0]
            }
            this.transaction = new Transaction({
                transactionDate: new Date().toISOString().substr(0, 10),
                total: 0,
                segment: s,
                location: l,
                employee: e,
                transactionType: tt,
            })
            this.generateNumber()
        },
        hide_smallsitebar() {
            this.isHideBar = !this.isHideBar;
        },
        async loadViewLead() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    this.transaction = {}
                    saleQuoteHandler
                        .view(this.$route.params.id)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                const data = res.data.data[0]
                                this.transaction = data
                                this.transaction.total = parseFloat(data.total) || 0
                                this.transaction.nameOfLead = data.customer.nameOfLead || ''
                                this.transaction.customerName = data.customer.name || ''
                                this.transaction.customerEmail = data.customer.email || ''
                                this.transaction.customerPhone = data.customer.phone || ''
                                this.transaction.transactionDate = data.transactionDate || ''
                                const status = this.transaction.status || 1
                                if (status === 2) {
                                    this.btnDisabled = true
                                } else {
                                    this.btnDisabled = false
                                }
                            } else {
                                this.showLoading = false;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            })
        },
        destroy() {
            this.$destroy();
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        disabledMe() {
            return !!this.$route.params.id;
        },
        currency() {
            if (this.company) {
                const baseCurrency = this.company.baseCurrency || {}
                const code = baseCurrency.code || ''
                if (code) {
                    return '( ' + code + ' )'
                }
            }
            return ''
        },
        hiddenButton() {
            if (this.$route.params.id) {
                return true
            } else {
                return false
            }
        }
    },
    created() {
    },
    mounted: async function () {
        await this.loadInstituteInfo()
        await this.loadSegment()
        await this.loadEmployeeCenter()
        await this.loadPrefix()
        await this.loadLocation()
        await this.initData()
    },
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                this.clear();
            } else {
                this.showLoading = true;
                this.initData();
            }
        },
    }
};
</script>

<style scoped>
.small_sidebar {
    height: 94%;
    position: relative;
    padding: 12px;
}

.hide_small_bar_class {
    max-width: 0;
    transition: .5s ease-in;
    flex: 0 0 0;
    padding: 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
}

.iconArrow {
    right: -35px;
    position: absolute;
    bottom: -10px;
}

.iconArrowHide {
    position: absolute;
    right: -7px;
    bottom: -10px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.detial_smallside_p {
    position: absolute;
    padding-right: 12px;
    bottom: 10px;
}

</style>