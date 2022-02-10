<template>
    <v-app>
        <v-container>
            <v-row class="pt-6">
                <v-col sm="12" cols="12" class="">
                    <v-card color="white" class="pa-6 no_border reports_list" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="pt-0">
                                <h2 class="mb-0 font_20">{{ $t('setting') }}</h2>
                                <v-icon 
                                    onclick="window.history.go(-1); return false;" 
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close</v-icon>
                            </v-col>
                            <v-col sm="12" cols="12">
                                    <label class="label  mb-0">{{$t('segment')}}</label>
                                    <v-select class="mt-1"
                                        v-model="s.segment"
                                        :items="segments"
                                        item-value="id"
                                        :item-text="item =>`${item.code} - ${item.name}`"
                                        return-object
                                        outlined=""/>
                                    <label class="label  mb-0">{{$t('cash_account')}}</label>
                                        <v-select
                                        class="mt-1"
                                        placeholder="select"
                                        item-text="name"
                                        tage=""
                                        return-object
                                        outlined/>
                                    <label class="label  mb-0">{{$t('account_receivable')}}</label>
                                        <v-select
                                        class="mt-1"
                                        placeholder="select"
                                        item-text="name"
                                        tage=""
                                        return-object
                                        outlined/>
                                    <label class="label  mb-0">{{$t('product_catagories')}}</label>
                                        <v-select
                                        class="mt-1"
                                        placeholder="select"
                                        item-text="name"
                                        tage=""
                                        return-object
                                        outlined/>
                                    <label class="label  mb-0">{{$t('service_catagories')}}</label>
                                        <v-select
                                        class="mt-1"
                                        placeholder="select"
                                        item-text="name"
                                        tage=""
                                        return-object
                                        outlined/>
                                    <v-btn color="secondary" class="float-right white--text text-capitalize"
                                        @click="save">
                                        {{ $t('save') }}
                                    </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

import SegmentModel from "@/scripts/model/credit/Segment"
import PenaltyModel from "@/scripts/model/credit/Penalty"
const accountHandler = require("@/scripts/accountHandler")
const loanHandler = require("@/scripts/loanHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const customerTypeHandler = require("@/scripts/customerTypeHandler")


export default {
    components: {},
    data: () => ({
       dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        //
        valid: true,
        saveOption: '',
        s: new SegmentModel({}),
        decimals: [],
        currencyList: [],
        edit: false,
        segment: {},
        segments: [],
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    methods: {
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //revenue Account
                        this.revenueAccounts = res.filter(m => m.account_type.number === 32).map(item => {
                            return {
                                id: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code
                            }
                        })
                    })
                }, 300);
            })
        },
        async loadSinglePenalty() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.penaltyGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if(res.data.data.length > 0) {
                                this.p = res.data.data[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
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
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadSingleSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    loanHandler.segmentGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            window.console.log(res)
                            if(res.data.data.length > 0) {
                                this.s = res.data.data[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async save() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    loanHandler.penaltyCreate(new PenaltyModel(this.p)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e)
                    })
                }, 300);
            })
        },
        async loadCustomerType() {
        new Promise(resolve => {
            setTimeout(() => {
            resolve('resolved');
            customerTypeHandler.get().then(res => {
                this.customerTypes = res.filter(m => {
                return m.nature.name.includes('Individual')
                })
                // window.console.log(res)
                if (this.customerTypes.length > 0) {
                this.customer['customerType'] = this.customerTypes[0]
                this.customerTypeChange()
                }
            })
            }, 300);
        })
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
    },
    mounted: async function () {
        await this.loadSinglePenalty()
        await this.loadSingleSegment()
        await this.loadSegment()
    },
    created: async function () {
        await this.loadAccount()
    }
};
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>