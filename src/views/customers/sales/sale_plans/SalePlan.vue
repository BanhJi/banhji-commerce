<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="7" class="py-0">
                        <!-- <h2 class="mb-0 font_20">{{ $t("sale_channels") }}</h2>
                        <p>{{$t("sale_channels_desc")}}</p> -->
                    </v-col>
                    <v-col sm="5" class="py-0">
                        <v-btn @click="newClick"
                               color="primary"
                               class=" white--text float-right text-capitalize"
                        >
                            {{ $t("new_sale_plan") }}
                        </v-btn>
                    </v-col>
                </v-row>
                <!-- Dialog -->
                <v-dialog v-model="dialogm" max-width="600px" eager>
                    <v-card>
                        <div class="modal_header">
                            <v-card-title>{{ $t('sale_plan') }}</v-card-title>
                            <v-icon class="btn_close" @click="dialogm = false">close</v-icon>
                        </div>
                        <v-card-text class="modal_text_content">
                            <v-row class="lightGrey">
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-autocomplete class="mt-1"
                                              :items="customers"
                                              tag="Customer"
                                              item-value="id"
                                              v-model="salePlan.customer"
                                              :item-text="item =>`${item.number} - ${item.name}`"
                                              return-object
                                              clearable
                                              outlined/>
                                    <label class="label">{{ $t('segment') }}</label>
                                    <v-select class="mt-1"
                                              tag="Segment"
                                              :items="segments"
                                              v-model="salePlan.segment"
                                              item-text="name"
                                              item-value="id"
                                              return-object
                                              clearable
                                              outlined/>
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label>{{ $t('type') }}</label>
                                    <v-select class="mt-1"
                                              tag="Location"
                                              :items="types"
                                              item-value="id"
                                              item-text="name"
                                              v-model="salePlan.types"
                                              return-object
                                              clearable
                                              outlined/>
                                    <label>{{ $t('location') }}</label>
                                    <v-autocomplete class="mt-1"
                                              :items="locations"
                                              v-model="salePlan.location"
                                              item-text="name"
                                              item-value="id"
                                              tag="Employee"
                                              return-object
                                              clearable
                                              outlined/>
                                </v-col>
                            </v-row>
                            <v-row class="" style="background-color: #fff;">
                                <v-col sm="12" cols="12">
                                    <p class="mb-2">{{$t('detail_plan')}}</p>
                                    <kendo-datasource ref="detailPlanDS"
                                                      :change="dataSourceChanged"
                                                      :data="salePlan.detailPlan"/>
                                    <kendo-grid id="gridDetailPlanDS" class="grid-function"
                                                :data-source-ref="'detailPlanDS'"
                                                :editable="true"
                                                :scrollable-virtual="true">
                                        <kendo-grid-column
                                            :field="'no'"
                                            :title="$t('no')"
                                            :template="rowNumber"
                                            :width="60"
                                            :column-menu="false"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                            :attributes="{style: 'text-align: center'}"/>
                                        <kendo-grid-column
                                            :field="'month'"
                                            :title="$t('for_month')"
                                            :width="150"
                                            :template="'<span>#=kendo.toString(new Date(month), `MM-yyyy`)#</span>'"
                                            :editor="monthDropDownEditor"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'note'"
                                            :title="$t('note')"
                                            :width="80"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'amount'"
                                            :title="$t('amount')"
                                            :width="80"
                                            :template="'<span>#=amount#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="''"
                                            :title="$t('action')"
                                            :width="70"
                                            :command="[{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow }]"
                                            :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                    </kendo-grid>
                                </v-col>
                                <v-btn
                                    color="primary"
                                    class="float-left rounded-0 white--text"
                                    @click="addRow"
                                >
                                    <v-icon size="" class="ma-1"
                                    >mdi-plus
                                    </v-icon
                                    >
                                </v-btn>
                            </v-row>
                        </v-card-text>
                        <v-card-actions class="modal_fopoter">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="primary" outlined
                                           class=" text-capitalize  black--text"
                                           @click="dialogm = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0 text-right">
                                    <v-btn color="primary" class="float-right white--text text-capitalize"
                                           @click="onSaveClose">
                                        {{ $t('save_close') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-row>
                    <v-col sm="12" cols="12">
                        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
                        <template>
                            <kendo-datasource ref="sbDS"
                                              :data="salePlans"/>
                            <kendo-grid id="gridSB" class="grid-function"
                                        :data-source-ref="'sbDS'"
                                        :editable="false"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'no'"
                                    :title="$t('no')"
                                    :template="rowNumberTmpl"
                                    :width="60"
                                    :column-menu="false"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                    :attributes="{style: 'text-align: center'}"/>
                                <kendo-grid-column
                                    :field="'customer'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('name')"
                                    :width="140"
                                    :template="'<span>#=customer.name# - #=customer.name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'types'"
                                    :title="$t('type')"
                                    :width="90"
                                    :template="'<span>#=types.name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'location'"
                                    :title="$t('location')"
                                    :width="100"
                                    :template="'<span>#=location.name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'segment'"
                                    :title="$t('segment')"
                                    :width="100"
                                    :template="'<span>#=segment.name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'amount'"
                                    :width="100"
                                    :title="$t('amount')"
                                    :template="'<span>#=amount#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :width="100"
                                    :command="[{ iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import DiscountItemModel from "@/scripts/model/DiscountItems"
import SalePlan from "@/scripts/service/model/SalePlan";

const salePlanHandler = require("@/scripts/service/handler/salePlan")
const $ = require("jquery")
import kendo from "@progress/kendo-ui";
const customerHandler = require("@/scripts/customerHandler")
const accountHandler = require("@/scripts/handler/accounting/account")
const locationHandler = require("@/scripts/locationHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const employeeHandler = require("@/scripts/employeeHandler")
const discountItemHandler = require("@/scripts/discountItemHandler")
const discountItemModel = new DiscountItemModel({})

export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        natures: ["Amount", "Percentage"],
        types: [{id: 1, name: 'Sale Quote'}, {id: 2, name: 'Sale Order'}, {id: 3, name: 'Invoice'}],
        showLoading: false,
        dialogm: false,
        discountItemList: [],
        account: [],
        mAccount: {},
        discountItem: discountItemModel,
        schemaDefinition: {
            model: {
                id: "id"
            }
        },

        customers: [],
        employees: [],
        locations: [],
        segments: [],
        accRevenue: [],
        segment: {},
        employee: {},
        location: {},
        date: new Date(),
        salePlan: new SalePlan({}),
        salePlans: [],
    }),
    props: {},
    methods: {
        dataSourceChanged() {
        },
        monthDropDownEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker()
        },
        rowNumber(dataItem) {
            let ds = this.$refs.detailPlanDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        removeRow(e) {
            e.preventDefault();
            var grid = kendo.jQuery("#gridDetailPlanDS").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        addRow() {
            let ds = this.$refs.detailPlanDS.kendoWidget(),
                total = ds.total();
            // if (this.date !== new Date()) {
            //     this.date = new Date(this.date.setMonth(this.date.getMonth()+1))
            // }
            if (total <= 11) {
                ds.insert(total, {
                    month: this.date,
                    note: '',
                    amount: 0,
                });
            }
        },
        async loadCustomer() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    customerHandler.list().then(res => {
                        this.customers = res.data.data
                    })
                }, 300)
            })
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.sbDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
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
                                this.location = this.locations[0]
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
                            if (this.segments.length > 0) {
                                this.segment = this.segments[0]
                            }
                            // this.segmentList = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadEmployee(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    employeeHandler.center().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.employees = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        this.account = res.data.map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.account.length > 0) {
                            this.mAccount = this.account[0]
                        }
                        this.accRevenue = res.data.filter(m => m.account_type.name === 'Revenues').map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accRevenue.length > 0) {
                            this.mAccRevenue = this.accRevenue[0]
                        }
                    })
                }, 300);
            })
        },
        cancel() {
            this.dialogm = false
        },
        close() {
            this.dialogm = false
        },
        async newClick() {
            this.salePlan = new SalePlan({})
            await this.loadLocation()
            await this.loadSegment()
            await this.loadEmployee()
            await this.loadCustomer()
            this.dialogm = true

        },
        async goEdit(e) {
            e.preventDefault()
            await this.loadLocation()
            await this.loadSegment()
            await this.loadEmployee()
            await this.loadCustomer()
            let grid = kendo.jQuery("#gridSB").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.salePlan = dataItem
            window.console.log(dataItem)
            this.dialogm = true

        },
        async onSaveClose() {
            let ds = this.$refs.detailPlanDS.kendoWidget()
            let dataRow = ds.data()
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let data = {
                        id: this.salePlan.id,
                        customer: this.salePlan.customer,
                        types: this.discountItem.type,
                        segment: this.salePlan.segment,
                        location: this.salePlan.location,
                        detailPlan: dataRow
                    }
                    salePlanHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            // window.console.log('index ', index, '--', this.discountItemList)
                            this.loadSalePlan()
                            this.$snotify.success('Success')
                            this.close()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                })
            })
        },
        async loadDiscountItems() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    discountItemHandler.list().then(res => {
                        if (res.data.statusCode === 200)
                            this.showLoading = false
                        this.discountItemList = res.data.data
                    })
                }, 300)
            })
        },
        async loadSalePlan() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    salePlanHandler.get().then(res => {
                        this.showLoading = false

                        res.forEach(i => {
                            let amount = 0
                            const detailPlan = i.detailPlan
                            detailPlan.forEach(dp => {
                                amount += dp.amount
                            })
                            this.salePlans.push({
                                customer: i.customer,
                                location: i.location,
                                segment: i.segment,
                                types: i.types,
                                detailPlan: i.detailPlan,
                                amount: amount
                            })
                        })
                        // this.salePlans = res
                    })
                })
            })
        },
    },
    mounted: async function () {
        await this.loadDiscountItems()
        await this.loadSalePlan()
    },
    created: async function () {
        await this.loadAccount()
    },
};
</script>

<style scoped>
.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

.lightGrey {
    background: #F8F8F9;
}

.grid-function .k-button {
    margin-left: 20px !important;
}

@media (max-width: 576px) {
}
</style>
