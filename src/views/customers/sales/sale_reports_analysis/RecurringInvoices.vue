<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <h2 class="mb-0 font_20">{{ $t("recurring_invoices") }}</h2>
                <v-row class="">
                    <v-col sm="4" cols="12" class="py-0">
                        <v-select
                            class="mt-1"
                            :items="dateSorters"
                            v-model="mDateSorter"
                            @change="onSorterChanges"
                            clearable
                            outlined
                            placeholder="ALL"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker
                            :initialDate="startDate"
                            @emitDate="startDate = $event"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker
                            :initialDate="endDate"
                            @emitDate="endDate = $event"
                        />
                    </v-col>

                    <v-col sm="1" cols="1" class="pt-1">
                        <v-btn color="primary white--text" @click="searchTransaction">
                            <i
                                class="b-search"
                                style="font-size: 18px; color:#fff !important;"
                            />
                        </v-btn>
                    </v-col>
                </v-row>
                <!-- loading -->
                <LoadingMe :isLoading="showLoading"
                           :fullPage="false"
                           type="loading"
                           :myLoading="true">
                </LoadingMe>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource
                                ref="gridTransactionDS"
                                :group="group"
                                :data="recurringList"
                            />
                            <kendo-grid
                                id="gridRecurringInvoice"
                                class="grid-function"
                                :data-source-ref="'gridTransactionDS'"
                                :editable="false"
                                :groupable="true"
                                :navigatable="true"
                                :noRecords="true"
                                :resizable="true"
                                :schema-model-id="'id'"
                                :scrollable-virtual="true"
                            >
                                <!--                <kendo-grid-toolbar class="k-grid-toolbar">
                                                  <button type="button" class="k-button" v-on:click="clickMe">Create Custom</button>
                                                </kendo-grid-toolbar>-->
                                <!--                <kendo-grid-column-->
                                <!--                    :field="'check'"-->
                                <!--                    :title="'-'"-->
                                <!--                    :headerTemplate="headerTemplate"-->
                                <!--                    :template="checkTemplate"-->
                                <!--                    :width="50"-->
                                <!--                    :column-menu="false"-->
                                <!--                    :headerAttributes="{-->
                                <!--                    style: 'background-color: #EDF1F5;',-->
                                <!--                    class: 'text-center',-->
                                <!--                  }"-->
                                <!--                    :attributes="{ style: 'text-align: center' }"-->
                                <!--                />-->
                                <kendo-grid-column
                                    :field="'name'"
                                    :attributes="{ class: 'tb_name_td' }"
                                    :title="$t('name')"
                                    :width="120"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'customerName'"
                                    :title="$t('customer_name')"
                                    :width="200"
                                    :template="'<span>#=customerName#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'txnNextDate'"
                                    :title="$t('next_date')"
                                    :width="110"
                                    :template="dateFormat"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'transactionType'"
                                    :title="$t('transaction_type')"
                                    :width="180"
                                    :template="
                    '<span>#=transactionType.name?transactionType.name:``#</span>'
                  "
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <!--                                <kendo-grid-column-->
                                <!--                                    :field="'type'"-->
                                <!--                                    :title="$t('type')"-->
                                <!--                                    :width="100"-->
                                <!--                                    :template="'<span>#=type#</span>'"-->
                                <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"-->
                                <!--                                />-->
                                <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('amount')"
                                    :width="100"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :template="
                    '<span>#=kendo.toString(amount, decimalFormat)#</span>'
                  "
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                                />
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('')"
                                    :width="60"
                                    :command="[{ iconClass: 'k-icon k-i-file-txt .k-i-txtUnicode: 6f', text: ' ', click: goToConvert }]"
                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5',}"
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
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import RecurringModel from "@/scripts/invoice/model/RecurringDetail";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";

const $ = kendo.jQuery
const recurringHandler = require("@/scripts/invoice/handler/recurringHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const recurringModel = new RecurringModel({});
export default {
    name: "RecurringInvoiceTransaction",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
    },
    data: () => ({
        showLoading: false,
        isLoaded: false,
        recurringList: [],
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: "Today",
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        recurring: recurringModel,
        group: {field: "customerName"},
        schemaModelFields: {
            id: {editable: false, nullable: true},
            check: {type: "boolean"},
        },
        transportUrl: recurringHandler.url(""),
    }),
    methods: {
        initToolbar(that) {
            let grid = $("#gridTransaction").data("kendoGrid");
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
                that.loadRecurringInvoice();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
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

        // initToolbar(that) {
        //     let grid = $("#gridTransaction").data("kendoGrid");
        //     let gridElement = grid.element;
        //     let toolbarElement = gridElement.find(".k-grid-toolbar");
        //     toolbarElement.on("click", ".reload", function (e) {
        //         e.preventDefault();
        //         onReloadData(that);
        //         // grid.dataSource.read()
        //     });
        //     toolbarElement.on("click", ".to-invoice", function (e) {
        //         e.preventDefault();
        //         onToInvoiceClick(that, data);
        //     });
        //     $("#header-chb").change(function (ev) {
        //         let checked = ev.target.checked;
        //         data = [];
        //         $(".row-checkbox").each(function (idx, item) {
        //             if (checked) {
        //                 if (
        //                     !$(item)
        //                         .closest("tr")
        //                         .is(".k-state-selected")
        //                 ) {
        //                     $(item).click();
        //                 }
        //             } else {
        //                 if (
        //                     $(item)
        //                         .closest("tr")
        //                         .is(".k-state-selected")
        //                 ) {
        //                     $(item).click();
        //                 }
        //             }
        //         });
        //     });
        //     let checkedIds = {};
        //     let data = [];
        //
        //     function selectRow() {
        //         let checked = this.checked,
        //             row = $(this).closest("tr"),
        //             grid = $("#gridTransaction").data("kendoGrid"),
        //             dataItem = grid.dataItem(row);
        //
        //         checkedIds[dataItem.id] = checked;
        //         if (checked) {
        //             //-select the row
        //             row.addClass("k-state-selected");
        //             data.push({
        //                 recurringId: dataItem.id,
        //                 id: dataItem.txnId,
        //                 txnNextDate: dataItem.txnNextDate,
        //                 checked: checked,
        //             });
        //         } else {
        //             //-remove selection
        //             row.removeClass("k-state-selected");
        //             const index = data.findIndex((item) => {
        //                 return dataItem.id === item.recurringId;
        //             });
        //             data.splice(index, 1, {
        //                 recurringId: dataItem.id,
        //                 id: dataItem.txnId,
        //                 txnNextDate: dataItem.txnNextDate,
        //                 checked: checked,
        //             });
        //         }
        //     }
        //
        //     function onToInvoiceClick(that, data) {
        //         const selectedRow = data.filter((m) => {
        //             return m.checked === true;
        //         });
        //         that.recurringToInvoices(selectedRow);
        //     }
        //
        //     function onReloadData(that) {
        //         that.searchTransaction();
        //     }
        //
        //     grid.table.on("click", ".row-checkbox", selectRow);
        // },
        // toolbarTemplate: function () {
        //     const templateHtml =
        //         '<span style="float: right; margin-bottom: 8px;z-index: 116;position: absolute;right: 21px;top: 14px;"' +
        //         '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span></a>' +
        //         "</span>"
        //         // +
        //         // '<span style="float: right; margin-bottom: 8px;z-index: 116;position: absolute;right: 60px;top: 14px;"' +
        //         // '<a class="k-pager-refresh k-link k-button to-invoice" title="ToInvoice" @click="onToInvoiceClick"><span class="k-icon k-i-edit-tools"></span></a>' +
        //         // "</span>";
        //
        //     return kendo.template(templateHtml);
        // },
        async recurringToInvoices(data) {
            if (data.length > 0) {
                this.$swal({
                    title: "Are you sure?",
                    text: "Convert to invoice",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: "Yes, convert it!",
                }).then((result) => {
                    if (result.value) {
                        for (const itm of data) {
                            this.onConvertToInvoice(
                                itm.recurringId,
                                itm.id,
                                itm.txnNextDate,
                                false
                            );
                            // const index = this.recurringList.findIndex(item => {
                            //   return (itm.recurringId === item.id)
                            // })
                            // this.recurringList.splice(index, itm)
                        }
                        this.searchTransaction();
                    }
                });
            }
        },
        parameterMap: function (options, operation) {
            if (operation !== "read" && options) {
                return kendo.stringify(options);
            }
        },
        async searchTransaction() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    const startDate = this.startDate;
                    const endDate = this.endDate;
                    const strFilter =
                        "?start=" + startDate + "&end=" + endDate + "&type=Recurring Invoice";
                    recurringHandler.list(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.recurringList = res.data.data;
                        }
                        this.showLoading = false;
                    });
                }, 10);
            });
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
                    today = new Date()
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

                 break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');
                    break;
                default:
                    this.startDate = "";
                    this.endDate = "";
            }
        },
        headerTemplate() {
            return `<input type='checkbox' id='header-chb' class='k-checkbox header-checkbox'>`;
        },
        checkTemplate(dataItem) {
            return `<input type='checkbox' #= ${dataItem.check} ? \\'checked="checked"\\' : '' # class='k-checkbox row-checkbox' />`;
        },
        goToConvert(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridRecurringInvoice").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            const txnId = dataItem.txnId || '';
            if (txnId) {
                const id = dataItem.id;
                const txnNextDate = dataItem.txnNextDate;
                this.$swal({
                    title: "Are you sure?",
                    text: "Convert to invoice",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: "Yes, convert it!",
                }).then((result) => {
                    if (result.value) {
                        this.onConvertToInvoice(id, txnId, txnNextDate, true);
                    }
                });
            }
        },
        async onConvertToInvoice(id, txnId, txnNextDate, isGoToView) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let data = {
                        id: txnId,
                        recurringId: id,
                        transactionDate: txnNextDate,
                        type: "Invoice",
                        actionType: "recurring",
                    };
                    this.showLoading = true
                    billingHandler
                        .create(data)
                        .then((response) => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success("Successfully");
                                const res = response.data.data;
                                this.showLoading = false;
                                if (res.id) {
                                    if (isGoToView) {
                                        this.goTo(res.id);
                                    }
                                }
                            }else{
                                this.showLoading = false;
                            }
                        })
                }, 10);
            });
        },
        goTo(id) {
            this.$router.push({
                path: "invoice_view/" + id,
                name: "Invoice View",
                params: {id: id},
            });
        },
        status(dataItem) {
            let status = "";
            switch (dataItem.status) {
                case 1:
                    status = "Open";
                    break;
                case 2:
                    status = "Closed";
                    break;
                case 4:
                    status = "Void";
                    break;
            }
            return status;
        },
        dateFormat(dataItem) {
            return kendo.toString(
                new Date(dataItem.txnNextDate),
                `${this.recurring.dateFormat}`
            );
        },
        customerName(dataItem) {
            if (dataItem.hasOwnProperty("customer")) {
                if (dataItem.customer.hasOwnProperty("id")) {
                    return dataItem.customer.name;
                }
            } else {
                return "";
            }
        },
        referenceTemplate(data) {
            let url = `invoice_view/${data.id}`;
            if (data.type === "Invoice") {
                url = `invoice_view/${data.id}`;
            } else if (data.type === "Sale Quote") {
                url = `sale_quote_view/${data.id}`;
            } else if (data.type === "Delayed Invoice") {
                url = `delayed_invoice_view/${data.id}`;
            }
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            };
            return {
                template: LinkTemplate,
                templateArgs: args,
            };
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadRecurringInvoice() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    recurringHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.recurringList = res.data.data;
                        }
                        this.showLoading = false;
                    });
                }, 10);
            });
        },
    },
    mounted: async function () {
        // await this.loadRecurringInvoice();
        await this.searchTransaction();
        // this.initToolbar(this);
    },
    computed: {},
    watch: {
        $route: "loadViewInvoice",
    },
};
</script>
<style scoped></style>
