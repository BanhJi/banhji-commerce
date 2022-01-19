<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <h2 class="mb-1 font_20">{{ $t("debit_note") }}</h2>
                        <p class="mb-0">{{ $t("debit_not_desc") }}</p>
                    </v-col>
                    <v-col sm="3" cols="12" class="pt-2"> 
						<v-btn
							class="capitalize mr-2 float-right white--text"
							to="purchase_return"
							color="primary"
						>
							{{ $t("new_debit_note") }}
						</v-btn>
					
					</v-col>
                </v-row>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true">

                </LoadingMe>
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <v-select class="mt-1"
                                  :items="dateSorters"
                                  v-model="mDateSorter"
                                  @change="onSorterChanges"
                                  clearable
                                  outlined
                                  placeholder="ALL"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="startDate" @emitDate="startDate = $event"/>
                    </v-col>

                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="endDate" @emitDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="1" class="pt-1">
                        <v-btn color="primary white--text" @click="searchTransaction('')">
                            <i class="b-search" style="font-size: 18px; color:#fff"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="gridTransactionDS"
                                              :type="'JSON'"
                                              :data="transactions"
                                              :group="group"
                                              :server-paging="false"/>
                            <kendo-grid id="gridTransactionMemo" class="grid-function"
                                        :data-source-ref="'gridTransactionDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :column-menu="true"
                                        :noRecords="true"
                                        @pagechange="pageChangeHandler"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('date')"
                                    :width="120"
                                    :template="dateFormat"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :width="200"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('reference_no')"
                                    :width="200"
                                    :template="referenceTemplate"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'exchangeAmount'"
                                    :title="$t('amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :width="100"
                                    :command="[{  text: 'Edit', click: goToEdit }]"
                                    :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import CreditMemoModel from "@/scripts/sale_return/model/CreditMemo";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const $ = require("jquery")
const creditMemoModel = new CreditMemoModel({})
export default {
    name: "DebitMemoTransaction",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: 'Today',
        showLoading: false,
        transactions: [],
        tranDS: [],
        isLoaded: false,
        creditMemo: creditMemoModel,
        totalRevenue: 0,
        totalSaleLead: 0,
        totalSaleQuote: 0,
        totalSaleOrder: 0,
        group: {field: 'name'},
    }),
    methods: {
        pageChangeHandler: function (event) {
            alert("change", event);
        },
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    today = new Date()
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')
                 break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');
                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        referenceTemplate(data) {
            let url = `purchase_return_view/${data.id}`
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
        goToEdit(e) {
            e.preventDefault()
            let grid = kendo.jQuery("#gridTransactionMemo").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            const txnId = dataItem.id
            this.$router.push({
                path: 'purchase_return/' + txnId,
                name: 'Purchase Return',
                params: {id: txnId},
                query: {type: 'Edit'}
            })
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },

        async searchTransaction(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    let strFilter = ''
                    if (type !== '') {
                        strFilter = '?start=' + startDate + '&end=' + endDate + '&type=' + type
                    } else {
                        strFilter = '?start=' + startDate + '&end=' + endDate
                    }

                    billingHandler.debitMemoList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data
                        }
                        this.showLoading = false
                    })
                }, 300);
            })
        },
        dateFormat(dataItem) {
            return kendo.toString(new Date(dataItem.transactionDate), `${this.creditMemo.dateFormat}`)
        },
        callback() {
            // if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
            //     const data = this.$route.params.data
            //     if (data.transactionType === 'delete') {
            //         this.loadTransactions()
            //     }
            // }
            // window.console.log('im changed', this.$route.params)
        },
        // tranDS: function () {
        //     let vue = this
        //     const startDate = this.startDate
        //     const endDate = this.endDate
        //     let strFilter = ''
        //     strFilter = '?start=' + startDate + '&end=' + endDate
        //     return new kendo.data.DataSource({
        //         transport: {
        //             read: {
        //                 url: 'https://dev-apis.banhji.com/invoice-billings/invoice/institute/institute-0ab24220-808d-11ea-9131-1d2fe2a803b1/list/' + strFilter,
        //                 type: 'GET',
        //                 dataType: 'json'
        //             }
        //         },
        //         schema: {
        //             total: function (response) {
        //                 return response.total
        //             },
        //             data: function (response) {
        //                 return response.data
        //             },
        //             // total: function (response) {
        //             //     return response.total
        //             // }
        //         },
        //         pageable: true,
        //         pageSize: 20,
        //         serverPaging: true,
        //         // testing the change event handler
        //         change: function (e) {
        //             let data = this.data()
        //             window.console.log(data, e)
        //         },
        //         requestStart: function () {
        //             vue.loading = true
        //         },
        //         requestEnd: function () {
        //             vue.loading = false
        //         }
        //     })
        // },
    },
    mounted: async function () {
        // await this.loadTransactions()
    },
    computed: {},
    watch: {
        // '$route': 'callback'
    }
};
</script>
<style scoped>
.b-search:before{
    color: #fff !important;
}

</style>