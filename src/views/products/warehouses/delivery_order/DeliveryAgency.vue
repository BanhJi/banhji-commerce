<template>
    <v-row class="">
        <v-col sm="12" cols="12" class=" grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row class="mt-0">
                    <v-col sm="5" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('delivery_agency') }}</h2>
                    </v-col>
                    <v-col sm="7" cols="12" class="pt-1">
                        <v-btn @click="addAgency" color="primary"
                            class=" white--text float-right text-capitalize">
                            {{ $t('create_new') }}
                        </v-btn>
                        <k-dialog v-if="dialogm2" :width="380" :title="$t('add_delivery_agency')" @close="close">
                            <v-row>
                                <v-col sm="6" cols="12" class="my_radio">
                                    <input id="radio1" name="radio" type="radio" :value=1
                                        v-model="deliveryAgency.aType"> <label for="radio1">{{
                                        $t('internal')
                                    }}</label>

                                </v-col>
                                <v-col sm="6" cols="12" class="my_radio">
                                    <input id="radio2" name="radio" type="radio" :value=2
                                        v-model="deliveryAgency.aType"> <label for="radio2">{{
                                        $t('external')
                                    }}</label>
                                </v-col>
                                <v-col sm="12" cols="12" v-if="deliveryAgency.aType == 1">
                                    <label class="label mb-1">{{ $t('customer') }}</label>
                                    <v-col sm="12" cols="12"
                                        class="kendo_dropdown_custom px-0 pb-3 pt-0 mt-1">
                                        <dropdownlist
                                            :data-items="customerList"
                                            @change="onChange"
                                            :value="mCustomer"
                                            :data-item-key="dataItemKey"
                                            :text-field="textField"
                                            :default-item="defaultItem"
                                            :filterable="true"
                                            @filterchange="onFilterChange">
                                        </dropdownlist>
                                    </v-col>
                                </v-col>
                                <v-col sm="12" cols="12" v-else>
                                    <label class="label  mb-1">{{ $t('supplier') }}</label>
                                    <v-col sm="12" cols="12"
                                        class="kendo_dropdown_custom px-0 pb-3 pt-0 mt-1">
                                        <dropdownlist
                                            :data-items="vendorList"
                                            @change="onChange_"
                                            :value="mSupplier"
                                            :data-item-key="dataItemKey_"
                                            :text-field="textField_"
                                            :default-item="defaultItem_"
                                            :filterable="true"
                                            @filterchange="onFilterChange_">
                                        </dropdownlist>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <dialog-actions-bar>
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0 text-left">
                                        <v-btn color="black" outlined
                                            class=" text-capitalize  black--text float-left"
                                            @click="close">{{ $t('cancel') }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0 text-right">
                                        <v-btn color="primary"
                                            @click="onCreate"
                                            class="px-3  white--text text-capitalize">{{
                                                $t('save_close')
                                            }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </dialog-actions-bar>
                        </k-dialog>
                        <!--                    <v-dialog v-model="dialogm2" max-width="380px" eager>-->
                        <!--                        <template v-slot:activator="{ on }">-->
                        <!--                            <v-btn color="primary" @click="addAgency"-->
                        <!--                                   class="white&#45;&#45;text text-capitalize  float-right" v-on="on">-->
                        <!--                                {{ $t('create_new') }}-->
                        <!--                            </v-btn>-->
                        <!--                        </template>-->
                        <!--                        <v-card>-->
                        <!--                            <v-card-title>{{ $t('warehouse_location') }}</v-card-title>-->
                        <!--                            <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>-->
                        <!--                            <v-divider/>-->
                        <!--                            <v-card-text style="background-color: #EDF1F5; color: #333;">-->
                        <!--                                <v-row>-->
                        <!--                                    <v-col sm="6" cols="12" class="my_radio">-->
                        <!--                                        <input id="radio1" name="radio" type="radio" value=1-->
                        <!--                                               v-model="deliveryAgency.type"> <label-->
                        <!--                                        for="radio1">{{ $t('batch_tracked') }}</label>-->

                        <!--                                    </v-col>-->
                        <!--                                    <v-col sm="6" cols="12" class="my_radio">-->
                        <!--                                        <input id="radio2" name="radio" type="radio" value=2-->
                        <!--                                               v-model="deliveryAgency.type"> <label-->
                        <!--                                        for="radio2">{{ $t('serial_number') }}</label>-->
                        <!--                                    </v-col>-->
                        <!--                                    <v-col sm="12" cols="12">-->
                        <!--                                        <label class="label mb-0">{{ $t('customer') }}</label>-->
                        <!--                                        <v-col sm="12" cols="12"-->
                        <!--                                               class="kendo_dropdown_custom px-0 pb-3 pt-0">-->
                        <!--                                            <dropdownlist-->
                        <!--                                                style="width: 100%"-->
                        <!--                                                class=""-->
                        <!--                                                :data-items="customerList"-->
                        <!--                                                @change="onChange"-->
                        <!--                                                :value="mCustomer"-->
                        <!--                                                :data-item-key="'id'"-->
                        <!--                                                :text-field="'name'"-->
                        <!--                                                :default-item="defaultItem"-->
                        <!--                                                :filterable="true"-->
                        <!--                                                @filterchange="onCustomerFilterChanged">-->
                        <!--                                            </dropdownlist>-->
                        <!--                                        </v-col>-->
                        <!--                                    </v-col>-->
                        <!--                                    <v-col sm="12" cols="12">-->
                        <!--                                        <label class="label  mb-0">{{ $t('supplier') }}</label>-->
                        <!--                                        <v-col sm="12" cols="12"-->
                        <!--                                               class="kendo_dropdown_custom px-0 pb-3 pt-0">-->
                        <!--                                            <dropdownlist-->
                        <!--                                                :data-items="vendorList"-->
                        <!--                                                @change="onChange_"-->
                        <!--                                                :value="mSupplier"-->
                        <!--                                                :data-item-key="dataItemKey_"-->
                        <!--                                                :text-field="textField_"-->
                        <!--                                                :default-item="defaultItem_"-->
                        <!--                                                :filterable="true"-->
                        <!--                                                @filterchange="onFilterChange_">-->
                        <!--                                            </dropdownlist>-->
                        <!--                                        </v-col>-->
                        <!--                                    </v-col>-->
                        <!--                                </v-row>-->
                        <!--                            </v-card-text>-->
                        <!--                            <v-divider/>-->
                        <!--                            <v-card-actions class="pa-5">-->
                        <!--                                <v-row>-->
                        <!--                                    <v-col sm="6" cols="6" class="py-0 text-left">-->
                        <!--                                        <v-btn color="black" outlined-->
                        <!--                                               class=" text-capitalize  black&#45;&#45;text float-left"-->
                        <!--                                               @click="dialogm2 = false">{{ $t('cancel') }}-->
                        <!--                                        </v-btn>-->
                        <!--                                    </v-col>-->
                        <!--                                    <v-col sm="6" cols="6" class="py-0 text-right">-->
                        <!--                                        <v-btn @click="addWhSetting" color="primary"-->
                        <!--                                               class="px-3  white&#45;&#45;text text-capitalize">{{-->
                        <!--                                                $t('save_close')-->
                        <!--                                            }}-->
                        <!--                                        </v-btn>-->
                        <!--                                    </v-col>-->
                        <!--                                </v-row>-->
                        <!--                                &lt;!&ndash;                        <v-btn color="white" class=" black&#45;&#45;text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>&ndash;&gt;-->
                        <!--                                &lt;!&ndash;                        <v-btn color="blue" class=" white&#45;&#45;text text-capitalize float-right" >{{$t('save_new')}}&ndash;&gt;-->
                        <!--                                &lt;!&ndash;                        </v-btn>&ndash;&gt;-->

                        <!--                            </v-card-actions>-->

                        <!--                        </v-card>-->
                        <!--                    </v-dialog>-->
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{ $t('no') }}</th>
                                        <th>{{ $t('name') }}</th>
                                        <th>{{ $t('type') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="dla in deliveryAgencies" v-bind:key="dla.id">
                                        <td>{{ dla.cusSup ? dla.cusSup.number : '' }}</td>
                                        <td class="text-bold">{{ dla.cusSup ? dla.cusSup.name : '' }}</td>
                                        <td>{{ dla.aType === 1 ? $t('internal') : $t('external') }}</td>
                                        <td class="text-center">
                                            <v-btn class="btn-edit" color="primary" @click="onEdit(dla)">
                                                <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                                <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import DeliveryAgency from "@/scripts/model/DeliveryAgency";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import {Dialog, DialogActionsBar} from '@progress/kendo-vue-dialogs';

const deliveryOrderHandler = require("@/scripts/deliveryOrderHandler")
const customerHandler = require("@/scripts/customerHandler")
const supplierHandler = require("@/scripts/supplierHandler")
const deliveryAgency = new DeliveryAgency({})
const keyField = 'id'
const textField = 'name'
const emptyItem = {[textField]: 'loading ...'}
export default {
    data: () => ({
        // Search transaction dates
        dialogm2: false,
        customerList: [],
        dataItemKey: 'id',
        textField: 'name',
        defaultItem: {[textField]: 'Select customer...', [keyField]: null},
        cusBaseUrl: customerHandler.search(),
        filter: '',

        vendorList: [],
        dataItemKey_: 'id',
        textField_: 'name',
        defaultItem_: {[textField]: 'Select supplier...', [keyField]: null},
        supplierBaseUrl: supplierHandler.search(),
        deliveryAgency: deliveryAgency,
        deliveryAgencies: [],
        mCustomer: {},
        mSupplier: {}
    }),
    props: {},
    methods: {
        onEdit(item) {
            this.deliveryAgency = item
            if (item.aType === 1) {
                this.mCustomer = item.cusSup
            } else {
                this.mSupplier = item.cusSup
            }
            this.dialogm2 = true
        },
        close() {
            this.dialogm2 = false
            this.deliveryAgency = deliveryAgency
            this.deliveryAgency.type = 1
            this.mSupplier = {}
            this.mCustomer = {}
        },
        addAgency() {
            this.dialogm2 = true
        },
        async onCreate() {
            this.deliveryAgency.type = 'Delivery Agency'
            if (Object.keys(this.mCustomer).length !== 0 && this.mCustomer.constructor === Object) {
                this.deliveryAgency.cusSup = this.mCustomer
            }
            if (Object.keys(this.mSupplier).length !== 0 && this.mSupplier.constructor === Object) {
                this.deliveryAgency.cusSup = this.mSupplier
            }
            window.console.log(this.deliveryAgency, 'data agency')
            await deliveryOrderHandler.saveDeliveryAgency(this.deliveryAgency).then(res => {
                this.close()
                this.deliveryAgencies.push(res.data.data)
                window.console.log(res, 'create agency')
            })
        },
        async onloadDeliveryAgency() {
            await deliveryOrderHandler.getAllAgency().then(res => {
                this.deliveryAgencies = res
            })
        },
        async onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.showLoading = true
            window.console.log(value)
            this.mCustomer = value
            this.showLoading = false
            // await this.onloadPurchase()
        },
        onFilterChange(event) {
            const filter = event.filter.value
            this.requestData(0, filter, this.cusBaseUrl)
            this.filter = filter
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.afterFetch)
        },
        afterFetch(json) {
            window.console.log(json, 'customer fetch')
            this.customerList = json.data
        },

        async onChange_(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.showLoading = true
            window.console.log(value)
            this.mSupplier = value
            this.showLoading = false
            // await this.onloadPurchase()
        },
        onFilterChange_(event) {
            const filter = event.filter.value
            this.requestData_(0, filter, this.supplierBaseUrl)
            this.filter = filter
        },
        requestData_(skip, filter, baseUrl) {
            const url = baseUrl + `/?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    // window.console.log(response.json())
                    return response.json()
                })
                .then(this.afterFetch_)

        },
        afterFetch_(json) {
            this.vendorList = json.data
        },

    },
    async mounted() {
        await this.onloadDeliveryAgency()
        await this.requestData(0, this.filter, this.cusBaseUrl)
        await this.requestData_(0, '', this.supplierBaseUrl)
    },
    computed: {},
    components: {
        'dropdownlist': DropDownList,
        'k-dialog': Dialog,
        'dialog-actions-bar': DialogActionsBar
    },
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

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

@media (max-width: 576px) {

}
</style>
