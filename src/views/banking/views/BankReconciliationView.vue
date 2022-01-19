<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{$t('bank_reconciliation_manually')}}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border mb-3" color="grayBg">
                                <v-row>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <v-row>
                                            <v-col sm="6" cols="12" class="pb-0">
                                                <label class="label">{{$t('date')}}</label>
                                                <h3 class="text-bold py-1">{{ Helper.dateFormat(reconcile.date) }}</h3>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pb-0">
                                                <label class="label">{{$t('number')}}</label>
                                                <h3 class="text-bold py-1">{{ reconcile.number }}</h3>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col sm="6" cols="12" class="pb-0 py-0">
                                                <label class="label">{{$t('ending_balance_date')}}</label>
                                                <h3 class="text-bold py-1">{{ Helper.dateFormat(reconcile.ending_balance_date) }}</h3>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pb-0 py-0">
                                                <label class="label">{{$t('reconcile_account')}}</label>
                                                <h3 class="text-bold py-1">{{ reconcile.account.number }} - {{ reconcile.account.name }}</h3>
                                            </v-col>
                                            <v-col sm="16" cols="12" class="py-0">
                                                <label class="label">{{$t('ending_balance')}}</label>
                                                <h3 class="text-bold py-1">{{ Number(reconcile.ending_balance).toLocaleString() }}</h3>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <v-card outlined dense color="primary" min-height="60" class=" pa-3 white--text mb-3">
                                            <p style="font-size: 20px;" class="col-sm-7 float-left text-left mb-0 pa-0">
                                                {{$t('reported_beginning_balance')}}
                                            </p>
                                        
                                            <p style="font-size: 20px;"
                                               class="col-sm-5 float-left text-right mb-0 pa-0 font-bold">{{
                                                Number(reconcile.opening_balance).toLocaleString() }}</p>
                                        </v-card>


                                        <v-card outlined dense color="primary" min-height="60"  class="pa-3 white--text mb-3">
                                            <p style="font-size: 20px;" class="col-sm-7 float-left text-left mb-0 pa-0">
                                                {{$t('reported_ending_balance')}}
                                            </p>
                                            <p style="font-size: 20px;"
                                               class="col-sm-5 float-left text-right mb-0 pa-0 font-bold">{{
                                                Number(reportingEndingBalance).toLocaleString() }}</p>
                                        </v-card>

                                        <v-row>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <v-card outlined dense class="block-white">
                                                    <p style="font-size: 20px;"
                                                       class="col-sm-7 float-left text-left mb-0 pa-0">
                                                        {{$t('variance')}}
                                                    </p>
                                                    <p style="font-size: 20px;"
                                                       class="col-sm-5 float-left text-right mb-0 pa-0 font-bold">{{
                                                        Number(reconcile.variance_amount).toLocaleString() }}</p>
                                                </v-card>
                                            </v-col>

                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{$t('adjustment_account')}}</label>
                                                <h3 class="text-bold py-1">{{ reconcile.adjustment_account.number }} - {{ reconcile.adjustment_account.name }}</h3>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-row style="background-color: rgb(255, 255, 255); width: 100%; margin: 10px auto 0px;">
                                <v-col sm="12" cols="12" class="py-3 pa-0">
                                    <kendo-datasource
                                        ref="reconcileDS"
                                        :data="entries"
                                    />

                                    <kendo-grid
                                        id="grid"
                                        class="grid-function"
                                        :data-source-ref="'reconcileDS'"
                                        :column-menu="true"
                                        :scrollable-virtual="true"
                                    >
                                        <kendo-grid-column
                                            :title="$t('no.')"
                                            :template="rowNumberTmpl"
                                            :width="55"
                                            :column-menu="false"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5;',
                                                class: 'text-products',
                                            }"
                                            :attributes="{
                                                style: 'text-align: products',
                                            }"
                                        />
                                        <kendo-grid-column 
                                            :field="'journal_date'"
                                            :title="$t('date')"
                                            :template="'#=kendo.toString(new Date(journal_date), `dd-MM-yyyy`)#'"
                                            :width="100"
                                            :headerAttributes="{
                                                style: 'text-align: center; background-color: #fff',
                                            }"
                                            :attributes="{ style: 'text-align: center;' }" />
                                        <kendo-grid-column
                                            :field="'transaction_type'"
                                            :title="$t('type')"
                                            :width="100"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5',
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'description'"
                                            :title="$t('description')"
                                            :width="100"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5',
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'journal_number'"
                                            :title="$t('reference')"
                                            :width="100"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5',
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'dr'"
                                            :title="$t('cash_in')"
                                            :format="'{0:n}'"
                                            :width="150"
                                            :headerAttributes="{
                                                style: 'text-align: right; background-color: #EDF1F5',
                                            }"
                                            :attributes="{ style: 'text-align: right; ' }"
                                        />
                                        <kendo-grid-column
                                            :field="'cr'"
                                            :title="$t('cash_out')"
                                            :format="'{0:n}'"
                                            :width="150"
                                            :headerAttributes="{
                                                style: 'text-align: right; background-color: #EDF1F5',
                                            }"
                                            :attributes="{ style: 'text-align: right; ' }"
                                        />
                                    </kendo-grid>
                                </v-col>
                            </v-row>
                            <v-divider class="mt-1" />
                            <v-card outlined dense class="no_border function_footer py-2">
             
                                <v-btn
                                class="float-right save_option mx-1 capitalize"
                                color="secondary"
                                @click="_print(3)"
                                >
                                {{ $t("print") }}
                                </v-btn>
                                <!-- <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="blue"
                                >
                                {{ $t("delete") }}
                                </v-btn> -->
                                <!-- <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="primary"
                                >
                                {{ $t("edit") }}
                                </v-btn>  -->
                            </v-card>
                            <v-divider />
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                type="loading"
            />
        </v-container>
    </v-app>
</template>

<script>
import kendo from "@progress/kendo-ui";
// import {i18n} from '@/i18n'
import Helper from "@/helper.js";
import {
	ReconcileModel
} from "@/scripts/model/AppModels";

const journalHandler = require("@/scripts/journalHandler");
// from
const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/Accounting.js";
import {i18n} from '@/i18n';

export default {
	name: "BankReconciliationView",
	props: {
		initReconcile: {
			type: ReconcileModel,
		},
	},
	components: {
		"LoadingMe": () => import('@/components/Loading'),
	},
	data: () => ({
		// Obj
		reconcile : new ReconcileModel(),
        entries : [],
        reportingEndingBalance : 0,
        varianceAmount : 0,
        valid: true,
		// Other
		Helper: Helper,
		notes: [],
		// LoadingMe
		showLoading: false,
		loadingAlert: false,
		loadingColorAlert: "",
		loadingTextAlert: "",
	}),
	methods: {
        _print(id) {
			let print_data = this.reconcile;
            let params = "?formType=BankReconciliation"
            print_data['reportingEndingBalance'] = this.reportingEndingBalance
            print_data['entries'] = this.entries

            getFormSetting(params).then(res => {
                if (res.data.statusCode === 200) {
                    if (res.data.data.length > 0) {
                        window.console.log(res.data.data["0"].settings);
                        print(print_data, id, res.data.data["0"].settings);
                    }else{
                        this.$snotify.error(i18n.t('please_save_form_in_setting'))
                    }   
                }
            });
        },
        initialData(){
            if(this.initReconcile){
				this.reconcile = Object.assign({}, this.initReconcile);
				this.bindData();
			}
        },
		async bindData() {
            let fiscalDate = Helper.getFiscalDateByDate(this.reconcile.ending_balance_date),
                sdate = fiscalDate.start_date,
                edate = this.reconcile.ending_balance_date;

            if (sdate && edate) {
                sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z';

                edate = new Date(edate);
                edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z';
            } else {
                sdate = 0;
                edate = 0;
            }

            /* Journal */
            let journals = await journalHandler.getEntryDetailByAccount(this.reconcile.account.uuid, {
                        params: {
                            start_date: sdate,
                            end_date: edate,
                        }
                    })

			// Bind Obj
			let entries = [],
                dr = 0, cr = 0;
			journals.entries_detail.forEach(value => {
                let entry = value;

                if(~this.reconcile.reconcile_entries.indexOf(value.entry_uuid)){
                    entry.dr = value.amount;
                    entry.cr = 0;

                    if(value.amount < 0){
                        entry.dr = 0;
                        entry.cr = value.amount;
                    }

                    dr += kendo.parseFloat(entry.dr);
                    cr += kendo.parseFloat(entry.cr);

                    entries.push(entry);
                }
			});

            this.reportingEndingBalance = (this.reconcile.opening_balance + dr) - cr;

			// Entries
			this.entries = entries;
		},
		// Row Number Template
		rowNumberTmpl (dataItem) {
			let ds = this.$refs.reconcileDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		getReconcile () {
			return new ReconcileModel(this.reconcile);
		},
		edit() {
			this.$router.replace({ name: 'Cash Reconciliation', params: { initReconcile: this.getReconcile() } });
		},
		print() {
			// Code here
		},
	},
	watch: {
		initReconcile () {
			this.initialData();
		},
	},
	mounted () {
		this.initialData();
	}
};
</script>

<style scoped>
    @media (min-width: 1264px) {
        .container {
            max-width: 1080px !important;
        }
    }
</style>