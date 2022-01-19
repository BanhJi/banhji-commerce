<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<v-form ref="form">
						<v-card
							outlined
							dense
							class="pa-4 no_border rounded-sm"
							color="white"
						>
							<div class="function_header">
								<h2 class="mb-0">{{ $t("Cash Reconciliation") }}</h2>
								<v-icon
									onclick="window.history.go(-1); return false;"
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
									>close</v-icon
								>
							</div>

							<v-card
								outlined
								dense
								class="pa-4 no_border rounded-sm"
								color="white"
							>
								<v-row class="px-6 mb-4">
									<v-col sm="3" cols="12" class="pb-0">
										<label class="label">{{ $t("date") }}</label>
										<h3 class="text-bold py-1">{{ Helper.dateFormat(reconcile.date) }}</h3>
									</v-col>
									<v-col sm="3" cols="12" class="pb-0">
										<label class="label">{{ $t("number") }}</label>
										<h3 class="text-bold py-1">{{ reconcile.number }}</h3>
									</v-col>
									<v-col sm="3" cols="12" class="pb-0">
										<label class="label">{{ $t("ending_balance_date") }}</label>
										<h3 class="text-bold py-1">{{ Helper.dateFormat(reconcile.ending_balance_date) }}</h3>
									</v-col>
									<v-col sm="3" cols="12" class="pb-0 pl-0">
										<label class="label">{{ $t("reconcile_account") }}</label>
										<h3 class="text-bold py-1">{{ reconcile.account.number }} - {{ reconcile.account.name }}</h3>
									</v-col>
								</v-row>
								<v-row class="px-6">
									<v-col sm="6" cols="12" class="py-0">
										<v-card outlined dense class="block-green">
											<p
												style="font-size: 20px;"
												class="col-sm-7 float-left text-left mb-0 pa-0"
											>
												{{ $t("ending_balance") }}
											</p>
											<p
												style="font-size: 20px;"
												class="col-sm-5 float-left text-right mb-0 pa-0 font-bold"
											>
												{{ Number(reconcile.ending_balance).toLocaleString() }}
											</p>
										</v-card>
									</v-col>
									<v-col sm="6" cols="12" class="py-0">
										<v-card outlined dense class="block-green">
											<p
												style="font-size: 20px;"
												class="col-sm-7 float-left text-left mb-0 pa-0"
											>
												{{ $t("actual_amount") }}
											</p>
											<p
												style="font-size: 20px;"
												class="col-sm-5 float-left text-right mb-0 pa-0 font-bold"
											>
												{{ Number(reconcile.actual_amount).toLocaleString() }}
											</p>
										</v-card>
									</v-col>
								</v-row>
								<v-row class="px-6">
									<v-col sm="6" cols="12">
										<v-card outlined dense class="block-white">
											<p
												style="font-size: 20px;"
												class="col-sm-7 float-left text-left mb-0 pa-0"
											>
												{{ $t("variance") }}
											</p>
											<p
												style="font-size: 20px;"
												class="col-sm-5 float-left text-right mb-0 pa-0 font-bold"
											>
												{{ Number(reconcile.variance_amount).toLocaleString() }}
											</p>
										</v-card>
									</v-col>
									<v-col sm="6" cols="12">
										<v-card outlined dense class="block-white py-0" v-if="reconcile.adjustment_account.name !== ''">
											{{ reconcile.adjustment_account.number }} - {{ reconcile.adjustment_account.name }}
										</v-card>
									</v-col>
								</v-row>
								<v-row
									style="background-color: rgb(255, 255, 255); width: 100%; margin: 10px auto 0px;"
								>
									<v-col sm="12" cols="12" class="py-3 pa-0">
										<kendo-datasource
											ref="dataSource"
											:data="notes"
										/>

										<kendo-grid
											id="grid"
											class="grid-function"
											:data-source-ref="'dataSource'"
											:sortable="false"
											:filterable="false"
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
												:field="'currency'"
												:title="$t('currency')"
												:width="120"
												:template="'<span>#=currency.code#</span>'"
												:headerAttributes="{
													style: 'background-color: #EDF1F5',
												}"
											/>
											<kendo-grid-column
												:field="'note'"
												:title="$t('note')"
												:width="90"
												:headerAttributes="{
													style: 'background-color: #EDF1F5',
												}"
											/>
											<kendo-grid-column
												:field="'unit'"
												:title="$t('unit')"
												:width="90"
												:headerAttributes="{
													style: 'background-color: #EDF1F5',
												}"
											/>
											<kendo-grid-column
												:field="'amount'"
												:title="$t('amount')"
												:format="'{0:n}'"
												:width="150"
												:headerAttributes="{
													style: 'text-align: right; background-color: #EDF1F5',
												}"
												:attributes="{ style: 'text-align: right; ' }"
											/>
											<kendo-grid-column
												:field="'exchange_rate'"
												:title="$t('rate')"
												:width="100"
												:headerAttributes="{
													style: 'text-align: right; background-color: #EDF1F5',
												}"
												:attributes="{ style: 'text-align: right; ' }"
											/>
											<kendo-grid-column
												:field="'exchanged_amount'"
												:title="$t('exchanged_amount')"
												:format="'{0:n}'"
												:width="150"
												:headerAttributes="{
													style: 'text-align: right; background-color: #EDF1F5',
												}"
												:attributes="{ style: 'text-align: right; ' }"
											/>
											<kendo-grid-column
												:field="'remark'"
												:title="$t('remark')"
												:hidden="true"
												:width="150"
												:headerAttributes="{
													style: 'background-color: #EDF1F5',
												}"
											/>
										</kendo-grid>
									</v-col>
								</v-row>
							</v-card>
							<v-divider class="mt-1" />
							<v-card outlined dense class="no_border function_footer py-2">
								<!-- <v-btn
									class="float-right save_option mx-1 capitalize"
									color="primary"
								>
									{{ $t("print") }}
								</v-btn>
								<v-btn
									class="float-right mx-1 white--text capitalize"
									color="blue"
								>
									{{ $t("delete") }}
								</v-btn> -->
								<v-btn v-if="reconcile.is_draft === 0"
									class="float-right mx-1 white--text capitalize"
									color="lightBlue"
									@click="edit"
								>
									{{ $t("edit") }}
								</v-btn>
							</v-card>
							<v-divider />
						</v-card>
					</v-form>
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
// import kendo from "@progress/kendo-ui";
// import {i18n} from '@/i18n'
import Helper from "@/helper.js";
import {
	ReconcileModel,
	ReconcileDetailModel,
} from "@/scripts/model/AppModels";

const { reconcileHandler } = require("@/scripts/AppHandlers");

export default {
	name: "CashReconciliationView",
	props: {
		initCashReconciliation: {
			type: ReconcileModel,
		},
	},
	components: {
		"LoadingMe": () => import('@/components/Loading'),
	},
	data: () => ({
		// Obj
		reconcile : new ReconcileModel(),
		// Other
		Helper: Helper,
		notes: [],
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		// Load reconcile according to query string {id}
		loadObj() {
			// Access Query String
			let q = this.$route.params;
			if (q.id !== undefined) {
				if(q.id !== this.reconcile.uuid){
					this.showLoading = true;

					reconcileHandler.getOne(q.id)
					.then((res) => {
						this.reconcile = new ReconcileModel(res.data);
						this.bindData();
					})
					.finally(() => {
						this.showLoading = false;
					});
				}
			}
		},
		async bindData() {
			// Bind Obj
			let notes = [];
			this.reconcile.notes.forEach(value => {
				notes.push(new ReconcileDetailModel(value));
			});

			// Notes
			this.notes = notes;
		},
		// Row Number Template
		rowNumberTmpl (dataItem) {
			let ds = this.$refs.dataSource.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		getReconcile () {
			return new ReconcileModel(this.reconcile);
		},
		edit() {
			this.$router.replace({ name: 'Cash Reconciliation', params: { initCashReconciliation: this.getReconcile() } });
		},
		print() {
			// Code here
		},
	},
	watch: {
		// call again the method if the route changes
		$route: "loadObj",
		initCashReconciliation () {
			if(this.initCashReconciliation){
				this.reconcile = this.initCashReconciliation;
				this.bindData();
			}
		},
	},
	mounted () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.loadObj();
	}
};
</script>

<style scoped>
.function_footer {
	padding: 15px;
	display: inline-block;
}
.block-green {
	text-transform: uppercase;
}
@media (min-width: 1264px) {
	.container {
		max-width: 1080px !important;
	}
}
</style>
