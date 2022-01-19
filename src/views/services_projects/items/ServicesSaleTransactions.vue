<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <h2 class="mb-0 font_20">{{ $t("service_report") }}</h2>
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate
                            :initStartDate="startDate"
                            @emitStartDate="startDate = $event"
                            :initEndDate="endDate"
                            @emitEndDate="endDate = $event"
                        />
                    </v-col>

                    <v-col sm="1" cols="12" class="py-0 mt-1">
                        <v-btn
                            class="btn_search"
                            style="background-color: rgb(237, 241, 245)"
                            @click="searchTransaction('Cash Receipt')"
                        >
                            <i
                                class="b-search"
                                style="font-size: 18px; color:#fff !important;"
                            />
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="12" class="py-0 mt-1">
                        <v-dialog v-model="dialogm2" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn outlined class="secondary--text  capitalize float-right" color="primary" v-on="on" @click="importShow">
                                    {{ $t('import') }}
                                </v-btn>
                            </template>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-card>
                                    <v-card-title>{{ $t('import_employee') }}</v-card-title>
                                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                                    <v-divider/>
                                    <v-card-text style="background-color: #EDF1F5; color: #333333;">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t("category") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    tage="Service Category"
                                                    :placeholder="$t('select_type')"
                                                    outlined
                                                    v-model="impCategory"
                                                    :items="categories"
                                                    item-value="id"
                                                    :item-text="(item) => `${item.abbr} - ${item.name}`"
                                                    @change="onCategoryChanged"
                                                    return-object
                                                    :rules="[(v) => !!v || 'Category is required']"
                                                    required/>
                                                <label class="label  mb-0">{{ $t("group") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    tage="Product Group"
                                                    :placeholder="$t('select_grou')"
                                                    outlined
                                                    v-model="impGroup"
                                                    :disabled="disabled"
                                                    :items="groupss"
                                                    @change="loadSubGroup(impGroup)"
                                                    item-value="id"
                                                    :item-text="(item) => `${item.abbr} - ${item.name}`"
                                                    return-object
                                                />
                                                <label class="label  mb-0">{{ $t("sub_group") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :placeholder="$t('select_sub_group')"
                                                    outlined
                                                    tage="Sub Group"
                                                    v-model="impSubGroup"
                                                    :items="subGroups"
                                                    :disabled="disabledS"
                                                    item-value="id"
                                                    return-object
                                                    :item-text="(item) => `${item.abbr} - ${item.name}`"
                                                    required
                                                />
                                                <v-row>
                                                    <v-col sm="6" cols="6" class="pb-0">
                                                        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                                                    </v-col>
                                                    <v-col sm="6" cols="6" class="pb-0">
                                                        <v-btn outlined class="secondary--text  capitalize float-right" href="/files/member.xlsx" download>
                                                            <span class="">{{$t('download_file')}}</span>
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
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"
                            />
                            <kendo-datasource
                                ref="productTxnDS"
                                :group="group"
                                :data="transactions"
                            />
                            <kendo-grid
                                id="gridProductTXN"
                                class="grid-function"
                                :data-source-ref="'productTxnDS'"
                                :sortable="false"
                                :groupable="true"
                                :filterable="false"
                                :column-menu="true"
                                :editable="false"
                                :style="{ width: '100%' }"
                                :noRecords="true"
                                :scrollable-virtual="true"
                            >
                                <kendo-grid-column
                                    :field="'type'"
                                    :title="$t('type')"
                                    :template="'<span>#=type#</span>'"
                                    :width="150"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'txnDate'"
                                    :title="$t('date')"
                                    :template="
                    '<span>#=kendo.toString(new Date(txnDate), dateFormat)#</span>'
                  "
                                    :width="150"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :template="'<span>#=name#</span>'"
                                    :width="200"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'txnNumber'"
                                    :title="$t('reference_no')"
                                    :template="referenceTemplate"
                                    :width="200"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'itemName'"
                                    :title="$t('item')"
                                    :template="'<span>#=itemName || ``#</span>'"
                                    :width="150"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'uom'"
                                    :title="$t('txn_uom')"
                                    :template="UOMTemplate"
                                    :width="150"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'qty'"
                                    :title="$t('txn_qty')"
                                    :template="
                    '<span>#=kendo.toString(qty, decimalFormat)#</span>'
                  "
                                    :width="150"
                                    :attributes="{ style: 'text-align: right' }"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'exchangePrice'"
                                    :title="$t('price')"
                                    :template="
                    '<span>#=kendo.toString(exchangePrice, decimalFormat)#</span>'
                  "
                                    :width="150"
                                    :attributes="{ style: 'text-align: right' }"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'exchangeBAmount'"
                                    :title="$t('amount')"
                                    :template="
                    '<span>#=kendo.toString(exchangeBAmount, decimalFormat)#</span>'
                  "
                                    :width="180"
                                    :attributes="{ style: 'text-align: right' }"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />

                                <kendo-grid-column
                                    :field="'buom'"
                                    :title="$t('base_uom')"
                                    :template="BUOMTemplate"
                                    :width="150"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />

                                <kendo-grid-column
                                    :field="'bQty'"
                                    :title="$t('base_qty')"
                                    :template="
                    '<span>#=kendo.toString(bQty, decimalFormat)#</span>'
                  "
                                    :width="150"
                                    :attributes="{ style: 'text-align: right' }"
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                                />
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SearchDateComponent from "@/components/custom_templates/SearchDate";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/cash-receipt/model/ItemLine";
import customerHandler from "@/scripts/customerHandler";
import UploadExcelComponent from "@/components/upload_excel/TimeCard";
import categoryHandler from "@/scripts/categoryHandler";
import groupHandler from "@/scripts/groupHandler";
import subGroupHandler from "@/scripts/subGroupHandler";
import uomHandler from "@/scripts/uomHandler";
import priceLevelHandler from "@/scripts/priceLevelHandler";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const itemLineModel = new ItemLineModel({});
export default {
    data: () => ({
        impCategory: {},
        disabled: true,
        disabledS: true,
        dialogm2: false,
        valid: true,
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        mDateSorter: "Today",
        dateSorters: ["Today", "This Week", "This Month", "This Year"],
        group: {field: "itemName"},
        transactions: [],
        dateFormat: itemLineModel.dateFormat,
        showLoading: false,
        decimalFormat: "n2",
        categories: [],
        groups: [],
        groupss: [],
        subGroups: [],
        uoms: [],
        impGroup: {},
        impSubGroup: {},
        priceLevels: []
    }),
    components: {
        "app-searchdate": SearchDateComponent,
        LoadingMe: () => import(`@/components/Loading`),
        'upload-excel-component':UploadExcelComponent,
    },
    methods: {
        importShow(){
            if(this.categories.length > 0){
                this.impCategory = this.categories[0]
                this.onCategoryChanged()
            }
        },
        saveImport(){
            if(this.tableData.length > 0) {
                let data ={
                    data: this.tableData
                }
                this.showLoading = true
                window.console.log(data, 'here data')
                customerHandler.importServiceCreate(data).then(response => {
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
        handleSuccess({ results, header }) {
            results.forEach(element => {
                let c = this.impCategory
                element.typeIs = 'Service'
                let uo = this.uoms.filter((obj) => {return obj.name == element.uom})
                if(uo.length > 0){
                    element.uom = uo[0]
                }else{
                    this.$snotify.error('uom not found!')
                    return
                }
                element.category = c
                element.group = this.impGroup
                element.subGroup = this.impSubGroup
                let p = this.priceLevels.filter((obj) => {return obj.name == element.priceLevel})
                if(p.length > 0){
                    element.priceLevel = p[0]
                }else{
                    this.$snotify.error('price level not found!')
                    return
                }
                element.warehouse = {}
                element.base = 100
                element.value = element.price
                element.incomeAcc = c.account.hasOwnProperty("incomeAcc") ? c.account.incomeAcc : {}
                element.costOfGoodsSoldAcc = c.account.hasOwnProperty("costOfGoodsSoldAcc") ? c.account.costOfGoodsSoldAcc : {}
                element.defaultTax = c.tax.hasOwnProperty("defaultTax") ? c.tax.defaultTax : {}
                element.purchaseTax = c.tax.hasOwnProperty("purchaseTax") ? c.tax.purchaseTax : {}
                element.specificTax = c.tax.hasOwnProperty("specificTax") ? c.tax.specificTax : {}
                element.otherTax =  c.tax.hasOwnProperty("otherTax") ? c.tax.otherTax : {}
                element.canBeSold = false
                element.canBeSubContracted = false
                element.isDelayedRevenue = false
                element.isConsignmentItem = false
                element.canBeRecurringSubscribed = false
                element.isMeteredService = false
                element.isTimeBounded = false
                element.loggedUser = this.loggedUser
                element.type = 'new'
                element.saveOption = 'imported'
            });
            this.tableData = results
            this.tableHeader = header
            window.console.log(this.tableData, this.tableHeader, 'dataaaaa')
        },
        onSorterChanges(val) {
            let today = new Date();
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, "yyyy-MM-dd");
                    this.endDate = kendo.toString(today, "yyyy-MM-dd");

                    break;
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6;

                    this.startDate = kendo.toString(
                        new Date(today.setDate(first)),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.setDate(last)),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Month":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 1),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 31),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Year":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), 0, 1),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), 11, 31),
                        "yyyy-MM-dd"
                    );

                    break;
                default:
                    this.startDate = "";
                    this.endDate = "";
            }
        },
        async searchTransaction() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    const startDate = this.startDate;
                    const endDate = this.endDate;
                    let strFilter =
                        "?start=" + startDate + "&end=" + endDate + "&item=0&group=1";
                    billingHandler.inventoryListByFunction(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data;
                        }
                        this.showLoading = false;
                    });
                }, 10);
            });
        },
        referenceTemplate(data) {
            let url = `#`;
            if (data.type === "Invoice") {
                url = `invoice_view/${data.id}`;
            } else if (data.type === "Sale Quote") {
                url = `sale_quote_view/${data.id}`;
            } else if (data.type === "Delayed Invoice") {
                url = `delayed_invoice_view/${data.id}`;
            } else if (data.type === "Sale Order") {
                url = `sale_order_view/${data.id}`;
            } else if (data.type === "Purchase Order") {
                url = `purchase_order_view/${data.id}`;
            } else if (data.type === "Credit Memo") {
                url = `sale_return_view/${data.id}`;
            } else if (data.type === "Debit Memo") {
                url = `purchase_return_view/${data.id}`;
            } else if (data.type === "Inventory Adjustment") {
                url = `inventory_adjustment_view/${data.id}`;
            } else if (data.type === "Purchase") {
                url = `credit_purchase_view/${data.id}`;
            }

            let args = {
                text: data.txnNumber,
                url: url,
                data: data,
            };
            return {
                template: LinkTemplate,
                templateArgs: args,
            };
        },
        UOMTemplate(dataItem) {
            if (dataItem.hasOwnProperty("uom")) {
                const uom = dataItem.uom;
                if (uom.hasOwnProperty("uom")) {
                    if (uom.uom.hasOwnProperty("name")) {
                        return uom.uom.name;
                    }
                }
            }
            return ``;
        },
        BUOMTemplate(dataItem) {
            if (dataItem.hasOwnProperty("buom")) {
                const buom = dataItem.buom;
                if (buom.hasOwnProperty("name")) {
                    return buom.name;
                }
            }
            return ``;
        },
        async loadCategory() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    categoryHandler.get().then((res) => {
                        this.showLoading = false;
                        this.categories = res;
                        // window.console.log(res)
                        this.categories = this.categories.filter(i => i.hasOwnProperty('type') && i.type.name === 'Service')
                    });
                }, 10);
            });
        },
        async loadGroup() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    groupHandler.get().then((res) => {
                        this.showLoading = false;
                        this.groups = res.filter(m => m.category.hasOwnProperty('type') && m.category.type.name === 'Service');
                    });
                }, 10);
            });
        },
        async loadSubGroup(group) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    subGroupHandler.get().then((res) => {
                        this.showLoading = false;
                        if (group) {
                            if (group.hasOwnProperty('id')) {
                                this.subGroups = res.filter(m => m.group.id === group.id)
                                this.disabledS = false
                            }
                        }
                    });
                }, 10);
            });
        },
        async onCategoryChanged() {
            this.disabled = false
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    // this.loadCategoryAccountAndTax()
                    this.groupss = this.groups.filter(
                        (m) => m.category.id === this.impCategory.id
                    );
                }, 10);
            });
        },
        async loadPriceLevel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    priceLevelHandler.get().then(res => {
                        this.priceLevels = res
                    })
                }, 10)
            })
        },
        async loadUOM() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    uomHandler.get().then((res) => {
                        this.showLoading = false;
                        this.uoms = res;
                    });
                }, 10);
            });
        },
    },
    computed: {},
    mounted: async function () {
        await this.loadCategory();
        await this.loadGroup();
        await this.loadUOM()
        await this.loadPriceLevel()
    },
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
