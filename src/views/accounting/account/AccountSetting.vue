<template>
	<v-row class="">
		<v-col sm="12" cols="12">
			<h2 class="mb-0 font_20">{{ $t("accounting_setting") }}</h2>

			<!-- Dialog -->
			<v-dialog v-model="dialog" scrollable max-width="700px">
				<!-- Edit Button -->
				<template v-slot:activator="{ on }">
					<v-btn
						class="white--text float-right text-capitalize"
						color="primary"
						v-on="on"
						@click="editItem"
					>
						{{ $t("edit") }}
					</v-btn>
				</template>

				<!-- Edit Form -->
				<v-card>
					<div class="modal_header">
						<v-card-title>{{ $t("accounting_setting") }}</v-card-title>
						<v-icon class="btn_close" @click="dialog = false">close</v-icon>
					</div>

					<v-card-text class="modal_text_content">
						<v-row class="mt-3">
							<v-col sm="6" cols="12" class="py-0">
								<label class="label">{{ $t("reporting_currency") }}</label>
								<app-currency-dropdownlist
									:initCurrency="editedItem.reportingCurrency"
									@emitCurrency="editedItem.reportingCurrency = $event"
								/>
							</v-col>
							<v-col sm="6" cols="12" class="py-0">
								<label class="label">{{ $t("approved_reporting_date") }}</label>
								<app-datepicker
									:initialDate="editedItem.approvedReportingDate"
									@emitDate="editedItem.approvedReportingDate = $event"
								/>
							</v-col>
						</v-row>
					</v-card-text>

					<v-divider />

					<v-card-actions class="modal_footer">
						<v-spacer />
						<v-btn
							color="primary"
							class="white--text capitalize"
							@click="save"
							>{{ $t("save_close") }}</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<!-- Description -->
			<p class="mb-0">{{ $t("accounting_setting_sub") }}</p>

			<!-- Info -->
			<table class="acc_setting">
				<tr>
					<td class="text-bold" width="17.5%">{{ $t("fiscal_date") }}</td>
					<td width="17.5%">
						<p class="third text-bold">{{ kendo.toString(new Date(institute.fiscalDate[0].first_fiscal_year), "m") }}</p>
					</td>
					<td>
						{{ $t("setting_desc_1") }}
					</td>
				</tr>
				<tr>
					<td class="text-bold">{{ $t("base_currency") }}</td>
					<td>
						<p class="third text-bold">
							{{ institute.baseCurrency.code }} - {{ institute.baseCurrency.symbol }}
						</p>
					</td>
					<td>
						{{ $t("setting_desc_2") }}
					</td>
				</tr>
				<tr>
					<td class="text-bold">{{ $t("reporting_currency") }}</td>
					<td>
						<p class="third text-bold">
							{{ institute.reportingCurrency.code }} - {{ institute.reportingCurrency.symbol }}
						</p>
					</td>
					<td>
						{{ $t("setting_desc_3") }}
					</td>
				</tr>
				<tr>
					<td class="text-bold">{{ $t("approved_reporting_date") }}</td>
					<td>
						<p class="third text-bold">
							{{ kendo.toString(new Date(institute.approvedReportingDate), "D") }}
						</p>
					</td>
					<td>
						{{ $t("acc_setting_desc_4") }}
					</td>
				</tr>
				<tr>
					<td class="text-bold">{{ $t("time_zone") }}</td>
					<td>
						<p class="third text-bold">{{ institute.timeZone.name }}</p>
					</td>
					<td>
						{{ $t("acc_setting_desc_5") }}
					</td>
				</tr>
			</table>

			<LoadingMe 
                :isLoading="showLoading" 
                :fullPage="true" 
                type="loading"
                :myLoading="true" />
		</v-col>
	</v-row>
</template>

<script>
import kendo from '@progress/kendo-ui';
import { mapState } from 'vuex';

const instituteHandler = require("@/scripts/instituteHandler");

export default {
	components: {
        "LoadingMe": () => import('@/components/Loading'),
        "app-datepicker": () => import('@/components/custom_templates/DatePickerComponent'),
        "app-currency-dropdownlist": () => import('@/components/dropdownlist/Currency'),
    },
	data: () => ({
		kendo : kendo,
		dialog: false,
		editedItem: {
			reportingCurrency : null,
			approvedReportingDate : null,
		},
		showLoading : false,
	}),
	methods: {
		editItem () {
			this.editedItem = Object.assign({}, this.institute);
			this.dialog = true;
		},
		save () {
			this.institute.reportingCurrency = this.editedItem.reportingCurrency;
			this.institute.approvedReportingDate = new Date(this.editedItem.approvedReportingDate);

			this.showLoading = true;
			instituteHandler.saveIntitute(this.institute)
				.then(()=>{

				})
				.finally(()=>{
					this.dialog = false;
					this.showLoading = false;
				});
		},
	},
	computed: mapState({
        institute: state => state.institute.institute
    }),
	mounted() {
	},
};
</script>

<style scoped>
table.acc_setting {
	border: 1px solid #ccc;
	width: 100%;
	border-collapse: collapse;
	margin-top: 10px;
	color: #000;
}

table.acc_setting tr td {
	border: 1px solid #ccc;
	padding: 8px;
	vertical-align: middle;
}

table.acc_setting tr td p.third {
	margin-bottom: 0;
	background-color: #f44336;
	padding: 7px 15px;
	color: #fff;
	font-weight: 700;
	text-align: center;
}

table.acc_setting tr td p.text_bold {
	font-weight: 700;
	margin-bottom: 0;
}

table.acc_setting tr td:first-child {
	font-weight: 700;
}

.btn_edit {
	background-color: #21abf6 !important;
	text-transform: capitalize;
}

.function_footer {
	padding: 15px;
	display: inline-block;
}

.v-card__actions .v-btn.v-btn {
	padding: 0 16px;
}

@media (max-width: 576px) {
}
</style>
