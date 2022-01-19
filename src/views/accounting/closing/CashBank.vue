<template>
    <v-row>
        <v-col cols="12" sm="12" class="pt-3">
            <v-row>
                <v-col sm="8" class="py-0">
                    <h2 class="mb-3 font_20 float-left">
                        {{ $t("cash_bank_reconciliation") }}
                    </h2>
                    <p class="mb-0 float-left">
                        {{ $t("reconciliation_desc") }}
                    </p>
                </v-col>
                <v-col sm="4" class="d-flex pt-2">
                    <v-menu
                            nudge-bottom="0"
                            bottom
                            offset-y
                            origin="bottom top"
                            transition="scroll-y-reverse-transition"
                    >
                        <template v-slot:activator="{ on }">
                        <span class="hidden-sm-and-up">
                            <div class="">
                                <v-icon v-on="on" left>mdi-attachment</v-icon>
                                <v-icon size="" class="ma-1">expand_more</v-icon>
                            </div>
                        </span>
                            <span class="hidden-sm-and-down">
                            <v-btn color="primary" v-on="on"
                                   class="mr-1 white--text float-right text-capitalize">
                                {{$t('new_reconciliation')}}
                                <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                        </span>
                        </template>

                        <v-list>
                            <v-list-item link route to="cash_reconciliation">
                                <v-list-item-title> {{$t('cash_reconciliation')}}</v-list-item-title>
                            </v-list-item>
                            <v-list-item link route to="bank_reconciliation">
                                <v-list-item-title> {{$t('bank_reconciliation_manual')}}</v-list-item-title>
                            </v-list-item>
<!--                            <v-list-item link route to="">-->
<!--                                <v-list-item-title> {{$t('bank_reconciliation_back_feeds')}}</v-list-item-title>-->
<!--                            </v-list-item>-->
                        </v-list>
                    </v-menu>

                    <!-- Refresh Button -->
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2 mx-2"
                        @click="search"
                    >
                        <v-icon color="white">mdi-reload</v-icon>
                    </v-btn>
                </v-col>
              
                <v-col sm="12" cols="12" class="pb-0">
                    <kendo-datasource 
                        ref="reconcileDS"
                        :data="reconcileList"
                        :sort-field="'date'"
                        :sort-dir="'desc'"
                        page="1"
                        page-size="10" />

                    <kendo-grid id="reconcileGrid" 
                        ref="reconcileGrid"
                        :data-source-ref="'reconcileDS'"
                        :noRecords="true"
                        :sortable="true"
                        :pageable-page-sizes="true"
                        :pageable-button-count="5">
                        <kendo-grid-column 
                            :field="'number'"
                            :title="$t('number')"
                            :headerAttributes="{
                                style: 'background-color: #fff',
                            }" />
                        <kendo-grid-column 
                            :field="'type'"
                            :title="$t('type')"
                            :template="typeTmpl"
                            :headerAttributes="{
                                style: 'background-color: #fff',
                            }" />
                        <kendo-grid-column 
                            :field="'account'"
                            :title="$t('account')"
                            :template="'<span>#=account.number#</span> - <span>#=account.name#</span>'"
                            :headerAttributes="{
                                style: 'background-color: #fff',
                            }" />
                        <kendo-grid-column 
                            :field="'ending_balance_date'"
                            :title="$t('end_date')"
                            :template="'#=kendo.toString(new Date(date), `dd-MM-yyyy`)#'"
                            :headerAttributes="{
                                style: 'text-align: center; background-color: #fff',
                            }"
                            :attributes="{ style: 'text-align: center;' }" />
                        <kendo-grid-column 
                            :field="'variance_amount'"
                            :title="$t('variance')"
                            :format="'{0:n}'"
                            :headerAttributes="{
                                style: 'text-align: right; background-color: #fff',
                            }"
                            :attributes="{ style: 'text-align: right;' }" />
                        <kendo-grid-column 
                            :field="'opening_balance'"
                            :title="$t('beginning_balance')"
                            :format="'{0:n}'"
                            :headerAttributes="{
                                style: 'text-align: right; background-color: #fff',
                            }"
                            :attributes="{ style: 'text-align: right;' }" />
                        <kendo-grid-column
                            :title="$t('ending_balance')"
                            :template="balanceTmpl"
                            :headerAttributes="{
                                style: 'text-align: right; background-color: #fff',
                            }"
                            :attributes="{ style: 'text-align: right;' }" />
                        <kendo-grid-column 
                            :command="{ text: 'View', click: goView }"
                            :title="'&nbsp;'"
                            :width="90" />
                    </kendo-grid>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                        type="loading"
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import kendo from '@progress/kendo-ui'
// import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import ReconcileModel from "@/scripts/model/Reconcile.js";
import EntityType from "@/scripts/default_setup/EntityType.js";

const {
	reconcileHandler,
} = require("@/scripts/AppHandlers.js");

export default {
	name: "CashAndBankReconciliation",
	components: {
		LoadingMe: () => import("@/components/Loading"),
	},
	data: () => ({
		Helper: Helper,
		reconcileList: [],
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		search () {
            let ds = this.$refs.reconcileDS.kendoWidget();
            ds.data([]);

            this.showLoading = true;
            reconcileHandler.getAll()
            .then((res) => {
                if (res.data) {
                    this.reconcileList = res.data;
                }
            })
            .finally(()=>{
                this.showLoading = false;
            });
		},
        typeTmpl(dataItem){
            let text = "";
            switch (dataItem.type) {
                case EntityType.BANK_RECONCILIATION_MANUAL:
                    text = "Bank Manual"
                    break;
                case EntityType.BANK_RECONCILIATION_BANK_FEEDS:
                    text = "Bank Feed"
                    break;
                case EntityType.CASH_RECONCILIATION:
                    text = "Cash"
                    break;
            
                default:
                    break;
            }

            return text;
        },
        balanceTmpl(dataItem){
            let amt = dataItem.ending_balance;
            if(dataItem.type === EntityType.CASH_RECONCILIATION){
                amt = dataItem.actual_amount;
            }

            return kendo.toString(amt, "n");
        },
        goView (e) {
			e.preventDefault();

			let grid = this.$refs.reconcileGrid.kendoWidget(),
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr")),
				reconcile = new ReconcileModel(Object.assign({}, dataItem));

			if(dataItem.type.toLowerCase() === EntityType.BANK_RECONCILIATION_MANUAL){
				this.$router.replace({name: 'Bank Reconciliation View', params: { initReconcile: reconcile}})
			}else{
				this.$router.push({ path: `${dataItem.type.toLowerCase()}/view/${dataItem.uuid}` });
			}
		},
	},
	mounted() {
		this.search();
	},
};
</script>

<style scoped>
    .attachment_table.v-data-table > .v-data-table__wrapper > table > thead > tr > th, .attachment_table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        border-right: none !important;
    }
   
</style>