<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <!-- <v-card color="white" class="pa-3 no_border" elevation="0"> -->
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <h2 class="mb-1 font_20">{{ $t("collection_list") }}</h2>
                        <p class="mb-0">{{ $t("collection_list_desc") }}</p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <label class="label text-uppercase">{{ $t("as_of") }}</label>
                        <app-datepicker
                            :initialDate="asOf"
                            @onChanged="lastDayOfWeek"
                            @emitDate="asOf = $event"/>
                    </v-col>
                    <v-col sm="3" cols="12" class="py-0 pr-0">
                        <label class="label">{{ $t("last_day_of_week") }}</label>
                        <p class="text-bold pt-4">{{ weekSay }}</p>
                    </v-col>
                    <v-col sm="1" cols="12" class="pt-6 pl-0">
                        <v-btn
                            class="btn_search"
                            style="background-color: rgb(237, 241, 245);margin-top: 2px;"
                            @click="loadCollectionList">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <!--                <v-row class="mt-0">-->
                <!--                    <v-col sm="4" cols="12" class="pt-0">-->
                <!--                        <v-card-->
                <!--                            outlined-->
                <!--                            dense-->
                <!--                            class="pa-3 rounded-4 no_border white&#45;&#45;text "-->
                <!--                            color="secondary"-->
                <!--                            height="60px">-->
                <!--                            <h3 class="text-left flex-1 font_12 text-uppercase">-->
                <!--                                {{ $t("invoices_to_be_collected") }}-->
                <!--                            </h3>-->
                <!--                            <h3 class="text-right flex-1 font_20">-->
                <!--                                {{ collectedInvoice }}-->
                <!--                            </h3>-->
                <!--                        </v-card>-->
                <!--                    </v-col>-->
                <!--                    <v-col sm="4" cols="12" class="pt-0">-->
                <!--                        <v-card-->
                <!--                            outlined-->
                <!--                            dense-->
                <!--                            class="pa-3  no_border white&#45;&#45;text "-->
                <!--                            color="third"-->
                <!--                            height="60px"-->
                <!--                        >-->
                <!--                            <h3 class="text-left flex-1  font_12 text-uppercase">-->
                <!--                                {{ $t("total_collected_amount") }}-->
                <!--                            </h3>-->
                <!--                            <h3 class="text-right flex-1 font_20">-->
                <!--                                {{ numberFormat(collectedAmount) }}-->
                <!--                            </h3>-->
                <!--                        </v-card>-->
                <!--                    </v-col>-->
                <!--                    <v-col sm="4" cols="12" class="pt-0">-->
                <!--                        <v-card-->
                <!--                            outlined-->
                <!--                            dense-->
                <!--                            class="pa-3 rounded-4 no_border black&#45;&#45;text "-->
                <!--                            color="grayBg"-->
                <!--                            height="60px"-->
                <!--                        >-->
                <!--                            <h3 class="text-left flex-1  font_12 text-uppercase">-->
                <!--                                {{ $t("overdue_invoice_collected") }}-->
                <!--                            </h3>-->
                <!--                            <h3 class="text-right flex-1 font_20">-->
                <!--                                {{ collectedInvoiceOverDue }}-->
                <!--                            </h3>-->
                <!--                        </v-card>-->
                <!--                    </v-col>-->
                <!--                </v-row>-->
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :myLoading="true"
                                type="loading"
                            />
                            <kendo-datasource ref="collectionListDS"
                                              :group="group"
                                              :data="transactions"/>
                            <kendo-grid id="gridReceivableCollectionList" class="grid-function"
                                        :data-source-ref="'collectionListDS'"
                                        :sortable="true"
                                        :groupable="true"
                                        :filterable="false"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :resizable="true"
                                        :editable="false"
                                        :excel-file-name="'Receivable Balance Detail.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('date')"
                                    :template="'<span>#= kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                                    :group-footer-template="'Total: '"
                                    :width="180"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :template="'<span>#=name#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('invoice_no')"
                                    :template="referenceTemplate"
                                    :width="180"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'code'"
                                    :title="$t('payment_code')"
                                    :template="'<span>#=code#</span>'"
                                    :width="180"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('open_amount')"
                                    :template="'<span>#= kendo.toString(amount, decimalFormat)#</span>'"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :aggregates="['sum']"
                                    :footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
                                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'paymentTerm'"
                                    :title="$t('term')"
                                    :template="'<span>#=paymentTerm#</span>'"
                                    :width="150"
                                    :attributes="{style: 'text-align: center; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;text-align:center' }"/>
                                <kendo-grid-column
                                    :field="'overDue'"
                                    :title="$t('over_due')"
                                    :template="'<span>#=overDue#</span>'"
                                    :width="150"
                                    :attributes="{style: 'text-align: center; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;text-align: center'}"/>
                                <kendo-grid-column
                                    :field="'dueDate'"
                                    :title="$t('due_date')"
                                    :template="'<span>#= kendo.toString(new Date(dueDate), dateFormat)#</span>'"
                                    :width="150"
                                    :attributes="{style: 'text-align: center; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;text-align:center'}"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :title="$t('status')"
                                    :template="status"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/cash-receipt/model/ItemLine";
import $ from "jquery";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const itemLineModel = new ItemLineModel({});
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        group: {field: "name"},
        transactions: [],
        dateFormat: itemLineModel.dateFormat,
        showLoading: false,
        collectedAmount: 0,
        collectedInvoice: 0,
        collectedInvoiceOverDue: 0,
        decimalFormat: "n2",
        aggregateDefinition: [
            {field: "amount", aggregate: "sum"}
        ],
        weekSay: ''
    }),
    components: {
        'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent'),
        LoadingMe: () => import(`@/components/Loading`)
    },
    methods: {
        lastDayOfWeek() {
            const curr = new Date(this.asOf); // get current date
            const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
            const last = first + 6; // last day is the first day + 6
            this.weekSay = new Date(curr.setDate(last)).toISOString().substr(0, 10)
        },
        async loadCollectionList() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const strFilter = '?asOf=' + this.asOf + '&detail=' + 1
                    this.showLoading = true
                    this.transactions = []
                    billingHandler.dashboardReceivableOverview(strFilter).then(res => {
                        window.console.log(res.data.statusCode, 'filter')
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.transactions = res.data.data

                        } else {
                            this.showLoading = false
                        }
                    })
                }, 10)
            })
        },
        dataBound: function (e) {
            const grid = kendo.jQuery("#gridReceivableCollectionList").data("kendoGrid")
            const items = e.sender.items()
            items.each(function () {
                let dataItem = grid.dataItem(this);
                $("tr[data-uid='" + dataItem.uid + "']").find(".status").each(function () {
                    if (dataItem.status !== 3) {
                        $(this).removeClass('k-state-disabled')
                    }
                })
            })
        },
        referenceTemplate(data) {
            let url = `invoice_view/${data.id}`
            if (data.type === 'Invoice') {
                url = `invoice_view/${data.id}`
            } else if (data.type === 'Sale Quote') {
                url = `sale_quote_view/${data.id}`
            } else if (data.type === 'Delayed Invoice') {
                url = `delayed_invoice_view/${data.id}`
            }
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        numberFormat(value) {
            return kendo.toString(value, `${this.decimalFormat}`);
        },
        transactionDate(dataItem) {
            return kendo.toString(
                new Date(dataItem.transactionDate),
                `${this.dateFormat}`
            );
        },
        goToConvert() {
        },
        source(dataItem) {
            if (dataItem.hasOwnProperty("paymentOption")) {
                if (dataItem.paymentOption.hasOwnProperty("name")) {
                    return dataItem.paymentOption.name;
                }
            }
            return "";
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.collectionListDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        receiptRefTemplate(data) {
            const url = `cash_receipt/${data.id}`;
            const args = {
                text: data.receiptReferenceNo,
                url: url,
                data: data,
            };
            // window.console.log('data', data.receiptReferenceNo)
            return {
                template: LinkTemplate,
                templateArgs: args,
            };
        },
        invoiceRefTemplate(data) {
            let url = `invoice_view/${data.txnId}`;
            let args = {
                text: data.txnReferenceNo,
                url: url,
                data: data,
            };
            return {
                template: LinkTemplate,
                templateArgs: args,
            };
        },
        status(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("status")) {
                    const status = dataItem.status;
                    let statusText = "";
                    switch (status) {
                        case 1:
                            statusText = "OPEN";
                            break;
                        case 2:
                            statusText = "Partially Paid";
                            break;
                        case 4:
                            statusText = "VOID";
                            break;
                        case 3:
                            statusText = "PAID";
                            break;
                    }
                    return statusText;
                }
            }
            return "";
        },
    },
    computed: {},
    mounted: async function () {
        this.group = [
            {
                field: "name",
                aggregates: this.aggregateDefinition,
            }
        ]
        this.lastDayOfWeek()
    }
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.b-search:before {
    color: #fff !important;
}

</style>
