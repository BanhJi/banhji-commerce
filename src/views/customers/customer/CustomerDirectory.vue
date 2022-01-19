<template>
    <v-row class="">
        <v-col sm="7" cols="12" class="py-0">
            <h2 class="mb-0 font_20">{{ $t("customer_directory") }}</h2>
            <p>{{ $t("customer_directory_desc") }}</p>
        </v-col>
        <v-col sm="5" cols="12" class="py-1">
            <v-menu class="white--text capitalize float-right">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        class="ml-2 rounded-4 float-right text-capitalize white--text"
                        v-on="on"
                    >
                        {{ $t("add_new_customer") }}
                        <v-icon size="" class="ma-1">expand_more</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link route to="individual_customer">
                        <v-list-item-title>
                            {{ $t("add_individual_customer") }}
                        </v-list-item-title
                        >
                    </v-list-item>
                    <v-list-item link route to="company_customer">
                        <v-list-item-title> {{ $t("company_customer") }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <!--            <v-btn outlined class="secondary&#45;&#45;text mx-3 capitalize float-right" @click="importShow">-->
            <!--                {{ $t("import") }}-->
            <!--            </v-btn>-->
            <v-dialog v-model="dialogm2" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn outlined class="secondary--text mx-3 capitalize float-right" color="primary" v-on="on"
                           @click="importShow">
                        {{ $t('import') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('import_customer') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="background-color: #EDF1F5; color: #333333;">
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{ $t('customer_type') }}</label>
                                    <v-select
                                        class="mt-1"
                                        :placeholder="$t('select_type')"
                                        outlined
                                        v-model="impCusType"
                                        :items="customerTypes"
                                        @change="customerTypeChange"
                                        item-value="value.id"
                                        item-text="name"
                                        return-object
                                        required
                                    />
                                    <label class="label">{{ $t('group') }}</label>
                                    <v-select
                                        class="mt-1"
                                        :placeholder="$t('select_group')"
                                        outlined
                                        v-model="impGroup"
                                        :items="customerGroups"
                                        item-value="value.id"
                                        item-text="name"
                                        return-object
                                        required
                                    />
                                    <label class="mb-0">{{ $t("default_discount") }}</label>
                                    <v-select
                                        class="mt-1"
                                        v-model="impDiscountItem"
                                        :items="discountItems"
                                        item-value="id"
                                        item-text="name"
                                        return-object
                                        tage="Default Discount"
                                        placeholder="0% discount"
                                        outlined/>
                                    <label class="mb-0">{{ $t("default_price_level") }}</label>
                                    <v-select
                                        class="mt-1"
                                        v-model="impPriceLevel"
                                        :items="priceLevels"
                                        item-value="id"
                                        item-text="name"
                                        return-object
                                        placeholder="Price Level"
                                        tage="Default Price Level"
                                        outlined/>
                                    <v-row>
                                        <v-col sm="6" cols="6" class="pb-0">
                                            <upload-excel-component :on-success="handleSuccess"
                                                                    :before-upload="beforeUpload"/>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="pb-0">
                                            <v-btn outlined class="secondary--text  capitalize float-right"
                                                   href="/files/member.xlsx" download>
                                                <span class="">{{ $t('download_file') }}</span>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider/>
                        <v-col sm="12" cols="12" class="py-0">
                            <v-card-actions class="pa-4">
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0 pl-0">
                                        <v-btn color="black"
                                               outlined
                                               class=" text-capitalize black--text float-left"
                                               @click="dialogm2 = false">{{ $t('cancel') }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0 pr-0">
                                        <v-btn color="secondary"
                                               class="px-3  white--text text-capitalize float-right"
                                               @click="saveImport">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-col>
                    </v-card>
                </v-form>
            </v-dialog>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-text-field
                                class="mt-1"
                                @keypress.enter="onSearch(search)"
                                clearable
                                @click:clear="onSearch('')"
                                v-model="search"
                                :placeholder="$t('search_directory')"
                                outlined
                            />
                        </v-col>
                        <v-col sm="1" cols="12" class="py-1">
                            <v-btn
                                color="primary"
                                class="white--text capitalize marginTopPhone"
                                @click="onSearch(search)"
                            >
                                {{ $t("search") }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource
                        ref="dataSourceDirection"
                        :data="customersDirectory"
                        :group="group"
                    />
                    <kendo-grid
                        id="gridCDirectory"
                        class="grid-function"
                        :data-source-ref="'dataSourceDirection'"
                        :editable="false"
                        :groupable="true"
                        :noRecords="true"
                        :excel-file-name="'CustomerDirectory.xlsx'"
                        :excel-filterable="true"
                        :excel-all-pages="true"
                        :toolbar="['excel']"
                        :excel-export="excelExport"
                        :column-menu="true"
                        :resizable="true"
                        :scrollable-virtual="true">
                        <kendo-grid-column
                            :field="'number'"
                            :hidden="true"
                            :title="$t('number')"
                            :template="'<span>#= abbr #-#= number#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'name'"
                            :title="$t('name')"
                            :width="200"
                            :template="'<span>#= name#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'priceLevel'"
                            :title="$t('price_level')"
                            :width="150"
                            :template="'<span>#= priceLevel#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'creditLimit'"
                            :title="$t('credit_limit')"
                            :width="150"
                            :attributes="{style: 'text-align: right; '}"
                            :template="'<span>#=kendo.toString(creditLimit, decimalFormat)#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'customerType'"
                            :hidden="true"
                            :title="$t('type')"
                            :width="200"
                            :template="'<span>#= customerType#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'group'"
                            :title="$t('group')"
                            :hidden="true"
                            :width="120"
                            :template=" '<span>#= group #</span>' "
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                        <kendo-grid-column
                            :field="'saleDepositAcc'"
                            :hidden="true"
                            :title="$t('sale_deposit')"
                            :width="200"
                            :template="'<span>#= saleDepositAcc#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'receivableAcc'"
                            :hidden="true"
                            :width="200"
                            :title="$t('account_receivable')"
                            :template="'<span>#= receivableAcc#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'saleDiscountAcc'"
                            :hidden="true"
                            :width="200"
                            :title="$t('settlement_discount')"
                            :template="'<span>#= saleDiscountAcc#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'phoneNumber'"
                            :title="$t('phone')"
                            :width="120"
                            :template="'<span>#= phoneNumber#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'email'"
                            :title="$t('email')"
                            :width="150"
                            :template="'<span>#= email#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="''"
                            :title="$t('action')"
                            :visible="true"
                            :width="90"
                            :command="[ { iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit }, ]"
                            :headerAttributes="{ style: 'text-align: center; background-color: #EDF1F5',}"
                            :attributes="{ style: 'text-align: center' }"/>
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
import kendo from "@progress/kendo-ui";
import JSZip from "jszip";
import customerGroupHandler from "@/scripts/customerGroupHandler";
import customerTypeHandler from "@/scripts/customerTypeHandler";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import discountItemHandler from "@/scripts/discountItemHandler";

const OPTION_TYPE = "?type=Sale";
window.JSZip = JSZip;
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const customerHandler = require("@/scripts/customerHandler");
import UploadExcelComponent from '@/components/upload_excel/TimeCard.vue';
const $ = kendo.jQuery //require("jquery")

export default {
    data: () => ({
        dialogm2: false,
        valid: true,
        showLoading: false,
        start_date: "",
        end_date: "",
        search: "",
        params: {
            search: "",
            type: "cus-",
        },
        customersDirectory: [],
        group: {field: "customerType"},
        impCusType: {},
        customerGroups: [],
        customerTypes: [],
        priceLevels: [],
        impPriceLevel: {},
        tableData: [],
        impDiscountItem: {},
        discountItems: [],
        impDepositAcc: {},
        impDiscountAcc: {},
        impGroup: {},
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'upload-excel-component': UploadExcelComponent,
    },
    props: {},
    methods: {
        excelExport(e){           
            const gridRef = $("#gridCDirectory thead").find("[data-role= 'columnmenu']");
            const gridRefHeadNone= $("#gridCDirectory thead").find("[style*='display: none' ]");
            window.console.log(gridRef.length-gridRefHeadNone.length);
            var sheet = e.workbook.sheets[0];
            sheet.frozenRows = 2;
            const charName = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            sheet.mergedCells = ["A1:"+charName[(gridRef.length-gridRefHeadNone.length)]+1];
            sheet.name = "Orders";

            var myHeaders = [
      
                {
                    value:"Customer Header",
                    fontSize: 20,
                    textAlign: "center",
                    background:"#808080",
                    color:"#0000",
                    headerTemplate: "Units In Stock <br> (Excludes foreign)"  ,
                    wrap: true 
                }];
            const footerRow = {
                height: 70,
                cells: [{ value: `Total revenue 1 000 000`, fontSize: 30, colSpan: 5 }],
            };

            sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
            sheet.rows.push(footerRow);
        },
        importShow() {
            //
            this.impCusType = this.customerTypes[0]
            this.impGroup = {}
            if (this.discountItems.length > 0) {
                this.impDiscountItem = this.discountItems[0]
            }
            if (this.priceLevels.length > 0) {
                this.impPriceLevel = this.priceLevels[0]
            }
            this.customerTypeChange()
        },
        customerTypeChange() {
            const c = this.impCusType
            window.console.log(c, 'cus type')
            this.impDepositAcc = c.saleDepositAcc;
            this.impDiscountAcc = c.saleDiscountAcc;
            this.impReceivableAcc = c.receivableAcc;
            // if(Object.keys(c.priceLevel).length > 0){
            //     this.impPriceLevel = c.priceLevel
            // }
            // window.console.log(c, 'cust type')
        },
        saveImport() {
            if (this.tableData.length > 0) {
                let data = {
                    data: this.tableData
                }
                this.showLoading = true
                window.console.log(data, 'here data')
                customerHandler.importCreate(data).then(response => {
                    this.showLoading = false
                    if (response.data.statusCode === 201) {
                        this.$refs.form.reset()
                        this.$snotify.success('Successfully')
                        this.dialogm2 = false
                    }
                }).catch(e => {
                    this.showLoading = false
                    this.$snotify.error('Something went wrong')
                    this.errors.push(e)
                })
            }
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if (isLt1M) {
                return true
            }
            this.$message({
                message: 'Please do not upload files larger than 1m in size.',
                type: 'warning'
            })
            return false
        },
        handleSuccess({results, header}) {
            results.forEach(element => {
                const c = this.impCusType
                element.customerType = this.impCusType
                element.type = "Individual"
                element.abbr = c.abbr
                element.isDonor = false
                element.taxId = ""
                element.status = 1
                let a = element.gender
                let g = a.charAt(0).toUpperCase() + a.slice(1);
                element.contactAddress = {
                    gender: g,
                    phoneNumber: element.phoneNumber,
                    email: element.email,
                    dob: element.dob,
                    address: [],
                    latitude: "",
                    longitude: "",
                }
                element.paymentBilling = {
                    customerGroup: this.impGroup,
                    paymentTerm: {},
                    paymentOption: {},
                    assignTo: {},
                    discountItem: this.impDiscountItem,
                    priceLevel: this.impPriceLevel,
                }
                element.accountTax = {
                    receivableAcc: this.impReceivableAcc,
                    saleDepositAcc: this.impDepositAcc,
                    saleDiscountAcc: this.impDiscountAcc,
                    saleTax: c.saleTax
                }
                element.group = this.impGroup
                element.loggedUser = this.loggedUser
                element.priceLevel = this.impPriceLevel
                element.cashPayment = {}
                element.qrPayment = {}
                element.bankTransfer = {}
                element.billPayment = {}
                element.saveOption = 'imported'
            });
            this.tableData = results
            this.tableHeader = header
            window.console.log(this.tableData, this.tableHeader, 'dataaaaa')
        },
        dataBound: function () {
            const grid = kendo.jQuery("#gridCDirectory").data("kendoGrid");
            if (grid) {
                if (grid.columns) {
                    for (let i = 0; i < grid.columns.length; i++) {
                        grid.autoFitColumn(i);
                    }
                }
            }
        },
        async loadCustomerCenter() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.customers = [];
                    this.showLoading = true;
                    customerHandler.directory(this.params).then((res) => {
                        this.showLoading = true;
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.customersDirectory = res.data.data;
                        }
                    });
                }, 10);
            });
        },
        onSearch(search) {
            // window.console.log(this.search, "search");
            this.params = {
                search: search,
                type: "cus-",
            };
            this.loadCustomerCenter();
            // if(this.search){
            //
            // }
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridCDirectory").data("kendoGrid");
            let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
            window.console.log(dataItem, "dataItem1245");
            if (dataItem.type === "Company") {
                this.$router.push({
                    path: "company_customer" + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: "edit"},
                });
            } else {
                this.$router.push({
                    path: "individual_customer" + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: "edit"},
                });
            }
        },
        async loadCustomerGroup() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    customerGroupHandler.get().then((res) => {
                        this.showLoading = false;
                        this.customerGroups = res;
                    });
                }, 10);
            });
        },
        async loadCustomerType() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    customerTypeHandler.get().then((res) => {
                        this.customerTypes = res
                        // this.customerTypes = res.filter((m) => {
                        //     return m.nature.name.includes("Individual");
                        // });
                    });
                }, 10);
            });
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    priceLevelHandler.get().then((res) => {
                        this.priceLevels = res;
                    });
                }, 10);
            });
        },
        async loadDiscountItems() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    discountItemHandler.list(OPTION_TYPE).then((res) => {
                        this.showLoading = false;
                        this.discountItems = res.data.data;
                    });
                }, 10);
            });
        },
    },
    async mounted() {
        // await this.loadCustomerCenter();
        await this.loadCustomerGroup();
        await this.loadCustomerType();
        await this.loadPriceLevel();
        await this.loadDiscountItems();
    },
    computed: {},
    watch: {
        $route: "loadCustomerCenter",
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
    .marginTopPhone {
        margin-top: -10px;
    }
}
</style>
