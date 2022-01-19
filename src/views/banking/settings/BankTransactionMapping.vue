<template>
	<v-card>
		<div class="modal_header">
			<v-card-title>{{ $t("bank_transactions_mapping") }}</v-card-title>
			<v-icon
					onclick="window.history.go(-1); return false;"
					style="cursor: pointer; color: #333; font-size: 40px;"
					class="float-right"
			>close
			</v-icon>
		</div>
		<v-card-text class="modal_text_content">
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-row class="pt-2">
					<v-col sm="6" cols="12" class="py-0">
						<label class="label">{{
							$t("apply_to_this_for_bank")
						}}</label>
						<app-bank-dropdownlist
							:initBank="bank"
							@emitBank="bank = $event"
						/>
					</v-col>

					<v-col sm="6" cols="12" class="py-0">
						<label class="label">{{ $t("name") }}</label>
						<v-text-field
							class="mt-1"
							v-model="bankTransactionMapping.name"
							:rules="[(v) => !!v || 'Name is required']"
							outlined
							required
						/>
					</v-col>
					

					<!-- <v-col sm="12" cols="12" class="py-0">
						<v-row>
							<v-col sm="6" cols="12" class="py-0 pr-0">
								<p class="mb-0">{{ $t("with_follow_condition_") }}</p>
							</v-col>
							<v-col sm="6" cols="12" class="">
								<v-select
									class=""
									v-model="bankTransactionMapping.condition"
									:items="mappingLogics"
									item-text="text"
									item-value="value"
									placeholder="Select Condition"
									outlined
									required
								/>
							</v-col>
						</v-row>
					</v-col> -->

					<v-col sm="12" cols="12">
						<kendo-datasource
							ref="bankTxnMappingCriteriaDS"
							:change="onBankTxnMappingCriteriaChanges"
							:data="bankTransactionMappingCriteria"
						/>

						<kendo-grid
							id="bankTxnMappingCriteriaGrid"
							ref="bankTxnMappingCriteriaGrid"
							class="exchange-table"
							:data-source-ref="'bankTxnMappingCriteriaDS'"
							:sortable="false"
							:filterable="false"
							:column-menu="true"
							:editable="true"
							:scrollable-virtual="true"
						>
							<kendo-grid-column
								:title="$t('no.')"
								:template="rowNumberTmpl"
								:width="50"
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
								:field="'field'"
								:title="$t('bank_field')"
							/>
							<kendo-grid-column
								:field="'field2'"
								:title="$t('banhji_field')"
								:template="banhjiFieldTmpl"
								:editor="banhjiMappingFieldEditor"
							/>
							<kendo-grid-column
								:field="'operator'"
								:title="$t('operator')"
								:template="operatorTmpl"
								:editor="operatorEditor"
							/>
							<kendo-grid-column
								:field="'value'"
								:title="$t('input_value')"
								:editable="inputValueColumnCondition"
							/>
							<kendo-grid-column
								:command="{
									iconClass: 'k-icon k-i-trash',
									text: 'Delete',
									click: removeRow,
									class: 'btn-plus',
								}"
								:title="'&nbsp;'"
								:width="100"
								:headerAttributes="{
									style:
										'text-align: products;;background-color: #ED1A3A;color:#fff',
								}"
							/>
						</kendo-grid>

						<v-row>
							<v-col sm="2" cols="12" class="pr-0">
								<v-btn
									color="primary"
									class="float-left rounded-0 white--text mr-2"
									@click="addRow"
								>
									<v-icon size="" class="ma-1">mdi-plus</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
		<v-card-actions class="modal_footer d-flex justify-space-between">
			<!-- Warning Message -->
			<v-alert type="warning" v-model="alert" dismissible>
				<span v-html="errorMessage" />
			</v-alert>
			
			<v-btn color="black"
					outlined
					class="text-capitalize  black--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
			<v-btn color="primary"
					class="ml-2 float-right text-capitalize  white--text" @click="onSaveOptionClick(SaveOption.SAVECLOSE)">{{$t('save_close')}}
			</v-btn>
		</v-card-actions>

		<LoadingMe 
			:isLoading="showLoading" 
			:fullPage="true" 
			type="loading"
			:myLoading="true" />
	</v-card>
</template>

<script>
import {i18n} from '@/i18n';
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import {
	BankModel,
	BankTransactionMappingModel,
	BankTransactionMappingCriteriaModel,
} from "@/scripts/model/AppModels";
import {
	bankTransactionMappingHandler,
} from "@/scripts/AppHandlers";

const {
	BankMappingField,
	BankMappingOperator,
} = require("@/scripts/default_setup/Collections");

const { BankMappingType, BankMappingLogic, SaveOption } = require("@/scripts/default_setup/Collections");

export default {
	components: {
		"LoadingMe": () => import('@/components/Loading'),
		"app-bank-dropdownlist": () => import('@/components/dropdownlist/Bank'),
	},
	props: {
		initBankTransactionMapping: {
			type: BankTransactionMappingModel,
		},
	},
	data: () => ({
		// Obj
		bankTransactionMapping: new BankTransactionMappingModel(),
		bank : new BankModel(),
		bankTransactionMappingCriteria: [],
		// Form validation
		valid: true,
		isEdit: false,
		saveMode: "",
		alert: false,
		errorMessage: "",
		SaveOption: SaveOption,
		showLoading: false,
	}),
	methods: {
		/* Initial Data */
		initialData(){
			if(this.initBankTransactionMapping){
				this.isEdit = true; /* Edit Mode */
				
				this.bankTransactionMapping = Object.assign({}, this.initBankTransactionMapping);

				this.bindData();
			}else{
				this.isEdit = false; /* New Mode */

				this.setDefaultData();
			}
		},
		// Set Default Data
		setDefaultData() {
			this.bankTransactionMapping = new BankTransactionMappingModel({
				type: BankMappingType.RULE,
			});

			/* Add a default row */
			this.addRow();
		},
		/* Bind Data */
		async bindData(){
			/* Bank */
			let banks = await this.$store.dispatch('banking/getBanks');
			this.bank = banks.find(i=>i.uuid === this.bankTransactionMapping.bank_uuid);

			/* Criteria */
			this.bankTransactionMappingCriteria = this.bankTransactionMapping.criteria;
		},
		onBankTxnMappingCriteriaChanges(e) {
			if (e.field) {
				let dataRow = e.items[0];

				if (e.field === "operator") {
					if (dataRow.operator === "eq") {
						dataRow.set("value", "");
					}
				}else if (e.field === "field2") {
					let field2 = BankMappingField.RULE.find(i=>i.value === dataRow.field2);
					dataRow.set("operator", field2.operators[0].value);
				}
			}
		},
		// Row Template
		rowNumberTmpl(dataItem) {
			let ds = this.$refs.bankTxnMappingCriteriaDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		operatorTmpl(dataItem) {
			let opr = BankMappingOperator.find(i=>i.value === dataItem.operator);
			if(opr) return opr.text;
			else return ''
		},
		banhjiFieldTmpl(dataItem) {
			let field2 = BankMappingField.RULE.find(i=>i.value === dataItem.field2);
			if(field2) return field2.text;
			else return ''
		},
		inputValueColumnCondition(dataItem) {
			return dataItem.operator === "contains";
		},
		// Grid Custom Editor
		banhjiMappingFieldEditor(container, options) {
			kendo
				.jQuery('<input required name="' + options.field + '"/>')
				.appendTo(container)
				.kendoDropDownList({
					autoWidth: true,
					valuePrimitive: true,
					dataTextField: "text",
					dataValueField: "value",
					height: 400,
					optionLabel: "--- Select ---",
					dataSource: BankMappingField.RULE,
				});
		},
		operatorEditor(container, options) {
			let field2 = BankMappingField.RULE.find(i=>i.value === options.model.field2);
			kendo
				.jQuery('<input required name="' + options.field + '"/>')
				.appendTo(container)
				.kendoDropDownList({
					autoWidth: true,
					valuePrimitive: true,
					dataTextField: "text",
					dataValueField: "value",
					height: 400,
					dataSource: field2.operators,
				});
		},
		// Add New Row
		addRow() {
			let ds = this.$refs.bankTxnMappingCriteriaDS.kendoWidget(),
				last = ds.total();

			let je = new BankTransactionMappingCriteriaModel();
			ds.insert(last, je);
		},
		// Remove Row
		removeRow(e) {
			e.preventDefault();

			let grid = this.$refs.bankTxnMappingCriteriaGrid.kendoWidget(),
				ds = grid.dataSource,
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			if (ds.data().length > 1) {
				ds.remove(dataItem);
			}else{
				this.$snotify.warning(i18n.t("criteria_is_require_at_least_one"));
			}
		},
		// Validating
		validateForm() {
			let result = true,
				msg = "",
				ds = this.$refs.bankTxnMappingCriteriaDS.kendoWidget();

			ds.data().forEach((value, index) => {
				if(value.field === "" || value.field2 === "" || value.operator === "") {
					msg += `<p>${i18n.t("bank_field_banhji_field_operator_are_required_at_row")} ${index + 1}</p>`;

					result = false;
				}

				/* Contains */
				if(value.operator === "contains" && value.value === '') {
					msg += `<p>${i18n.t("operator_contains_is_required_input_value_at_row")} ${index + 1}</p>`;

					result = false;
				}
			});

			// Show Alert
			this.errorMessage = msg;
			this.alert = false;
			if (result === false) {
				this.alert = true;
			}

			return result;
		},
		/* Shrink Data */
		shrinkData(){
			/* Condition */
			this.bankTransactionMapping.condition = BankMappingLogic[0].value; /* Default is OR */

			/* Bank */
			this.bankTransactionMapping.bank_uuid = this.bank.uuid;

			let ds = this.$refs.bankTxnMappingCriteriaDS.kendoWidget();

			/* Collect empty row by uid */
			let emptyIds = [];
			ds.data().forEach(value => {
				if(value.field === '' || value.field2 === ''){
					emptyIds.push(value.uid);
				}
			});

			/* Remove empty row by uid */
			for (let i = 0; i < emptyIds.length; i++) {
				const dataItem = ds.getByUid(emptyIds[i]);
				ds.remove(dataItem);
			}
		},
		// All Saves
		onSaveOptionClick(mode) {
			if (this.$refs.form.validate() && this.validateForm()) {
				this.saveMode = mode;
				this.save();
			}
		},
		cancel() {
			this.$swal({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#4d4848",
				cancelButtonColor: "#ED1A3A",
				confirmButtonText: "Yes, discard it!",
			}).then((result) => {
				if (result.value) {
					this.clear();
                    this.$router.go(-1);
				}
			});
		},
		clear() {
			this.isEdit = false;
			this.saveMode = "";

			this.bank = new BankModel();

			let ds = this.$refs.bankTxnMappingCriteriaDS.kendoWidget();
			ds.data([]);

			// Set default data
			this.setDefaultData();
		},
		save() {
			/* Shrink Data */
			this.shrinkData();

			let ds = this.$refs.bankTxnMappingCriteriaDS.kendoWidget();

			// Criteria
			this.bankTransactionMapping.criteria = ds.data();

			// Sync Data
			this.showLoading = true;
			bankTransactionMappingHandler
				.save(new BankTransactionMappingModel(this.bankTransactionMapping))
				.then((response) => {
					/* Update Vuex Data */
					this.$store.dispatch('banking/saveBankMapping', response.data);
					
					// Response Status
					this.responseStatus(response);
				})
				.catch((error) => {
					this.showLoading = false;
					Helper.alertErrorMsg(error);
				})
				.finally(() => {
					this.showLoading = false;
				});
		},
		// Response Status
		responseStatus(response) {
			if (response.status === 200) {
				/* Save Close or Delete Action */
				if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) {
					this.$router.go(-1);
				}
				
				/* Reset Data */
				this.clear();

				/* Alert Success */
				this.$snotify.success(i18n.t("successful"));
			} else {
				/* Alert Error */
				this.$snotify.error(i18n.t("error_something_wrong"));
			}
		},
	},
	watch: {
		initBankTransactionMapping(){
			this.initialData();
		}
	},
	mounted() {
		this.initialData();
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
