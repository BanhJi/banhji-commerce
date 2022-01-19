<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <v-row class="">
                            <v-col sm="3" cols="12" class="py-0">
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
                                <v-btn
                                    @click="searchTransaction('Stock Count')"
                                    color="primary"
                                >
                                    <i
                                        class="b-search"
                                        style="font-size: 18px; color:#fff !important;"
                                    />
                                </v-btn>
                            </v-col>
                            <v-col sm="2" cols="1" class="py-1">
                                <v-btn
                                    to="stock_count"
                                    color="primary"
                                    class=" white--text text-capitalize">
                                    {{ $t("new_count") }}
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row class="">
                            <v-col sm="12" cols="12" class="py-0">
                                <template>
                                    <kendo-datasource
                                        ref="gridTransactionDS"
                                        :type="'JSON'"
                                        :data="transactions"
                                        :server-paging="false"
                                    />
                                    <kendo-grid
                                        id="gridTransaction"
                                        class="grid-function"
                                        :data-source-ref="'gridTransactionDS'"
                                        :editable="false"
                                        :groupable="false"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :scrollable-virtual="true"
                                    >
                                        <kendo-grid-column
                                            :field="'transactionDate'"
                                            :title="$t('date')"
                                            :template="'<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                                            :width="150"
                                            :column-menu="false"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center', }"
                                            :attributes="{ style: 'text-align: center' }"
                                        />
                                        <kendo-grid-column
                                            :field="'referenceNo'"
                                            :title="$t('referenceNo')"
                                            :width="180"
                                            :template="referenceTemplate"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'category'"
                                            :title="$t('category')"
                                            :width="200"
                                            :template=" '<span>#=category.name || ``#</span>' "
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'group'"
                                            :attributes="{ class: 'tb_name_td' }"
                                            :title="$t('group')"
                                            :width="200"
                                            :template="'<span>#=group.name || ``#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'subGroup'"
                                            :attributes="{ class: 'tb_name_td' }"
                                            :title="$t('sub_group')"
                                            :hidden="true"
                                            :width="200"
                                            :template="'<span>#=subGroup.name || ``#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'warehouse'"
                                            :title="$t('warehouse')"
                                            :width="200"
                                            :template="'<span>#=warehouse.name || ``#</span>'"
                                            :hidden="true"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important', }"
                                        />
                                        <kendo-grid-column
                                            :field="'status'"
                                            :title="$t('status')"
                                            :width="120"
                                            :attributes="{ style: 'text-align: right; ' }"
                                            :template="statusTemplate"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                    </kendo-grid>
                                </template>
                                <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" type="loading"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
    name: "InventoryAdjustmentList",
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: "Today",
        showLoading: false,
        transactions: [],
        dialogM3: false,
        isLoaded: false,
    }),
    props: {},
    methods: {
        statusTemplate(dataItem) {
            const status = dataItem.status
            let statusText = ''
            switch (status) {
                case 1:
                    statusText = 'Open'
                    break
                case 2:
                    statusText = 'Used'
                    break
                default:
                    break
            }
            return statusText
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
        numberFormat(value) {
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
        },
        referenceTemplate(data) {
            let url = `stock_count/${data.id}`;
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
        async searchTransaction(type) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    const startDate = this.startDate;
                    const endDate = this.endDate;
                    let strFilter = "";
                    if (type !== "") {
                        strFilter = "?start=" + startDate + "&end=" + endDate + "&type=" + type;
                    } else {
                        strFilter = "?start=" + startDate + "&end=" + endDate;
                    }
                    billingHandler.inventoryAdjustmentList(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            // window.console.log('im search', res)
                            this.showLoading = false;
                            this.transactions = res.data.data;
                        } else {
                            this.showLoading = false;
                        }
                    });
                }, 10);
            });
        },
        callback() {
            if (
                this.$route.params !== null &&
                this.$route.params.hasOwnProperty("data")
            ) {
                const data = this.$route.params.data;
                if (data.transactionType === "delete") {
                    // this.loadTransactions()
                    window.console.log("im changed", this.$route.params);
                }
            }
            window.console.log("im changed", this.$route.params);
        },
    },
    mounted() {
    },
    computed: {},
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
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
    .marginT {
        margin-top: 15px;
    }
}
</style>
