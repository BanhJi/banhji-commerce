<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <div class="reports_list">
                        <h2>{{$t('cash_advance_its_tettlements')}}</h2>
                        <v-icon
                                onclick="window.history.go(-1); return false;"
                                style="cursor: pointer; color: #333; font-size: 40px;"
                                class="float-right"
                        >close
                        </v-icon>


                        <div class="report_filter">
                            <v-row>
                                <v-col sm="10" cols="12">
                                    <v-row>
                                        <v-col class="py-0" sm="3" cols="12">
                                            <label class="label">{{$t('period')}}</label>
                                            <v-select class="mt-1"
                                                      :items="dateSorters"
                                                      @change="onSorterChanges"
                                                      @click:clear="start_date = undefined, end_date = undefined"
                                                      clearable
                                                      outlined
                                                      tage="Period"
                                                      placeholder="All"
                                            />

                                            <label class="label">{{$t('account_type')}}</label>
                                            <v-select class="mt-3 "
                                                      :items="account_types"
                                                      item-value="number"
                                                      item-text="name"
                                                      v-model="selectedAccountType"
                                                      @change="onAccountTypeChanges"
                                                      no-data-text="No data found."
                                                      clearable
                                                      tage="Account Type"
                                                      outlined
                                            >
                                                <!-- <template slot='selection' slot-scope='{ item }'>
                                                    {{ item.number }} - {{ item.name }}
                                                </template> -->
                                                <template slot='item' slot-scope='{ item }'>
                                                    {{ item.number }} - {{ item.name }}
                                                </template>
                                            </v-select>

                                        </v-col>
                                        <v-col class="py-0" sm="3" cols="12">
                                            <label class="label">{{$t('from')}}</label>
                                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>

                                            <label class="label">{{$t('account_group')}}</label>
                                            <v-select class="mt-1"
                                                      :disabled="selectedAccountType === undefined"
                                                      :items="account_groups"
                                                      item-value="uuid"
                                                      item-text="name"
                                                      v-model="selectedAccountGroup"
                                                      no-data-text="No data found."
                                                      clearable
                                                      tage="Account Group"
                                                      outlined
                                            />
                                        </v-col>
                                        <v-col class="py-0" sm="3" cols="12">
                                            <label class="label">{{$t('to')}}</label>
                                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>

                                            <label class="label">{{$t('account')}}</label>
                                            <v-select class="mt-1"
                                                      :disabled="selectedAccountType === undefined"
                                                      :items="accounts"
                                                      item-value="uuid"
                                                      item-text="name"
                                                      v-model="selectedAccount"
                                                      @change="onAccountChanges"
                                                      no-data-text="No data found."
                                                      tage="Account"
                                                      clearable
                                                      outlined
                                            >
                                                <!-- <template slot='selection' slot-scope='{ item }'>
                                                    {{ item.number }} - {{ item.name }}
                                                </template> -->
                                                <template slot='item' slot-scope='{ item }'>
                                                    {{ item.number }} - {{ item.name }}
                                                </template>
                                            </v-select>
                                        </v-col>
                                        <v-col sm="2" cols="12" class="dv_mt">
                                            <v-btn class="btn_run_report" @click="search">
                                                {{$t('run_report')}}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col sm="2" cols="12">
                                    <div class="report_export">
                                        <p class="mb-1">{{$t('export_as')}}:</p>
                                        <i class="fa fa-print" style="font-size:34px; padding-right:6px;"
                                           aria-hidden="true"/>
                                        <i class="fa fa-file-excel" style="font-size:34px;padding-right:6px;"
                                           aria-hidden="true"/>
                                        <i class="fa fa-file-pdf" style="font-size:34px;padding-right:6px;"
                                           aria-hidden="true"/>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                        <!-- loading -->
                        <LoadingMe
                                :isLoading="compeletLoading"
                                :fullPage="false"
                                :myLoading="true"/>

                        <div class="report_block">
                            <v-row>
                                <v-col sm="9" cols="12">
                                    <v-row>
                                        <v-col sm="3" cols="12">
                                            <v-card class="pa-3 third rounded-0">
                                                <p class="text">{{$t('no_of_account')}}</p>
                                                <p class="number" v-text="cashMovementDS.numberOfAccount"/>
                                            </v-card>
                                        </v-col>
                                        <v-col sm="6" cols="12">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-card class="pa-3 third rounded-0"
                                                            @click="filterAccountNegativeBalance" v-bind="attrs"
                                                            v-on="on">
                                                        <p class="text">{{$t('no_of_account_with_negative')}}</p>
                                                        <p class="number"
                                                           v-text="cashMovementDS.numberOfAccountWithNegativeBalance"/>
                                                    </v-card>
                                                </template>
                                                <span>Click Me</span>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                </v-col>

                            </v-row>
                        </div>
                        <div class="reports_table">
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0">
                                    <kendo-datasource ref="dataSource"
                                                      :data="cashMovementList"
                                                      :group="groupDefinition"
                                                      :aggregate="aggregateDefinition"
                                                      :group-paging="true"
                                                      :page='1'
                                                      :page-size='100'
                                                      :total='0'>
                                    </kendo-datasource>

                                    <kendo-grid id="gridCM" class="custom_grid"
                                                :data-source-ref="'dataSource'"
                                                :groupable="true"
                                                :sortable="true"
                                                :column-menu="true"
                                                :reorderable="true"
                                                :resizable="true"
                                                :noRecords="true"
                                                :navigatable="true"
                                                :pageable-always-visible="true"
                                                :pageable-page-sizes="[20, 50, 100, 'all']"
                                                :toolbar="['excel']"
                                                :excel-file-name="'generalLedger.xlsx'"
                                                :excel-filterable="true">
                                        <kendo-grid-column
                                                :field="'journal_type'"
                                                :title="$t('type')"
                                                :width="100"
                                                :group-footer-template="'Total:'"
                                        />
                                        <kendo-grid-column
                                                :field="'journal_date'"
                                                :title="$t('date')"
                                                :width="100"
                                                :format="'{0:dd-MM-yyyy}'"
                                        />
                                        <kendo-grid-column
                                                :field="'journal_number'"
                                                :title="$t('txn')"
                                                :template="'<a id=\'jnumber\'>#=journal_number#</a>'"
                                                :width="100"
                                        />
                                        <kendo-grid-column
                                                :field="'description'"
                                                :title="$t('description')"
                                                :width="150"
                                        />
                                        <kendo-grid-column
                                                :field="'name'"
                                                :attributes="{class:'tb_name_td'}"
                                                :title="$t('name')"
                                                :width="140"
                                                :hidden="true"
                                        />
                                        <kendo-grid-column
                                                :field="'account'"
                                                :title="$t('account')"
                                                :width="140"
                                                :hidden="true"
                                                :group-header-template="'#=value#'"
                                        />
                                        <kendo-grid-column
                                                :field="'dr'"
                                                :title="$t('debit')"
                                                :format="'{0:n}'"
                                                :width="110"
                                                :aggregates="['sum']"
                                                :group-footer-template="'<div style=text-align:right>#=kendo.toString(sum, `n`)#</div>'"
                                                :headerAttributes="{
												style: 'text-align: right;'
											}"
                                                :attributes="{
												style: 'text-align: right;'
											}"
                                        />
                                        <kendo-grid-column
                                                :field="'cr'"
                                                :title="$t('credit')"
                                                :format="'{0:n}'"
                                                :width="110"
                                                :aggregates="['sum']"
                                                :group-footer-template="'<div style=text-align:right>#=kendo.toString(sum, `n`)#</div>'"
                                                :headerAttributes="{
												style: 'text-align: right;'
											}"
                                                :attributes="{
												style: 'text-align: right;'
											}"
                                        />
                                        <kendo-grid-column
                                                :field="'balance'"
                                                :title="$t('balance')"
                                                :format="'{0:n}'"
                                                :width="140"
                                                :group-header-column-template="openBalanceTemplate"
                                                :groupHeaderColumnAttributes="{
												style: 'text-align: right; '
											}"
                                                :headerAttributes="{
												style: 'text-align: right; '
											}"
                                                :attributes="{
												style: 'text-align: right'
											}"
                                        />
                                    </kendo-grid>
                                </v-col>
                            </v-row>
                        </div>

                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import kendo from '@progress/kendo-ui'
    import LoadingMe from '@/components/Loading'
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
    import router from '@/router/index.js'

    const $ = require("jquery")
    
    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();

    const accountTypeHandler = require("@/scripts/handler/accounting/accountType.js")
    const accountGroupHandler = require("@/scripts/handler/accounting/accountGroup.js")
    const accountHandler = require("@/scripts/handler/accounting/account.js")
    const cashMovementHandler = require("@/scripts/cashMovementHandler.js")

    export default {
        name: "CashMovement",
        components: {
            'LoadingMe': LoadingMe,
            'app-datepicker': DatePickerComponent,
        },
        data: () => ({
            start_date: '',
            end_date: '',
            // LoadingMe
            compeletLoading: false,
            dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
            account_types: [],
            account_groups: [],
            accounts: [],
            hasQueryString: false,
            selectedAccountType: undefined,
            selectedAccountGroup: undefined,
            selectedAccount: undefined,
            cashMovementDS: [],
            cashMovementList: [],
            // Kendo dataSource
            groupDefinition: {
                field: "account",
                aggregates: [
                    {field: "dr", aggregate: "sum"},
                    {field: "cr", aggregate: "sum"},
                ]
            },
            aggregateDefinition: [
                {field: "dr", aggregate: "sum"},
                {field: "cr", aggregate: "sum"},
                {field: "balance", aggregate: "sum"},
            ],
        }),
        methods: {
            /* KENDO */
            bindGridOnClick() {
                var xgrid = kendo.jQuery("#gridCM").data("kendoGrid");

                //once triggered this will called whenever a cell in grid is clicked. how to overcome this issue?
                $(xgrid.tbody).on("click", "td", function (e) {
                    var row = $(this).closest("tr")
                    // var curRowIdx = $("tr", xgrid.tbody).index(row);
                    // var colIdx = $("td", row).index(this);
                    var item = xgrid.dataItem(row)
                    if (e.target.id == "jnumber") {
                        // alert("Hello, " + item.id);
                        router.push({path: 'journal/view/' + item.id})
                    }
                })
            },
            openBalanceTemplate(data) {
                let openBal = data.items[0].openBal

                if (openBal > 0) {
                    return '<div style=text-align:right>' + kendo.toString(openBal, 'n') + '</div>'
                } else {
                    return ''
                }
            },
            // On Sorter Changes
            onSorterChanges(val) {
                let today = new Date()

                switch (val) {
                    case "Today":
                        this.start_date = kendo.toString(today, 'yyyy-MM-dd')
                        this.end_date = kendo.toString(today, 'yyyy-MM-dd')

                        break
                    case "This Week":
                        var first = today.getDate() - today.getDay(),
                            last = first + 6;

                        this.start_date = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                        this.end_date = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                        break
                    case "This Month":
                        this.start_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                        this.end_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                        break
                    case "This Year":
                        this.start_date = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                        this.end_date = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                        break
                    default:
                        this.start_date = "";
                        this.end_date = "";
                }
            },
            // On Account Type Changes
            onAccountTypeChanges() {
                // Clear data
                this.account_groups = [];
                this.accounts = [];
                this.selectedAccountGroup = undefined;
                this.selectedAccount = undefined;

                let accountTypeNumber = this.selectedAccountType;
                // Account Group by Account Type
                accountGroupHandler.getByAccountType({
                    params: {
                        acc_type_code: accountTypeNumber
                    }
                }).then(res => {
                    if (res.data.length > 0) {
                        this.account_groups = res.data
                    }
                });

                // Account by Account Type
                accountHandler.getAccountByAccountTypeNumber(accountTypeNumber)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.accounts = res.data
                        }
                    });

                // Filter by account type
                if (this.selectedAccountType && this.cashMovementList.length > 0) {
                    this.filterByAccountType()
                }
            },
            // Search Transaction
            search() {
                let self = this,
                    sdate = this.start_date,
                    edate = this.end_date;

                if (sdate && edate) {
                    sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z'

                    edate = new Date(edate)
                    edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                } else {
                    sdate = 0
                    edate = 0
                }

                // Empty dataSource
                var ds = this.$refs.dataSource.kendoWidget()
                ds.data([])

                this.compeletLoading = true
                cashMovementHandler.getCashMovement({
                    params: {
                        institute_id: instituteId,
                        start_date: sdate,
                        end_date: edate,
                        //account_type_code : 0,
                        //account_group_uuid : 0,
                        //account_uuid 	: 0,
                    }
                })
                    .then(res => {
                        if (res) {
                            this.cashMovementDS = res
                            this.cashMovementList = res.lines

                            if (this.hasQueryString) {
                                /* Set to default = false */
                                this.hasQueryString = false

                                this.filterByAccount()
                            }
                        } else {
                            // Clear cashMovementDS
                            this.cashMovementDS = []
                            this.cashMovementList = []
                        }
                    })
                    .finally(function () {
                        self.compeletLoading = false
                    })
            },
            // Filter account negative balance
            async filterAccountNegativeBalance() {
                new Promise(resolve => {
                    resolve('resolved')

                    if (this.cashMovementDS.numberOfAccountWithNegativeBalance > 0) {
                        this.cashMovementList = this.cashMovementDS.lines.filter(
                            m => (m.dr < 0 || m.cr < 0)
                        )
                    }
                })
            },
            // Filter by account type
            async filterByAccountType() {
                new Promise(resolve => {
                    resolve('resolved')

                    this.cashMovementList = this.cashMovementDS.lines.filter(
                        m => (m.account_type.number == this.selectedAccountType)
                    )
                })
            },
            // On account group changes
            onAccountGroupChanges() {
                // Filter by account type
                if (this.selectedAccountGroup && this.cashMovementList.length > 0) {
                    this.filterByAccount()
                }
            },
            // Filter by account group
            async filterByAccountGroup() {
                new Promise(resolve => {
                    resolve('resolved')

                    this.cashMovementList = this.cashMovementDS.lines.filter(
                        m => (m.account_group.uuid == this.selectedAccountGroup)
                    )
                })
            },
            // On account changes
            onAccountChanges() {
                // Filter by account type
                if (this.selectedAccount && this.cashMovementList.length > 0) {
                    this.filterByAccount()
                }
            },
            // Filter by account
            async filterByAccount() {
                new Promise(resolve => {
                    resolve('resolved')

                    this.cashMovementList = this.cashMovementDS.lines.filter(
                        m => (m.account_id == this.selectedAccount)
                    )
                })
            },
            // Load Obj
            loadObj() {
                let q = this.$route.query
                if ($.isEmptyObject(q) === false) {
                    this.hasQueryString = true
                    this.selectedAccount = q.account_id
                    this.start_date = q.start_date
                    this.end_date = q.end_date
                    this.search()
                }
            },
        },
        watch: {
            // call again the method if the route changes
            '$route': 'loadObj'
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.loadObj()
        },
        mounted() {
            // Call Account Type
            accountTypeHandler.getAll()
                .then(res => {
                    this.account_types = res.data.filter(m => m.number < 6)// Filter Bank Account [1,2,3,4,5]
                })

            this.bindGridOnClick();
        },
    };
</script>
<style scoped>
    .result {
        position: relative;
    }

    .reports_list {
        width: 100%;
        background-color: #fff;
        padding: 20px 20px 5px;
    }

    .report_filter {
        background-color: #EDF1F5;
        padding: 0 20px 5px 20px;
        position: relative;
    }

    .dv_mt {
        margin-top: 60px;
    }

    .report_export {
        position: absolute;
        top: 20px;
    }

    .report_block .v-card.third {
        border: none;
        box-shadow: none;
        min-height: 94px;
        background-color: #2CA01C;
        color: #fff;
        text-transform: uppercase;
    }

    .report_block .v-card.third p.text {
        text-align: left;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .report_block .v-card.third p.number {
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        padding-top: 25px;
        margin-bottom: 0;
    }

    .v-text-field__slot input {
        cursor: pointer !important;
    }

    @media (max-width: 576px) {
        .dv_mt, .dv_mt8 {
            margin-top: 0;
        }

        .reports_list {
            margin-top: 0;
        }
    }
</style>