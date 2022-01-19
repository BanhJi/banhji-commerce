<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <!-- <v-card color="white" class="pa-3 no_border" elevation="0"> -->
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <h2 class="mb-1 font_20">{{ $t("payable_payment_plan") }}</h2>
                        <p class="mb-0">{{ $t("payable_payment_plan_desc") }}</p>
                    </v-col>
                    <v-col sm="3" cols="12" class="pt-2"> 
						<v-btn
							class="capitalize mr-2 float-right white--text"
							to="cash_payment"
							color="primary"
						>
							{{ $t("new_cash_payment") }}
						</v-btn>
					
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
                            @click="loadPayable">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :myLoading="true"
                                type="loading"
                            />
                            <kendo-datasource
                                ref="dataSource"
                                :data="transactions"
                            />
                            <kendo-grid
                                id="gridPayablePlan"
                                class="grid-function"
                                :data-source-ref="'dataSource'"
                                :sortable="false"
                                :groupable="true"
                                :filterable="false"
                                :column-menu="true"
                                :noRecords="true"
                                :editable="false"
                                v-on:databound="dataBound"
                                :scrollable-virtual="true"
                            >
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('date')"
                                    :template="'<span>#=transactionDate#</span>'"
                                    :group-footer-template="'Total: '"
                                    :width="200"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{ class: 'tb_name_td' }"
                                    :template="'<span>#=name#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'empName'"
                                    :title="$t('employee_name')"
                                    :template="'<span>#=empName#</span>'"
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
                                <!--                <kendo-grid-column-->
                                <!--                    :field="'code'"-->
                                <!--                    :title="$t('payment_code')"-->
                                <!--                    :template="'<span>#=code#</span>'"-->
                                <!--                    :width="200"-->
                                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>-->
                                <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('open_amount')"
                                    :template="
                    '<span>#= kendo.toString(amount, decimalFormat)#</span>'
                  "
                                    :width="200"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :aggregates="['sum']"
                                    :group-footer-template="
                    '<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'
                  "
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'paymentTerm'"
                                    :title="$t('term')"
                                    :template="'<span>#=paymentTerm.name#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'overDue'"
                                    :title="$t('over_due')"
                                    :template="'<span>#=overDue#</span>'"
                                    :width="180"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'status'"
                                    :title="$t('status')"
                                    :template="status"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <!--                <kendo-grid-column-->
                                <!--                    :field="'action'"-->
                                <!--                    :title="$t('action')"-->
                                <!--                    :width="120"-->
                                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"-->
                                <!--                    :command="[{  text: 'Receive', click: goToCashPayment , className: 'k-state-disabled status' }]"-->
                                <!--                />-->
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
        async loadPayable() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    const strFilter = "?asOf=" + this.asOf + '&aWeekForward=' + true

                    this.showLoading = true;
                    billingHandler.wcpPayableList(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data;
                            // const result = res.data.result;
                            // this.payableBalance = kendo.toString(
                            //     result.receivableBalance,
                            //     result.decimalFormat
                            // );
                            // this.overDueAmount = kendo.toString(
                            //     result.overDueAmount,
                            //     result.decimalFormat
                            // );
                            // this.tobeCollected = kendo.toString(result.tobeCollected, `n0`);
                            // this.totalVendor = result.supplier;
                            this.showLoading = false;
                        }
                    });
                }, 10);
            });
        },
        dataBound: function (e) {
            const grid = kendo.jQuery("#gridPayablePlan").data("kendoGrid")
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
            let ds = this.$refs.gridCollectionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        receiptRefTemplate(data) {
            let url = `cash_receipt/${data.id}`;
            let args = {
                text: data.receiptReferenceNo,
                url: url,
                data: data,
            };
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
