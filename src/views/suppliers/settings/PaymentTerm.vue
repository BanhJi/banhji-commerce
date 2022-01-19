<template>
    <v-row>
        <v-col sm="10" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("supplier_payment_term") }}</h2>
            <p class="mb-0">
                {{ $t("payable_payment_term_desc") }}
            </p>
        </v-col>
        <v-col sm="2" cols="12" class="pt-0">
            <v-dialog v-model="dialogM2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        class=" text-capitalize white--text float-right"
                        v-on="on"
                        @click="onNewClick"
                    >
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("supplier_payment_term") }}</v-card-title>
                        <v-icon @click="dialogM2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{ $t("payment_term_name") }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        outlined
                                        placeholder=""
                                        tage="Payment Method Name"
                                        :rules="[(v) => !!v || $t('is_required')]"
                                        v-model="paymentTerm.name"
                                    />
                                    <v-row>
                                        <v-col sm="4" cols="12" class="py-0 mt-5">
                                            <label class="label">{{ $t("net_due") }}</label>
                                            <v-text-field
                                                class="mt-1 pr-0 "
                                                outlined
                                                placeholder=""
                                                type="number"
                                                tage="Net Due"
                                                :rules="[(v) => !!v || $t('is_required')]"
                                                v-model="paymentTerm.netDue"
                                            />
                                        </v-col>
                                        <v-col sm="4" cols="12" class="py-0 pl-0">
                                            <label class="label">{{ $t("discount_period") }}</label>
                                            <v-text-field
                                                class=" mt-1"
                                                outlined
                                                type="number"
                                                tage="Discount Period"
                                                placeholder=""
                                                :rules="[(v) => !!v || $t('is_required')]"
                                                v-model="paymentTerm.discountPeriod"
                                            />
                                        </v-col>
                                        <v-col sm="3" cols="12" class="py-0 pl-0">
                                            <label class="label">{{ $t("discount_rate") }}</label>
                                            <v-text-field
                                                width="200"
                                                class="mt-1"
                                                outlined
                                                type="number"
                                                tage="Discount Rate"
                                                placeholder=""
                                                :rules="[(v) => !!v || $t('is_required')]"
                                                v-model="paymentTerm.discountPercentage"
                                            />
                                        </v-col>
                                        <v-icon
                                            class="float-left"
                                            style="margin-top: 30px"
                                            size="15"
                                        >
                                            mdi-percent
                                        </v-icon>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col sm="12" cols="12" class="py-0 ">
                                            <label class="label">{{ $t("discount_account") }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                :items="accounts"
                                                return-object
                                                item-text="name"
                                                item-value="id"
                                                tage="Cash Account"
                                                :rules="[(v) => !!v || $t('is_required')]"
                                                v-model="account"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn
                                    color="black"
                                    outlined
                                    class=" text-capitalize  black--text float-left"
                                    @click="dialogM2 = false"
                                >{{ $t("cancel") }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn
                                    color="primary"
                                    :disabled="btnDisabled"
                                    class="px-3  white--text text-capitalize"
                                    @click.native="onSaveClose"
                                >{{ $t("save_close") }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                />
                <kendo-datasource ref="gridPaymentTermDS" :data="paymentTerms"/>
                <kendo-grid
                    id="gridPaymentTerm"
                    class="grid-function"
                    :data-source-ref="'gridPaymentTermDS'"
                    :editable="false"
                    :toolbar="toolbarTemplate"
                    :excel-export="excelExport"
                    :excel-file-name="'paymentTermList.xlsx'"
                    :excel-filterable="true"
                    :scrollable-virtual="true"
                >
                    <!--                    <kendo-grid-column-->
                    <!--                        :field="'no'"-->
                    <!--                        :title="$t('no')"-->
                    <!--                        :template="rowNumberTmpl"-->
                    <!--                        :width="40"-->
                    <!--                        :column-menu="false"-->
                    <!--                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                    <!--                        :attributes="{style: 'text-align: center'}"/>-->
                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :attributes="{ class: 'tb_name_td' }"
                        :width="160"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="'netDue'"
                        :title="$t('net_due')"
                        :width="100"
                        :attributes="{ style: 'text-align: right; ' }"
                        :template="'<span>#=netDue#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="'discountPeriod'"
                        :title="$t('discount_period')"
                        :width="200"
                        :attributes="{ style: 'text-align: right; ' }"
                        :template="'<span>#=discountPeriod#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="'rate'"
                        :title="$t('rate')"
                        :width="80"
                        :attributes="{ style: 'text-align: right; ' }"
                        :template="'<span>#=discountPercentage#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="'account'"
                        :title="$t('account')"
                        :template="'<span>#=account.name ? account.name : ``#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="100"
                        :command="[
              { iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit },
            ]"
                        :headerAttributes="{
              style: 'text-align: left; background-color: #EDF1F5',
            }"
                    />
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import AccountMappingModel from "@/scripts/account-map/Account";

const accountHandler = require("@/scripts/handler/accounting/account");
const settingHandler = require("@/scripts/settingsHandler");
const $ = kendo.jQuery
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: false,
        accountTypes: [],
        accountType: {
            name: "",
            nature: "",
            statement_group: "",
            number: 0,
        },
        paymentTerms: [],
        paymentTerm: {
            id: "",
            netDue: "",
            discountPeriod: "",
            discountPercentage: "",
            name: "",
            account: {},
            type: "pmt-supplier",
        },
        option: 1,
        accounts: [],
        account: {},
        dialogM2: false,
        valid: true,
        btnDisabled: false
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close();
        },
    },
    created() {
        this.loadAccount();
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridPaymentTermDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridPaymentTerm").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.paymentTerm = dataItem;
            this.account = dataItem.account;
            this.dialogM2 = true;
            this.option = 2;
        },
        onNewClick() {
            this.option = 1;
            this.clear();
        },
        close() {
            this.dialogM2 = false;
        },
        clear() {
            this.accountType = [];
            this.paymentTerm = [];
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const data = {
                        id: this.paymentTerm.id ? this.paymentTerm.id : "",
                        netDue: this.paymentTerm.netDue,
                        discountPercentage: this.paymentTerm.discountPercentage,
                        discountPeriod: this.paymentTerm.discountPeriod,
                        name: this.paymentTerm.name,
                        type: "pmt-supplier",
                        batch: 0,
                        account: new AccountMappingModel(this.account),
                    };
                    this.btnDisabled = true
                    this.showLoading = true
                    settingHandler
                        .addPaymentTerm(data)
                        .then((response) => {
                            if (response.data.statusCode === 201) {
                                this.btnDisabled = false
                                this.showLoading = false
                                this.$snotify.success("Successful");
                                this.dialogM2 = false;
                                this.loadPaymentTerm();
                            } else {
                                this.btnDisabled = false
                                this.showLoading = false
                            }
                        })
                        .catch((e) => {
                            this.btnDisabled = false
                            this.showLoading = false
                            this.$snotify.error("Something went wrong");
                            this.errors.push(e);
                        });
                }, 10);
            });
        },
        async loadPaymentTerm() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = "?type=pmt-supplier";
                    this.showLoading = true
                    settingHandler.getPaymentTerm(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.paymentTerms = res.data.data;
                        } else {
                            this.showLoading = false
                        }
                    });
                }, 10);
            });
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    accountHandler.getAll().then((res) => {
                        this.showLoading = false;
                        //Cash Account
                        this.accounts = res.data
                            .filter((m) => m.account_type.number === 40)
                            .map((item) => {
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
                                    account_type: item.account_type,
                                };
                            });
                        if (this.accounts.length > 0) {
                            this.account = this.accounts[0];
                        }
                    });
                }, 10);
            });
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
        exportToExcel() {
            const grid = $("#gridPaymentTerm").data("kendoGrid")
            grid.saveAsExcel()
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridPaymentTerm").data("kendoGrid");
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
                that.loadPaymentTerm()
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
    },
    mounted: async function () {
        // await this.loadAccountTypes()
        await this.loadPaymentTerm();
        await this.initToolbar(this);
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
