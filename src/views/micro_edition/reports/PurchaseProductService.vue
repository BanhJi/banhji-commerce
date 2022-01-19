<template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="px-3 no_border" elevation="0">
                <v-row class="">
                    <v-col sm="3" cols="12" class="pb-0">
                        <v-select
                            class="mt-1"
                            :items="dateSorters"
                            v-model="mDateSorter"
                            @change="onSorterChanges"
                            clearable
                            outlined
                            placeholder="ALL"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0 paddingTop">
                        <app-datepicker
                            :initialDate="startDate"
                            @emitDate="startDate = $event"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0 paddingTop">
                        <app-datepicker
                            :initialDate="endDate"
                            @emitDate="endDate = $event"
                        />
                    </v-col>

                    <v-col sm="1" cols="12" class="pb-0 pt-4 paddingTop">
                        <v-btn color="primary white--text" @click="searchTransaction">
                            <i class="b-search" style="font-size: 18px; color:#fff"/>
                        </v-btn>
                    </v-col>
                    <!-- <v-col sm="2" cols="12" class="pb-0 paddingTop">
                      <v-btn icon color="black" class="bg-none float-right ml-2">
                        <v-icon class="font_34">fa fa-file-excel</v-icon>
                      </v-btn>
                      <v-btn icon color="black" class="bg-none float-right ml-2">
                        <v-icon class="font_34">fa fa-print</v-icon>
                      </v-btn>
                    </v-col> -->
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"
                        >
                        </LoadingMe>
                        <kendo-datasource
                            ref="dataSource"
                            :group="group"
                            :data="inventoryList"
                        />
                        <kendo-grid
                            id="gridReceivable"
                            class="grid-function"
                            :data-source-ref="'dataSource'"
                            :sortable="false"
                            :groupable="true"
                            :filterable="false"
                            :column-menu="true"
                            :editable="false"
                            :scrollable-virtual="true"
                        >
                            <kendo-grid-column
                                :field="'type'"
                                :title="$t('type')"
                                :template="'<span>#=type#</span>'"
                                :width="150"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'transactionDate'"
                                :title="$t('date')"
                                :template="
                  '<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'
                "
                                :width="150"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'name'"
                                :title="$t('supplier')"
                                :template="'<span>#=name#</span>'"
                                :width="200"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'referenceNo'"
                                :title="$t('reference_no')"
                                :template="referenceTemplate"
                                :width="200"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'item'"
                                :title="$t('item')"
                                :template="'<span>#=item#</span>'"
                                :attributes="{ class: 'tb_name_td' }"
                                :width="200"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />

                            <kendo-grid-column
                                :field="'uom'"
                                :title="$t('txn_uom')"
                                :template="'<span>#=uom || ``#</span>'"
                                :width="150"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'qty'"
                                :title="$t('qty')"
                                :template="'<span>#=kendo.toString(qty, decimalFormat)#</span>'"
                                :width="100"
                                :attributes="{ style: 'text-align: right' }"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'cost'"
                                :title="$t('cost')"
                                :template="
                  '<span>#=kendo.toString(cost, decimalFormat)#</span>'
                "
                                :width="100"
                                :attributes="{ style: 'text-align: right' }"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <!--                            <kendo-grid-column-->
                            <!--                                :field="'additionalCost'"-->
                            <!--                                :title="$t('addlc')"-->
                            <!--                                :template="-->
                            <!--                  '<span>#=kendo.toString(additionalCost, decimalFormat)#</span>'-->
                            <!--                "-->
                            <!--                                :width="200"-->
                            <!--                                :attributes="{ style: 'text-align: right' }"-->
                            <!--                                :headerAttributes="{-->
                            <!--                  style: 'background-color: #EDF1F5',-->
                            <!--                }"-->
                            <!--                            />-->
                            <kendo-grid-column
                                :field="'discountExchangeAmount'"
                                :title="$t('discount')"
                                :width="150"
                                :template="'<span>#=kendo.toString(discountExchangeAmount, decimalFormat)#</span>'"
                                :filterable="false"
                                :attributes="{style: 'text-align: right; '}"
                                :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:right' }"/>
                            <kendo-grid-column
                                :field="'segment.name'"
                                :title="$t('segment')"
                                :width="200"
                                :attributes="{style: 'text-align: left; '}"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'location.name'"
                                :title="$t('location')"
                                :width="200"
                                :attributes="{style: 'text-align: left; '}"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'project.name'"
                                :title="$t('project')"
                                :width="200"
                                :attributes="{style: 'text-align: left; '}"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                        <!--                            <kendo-grid-column-->
                        <!--                                :field="'exchangeAmount'"-->
                        <!--                                :title="$t('amount')"-->
                        <!--                                :template="-->
                        <!--                  '<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'-->
                        <!--                "-->
                        <!--                                :width="180"-->
                        <!--                                :attributes="{ style: 'text-align: right' }"-->
                        <!--                                :headerAttributes="{-->
                        <!--                  style: 'background-color: #EDF1F5',-->
                        <!--                }"-->
                        <!--                            />-->
                        </kendo-grid>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const TRANSACTION_TYPE = "Purchase";
export default {
    name: "PurchaseProductService",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        // BankConnection,
    },
    data: () => ({
        showLoading: false,
        mDateSorter: "Today",
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ["Today", "This Week", "This Month", "This Year"],
        group: {field: "itemName"},
        isLoaded: false,
        inventoryList: [],
    }),
    methods: {
        onSorterChanges(val) {
            let today = new Date();
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, "yyyy-MM-dd");
                    this.endDate = kendo.toString(today, "yyyy-MM-dd");

                    break;
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6;

                    this.startDate = kendo.toString(
                        new Date(today.setDate(first)),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.setDate(last)),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Month":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 1),
                        "yyyy-MM-dd"
                    );
                    today = new Date()
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 31),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Year":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), 0, 1),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), 11, 31),
                        "yyyy-MM-dd"
                    );

                    break;
                default:
                    this.startDate = "";
                    this.endDate = "";
            }
        },
        async searchTransaction() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    const startDate = this.startDate;
                    const endDate = this.endDate;
                    const strFilter =
                        "?start=" +
                        startDate +
                        "&end=" +
                        endDate +
                        "&type=" +
                        TRANSACTION_TYPE + '&detail=1';
                    billingHandler.listPurchase(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.inventoryList = res.data.data;
                            // const result = res.data.result
                            // this.totalRevenue = kendo.toString(result.Revenue, result.decimalFormat)
                            // this.totalSaleLead = kendo.toString(result.SaleLead, result.decimalFormat)
                            // this.totalSaleOrder = kendo.toString(result.SaleOrder, result.decimalFormat)
                            // this.totalSaleQuote = kendo.toString(result.SaleQuote, result.decimalFormat)
                        }
                        this.showLoading = false;
                    });
                }, 10);
            });
        },
        // async searchTransaction() {
        //     new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve("resolved");
        //             this.showLoading = true;
        //             const startDate = this.startDate;
        //             const endDate = this.endDate;
        //             /* todo:
        //             *  type: filter only transaction type as Purchase
        //             *  item: 0 is Variant and Transaction Item , 1 is Service , 2 none of them
        //             *  group: 0 is from function [ Invoice , Purchase , Credit Memo, Debit Memo, Inventory Adjustment, Production , Production Order ]
        //             *  group: 1 is from function [ Invoice , Purchase , Credit Memo, Debit Memo ]
        //             *  group: 2 is none of them
        //             * */
        //             const strFilter =
        //                 "?start=" + startDate + "&end=" + endDate + "&type=Purchase&item=2&group=2"; // not item nor service
        //             billingHandler.inventoryListByFunction(strFilter).then((res) => {
        //                 if (res.data.statusCode === 200) {
        //                     this.inventoryList = res.data.data;
        //                 }
        //                 this.showLoading = false;
        //             });
        //         }, 10);
        //     });
        // },
        referenceTemplate(data) {
            let url = `credit_purchase_view/${data.id}`;
            if (data.type === "Purchase") {
                url = `credit_purchase_view/${data.id}`;
            }
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            };
            return {
                template: LinkTemplate,
                templateArgs: args,
            };
        },
    },
    mounted() {
    },
    computed: {},
};
</script>
<style scoped>
@media (max-width: 576px) {
    .paddingTop {
        padding-top: 0 !important;
    }
}

.b-search:before {
    color: #fff !important;
}
</style>
