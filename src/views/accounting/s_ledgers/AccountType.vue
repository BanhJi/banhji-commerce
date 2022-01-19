<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="pt-0">
			<v-row>
				<v-col sm="8" cols="12" class="py-0">
					<h2 class="mb-0 font_20">{{ $t("s_account_types") }}</h2>
					<!-- <p class="mb-3">{{ $t("account_type_desc") }}</p> -->
				</v-col>
				<v-col sm="4" cols="12" class="py-0">
					<v-btn
						class="white--text float-right text-capitalize mt-2"
						color="primary"
						@click="onNewClick"
					>
						{{ $t("create_new") }}
					</v-btn>
				</v-col>
			</v-row>

			<v-data-table
				class="attachment_table"
				:headers="headers"
				:items="accountTypes"
				sort-by="code"
			>
				<template v-slot:[`item.actions`]="{ item }">
					<v-btn class="btn_edit_setting" @click="editItem(item)">
						<v-icon class="white--text" size="14">mdi-pen</v-icon>
						<span class="capitalize ml-1 white--text font_14">{{
							$t("edit")
						}}</span>
					</v-btn>
				</template>
				<template slot="no-data">
					<LoadingMe
						:isLoading="showLoading"
						:fullPage="false"
						:myLoading="true"
					/>
				</template>
			</v-data-table>

			<!-- Dialog -->
			<v-dialog v-model="dialog" max-width="550px">
				<v-card>
					<div class="modal_header">
						<v-card-title>{{ $t("account_type") }}</v-card-title>
						<v-icon  @click="close">close</v-icon>
					</div>
					<v-card-text class="modal_text_content">
						<v-row class="pt-2">
							<v-col sm="6" cols="12" class="py-0">
								<label class="label">{{ $t("name") }}</label>
								<v-text-field
									class=""
									outlined
									v-model="editedItem.name"
									placeholder=""
								/>
								<label class="label">{{ $t("code") }}</label>
								<v-text-field
									class=""
									type="number"
									v-model="editedItem.code"
									outlined
									placeholder=""
								/>
							</v-col>
							<v-col sm="6" cols="12" class="py-0">
								<label class="label">{{
									$t("name_in_reporting_language")
								}}</label>
								<v-text-field
									class="py-0"
									outlined
									v-model="editedItem.local_name"
									placeholder=""
								/>
								<label class="label">{{ $t("related_account_type") }}</label>
								<app-account-type-dropdownlist
									:initAccountType="accountType"
									@emitAccountType="accountType = $event"
								/>
							</v-col>
							<v-col sm="12" cols="12" class="py-0">
								<label class="label">{{ $t("description") }}</label>
								<v-textarea
									class=""
									outlined
									v-model="editedItem.description"
									no-resize
									height="110px"
									rows="3"
								/>
							</v-col>
						</v-row>
					</v-card-text>
					<v-divider />
					<v-card-actions class="modal_footer">
						<v-btn class="btn_cancel" @click="close">
							{{ $t("cancel") }}
						</v-btn>
						<v-btn
							color="primary"
							class="white--text capitalize float-right"
							@click="onSaveClick"
							>{{ $t("save_close") }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

		</v-col>
	</v-row>
</template>
<script>
import { i18n } from "@/i18n";
// import Helper from "@/helper.js";
import AccountTypeModel from "@/scripts/model/AccountType";
import AccountTypeHandler from '@/scripts/handler/accounting/accountType';
import store from "@/store";
import { mapState } from 'vuex';

export default {
	components: {
		"LoadingMe": () => import('@/components/Loading'),
		"app-account-type-dropdownlist": () => import('@/components/dropdownlist/AccountType'),
	},
	data: () => ({
		accountType : new AccountTypeModel(),
		dialog: false,
		showLoading: false,
		headers: [
			{ text: i18n.t("code"), value: "code", sortable: false, align: "start" },
			{
				text: i18n.t("account_type"),
				value: "name",
				sortable: false,
				align: "start width_160px",
			},
			{
				text: i18n.t("name_in_reporting_language"),
				value: "local_name",
				sortable: false,
				align: "start width_180px",
			},
			{
				text: i18n.t("description"),
				value: "description",
				sortable: false,
				align: "start",
			},
			{
				text: i18n.t("action"),
				value: "actions",
				sortable: false,
				align: "start",
			},
		],
		editedIndex: -1,
		editedItem: new AccountTypeModel(),
		defaultItem: new AccountTypeModel(),
	}),
	methods: {
		onNewClick(){
			this.dialog = true
		},
		async initialize () {
            this.showLoading = true;
            
            // Call List
            await this.$store.dispatch('accounting/getSecondaryTypes');

            this.showLoading = false;
        },
		editItem (item) {
			this.editedIndex = this.accountTypes.indexOf(item)
			this.editedItem = Object.assign({}, item)

			/* Primary Type */
			this.accountType = store.state.accounting.types.find(
				(i) => i.code === item.primary_type_code
			);

			this.dialog = true
		},
		close () {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
				this.accountType = new AccountTypeModel();
			})
		},
		validating (){
			let isValid = true;

			/* Code */
			if(this.editedItem.code === ''){
				isValid = false;
				this.$snotify.warning(i18n.t("code_is_required"));
			}

			/* Name */
			if(this.editedItem.name === ''){
				isValid = false;
				this.$snotify.warning(i18n.t("name_is_required"));
			}

			/* Local Name */
			if(this.editedItem.local_name === ''){
				isValid = false;
				this.$snotify.warning(i18n.t("name_in_reporting_is_required"));
			}

			/* Account Type */
			if(this.accountType.uuid === ''){
				isValid = false;
				this.$snotify.warning(i18n.t("related_account_type_is_required"));
			}

			return isValid;
		},
		onSaveClick(){
			if(this.validating()){
				this.save();
			}
		},
		save () {
			/* Update Account Type Information */
			this.editedItem.number = this.editedItem.code;
			this.editedItem.primary_type_code = this.accountType.code;
			this.editedItem.nature = this.accountType.nature;
			this.editedItem.nature_code = this.accountType.nature_code;
			this.editedItem.statement_group = this.accountType.statement_group;
			this.editedItem.is_secondary = 1;

			this.showLoading = true;
			AccountTypeHandler.save(this.editedItem)
				.then((res) => {
					if(res){
						if (this.editedIndex > -1) {
							Object.assign(this.accountTypes[this.editedIndex], this.editedItem);
						} else {
							// this.editedItem.uuid = res.data.uuid;
							this.accountTypes.push(this.editedItem);
						}
						
						this.$snotify.success(i18n.t("successful"));
					}else{
						this.$snotify.error(i18n.t("error_something_wrong"));
					}

					this.close();
				})
				.catch((error) => {
					this.showLoading = false;
					this.$snotify.error(error);
				})
				.finally(()=>{
					this.showLoading = false;
				});
		},
	},
	watch: {
		dialog (val) {
			val || this.close()
		},
    },
	computed: mapState({
        accountTypes: state => state.accounting.secondaryTypes
    }),
	created(){
		this.initialize();
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

.function_footer {
	padding: 15px;
	display: inline-block;
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
	> tr
	> td:not(.v-data-table__mobile-row) {
	border-top: 1px solid #000 !important;
	border-bottom: 0;
}
.exchange-table.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:last-child
	td {
	border-bottom: 1px solid #000 !important;
}
.text-start {
	text-align: left !important;
}

@media (max-width: 576px) {
}
</style>
