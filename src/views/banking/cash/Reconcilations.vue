<template>
	<div>
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
				:field="'date'"
				:title="$t('date')"
				:template="'#=kendo.toString(new Date(date), `dd-MM-yyyy`)#'"
				:headerAttributes="{
					style: 'text-align: center; background-color: #fff',
				}"
				:attributes="{ style: 'text-align: center;' }" />
			<kendo-grid-column 
				:field="'number'"
				:title="$t('number')"
				:headerAttributes="{
					style: 'background-color: #fff',
				}" />
			<kendo-grid-column 
				:field="'variance_amount'"
				:title="$t('variance')"
				:format="'{0:n}'"
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
	</div>
</template>

<script>
import kendo from '@progress/kendo-ui'
// import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import AccountModel from "@/scripts/model/Account.js";
import ReconcileModel from "@/scripts/model/Reconcile.js";
import EntityType from "@/scripts/default_setup/EntityType.js";

const {
	reconcileHandler,
} = require("@/scripts/AppHandlers.js");

export default {
	name: "Reconcilations",
	props: {
		initAccount: {
			type: AccountModel,
		},
	},
	components: {
		LoadingMe: () => import("@/components/Loading"),
	},
	data: () => ({
		// Obj
		account: new AccountModel(),
		Helper: Helper,
		reconcileList: [],
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		loadData () {
			if(this.initAccount){
				this.account = Object.assign({}, this.initAccount);
				
				this.loadReconcile();
			}
		},
		loadReconcile () {
			if(this.account.uuid !== ""){
				this.showLoading = true;
				reconcileHandler.getByAccountId(this.account.uuid)
				.then((res) => {
					if (res.data) {
						this.reconcileList = res.data;
					}
				})
				.finally(()=>{
					this.showLoading = false;
				});
			}
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
	watch: {
		initAccount (){
			this.loadData();
		}
	},
	mounted() {
		this.loadData();
	},
};
</script>

<style scoped>
.grid-center.center_heigth {
	height: 470px !important;
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: transparent !important;
}

.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: #4d4848 !important;
}

.theme--light.v-data-table {
	background-color: transparent !important;
	border-top: thin solid #ddd;
	border-bottom: thin solid #ddd;
	border-radius: 0 !important;
}

.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:not(:last-child)
	> td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:not(:last-child)
	> th:not(.v-data-table__mobile-row) {
	border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
	height: 32px !important;
}
.dropdown_view.theme--light.v-btn.v-btn--icon {
	color: rgba(0, 0, 0, 0.54);
	padding: 0px 40px 0px 50px;
}

.v-menu__content {
	top: 595px !important;
	left: 1243px !important;
}

.v-menu__content .v-list {
	width: 120px;
}

.v-menu__content .v-list .v-list-item {
	min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
	font-size: 12px;
}

.v-card.bg_blue {
	background-color: #92d050;
	color: #fff;
	min-height: 72px;
}

.v-card.bg_black {
	background-color: #333;
	color: #fff;
	min-height: 72px;
}

.v-card.bg_blue p.title {
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.btn_edit {
	background-color: #00b050 !important;
}

.v-card.bg_blue p {
	color: #fff;
}

.v-card.third {
	background-color: #2ca01c;
	color: #fff;
	display: grid;
	min-height: 52px;
}

p.title {
	margin-bottom: 0;
	font-weight: 700;
	color: #333;
	text-align: left;
}

.v-tab--active {
	background-color: #f8f8f9;
}

.tab_txn_att .v-tab--active {
	font-weight: 700;
}

.bg_white {
	background-color: #fff;
}

.no_border .v-data-table {
	height: 470px;
	overflow-y: scroll !important;
}

.no_border.hidden-sm-and-down .v-data-table td {
	height: 40px;
}

.custom_vcard.v-card {
	overflow-wrap: initial;
}

.k-grid td.k-state-selected,
.k-grid tr.k-state-selected > td {
	background-color: rgba(67, 168, 52, 0.25);
}

.attachment_file {
	background-color: #efeded;
	border-radius: 0 !important;
}

.view_action {
	text-transform: uppercase;
}

.disabled-header.k-grid tr * {
	cursor: pointer;
}

@media (max-width: 576px) {
	.v-tab {
		min-width: auto !important;
	}
	.paddingLeft {
		margin-left: 15px;
	}
}
</style>
