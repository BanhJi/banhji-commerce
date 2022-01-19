<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <h2 class="mb-0 font_20">{{ $t("payment_option_report") }}</h2>
                <p class="mb-0">{{ $t("payment_option_report_desc") }}</p>
                <!-- loading -->
                <LoadingMe :isLoading="showLoading"
                           :fullPage="false"
                           type="loading"
                           :myLoading="true">
                </LoadingMe>
                <v-row class="">
                    <v-col sm="3" cols="12" class="pb-0">
                        <v-select
                            class="mt-1"
                            :items="dateSorters"
                            @change="onSorterChanges"
                            v-model="mDateSorter"
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

                    <v-col sm="1" cols="1" class="pb-0 pt-4 paddingTop">
                        <v-btn color="primary white--text" @click="searchTransaction">
                            <i class="b-search" style="font-size: 16px; color:#fff"/>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <kendo-datasource
                            ref="gridTransactionDS"
                            :group="group"
                            :data="transactions"/>
                        <kendo-grid
                            id="gridTransaction"
                            class="grid-function"
                            :data-source-ref="'gridTransactionDS'"
                            :sortable="false"
                            :groupable="true"
                            :filterable="false"
                            :column-menu="true"
                            :editable="false"
                            :noRecords="true"
                            :scrollable-virtual="true">
                            <kendo-grid-column
                                :field="'paymentOption.name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('option')"
                                :width="180"
                                :template="'<span>#=paymentOption.name || ``#</span>'"
                                :group-footer-template="'Total:'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5', }"/>
                            <kendo-grid-column
                                :field="'paymentOption.bankName'"
                                :title="$t('bank')"
                                :width="180"
                                :template="'<span>#=paymentOption.bankName || ``#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5', }"/>
                            <kendo-grid-column
                                :field="'paymentOption.bankAccountName'"
                                :title="$t('bank_account')"
                                :width="200"
                                :template="'<span>#=paymentOption.bankAccountName || ``#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5', }"/>
                            <kendo-grid-column
                                :field="'transactionDate'"
                                :title="$t('date')"
                                :width="150"
                                :template="'<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5',}"/>
                            <kendo-grid-column
                                :field="'referenceNo'"
                                :title="$t('invoice_no')"
                                :width="180"
                                :headerAttributes="{ style: 'background-color: #EDF1F5',}"/>
                            <kendo-grid-column
                                :field="'txnReferenceNo'"
                                :title="$t('receipt_number')"
                                :width="180"
                                :headerAttributes="{ style: 'background-color: #EDF1F5',}"/>
                            <kendo-grid-column
                                :field="'paidAmountTobase'"
                                :title="$t('amount')"
                                :width="180"
                                :aggregates="['sum']"
                                :template="'<span>#= kendo.toString(paidAmountTobase, decimalFormat)#</span>'"
                                :group-footer-template="'<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'"
                                :attributes="{ style: 'text-align: right' }"
                                :headerAttributes="{ style: 'background-color: #EDF1F5', }"/>
                            <!--                            <kendo-grid-column-->
                            <!--                                :field="'status'"-->
                            <!--                                :title="$t('status')"-->
                            <!--                                :template="status"-->
                            <!--                                :headerAttributes="{ style: 'background-color: #EDF1F5', }"/>-->
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
export default {
    name: "PaymentRequestList",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: "Today",
        journal_entries: [],
        transactions: [],
        group: {field: "type"},
        showLoading: false,
        isLoaded: false,
        aggregateDefinition: [
            {field: "paidAmountTobase", aggregate: "sum"}
        ],
    }),
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
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
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 31),
                        "yyyy-MM-dd"
                    );
                 break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');
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
        referenceTemplate(data) {
            let url = "";
            if (data.transactionType === "Expenses") {
                url = `expenses/view/${data.id.replace("txn-", "")}`;
            } else {
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
        async searchTransaction() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    const startDate = this.startDate;
                    const endDate = this.endDate;
                    let strFilter = "?start=" + startDate + "&end=" + endDate + '&type=Cash Receipt'

                    billingHandler.paymentOptionReport(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactions = res.data.data;
                        } else {
                            this.showLoading = false;
                        }
                    });
                }, 10);
            });
        },
        status(dataItem) {
            let status = "";
            switch (dataItem.status) {
                case 1:
                    status = "Open";
                    break;
                case 2:
                    status = "Partially Paid";
                    break;
                case 3:
                    status = "Paid";
                    break;
                case 4:
                    status = "Void";
                    break;
            }
            return status;
        },
    },
    mounted() {
        this.group = [
            {
                field: "type",
                aggregates: this.aggregateDefinition
            }
        ]
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
