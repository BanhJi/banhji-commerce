<template>
	<v-row class="">
		<v-col sm="9" cols="12" class="pt-0">
			<h2 class="font_20 mb-0">{{ $t("bank_transactions_mapping") }}</h2>
			<p class="mb-0">
				{{ $t("bank_transaction_rules_desc") }}
			</p>
		</v-col>

		<v-col sm="3" cols="12" class="pt-0 d-flex">
			<v-btn to="bank_transaction_mapping" color="primary" class="white--text">{{$t('create_new')}}</v-btn>
			<v-btn @click="loadData" color="primary" class="ml-5">
				<v-icon>refresh</v-icon>
			</v-btn>
		</v-col>

		<v-col sm="12" cols="12">
			<kendo-datasource
				ref="bankTransactionRuleDS"
				:data="bankTransactionMappings"
				:page-size="5"
			/>

			<kendo-grid
				id="bankTransactionMappingGrid"
				ref="bankTransactionMappingGrid"
				:data-source-ref="'bankTransactionRuleDS'"
				:noRecords="true"
				:sortable="true"
				:filterable="true"
				:column-menu="true"
				:scrollable-virtual="true"
				:navigatable="true"
				:pageable-always-visible="false"
				:pageable-page-sizes="[5, 10, 20, 100]"
			>
				<kendo-grid-column
					:field="'name'"
					:attributes="{ class: 'tb_name_td' }"
					:title="$t('name')"
				/>
				<kendo-grid-column
					:field="'bank.name'"
					:attributes="{ class: 'tb_name_td' }"
					:title="$t('financial_institution')"
				/>
				<kendo-grid-column
					:field="'condition'"
					:title="$t('conditions')"
					:template="conditionTmpl"
				/>
				<kendo-grid-column
					:command="{
						iconClass: 'fas fa-edit',
						text: $t('edit'),
						click: onEditClick,
					}"
					:title="$t('action')"
					:width="100"
					:headerAttributes="{
						style: 'text-align: right; background-color: #EDF1F5',
					}"
				/>
			</kendo-grid>

			<LoadingMe 
				:isLoading="showLoading" 
				:fullPage="false" 
				type="loading"
				:myLoading="true" />
		</v-col>
	</v-row>
</template>

<script>
// import {i18n} from '@/i18n'
import kendo from "@progress/kendo-ui";
// import Helper from "@/helper.js";
import {
	BankTransactionMappingModel,
	BankModel,
} from "@/scripts/model/AppModels";

/* Store */
import store from "@/store";

const { BankMappingType } = require("@/scripts/default_setup/Collections");

export default {
	components: {
		"LoadingMe": () => import('@/components/Loading'),
	},
	data: () => ({
		// Obj
		bankTransactionMappings: [],
		/* LodingMe */
		showLoading: false,
	}),
	methods: {
		// Load data
		async loadData() {
			this.showLoading = true;

			/* Reset */
			store.state.banking.bankMappingLoaded = false;

			let banks = await this.$store.dispatch('banking/getBanks');
			
			/* Call Bank Mapping List */
			let bankMappings = await this.$store.dispatch('banking/getBankMappings');

			let bankMappingList = [];
			bankMappings.forEach(value => {
				if(value.type === BankMappingType.RULE){
					let bankMapping = new BankTransactionMappingModel(value);
					bankMapping.bank = new BankModel(banks.find(i=>i.uuid === value.bank_uuid));

					bankMappingList.push(bankMapping);
				}
			});

			this.bankTransactionMappings = bankMappingList;
			
			this.showLoading = false;
		},
		conditionTmpl(d) {
			let str = "";
			d.criteria.forEach((row, index) => {
				if (row.operator === "eq") {
					str += `${row.field} ${row.operator} ${row.field2}`;
				} else {
					str += `[${row.field}, ${row.field2}] ${row.operator} ${row.value}`;
				}

				// Logic
				if (index < d.criteria.length - 1) {
					str += ` <span style='color:blue'>${d.condition}</span> `;
				}
			});

			return str;
		},
		// On Edit Click
		onEditClick(e) {
			e.preventDefault();
			let grid = this.$refs.bankTransactionMappingGrid.kendoWidget(),
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
				
			this.$router.push({
				name: "Bank Transaction Mapping",
				params: { initBankTransactionMapping: new BankTransactionMappingModel(dataItem) },
			});
		},
	},
	watch:{
		$route (to, from){
			if(from.name === "Bank Transaction Mapping"){
				this.loadData();
			}
		}
	},
	created() {
		// Load Data
		this.loadData();
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

.exchange-table.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> thead
	> tr
	> th {
	font-family: "Niradei-Bold", serif;
	color: #000 !important;
	border-top: 1px solid #000 !important;
	border-bottom: 1px solid #000 !important;
	font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> thead
	> tr
	> td {
	color: #000 !important;
	padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:last-child
	td {
	border-bottom: 1px solid #000 !important;
}

.function_footer {
	padding: 15px;
	display: inline-block;
}

@media (max-width: 576px) {
}
</style>
