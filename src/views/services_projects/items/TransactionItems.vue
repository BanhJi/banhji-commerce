<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('transaction_items') }}</h2>
            <v-dialog v-model="dialogM3" max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" white--text float-right text-capitalize"
                           v-on="on" @click="newClick">
                        {{ $t('new_transaction_item') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('transaction_item') }}</v-card-title>
                        <v-icon @click="dialogM3 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label>{{ $t('number') }}</label>
                                    <v-text-field class="mt-1"
                                                  v-model="transactionItem.number"
                                                  outlined
                                                  clearable
                                                  :rules="[v => !!v || $t('is_required')]"/>

                                    <label>{{ $t('name') }}</label>
                                    <v-text-field class="mt-1"
                                                  v-model="transactionItem.name"
                                                  outlined
                                                  clearable
                                                  :rules="[v => !!v || $t('is_required')]"/>

                                    <label>{{ $t('account') }}</label>
                                    <v-select class="mt-1"
                                              outlined
                                              tage="Account"
                                              v-model="mAccount"
                                              :items="account"
                                              item-value="id"
                                              :item-text="item =>`${item.number} - ${item.name}`"
                                              :rules="[v => !!v['id'] || $t('is_required')]"
                                              return-object
                                              clearable/>
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('uom') }}</label>
                                    <v-select class="mt-1"
                                              outlined
                                              tage="Uom"
                                              v-model="mUOM"
                                              :items="uom"
                                              item-value="id"
                                              :item-text="item =>`${item.category?item.category.name: ''} - ${item.name}`"
                                              :rules="[v => !!v['id'] || $t('is_required')]"
                                              return-object
                                              clearable/>

                                    <label>{{ $t('descriptions') }}</label>
                                    <v-textarea rows="4" class="mt-1" no-resize height="122px"
                                                v-model="transactionItem.description"
                                                outlined clearable/>

                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="black" outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialogM3 = false">{{ $t('cancel') }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="primary" class="px-3  white--text text-capitalize"
                                       @click="onSaveClose">
                                    {{ $t('save_close') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-col>

        <v-col sm="12" cols="12" class="pl-4">
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" type="loading"/>
            <template>
                <kendo-datasource ref="transactionItemDS"
                                  :data="transactionList"/>
                <kendo-grid id="gridTranItem" class="grid-function"
                            :data-source-ref="'transactionItemDS'"
                            :editable="false"
                            :toolbar="toolbarTemplate"
                            :excel-export="excelExport"
                            :excel-file-name="'TransactionItems.xlsx'"
                            :excel-filterable="true"
                            :excel-all-pages="true"
                            :scrollable-virtual="true">
                    <kendo-grid-column
                        :field="'no'"
                        :title="$t('no')"
                        :template="rowNumberTmpl"
                        :width="60"
                        :column-menu="false"
                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                        :attributes="{style: 'text-align: center'}"/>
                    <kendo-grid-column
                        :field="'number'"
                        :title="$t('number')"
                        :width="100"
                        :template="'<span>#=number#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :attributes="{class:'tb_name_td'}"
                        :width="180"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'account'"
                        :title="$t('account')"

                        :hidden="true"
                        :template="'<span>#=account.name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'uom'"
                        :title="$t('uom')"
                        :width="100"
                        :template="'<span>#=uom.name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'description'"
                        :title="$t('description')"
                        :width="200"
                        :template="'<span>#=description#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="100"
                        :command="[{ iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                        :headerAttributes="{style: ' background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>
<script>
import TransactionItemModel from "@/scripts/model/TransactionItems";
import kendo from "@progress/kendo-ui";

const transactionItemHandler = require("@/scripts/transactionItemHandler")
const transactionItemModel = new TransactionItemModel({})
const uomHandler = require("@/scripts/uomHandler")
const accountHandler = require("@/scripts/handler/accounting/account")
const $ = kendo.jQuery
export default {
    data: () => ({
        showLoading: false,
        dialogM3: false,
        account: [],
        uom: [],
        mUOM: {},
        transactionList: [],
        mAccount: {},
        schemaDefinition: {
            model: {
                id: "id"
            }
        },
        valid: true,
        transactionItem: transactionItemModel
    }),
    props: {},
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.transactionItemDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        this.account = res.data.map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.account.length > 0) {
                            this.mAccount = this.account[0]
                        }
                    })
                }, 300);
            })
        },
        async loadUOM() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    uomHandler.get().then(res => {
                        this.showLoading = false
                        this.uom = res
                        if (this.uom.length > 0) {
                            this.mUOM = this.uom[0]
                        }
                    })
                }, 300);
            })
        },
        async loadTransactionItems() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    transactionItemHandler.list().then(res => {
                        if (res.data.statusCode === 200)
                            this.showLoading = false
                        this.transactionList = res.data.data
                    })
                }, 300);
            })
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let data = {
                        id: this.transactionItem.id,
                        name: this.transactionItem.name,
                        number: this.transactionItem.number,
                        description: this.transactionItem.description,
                        uom: this.mUOM,
                        account: this.mAccount,
                        type: "Transaction Item",
                        status: 1,
                        actionType: this.transactionItem.id ? 'edit' : 'new'
                    }
                    transactionItemHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {

                            const res = response.data.data
                            const index = this.transactionList.findIndex(item => {
                                return (res.id === item.id)
                            })
                            if (this.transactionList.length === 0) {
                                this.loadTransactionItems()
                            } else {
                                if (index < 0) {
                                    this.transactionList.push(res)
                                } else {
                                    this.transactionList.splice(index, 1, res)
                                }
                            }

                            this.$snotify.success('Success')
                            this.close()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                })
            })
        },
        cancel() {
            this.dialogM3 = false
        },
        close() {
            this.dialogM3 = false
        },
        newClick() {
            this.transactionItem = {}
            this.mAccount = {}
            this.mUOM = {}
            this.dialogM3 = true

        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridTranItem").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.transactionItem = dataItem
            this.mUOM = dataItem.uom
            this.mAccount = dataItem.account
            this.dialogM3 = true
        },

        initToolbar(that) {
            let grid = $("#gridTranItem").data("kendoGrid");
            let gridElement = grid.element;
            let toolbarElement = gridElement.find(".k-grid-toolbar");
            toolbarElement.on("click", ".k-pager-refresh", function (e) {
                e.preventDefault();
                onReloadData(that);
            });
            toolbarElement.on("click", ".k-pager-excel", function (e) {
                e.preventDefault();
                onExportExcel(that);
            });

            function onReloadData(that) {
                that.loadTransactionItems();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
        exportToExcel() {
            const grid = $("#gridTranItem").data("kendoGrid")
            grid.saveAsExcel()
        },
        toolbarTemplate: function () {
            const templateHtml =
                '<span>' +
                '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
                '</span><span>&nbsp;&nbsp;</span>' +
                '<span style="position:absolute; right:5px">' +
                '</span>' +
                '<span>' +
                '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
                '</span>'

            return kendo.template(templateHtml)
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
    },
    mounted: async function () {
        await this.loadUOM()
        await this.loadTransactionItems()
        await this.initToolbar(this)
    },
    created: async function () {
        await this.loadAccount()
    },
    computed: {},
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
};
</script>

<style scoped>

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {
}
</style>
