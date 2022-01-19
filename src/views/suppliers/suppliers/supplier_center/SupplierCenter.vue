<template>
    <v-row class="">
        <v-col sm="4" cols="12" class="py-0 pr-4">
            <v-card outlined dense class="pa-3 no_border mb-md-4 mb-xs-0" color="grayBg">
                <div class="d-flex">
                    <v-text-field class=""
                                  v-model="search"
                                  @change="onSupplierTypeChanged"
                                  outlined
                                  :placeholder="$t('search')"
                                  append-icon="search"
                                  clearable/>
                    <v-btn icon @click="loadData">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </div>
                <v-select class=""
                          :items="supplierTypes"
                          @change="onSupplierTypeChanged"
                          item-value="id"
                          item-text="name"
                          v-model="mSupplierType"
                          :placeholder="$t('customer_type')"
                          clearable
                          outlined/>
                <!--        <v-select class=""-->
                <!--                  item-value="id"-->
                <!--                  item-text="name"-->
                <!--                  :placeholder="$t('customer_group')"-->
                <!--                  clearable-->
                <!--                  outlined/>-->
            </v-card>
            <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"/>
                <kendo-datasource ref="supplierDS"
                                  :data="suppliers"
                                  :schema="schemaDefinition"
                />

                <kendo-grid id="gridSupplier" class="grid-center center_heigth"
                            :change="onChanged"
                            :data-source-ref="'supplierDS'"
                            :selectable="true"
                            :persistSelection="true"
                            :noRecords="true"
                            :scrollable="true"
                            :height="535"
                            :pageable-numeric="false"
                            :pageable-previous-next="false"
                            :pageable-messages-display="'Showing {2} data items'">
                    <kendo-grid-column
                        :field="'name'"
                        :attributes="{class:'tb_name_td'}"
                        :title="'name'"
                        :hidden="true"
                        :group-header-template="'#=value#'"
                    />
                    <kendo-grid-column
                        :field="'name'"
                        :title="'&nbsp;'"
                        :template="'<span>#= supplierType.abbr#-#=number# - #=name#</span>'"
                    />
                </kendo-grid>
            </v-card>
        </v-col>
        <v-col sm="8" cols="12" class="py-0">
            <!-- <v-row>
                <v-col sm="6" cols="12" class="pt-0">
                    <v-card outlined dense class="pa-3 no_border" style="height: 88px; background-color: #92d050;">
                        <router-link
                            :to="{path: routerTo, query: { type: 'edit'} }">
                            <v-btn class="btn_edit float-right" @click="goEdit" :disabled="btnEnabled">
                                {{ $t('edit') }}
                            </v-btn>
                        </router-link>
                        <span>{{ supplier.name }}</span><br/>
                        <span>{{ supplier.number }}</span><br/>
                        <span>{{ supplier.supplierType.name }}</span>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0 pl-0">
                            <v-card outlined dense class="pa-2 no_border mb-2 text-white"
                                    style="height: 40px; background-color: #00b050;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('balance') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                            <v-card outlined dense class="pa-2 no_border text-white"
                                    style="height: 40px; background-color: #00b050;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('deposit') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                        </v-col>
                        <v-col sm="6" cols="12" class="py-0 pl-0">
                            <v-card outlined dense class="pa-2 no_border mb-2 text-white"
                                    style="height: 40px; background-color: #000;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('open') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                            <v-card outlined dense class="pa-2 no_border text-white"
                                    style="height: 40px; background-color: #000;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('over_due') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row> -->

            <v-row>
                <v-col sm="12" cols="12" class="pt-0 pl-0">
                    <v-tabs>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-information-variant</v-icon>
							</span>
                            <span class="hidden-sm-and-down  text-upercase">
								{{ $t('info') }}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down  text-upercase">
								{{ $t('transactions') }}
							</span>
                        </v-tab>
                        <!--            <v-tab>-->
                        <!--              <span class="hidden-sm-and-up">-->
                        <!--            								<v-icon left>mdi-pen</v-icon>-->
                        <!--            							</span>-->
                        <!--              <span class="hidden-sm-and-down text-upercase">-->
                        <!--            								{{ $t('communications') }}-->
                        <!--            							</span>-->
                        <!--            </v-tab>-->
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down text-upercase">
								{{ $t('attachments') }}
							</span>
                        </v-tab>
                        <!-- Info -->
                        <v-tab-item>
                            <v-col sm="12" cols="12" class="pt-0">
                                <v-row class="grayBg" style="width: 104%;">
                                    <v-col sm="12" cols="12" class="">
                                        <v-card outlined color="white" class="pa-3">
                                            <Info :supplier="supplier"/>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-tab-item>
                        <!-- Transactions -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg" style="width: 104%;">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <!-- <v-col sm="4" cols="12" class="pt-1 pb-0">
                                                        <v-select class=""
                                                                  :items="dateSorters"
                                                                  v-model="mDateSorter"
                                                                  @change="onSorterChanges"
                                                                  clearable
                                                                  outlined
                                                                  placeholder="ALL"
                                                        />
                                                    </v-col> -->

                                                    <v-col sm="5" cols="12" class="py-0">
                                                        <app-datepicker :initialDate="startDate"
                                                                        @emitDate="startDate = $event"/>
                                                    </v-col>

                                                    <v-col sm="5" cols="12" class="py-0">
                                                        <app-datepicker :initialDate="endDate"
                                                                        @emitDate="endDate = $event"/>
                                                    </v-col>

                                                    <v-col sm="1" cols="1" class="py-0 mt-1">
                                                        <v-btn color="primary white--text" @click="searchTransaction"
                                                        >
                                                            <i class="b-search"
                                                               style="font-size: 18px; color:#fff !important;"/>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>

                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <LoadingMe
                                                            :isLoading="showLoadingTxn"
                                                            :fullPage="false"
                                                            type="loading"
                                                            :myLoading="true">
                                                        </LoadingMe>
                                                        <kendo-datasource ref="transactionDS"
                                                                          :data="txnList"
                                                                          :server-paging="false"/>
                                                        <kendo-grid id="gridTransactions" class="grid-function"
                                                                    :data-source-ref="'transactionDS'"
                                                                    :editable="false"
                                                                    :groupale="true"
                                                                    :column-menu="true"
                                                                    :noRecords="true"
                                                                    :scrollable-virtual="true">
                                                            <!--                              <kendo-grid-column-->
                                                            <!--                                  :field="'no'"-->
                                                            <!--                                  :title="$t('no')"-->
                                                            <!--                                  :template="rowNumberTmpl"-->
                                                            <!--                                  :width="60"-->
                                                            <!--                                  :column-menu="false"-->
                                                            <!--                                  :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                                                            <!--                                  :attributes="{style: 'text-align: center'}"/>-->
                                                            <kendo-grid-column
                                                                :field="'transactionDate'"
                                                                :title="$t('date')"
                                                                :width="120"
                                                                :template="transactionDate"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            <kendo-grid-column
                                                                :field="'type'"
                                                                :title="$t('type')"
                                                                :width="150"
                                                                :template="'<span>#=type#</span>'"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            <kendo-grid-column
                                                                :field="'referenceNo'"
                                                                :title="$t('reference_no')"
                                                                :width="150"
                                                                :template="referenceTemplate"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                            <kendo-grid-column
                                                                :field="'exchangeAmount'"
                                                                :title="$t('amount')"
                                                                :width="200"
                                                                :attributes="{style: 'text-align: right'}"
                                                                :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            <kendo-grid-column
                                                                :field="'status'"
                                                                :title="$t('status')"
                                                                :width="150"
                                                                :template="txnStatus"
                                                                :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                                        </kendo-grid>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!-- Communication -->
                        <!--            <v-tab-item>-->
                        <!--              <v-row>-->
                        <!--                <v-col sm="12" cols="12" class="pt-0 px-6">-->
                        <!--                  <v-row class="grayBg" style="width: 104%;">-->
                        <!--                    <v-col sm="12" cols="12" class="">-->
                        <!--                      <v-card outlined color="white" class="pa-3">-->
                        <!--                        <v-row>-->
                        <!--                          <v-col sm="12" cols="12" class="py-0">-->
                        <!--                            <v-btn class="white&#45;&#45;text text-capitalize float-right"-->
                        <!--                                   color="primary" to="cash_reconciliation">-->
                        <!--                              {{ $t('new_note') }}-->
                        <!--                            </v-btn>-->
                        <!--                          </v-col>-->

                        <!--                          <v-col sm="12" cols="12" class="">-->
                        <!--                            <template>-->
                        <!--                              <v-simple-table class="attachment_table">-->
                        <!--                                <template v-slot:default>-->
                        <!--                                  <thead>-->
                        <!--                                  <tr>-->
                        <!--                                    <th>{{ $t('date') }}</th>-->
                        <!--                                    <th>{{ $t('note') }}</th>-->
                        <!--                                    <th>{{ $t('topic') }}</th>-->
                        <!--                                    <th>{{ $t('who') }}</th>-->
                        <!--                                  </tr>-->
                        <!--                                  </thead>-->
                        <!--                                  <tbody>-->
                        <!--                                  <tr>-->
                        <!--                                    <td>01</td>-->
                        <!--                                    <td>JB00009</td>-->
                        <!--                                    <td>15/July/2020</td>-->
                        <!--                                    <td>VARIANCE</td>-->
                        <!--                                  </tr>-->
                        <!--                                  </tbody>-->
                        <!--                                </template>-->
                        <!--                              </v-simple-table>-->
                        <!--                            </template>-->
                        <!--                          </v-col>-->
                        <!--                        </v-row>-->
                        <!--                      </v-card>-->
                        <!--                    </v-col>-->
                        <!--                  </v-row>-->
                        <!--                </v-col>-->
                        <!--              </v-row>-->
                        <!--            </v-tab-item>-->
                        <!-- Attachment -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-6 px-6">
                                    <v-row class="grayBg" style="width: 104%;">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="mb-2">{{ $t('file_type') }} [PDF, JPG, JPEG, TIFF,
                                                            PNG, GIF] - 5MB</p>
                                                        <template>
                                                            <v-file-input
                                                                v-model="files"
                                                                @change="onFileChange"
                                                                accept="image/jpg, image/jpeg, application/pdf"
                                                                :placeholder="$t('attachments')"
                                                                single
                                                                prepend-icon="mdi-paperclip">
                                                                <template v-slot:selection="{ text }">
                                                                    <v-chip
                                                                        small
                                                                        label
                                                                        color="primary"
                                                                    >
                                                                        {{ text }}
                                                                    </v-chip>
                                                                </template>
                                                            </v-file-input>
                                                            <v-text-field
                                                                v-model="fileDesc"
                                                                outlined
                                                                :placeholder="$t('description')"
                                                                clearable/>
                                                        </template>
                                                        <v-btn color="primary" class="text-capitalize white--text"
                                                               @click="uploadFile">
                                                            <v-icon size="15" class="mr-2">fa-check</v-icon>
                                                            {{ $t('upload') }}
                                                        </v-btn>
                                                        <template>
                                                            <LoadingMe
                                                                :isLoading="showLoadingAtch"
                                                                :fullPage="false"
                                                                type="loading"
                                                                :myLoading="true">
                                                            </LoadingMe>
                                                            <kendo-datasource ref="attachmentDS"
                                                                              :data="attachmentList"/>
                                                            <kendo-grid id="gridAttachment" class="grid-function"
                                                                        :data-source-ref="'attachmentDS'"
                                                                        :editable="false"
                                                                        :scrollable-virtual="true">
                                                                <kendo-grid-column
                                                                    :field="''"
                                                                    :title="$t('open')"
                                                                    :width="70"
                                                                    :template="fileUrl"
                                                                    :attributes="{style: 'text-align: center'}"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'fileName'"
                                                                    :title="$t('file_name')"
                                                                    :width="250"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'description'"
                                                                    :title="$t('description')"
                                                                    :width="250"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'fileType'"
                                                                    :title="$t('file_type')"
                                                                    :width="150"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                <kendo-grid-column
                                                                    :field="'size'"
                                                                    :title="$t('size')"
                                                                    :width="150"
                                                                    :template="byteToMB"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                <kendo-grid-column
                                                                    :field="'createdAt'"
                                                                    :title="$t('date')"
                                                                    :width="120"
                                                                    :template="'<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                            </kendo-grid>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
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
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import SupplierModel from "@/scripts/model/Supplier";
import kendo from "@progress/kendo-ui";
import billingHandler from "@/scripts/invoice/handler/billingHandler";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const supplierModel = new SupplierModel({})
// const $ = require("jquery")
const supplierTypeHandler = require("@/scripts/supplierTypeHandler")
const supplierHandler = require("@/scripts/supplierHandler")

export default {
    name: "SupplierCenter",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        Info: () => import('./Info')
    },
    data: () => ({
        showLoading: false,
        showLoadingAtch: false,
        showLoadingTxn: false,
        info: {},
        suppliers: [],
        start_date: '',
        end_date: '',
        supplierTypes: [],
        mSupplierType: {},
        supplier: supplierModel,
        headers: [],
        customerGroups: [],
        mCustomerGroup: {},
        files: [],
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        mDateSorter: 'Today',
        journal_entries: [],
        search: '',
        accounts: [],
        accounts_bk: [],
        account_types: [],
        account: [],
        attachments: [],
        balance: 0,
        backdated: 0,
        forwarded: 0,
        isLoaded: false,
        schemaDefinition: {
            model: {id: "id"}
        },
        groupDefinition: {
            field: "account_type.name",
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

        rules: [
            files => !files || !files.some(file => file.size > 5 * 1024 * 1024) || 'Avatar size should be less than 5 MB!'
        ],
        attachmentList: [],
        imgFile: '',
        src: '',
        file_: {},
        fileDesc: '',
        fileSize: 0,
        fileType: '',
        fileName: '',
        txnList: [],
    }),
    methods: {
        referenceTemplate(data) {
            let url = ''
            if (data.type === 'Purchase Order') {
                url = `purchase_order_view/${data.id}`
            } else if (data.type === 'Purchase Deposit') {
                url = `purchase_deposit_view/${data.id}`
            } else if (data.type === 'Purchase') {
                url = `credit_purchase_view/${data.id}`
            } else if (data.type === 'Cash Payment') {
                url = `cash_payment_view/${data.txnId}`
            } else if (data.type === 'Debit Memo') {
                url = `purchase_return_view/${data.txnId}`
            } else if (data.type === 'Expense') {
                url = `expenses/view/${data.txnId.replace('txn-', '')}`;
            }
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        txnStatus(dataItem) {
            const status = dataItem.status || 1
            let statusText = ''
            switch (status) {
                case 1:
                    statusText = 'OPEN'
                    break
                case 2:
                    statusText = 'PARTIALLY PAID'
                    break
                case 3:
                    statusText = 'PAID'
                    break
                case 4:
                    statusText = 'VOID'
                    break
            }
            return statusText
        },
        async loadAttachment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    // if (this.$route.params.hasOwnProperty('id')) {
                    this.showLoadingAtch = true
                    const strFilter = '?id=' + this.supplier.id
                    billingHandler.attachmentList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoadingAtch = false
                            this.attachmentList = res.data.data
                        } else {
                            this.showLoadingAtch = false
                        }
                    })
                    // }
                }, 10)
            })
        },
        transactionDate(dataItem) {
            const txnDate = dataItem.transactionDate
            const dateFormat = dataItem.dateFormat
            if (txnDate) {
                return kendo.toString(new Date(txnDate), dateFormat)
            }
            return ''
        },
        byteToMB(dataItem) {
            const FileSize = dataItem.size || 0 // in MiB
            const marker = 1024; // Change to 1000 if required
            const decimal = 3; // Change as required
            const kiloBytes = marker; // One Kilobyte is 1024 bytes
            const megaBytes = marker * marker; // One MB is 1024 KB
            const gigaBytes = marker * marker * marker; // One GB is 1024 MB
            // const teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

            // return bytes if less than a KB
            if (FileSize < kiloBytes) {
                return FileSize + " Bytes";
            }
            // return KB if less than a MB
            else if (FileSize < megaBytes) {
                return ((FileSize / kiloBytes).toFixed(decimal) + " KB");
            }
            // return MB if less than a GB
            else if (FileSize < gigaBytes) {
                return ((FileSize / megaBytes).toFixed(decimal) + " MB");
            }
            // return GB if less than a TB
            else {
                return ((FileSize / gigaBytes).toFixed(decimal) + " GB");
            }

            /* var FileSize = file.files[0].size / 1024 / 1024; // in MiB
            if (FileSize > 2) {
                alert('File size exceeds 2 MiB');
               // $(file).val(''); //for clearing with Jquery
            } else {
                        alert('File size' + FileSize);
            } */
        },
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    today = new Date()
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        async searchTransaction() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    const id = this.supplier.id || ''
                    if (id) {
                        const startDate = this.startDate
                        const endDate = this.endDate
                        if (id) {
                            this.showLoadingTxn = true
                            const strFilter = '?start=' + startDate + '&end=' + endDate + '&id=' + id
                            billingHandler.vendorTxn(strFilter).then(res => {
                                if (res.data.statusCode === 200) {
                                    this.txnList = JSON.parse(JSON.stringify(res.data.data))
                                    this.showLoadingTxn = false
                                } else {
                                    this.showLoadingTxn = false
                                }
                            })
                        }
                    }

                }, 10);
            })
        },
        goEdit() {
        },
        onSupplierTypeChanged() {
            this.showLoading = true
            this.loadSupplierCenter()
        },
        async customerInfo() {
            this.$emit('onUpdate', this.supplier)
        },
        async onChanged() {
            let grid = kendo.jQuery("#gridSupplier").data("kendoGrid")
            let selectedItem = grid.dataItem(grid.select())
            this.supplier = selectedItem
            this.$emit('onUpdate', selectedItem)
            if (this.supplier.id) {
                this.loadAttachment()
                this.searchTransaction()
            }
            // window.console.log(this.customer.name, 'selected')
        },
        async loadSupplierType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    supplierTypeHandler.get().then(res => {
                        this.supplierTypes = res
                        if (this.supplierTypes.length > 0) {
                            this.mSupplierType = this.supplierTypes[0]
                            this.loadSupplierCenter()
                        }
                    })
                }, 10)
            })
        },
        async loadSupplierCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.suppliers = []
                    let supplierTypeId = undefined
                    if (this.mSupplierType) {
                        supplierTypeId = this.mSupplierType.hasOwnProperty('id') ? this.mSupplierType.id : this.mSupplierType
                    }
                    supplierHandler.center(supplierTypeId, this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.suppliers = res.data.data
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 10)
            })
        },
        callback() {
            if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                const supplier = this.$route.params.data
                const index = this.suppliers.findIndex(item => {
                    return (supplier.id === item.id)
                })
                if (index < 0) {
                    this.suppliers.push(supplier)
                } else {
                    this.suppliers.splice(index, 1, supplier)
                }
            }
            window.console.log('im changed', this.$route.params)
        },
        onFileChange(e) {
            if (e) {
                this.fileDesc = e.name
                this.fileName = e.name
                this.fileSize = e.size
                this.fileType = e.type
                let input = this.files
                // Ensure that you have a file before attempting to read it
                if (input) {
                    let reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input)
                    this.src = URL.createObjectURL(input)
                }
            }
        },
        async uploadFile() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.imgFile) {
                        const id = this.supplier.id || ''
                        const name = this.supplier.name || ''
                        let data = {
                            file: this.imgFile,
                            info: {
                                name: this.fileName,
                                description: this.fileDesc,
                                size: this.fileSize,
                                type: this.fileType
                            },
                            type: 'Contact',
                            id: id,
                            name: name
                        }
                        this.showLoading = true
                        billingHandler.attachment(data).then(res => {
                            if (res.data.statusCode === 201) {
                                this.showLoading = false
                                this.imgFile = null
                                this.src = ''
                                this.fileDesc = ''
                                this.fileName = ''
                                this.fileSize = 0
                                this.fileType = ''
                                this.$snotify.success('Success')
                                this.loadAttachment()
                                // this.txnList = JSON.parse(JSON.stringify(res.data.data))
                                // window.console.log('transactions', this.txnList)
                            }
                        })
                    } else {
                        this.showLoading = false
                        this.$snotify.error('Please browse to upload image')
                    }
                }, 10)
            })
        },
        fileUrl(dataItem) {
            if (dataItem.fileUrl) {
                return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`
            }
            return ``
        },
        async loadData() {
            this.loadSupplierType()
        }

    },
    mounted() {
        this.loadSupplierType()
    },
    computed: {
        btnEnabled() {
            return !this.supplier.name
        },
        routerTo() {
            if (this.supplier.type === 'Individual') {
                return 'individual_supplier' + `/${this.supplier ? this.supplier.id : ''}`
            } else if (this.supplier.type === 'Company') {
                return 'company_supplier' + `/${this.supplier ? this.supplier.id : ''}`
            }
            return ''
        }
    },
    watch: {
        '$route': 'callback'
    },
};
</script>
<style scoped>
.dropdown_view.theme--light.v-btn.v-btn--icon {
    color: rgba(0, 0, 0, 0.54);
    padding: 0px 40px 0px 50px;
}

.v-menu__content {
    top: 595px !important;
    left: 1243px !important;
}

.v-menu__content .v-list .v-list-item {
    min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
    font-size: 12px;
}

.v-card {
    background-color: rgb(237, 241, 245);
}

.v-card.bg_blue {
    background-color: #92d050;
    color: #fff;
    min-height: 88px;
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
    color: #fff;
    font-size: 16px;
    height: 33px !important;
    padding: 0px 10px;

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

.funct_3 {
    min-height: 40px;
    background-color: #00b050;
    font-weight: bold;
    color: #fff;
}

.funct_back {
    min-height: 40px;
    background-color: #181717;
    font-weight: bold;
    color: #fff;
}

.bg_blue_in {
    background-color: #92d050;
    color: #fff;
    min-height: 48px;
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

.b-search:before {
    color: #fff !important;
}

.grid-center.center_heigth {
    height: 468px !important;
}

</style>