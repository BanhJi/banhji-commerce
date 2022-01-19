<template>
    <v-row class="">
        <v-col class="pb-0 pt-0 pr-4" sm="4" cols="12">
            <v-card outlined dense class="pa-3 no_border mb-md-4 mb-xs-0" color="grayBg" height="122px">
                <v-row>
					<v-col
						cols="12"
						sm="12"
						class="py-0 d-flex"
					>
						<v-text-field class="flex-1"
							v-model="searchText"
							outlined
							:placeholder="$t('bank_account_number')"
							@change="search"
						/>

						<v-btn icon class="px-1" @click="search">
							<v-icon>search</v-icon>
						</v-btn>

						<v-btn icon @click="loadData">
							<v-icon>refresh</v-icon>
						</v-btn>
					</v-col>
				</v-row>

                <v-select @change="onBankAccountTypeChanges"
                    :items="bankAccountTypes"
                    item-value="uuid"
                    item-text="name"
                    :placeholder="$t('all_bank_account_type')"
                    no-data-text="No data found."
                    clearable
                    outlined
                />
            </v-card>
            <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
                <!-- loading -->
                <div v-if="!isLoaded">
                    <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"/>
                </div>
                <kendo-datasource ref="bankAccountDS"
                                  :data="bankAccounts"
                                  :schema="schemaDefinition"
                                  :group="groupDefinition"/>

                <kendo-grid id="gridBankAccount" ref="gridBankAccount" 
                            class="grid-center center_heigth"
                            :change="onBankAccountGridChanges"
                            :data-source-ref="'bankAccountDS'"
                            :selectable="true"
                            :persistSelection="true"
                            :noRecords="true"
                            :scrollable="true"
                            :height="535"
                            :pageable-numeric="false"
                            :pageable-previous-next="false"
                            :pageable-messages-display="'Showing {2} data items'">
                    <kendo-grid-column
                            :field="'bank.name'"
                            :title="'BANK'"
                            :hidden="true"
                            :group-header-template="'#=value#'"
                    />
                    <kendo-grid-column
                            :field="'bank_account_type.name'"
                            :title="'TYPE'"
                            :hidden="true"
                            :group-header-template="'#=value#'"
                    />
                    <kendo-grid-column
                            :field="'number'"
                            :title="'&nbsp;'"
                            :template="'<span>#=number# (#=currency.code#)</span>'"
                    />
                </kendo-grid>
            </v-card>
        </v-col>
        <v-col class="pb-0 pt-0 paddingLeft" sm="8" cols="12">
            <div v-if="isLoaded">
                <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"/>
            </div>
            <v-row>
                <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
                    <v-tabs>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-information-variant</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
                                {{$t('info')}}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
                                {{$t('statement')}}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
                                {{$t('transaction')}}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
								{{$t('attachments')}}
							</span>
                        </v-tab>

                        <v-tab-item class="grayBg" >
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-3" >
                                   <Info :initBankAccount="bankAccount" />
                                </v-col>
                            </v-row>
                        </v-tab-item>

                        <v-tab-item class="grayBg" >
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-3">
                                    <Statement :initBankAccount="bankAccount" />
                                </v-col>
                            </v-row>
                        </v-tab-item>

                        <!-- Transaction -->
                        <v-tab-item class="grayBg" >
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-3">
                                    <Txn :initBankAccount="bankAccount" />
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!-- Attachment -->
                        <v-tab-item class="grayBg" >
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-3">
                                    <Attachment :initAccount="attachment"/>
                                </v-col>
                            </v-row>
                        </v-tab-item>

                    </v-tabs>
                </v-col>
            </v-row>
        </v-col>

    </v-row>

</template>

<script>
    import store from "@/store";
    // import kendo from '@progress/kendo-ui'
    // import {i18n} from '@/i18n'
    // import Helper from "@/helper.js";
    import { BankAccountModel, BankAccountTypeModel } from "@/scripts/model/AppModels";
    
    // const { EntityType } = require("@/scripts/default_setup/Collections");

    export default {
        name: "Banking",
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            Info: () => import('./Info'),
            Statement: () => import('./Statement'),
            Txn: () => import('./Txn'),
            Attachment: () =>import('@/components/Attachment')
        },
        data: () => ({
            bankAccountTypes: [],
            // COA sidebar
            searchText: '',
            bankAccounts: [],
            // Account information
            bankAccount: null,
            // LoadingMe
            showLoading: true,
            isLoaded: false,
            // Kendo dataSource
            schemaDefinition: {
                model: {id: "uuid"}
            },
            attachment: {
                uuid: "",
                name: ""
            },
            // Group order by account_type_id asc
            groupDefinition: [
                { field: "bank.name" },
                {
                    field: "bank_account_type.name",
                    compare: function (a, b) {
                        if (a.items[0].number === b.items[0].number) {
                            return 0;
                        } else if (a.items[0].number > b.items[0].number) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                },
            ],
        }),
        methods: {
            // Load data
			async loadData() {
				this.showLoading = true;

				/* Reset */
				store.state.banking.bankAccountLoaded = false;
				
				/* Call account type */
				await this.$store.dispatch('banking/getBankAccounts');

				/* Call account group */
				this.bankAccountTypes = await this.$store.dispatch('banking/getBankAccountTypes');

                let bankAccounts = [];
                store.state.banking.bankAccounts.forEach(value => {
                    let ba = new BankAccountModel(value);
                    ba.bank_account_type = new BankAccountTypeModel(store.state.banking.bankAccountTypes.find(i => i.uuid === value.bank_account_type_uuid));

                    bankAccounts.push(ba);
                });
                /* Add to store */
                store.dispatch('banking/putBankAccounts', bankAccounts);

				this.bankAccounts = bankAccounts;
				this.showLoading = false;
			},
            // On Bank Account Type Changes
            async onBankAccountTypeChanges(bankType) {
                window.console.log(bankType)
                new Promise(resolve => {
                    resolve('resolved')

                    if (bankType === null) {
                        this.bankAccounts = store.state.banking.bankAccounts;
                    } else {
                        this.bankAccounts = store.state.banking.bankAccounts.filter(
                            value => value.bank_account_type_uuid === bankType
                        )
                    }
                })
            },
            // On Search Changes
            async search(searchText) {
                new Promise(resolve => {
                    resolve('resolved')

                    if (searchText !== '') {
                        this.bankAccounts = store.state.banking.bankAccounts.filter(
                            value => (~value.number.toLowerCase().indexOf(searchText))
                        )
                    }
                })
            },
            // On Change item selection
            onBankAccountGridChanges() {
                let grid = this.$refs.gridBankAccount.kendoWidget();
                let selectedItem = grid.dataItem(grid.select());

                if(this.bankAccount === null){
                    this.bankAccount = selectedItem;
                }else{
                    if (this.bankAccount.uuid !== selectedItem.uuid) {
                        this.bankAccount = selectedItem;
                    }
                }
                this.attachment = {
                    uuid: this.bankAccount.uuid,
                    name: this.bankAccount.name
                }
                window.console.log('this.bankAccount',this.bankAccount)
            },
        },
        created() {
            this.loadData();
        },
    };
</script>

<style scoped>
	.grid-center.center_heigth{
		height: 456px !important;
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

    .v-card {
        background-color: #F8F8F9;
    }

    .v-card.bg_blue {
        background-color: #009efb;
        min-height: 60px;
    }

    .v-card.bg_black {
        background-color: #333;
        color: #fff;
        min-height: 52px;
    }

    .v-card.bg_blue p.title {
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .v-card.bg_blue p {
        color: #FFF;
    }

    .v-card.third {
        background-color: #2CA01C;
        color: #FFF;
        display: grid;
        min-height: 52px;
    }

    .btn_edit {
        background-color: #009efb !important;
    }

    p.title {
        margin-bottom: 0;
        font-weight: 700;
        color: #333;
        text-align: left;
    }

    .v-tab--active {
        background-color: rgb(237, 241, 245);
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

    .k-grid td.k-state-selected, .k-grid tr.k-state-selected > td {
        background-color: rgba(67, 168, 52, 0.25);
    }

    .attachment_file {
        background-color: #EFEDED;
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
        .paddingLeft{
            margin-left: 15px;
        }
    }
</style>