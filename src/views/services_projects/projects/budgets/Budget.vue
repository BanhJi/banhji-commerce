<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card elevation="0" class="pt-2 mb-3">
                                <h2 class="mb-0">{{ $t("budget") }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            
                            <v-card
                                outlined
                                class="px-4 no_border pt-4 pb-3"
                                color="grayBg"
                                min-height="98px"
                            >
                                <v-row>
                                    <v-col sm="3" cols="12" class="pb-0 pr-2">
                                        <label class="label">{{ $t("name") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            v-model="budget.name"
                                            :placeholder="$t('name')"
                                            outlined
                                            required
                                        />
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0 px-2">
                                        <label class="label">{{ $t("project") }}</label>
                                        <app-segment-dropdownlist
                                            :initSegment="segment"
                                            @emitSegment="segment = $event"
                                        />
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0 px-0">
                                        <label class="label">{{ $t("fiscal_year") }}</label>
                                        <app-fiscal-date-dropdownlist
                                            :initFiscalDate="budget.fiscal_year"
                                            @emitFiscalDate="budget.fiscal_year = $event"
                                            @onChanged="onFiscalDateChanges"
                                        />
                                    </v-col>
                                    <v-col sm="2" cols="12" class="pb-0 pl-2 pt-9 text-center">
                                        <v-checkbox
                                            v-model="budget.use_consolidation"
                                            true-value="1"
                                            false-value="0"
                                            :label="'used for consolidation'" />
                                    </v-col>
                                </v-row>
                            </v-card>
    
                            <v-card
                                outlined
                                class="rounded-4 mt-4"
                                color="white"
                                min-height="98px"
                            >
                                <v-row>
                                    <v-col sm="3" cols="12" class="">
                                        <div class="report_expor">
                                            <label class="mb-1">{{ $t("language") }}:</label>
                                            <app-reporting-language
                                                :initLanguage="reportingLanguage"
                                                @emitLanguage="reportingLanguage = $event"
                                                @onChanged="onReportingLanguageChanges"
                                            />
                                        </div>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col sm="12" cols="12" class="">
                                        <kendo-datasource ref="budgetLineDS"
                                            :data="budgetLines"
                                            :schema="schemaDefinition"
                                            :sort="sortDefinition"
                                            :group="groupDefinition"
                                            :change="onDataSourceChanges" />

                                        <kendo-grid ref="budgetLineGrid" class="custom_grid" 
                                            :data-source-ref="'budgetLineDS'"
                                            :sortable="true"
                                            :column-menu="true"
                                            :resizable="true"
                                            :noRecords="true"
                                            :editable="true">
                                            <kendo-grid-column
                                                :field="'account'"
                                                :title="$t('account')"
                                                :template="'<span>#=account.number#</span> <span>#=account.name#</span>'"
                                                :groupHeaderColumnTemplate="'<div>#=value#</div>'"
                                                :width="350"
                                                :headerAttributes="{
                                                    style:'background-color: #EDF1F5;',
                                                    class:'text-products',
                                                }"
                                                :attributes="{
                                                    style:'text-align: products',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'account'"
                                                :title="$t('local_name')"
                                                :template="'<span>#=account.number#</span> <span>#=account.local_name#</span>'"
                                                :groupHeaderColumnTemplate="'<div>#=value#</div>'"
                                                :width="350"
                                                :hidden="true"
                                                :headerAttributes="{
                                                    style:'background-color: #EDF1F5;',
                                                    class:'text-products',
                                                }"
                                                :attributes="{
                                                    style:'text-align: products',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'note'"
                                                :title="$t('note')"
                                                :width="200"
                                            />
                                            <kendo-grid-column
                                                :title="$t('action')"
                                                :command="{ text: `Copy Across`, click: copyAcross }"
                                                :width="150"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[0].amount'"
                                                :title="$t(fiscalMonths[0])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right; padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[1].amount'"
                                                :title="$t(fiscalMonths[1])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right;padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[2].amount'"
                                                :title="$t(fiscalMonths[2])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right;padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[3].amount'"
                                                :title="$t(fiscalMonths[3])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right; padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[4].amount'"
                                                :title="$t(fiscalMonths[4])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right; padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[5].amount'"
                                                :title="$t(fiscalMonths[5])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right;padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[6].amount'"
                                                :title="$t(fiscalMonths[6])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right; padding-right:35px;background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[7].amount'"
                                                :title="$t(fiscalMonths[7])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right;padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[8].amount'"
                                                :title="$t(fiscalMonths[8])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right; padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[9].amount'"
                                                :title="$t(fiscalMonths[9])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right;padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[10].amount'"
                                                :title="$t(fiscalMonths[10])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right;padding-right:35px; background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'monthly_amount[11].amount'"
                                                :title="$t(fiscalMonths[11])"
                                                :format="'{0:n}'"
                                                :editor="NumberInputBoxEditor"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right; padding-right:35px;background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'amount'"
                                                :title="$t('total')"
                                                :format="'{0:n}'"
                                                :width="150"
                                                :headerAttributes="{
                                                    style:'text-align: right; padding-right:35px;background-color: #EDF1F5',
                                                }"
                                                :attributes="{
                                                    style:'text-align: right; ',
                                                }"
                                            />
                                        </kendo-grid>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <LoadingMe
                                type="loading"
                                :isLoading="showLoading"
                                :myLoading="true"
                                :fullPage="true" />
                            
                            <!-- <v-divider /> -->
                            <v-card outlined dense class="no_border  function_footer">
                                <v-alert
                                    type="warning"
                                    v-model="alert"
                                    dismissible
                                >
                                    <span v-html="errorMessage"/>
                                </v-alert>

                                <v-btn
                                    color="black"
                                    class="text-capitalize  white--text float-left"
                                    @click="cancel"
                                >{{ $t("cancel") }}
                                </v-btn>
                                <v-btn
                                    class="float-right text-capitalize  white--text"
                                    color="primary"
                                    @click="onSaveOptionClick(SaveOption.SAVECLOSE)"
                                >
                                    {{ $t("save_close") }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from '@/i18n'
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import BudgetModel from "@/scripts/model/Budget.js";
import BudgetLineModel from "@/scripts/model/BudgetLine.js";
import AccountModel from "@/scripts/model/accounting/Account.js";
import SegmentModel from "@/scripts/model/Segment.js";
import NumberInputBoxEditor from "@/scripts/kendo_editor/NumberInputBox.js";

/* Store */
import store from "@/store"
const institute = store.state.institute.institute

const accountHandler = require("@/scripts/handler/accounting/account.js");
const budgetHandler = require("@/scripts/handler/workingcapital/budgetHandler.js");
const { SaveOption } = require("@/scripts/default_setup/Collections");

export default {
    name: "Budget",
    components: {
        "LoadingMe": () => import('@/components/Loading'),
        "app-segment-dropdownlist": () => import('@/components/dropdownlist/Segment'),
        "app-fiscal-date-dropdownlist": () => import('@/components/kendo_templates/FiscalDateDropDownList'),
        "app-reporting-language": () => import("@/components/kendo_templates/ReportingLanguageDropDownList"),
    },
    data: () => ({
        // Obj
        budget: new BudgetModel(),
        budgetLines: [],
        segment: new SegmentModel(),
        accounts : [],// type 32-43
        fiscalMonths : Helper.generateFiscalMonths(institute.fiscalDate[0].start_date, institute.fiscalDate[0].end_date, "12"),
        user: Helper.getUser(),
        // Form validation
        valid: true,
        isEdit: false,
        alert: false,
        errorMessage: "",
        saveMode: "",
        SaveOption: SaveOption,
        // Reporting Language
        reportingLanguage: "english",
        // LoadingMe
        showLoading: false,
        /* Kendo */
        NumberInputBoxEditor: NumberInputBoxEditor,
        sortDefinition : { field: "account.number", dir: "asc" },
        schemaDefinition	: {
            model:{ id: "uuid" }
        },
        groupDefinition : {
            field: "account.account_type.name",
            compare: function(a, b) {
                if (a.items[0].account.number === b.items[0].account.number) {
                    return 0;
                } else if (a.items[0].account.number > b.items[0].account.number) {
                    return 1;
                } else {
                    return -1;
                }
            }
        },
    }),
    methods: {
        // Initial Data
        initialData() {
            // Access Query String
			let q = this.$route.params;
			if (q.id !== undefined) {// Edit Mode
                if(q.id !== this.budget.uuid){
					this.showLoading = true;
					budgetHandler.getOne(q.id)
					.then(res => {
						// Bind Obj
						this.budget = new BudgetModel(res.data);
						this.bindData();
					})
					.finally(() => {
						self.showLoading = false;
					});
				}
            } else {// Brand New Mode
                this.setDefaultData();
            }
        },
        // Set default data
        setDefaultData() {
            // Brand New Mode
            this.isEdit = false;
            
            this.budget = new BudgetModel({
                fiscal_year: institute.fiscalDate[0],
            });
            this.setDefaultBudgetLine();
        },
        // Bind data for edit mode
        async bindData() {
            // Edit Mode
            this.isEdit = true;

            /* Segment */
            let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.id === this.budget.segment_uuid));
            
            this.setDefaultBudgetLine();
        },
        // Set Budget Lines
        async setDefaultBudgetLine (){
            this.showLoading = true;

            // Account
			let accounts = await accountHandler.getAll();
            
            let lines = [];
            accounts.data.forEach(value => {
                if(value.account_type.number >= 32 && value.account_type.number <= 43){//Filter PL accounts
                    let line = new BudgetLineModel();
                    line.account_uuid = value.uuid;
                    
                    // Month of with amount
                    let monthOfAmountList = [];
                    for (let i = 0; i < 12; i++) {
                        // Set Month Of
                        let sdate = new Date(this.budget.fiscal_year.start_date);
                        sdate.setMonth(sdate.getMonth() + i);

                        monthOfAmountList.push({
                            month_of    : sdate.toISOString().substr(0, 7),
                            amount      : 0,
                        });
                    }
                    line.monthly_amount = monthOfAmountList;

                    /* Matching Account */
                    if(this.isEdit){
                        this.budget.lines.forEach(element => {
                            if(element.account_uuid === value.uuid){
                                line = new BudgetLineModel(element);

                                /* Reverse Nature */
                                let nature = 1; /* Default Naure is Dr = 1 */
                                if(value.account_type.nature.toLowerCase() === "cr"){
                                    nature = -1;
                                }

                                line.amount = element.amount * nature;
                                element.monthly_amount.forEach(ma => {
                                    ma.amount = ma.amount * nature;
                                });

                                return false;
                            }
                        });
                    }

                    /* Set account object */
                    line.account = new AccountModel(value);
                    
                    // Add line
                    lines.push(line);
                }
            });
            
            /* Bind Budget Line */
            this.budgetLines = lines;

            this.showLoading = false;
        },
        /* On Fiscal Date Changes */
        onFiscalDateChanges(){
            this.fiscalMonths = Helper.generateFiscalMonths(this.budget.fiscal_year.start_date, this.budget.fiscal_year.end_date, "12");
            this.setDefaultBudgetLine();
        },
        // Copy Across
        copyAcross (e){
            e.preventDefault();

            let grid = this.$refs.budgetLineGrid.kendoWidget(),
                dataItem = grid.dataItem(kendo.jQuery(e.target).closest("tr"));
            
            let amt = 0;
            dataItem.monthly_amount.forEach((value, index) => {
                if(index === 0){
                    amt = value.amount;
                }else{
                    value.amount = amt;
                }
            });
            dataItem.set("amount", amt * 12);

            grid.refresh();
        },
        // DataSource Changes
        onDataSourceChanges() {
            this.dataSourceAutoCalculate();
        },
        // Auto Calculate In DataSource
        dataSourceAutoCalculate() {
            let ds = this.$refs.budgetLineDS.kendoWidget();

            // Sum Amount
            ds.data().forEach(value => {
                let sumAmt = 0;
                value.monthly_amount.forEach(ele => {
                    sumAmt += ele.amount;
                });
                value.set("amount", sumAmt);
            });
        },
        // Shrink Data
        shrinkData() {
            // Segment
            this.budget.segment_uuid = this.segment.id;

            // Lines
            let ds = this.$refs.budgetLineDS.kendoWidget(),
                lines = [];
            ds.data().forEach(value => {
                // Add account line with amount not 0
                if(value.amount !== 0){
                    window.console.log(value)
                    /* Apply Nature */
                    if(value.account.account_type.nature.toLowerCase() === "cr"){
                        /* Amount */
                        value.amount = value.amount * -1;

                        /* Monthly Amount */
                        value.monthly_amount.forEach(ele => {
                            ele.amount = ele.amount * -1;
                        });
                    }

                    lines.push(new BudgetLineModel(value));
                }
            });
            this.budget.lines = lines;

            // User
            if (this.isEdit) {
                this.budget.modified_by = this.user;
            } else {
                this.budget.created_by = this.user;
            }
        },
        // Validating
        validateForm() {
            let result = true,
                msg = "",
                ds = this.$refs.budgetLineDS.kendoWidget();

            // Name
            if(this.budget.name === ''){
                msg += `<p>${i18n.t("name_is_required")}</p>`;
                result = false;
            }

            // Segment
            if(this.segment === null){
                msg += `<p>${i18n.t("segment_is_required")}</p>`;
                result = false;
            }

            // Segment
            if(this.budget.fiscal_year === null){
                msg += `<p>${i18n.t("fiscal_date_is_required")}</p>`;
                result = false;
            }

            // Amount
            let hasZeroAmount = true;
            ds.data().forEach(value => {
                if(value.amount !== 0 ){
                    hasZeroAmount = false;

                    return false;
                }
            });
            if(hasZeroAmount){
                msg += `<p>${i18n.t("please_enter_amount")}</p>`;
                result = false;
            }

            // Show Alert
            this.errorMessage = msg;
            this.alert = false;
            if (result === false) {
                this.alert = true;
            }

            return result;
        },
        // All Saves
        async onSaveOptionClick(mode) {
            if (this.$refs.form.validate() && this.validateForm()) {
                this.saveMode = mode;
                this.save();
            }
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
                if (result.value) {
                    this.clear();
                    this.setDefaultData();
                    this.$router.go(-1);
                }
            });
        },
        clear() {
            this.isEdit = false;
            this.saveMode = '';

            this.budget = new BudgetModel();

            // Datasoure
            let ds = this.$refs.budgetLineDS.kendoWidget();
            ds.data([]);
        },
        save() {
            let self = this;

            // Shrink Data
            this.shrinkData();

            // Sync Data
            this.showLoading = true;
            budgetHandler.save(new BudgetModel(this.budget))
                .then((response) => {
                    if (response) {
                        self.responseStatus(response.status);
                    }
                })
                .catch((error) => {
                    Helper.alertErrorMsg(error);
                })
                .finally(()=>{
                    self.showLoading = false;
                });
        },
        // Response Status
        responseStatus(status) {
            switch (status) {
                case 200: // Ok
                    this.showAlert();
                    break;
                case 201: // Duplicate
                    Helper.alertErrorMsg("Duplicate entry!");
                    break;
                default:
                    break;
            }
        },
        // Sweetalert2
        changeAlertStatus() {
            this.loadingAlert = true;
            setTimeout(() => {
                this.loadingAlert = false;
            }, 6200);
        },
        showAlert() {
            this.changeAlertStatus();
            this.loadingTextAlert = "Added Successful";
            this.loadingColorAlert = "#3DA72E";
            switch (this.saveMode) {
                case "saveClose": // Save Close
                    // this.$swal({
                    // 	position: 'products',
                    // 	icon: 'success',
                    // 	title: 'Your work has been saved',
                    // 	showConfirmButton: true,
                    // }).then((result) => {
                    // 	if (result.value) {
                    // 		window.history.go(-1)

                    // 		return false
                    // 	}
                    // })
                    // if(this.isEdit){
                    //     this.goBackToViewPage();
                    // }else{
                        // this.$router.go(-1);
                    // }

                    this.clear();
                    this.setDefaultData();
                    this.$router.go(-1);
                    break;
                default:
                    // Save New
                    // this.$swal({
                    // 	position: 'products',
                    // 	icon: 'success',
                    // 	title: 'Your work has been saved',
                    // 	showConfirmButton: false,
                    // 	timer: 1500
                    // })
                    this.clear();
                    this.setDefaultData();
                    break;
            }
        },
        // On Reporint Language Changes
        onReportingLanguageChanges() {
            let grid = this.$refs.budgetLineGrid.kendoWidget();

            if (this.reportingLanguage === "local") {
                grid.showColumn(1);
                grid.hideColumn(0);
            }else{
                grid.showColumn(0);
                grid.hideColumn(1);
            }
        },
        // // Go back to view page after edit mode
        // getAdvanceSettlement () {
        //     return new BudgetModel(this.budget);
        // },
        // goBackToViewPage(){
        //     this.$router.replace({ name: 'Advance Settlement View', params: { initBudget: this.getAdvanceSettlement() } })
        // },
    },
    watch: {
        // call again the method if the route changes
		$route: "initialData",
    },
    mounted () {
        // Initial Data
        this.initialData();
    },
};
</script>

<style scoped>
.function_content {
    padding: 0 25px 25px;
    border-bottom: 0;
    background-color: #fff !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.section2 {
    border: 1px solid #d6d7d8;
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.greyDark {
    background-color: #f2f2f2;
}

.upload_btn {
    width: 54%;
    margin: auto;
    padding: 10px 6px;
    text-align: center;
    color: #ffff;
    border-radius: 22px;
    background: #92d050;
}

.my_box_min_heihgt {
    height: 295px;
}

.width_100 {
    width: 100px;
}
.v-data-table.simple_table.theme--light{
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple_table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table > .v-data-table__wrapper > table > thead > tr > th{
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table > .v-data-table__wrapper > table > thead > tr:last-child > th{
    border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table > .v-data-table__wrapper > table > thead > tr > th:last-child,
.v-data-table.simple_table > .v-data-table__wrapper > table > tbody > tr > td:last-child{
    border-right: none !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.primary--text.text-left.v-btn:hover,
.theme--light.v-btn:hover::before{
    background: none !important;
}
</style>
