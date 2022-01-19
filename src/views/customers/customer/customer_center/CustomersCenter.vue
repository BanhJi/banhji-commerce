<template>
    <v-row>
        <v-col class="pt-0 pr-4 pb-0" sm="4" cols="12">
            <v-card
                outlined
                dense
                class="pa-3 no_border mb-md-4 mb-xs-0"
                color="grayBg"
            >
                <div class="d-flex">
                    <v-text-field
                        v-model="search"
                        @change="onCustomerTypeChanged(search)"
                        outlined
                        @click:clear="onCustomerTypeChanged(search)"
                        :placeholder="$t('search')"
                        append-icon="search"
                        clearable
                    />
                    <v-btn icon @click="loadData">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </div>
                <v-select
                    :items="customerTypes"
                    @change="onCustomerTypeChanged('')"
                    item-value="id"
                    item-text="name"
                    v-model="mCustomerType"
                    return-object
                    :placeholder="$t('type')"
                    clearable
                    outlined
                />
                <v-select
                    v-if="appType != 'npo'"
                    :items="customerGroups"
                    @change="onCustomerTypeChanged('')"
                    item-value="id"
                    item-text="name"
                    return-object
                    v-model="mCustomerGroup"
                    :placeholder="$t('customer_group')"
                    clearable
                    outlined
                />
            </v-card>
            <v-card
                outlined
                dense
                class="pa-3 no_border hidden-sm-and-down"
                color="grayBg"
            >
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                />
                <kendo-datasource
                    ref="customerDS"
                    :data="customers"
                    :schema="schemaDefinition"
                />

                <kendo-grid
                    id="gridCustomer"
                    class="grid-center"
                    :change="onChanged"
                    :data-source-ref="'customerDS'"
                    :selectable="true"
                    :persistSelection="true"
                    :noRecords="true"
                    :scrollable="true"
                    :height="appType != 'npo' ? 412 : 466"
                    :pageable-numeric="false"
                    :pageable-previous-next="false"
                    :pageable-messages-display="'Showing {2} data items'"
                >
                    <kendo-grid-column
                        :field="'name'"
                        :attributes="{ class: 'tb_name_td' }"
                        :title="'name'"
                        :hidden="true"
                        :group-header-template="'#=value#'"
                    />
                    <kendo-grid-column
                        :field="'name'"
                        :title="'&nbsp;'"
                        :template="'<span>#= customerType.abbr#-#=number# - #=name#</span>'"
                    />
                </kendo-grid>
            </v-card>
        </v-col>
        <v-col class="pt-0 pb-0" sm="8" cols="12">
            <!--            <v-row>-->
            <!--                <v-col sm="6" cols="12" class="pt-0">-->
            <!--                    <v-card outlined dense color="primary" class="pa-3 no_border" height="88px">-->
            <!--                        <router-link-->
            <!--                            :to="{path: routerTo, query: { type: 'edit'} }">-->
            <!--                            <v-btn class="btn_edit float-right" @click="goEdit" :disabled="btnEnabled">-->
            <!--                                {{ $t('edit') }}-->
            <!--                            </v-btn>-->
            <!--                        </router-link>-->

            <!--                        <span>{{ customer.name }}</span><br/>-->
            <!--                        <span>{{ customer.number }}</span><br/>-->
            <!--                        <span>{{ customer.customerType.name }}</span>-->
            <!--                        &lt;!&ndash;                        <v-tooltip top>&ndash;&gt;-->
            <!--                        &lt;!&ndash;                            <template v-slot:activator="{ on, attrs }">&ndash;&gt;-->
            <!--                        &lt;!&ndash;                                <p class="title" color="whiteR"&ndash;&gt;-->
            <!--                        &lt;!&ndash;                                   dark&ndash;&gt;-->
            <!--                        &lt;!&ndash;                                   v-bind="attrs"&ndash;&gt;-->
            <!--                        &lt;!&ndash;                                   v-on="on">&ndash;&gt;-->
            <!--                        &lt;!&ndash;                                    <span>{{ customer.name }}</span>&ndash;&gt;-->
            <!--                        &lt;!&ndash;                                </p>&ndash;&gt;-->
            <!--                        &lt;!&ndash;                            </template>&ndash;&gt;-->
            <!--                        &lt;!&ndash;&lt;!&ndash;                            <span>{{ customer.name }}</span>&ndash;&gt;&ndash;&gt;-->
            <!--                        &lt;!&ndash;                        </v-tooltip>&ndash;&gt;-->

            <!--                    </v-card>-->

            <!--                </v-col>-->
            <!--                <v-col sm="6" cols="12" class="pt-0">-->
            <!--                    <v-row>-->
            <!--                        <v-col sm="6" cols="12" class="py-0 pl-0">-->
            <!--                            <v-card outlined dense class="pa-2 no_border mb-2 white&#45;&#45;text"-->
            <!--                                    color="primary" height="40px">-->
            <!--                                <p class="mb-0">-->
            <!--                                    <span class="float-left text-uppercase">{{ $t('balance') }}</span>-->
            <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
            <!--                                </p>-->
            <!--                            </v-card>-->
            <!--                            <v-card outlined dense class="pa-2 no_border white&#45;&#45;text"-->
            <!--                                    color="primary" height="40px">-->
            <!--                                <p class="mb-0">-->
            <!--                                    <span class="float-left text-uppercase">{{ $t('deposit') }}</span>-->
            <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
            <!--                                </p>-->
            <!--                            </v-card>-->
            <!--                        </v-col>-->
            <!--                        <v-col sm="6" cols="12" class="py-0 pl-0">-->
            <!--                            <v-card outlined dense class="pa-2 no_border mb-2 white&#45;&#45;text"-->
            <!--                                    color="third" height="40px">-->
            <!--                                <p class="mb-0">-->
            <!--                                    <span class="float-left text-uppercase">{{ $t('open') }}</span>-->
            <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
            <!--                                </p>-->
            <!--                            </v-card>-->
            <!--                            <v-card outlined dense class="pa-2 no_border white&#45;&#45;text"-->
            <!--                                    color="third" height="40px">-->
            <!--                                <p class="mb-0">-->
            <!--                                    <span class="float-left text-uppercase">{{ $t('over_due') }}</span>-->
            <!--                                    <span class="float-right text-bold" v-text="forwarded"/>-->
            <!--                                </p>-->
            <!--                            </v-card>-->
            <!--                        </v-col>-->
            <!--                    </v-row>-->
            <!--                </v-col>-->
            <!--            </v-row>-->
            <v-row>
                <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
                    <v-tabs>
                        <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-information-variant</v-icon>
              </span>
                            <span class="hidden-sm-and-down  text-upercase">
                {{ $t("info") }}
              </span>
                        </v-tab>
                        <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
                            <span class="hidden-sm-and-down  text-upercase">
                {{ $t("transactions") }}
              </span>
                        </v-tab>
                        <!--                        <v-tab>-->
                        <!--							<span class="hidden-sm-and-up">-->
                        <!--								<v-icon left>mdi-pen</v-icon>-->
                        <!--							</span>-->
                        <!--                            <span class="hidden-sm-and-down text-upercase">-->
                        <!--								{{ $t('communications') }}-->
                        <!--							</span>-->
                        <!--                        </v-tab>-->
                        <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
                            <span class="hidden-sm-and-down text-upercase">
                {{ $t("attachments") }}
              </span>
                        </v-tab>

                        <v-btn
                            v-if="appType == 'npo'"
                            to="company_customer"
                            color="primary"
                            class="text-capitalize white--text absRight"
                        >{{ $t("add_donor") }}
                        </v-btn>
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg" style="width: 104%;">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <Info :customer="customer"/>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>

                        <!-- Transactions -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg" style="width: 104%;">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="4" cols="12" class="pt-1 pb-0">
                                                        <v-select
                                                            class=""
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

                                                    <v-col sm="1" cols="1" class="py-0 mt-1">
                                                        <v-btn
                                                            color="primary white--text"
                                                            @click="searchTransaction"
                                                        >
                                                            <i
                                                                class="b-search"
                                                                style="font-size: 18px; color:#fff !important;"
                                                            />
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>

                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <LoadingMe
                                                            :isLoading="showLoadingTxn"
                                                            :fullPage="false"
                                                            type="loading"
                                                            :myLoading="true"
                                                        >
                                                        </LoadingMe>
                                                        <kendo-datasource
                                                            ref="transactionDS"
                                                            :data="txnList"
                                                            :server-paging="false"
                                                        />
                                                        <kendo-grid
                                                            id="gridTransactions"
                                                            class="grid-function"
                                                            :data-source-ref="'transactionDS'"
                                                            :editable="false"
                                                            :groupale="true"
                                                            :column-menu="true"
                                                            :noRecords="true"
                                                            :scrollable-virtual="true"
                                                        >
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
                                                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                                                            />
                                                            <kendo-grid-column
                                                                :field="'type'"
                                                                :title="$t('type')"
                                                                :width="200"
                                                                :template="'<span>#=type#</span>'"
                                                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                                                            />
                                                            <kendo-grid-column
                                                                :field="'referenceNo'"
                                                                :title="$t('reference_no')"
                                                                :width="200"
                                                                :template="referenceTemplate"
                                                                :headerAttributes="{
                                  style:
                                    'background-color: #EDF1F5, color: green !important',
                                }"
                                                            />
                                                            <kendo-grid-column
                                                                :field="'paymentCode'"
                                                                :title="$t('payment_code')"
                                                                :width="200"
                                                                :template="'<span>#=paymentCode#</span>'"
                                                                :headerAttributes="{
                                  style:
                                    'background-color: #EDF1F5, color: green !important',
                                }"
                                                            />
                                                            <kendo-grid-column
                                                                :field="'exchangeAmount'"
                                                                :title="$t('amount')"
                                                                :width="200"
                                                                :attributes="{ style: 'text-align: right' }"
                                                                :template="
                                  '<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'
                                "
                                                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                                                            />
                                                            <kendo-grid-column
                                                                :field="'status'"
                                                                :title="$t('status')"
                                                                :width="200"
                                                                :template="txnStatus"
                                                                :headerAttributes="{
                                  style:
                                    'text-align: left; background-color: #EDF1F5',
                                }"
                                                            />
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
                        <!--                        <v-tab-item>-->
                        <!--                            <v-row>-->
                        <!--                                <v-col sm="12" cols="12" class="pt-0 px-6">-->
                        <!--                                    <v-row class="grayBg" style="width: 104%;">-->
                        <!--                                        <v-col sm="12" cols="12" class="">-->
                        <!--                                            <v-card outlined color="white" class="pa-3">-->
                        <!--                                                <v-row>-->
                        <!--                                                    <v-col sm="12" cols="12" class="py-0">-->
                        <!--                                                        <v-btn class="white&#45;&#45;text text-capitalize float-right"-->
                        <!--                                                               color="primary" to="cash_reconciliation">-->
                        <!--                                                            {{ $t('new_note') }}-->
                        <!--                                                        </v-btn>-->
                        <!--                                                    </v-col>-->

                        <!--                                                    <v-col sm="12" cols="12" class="">-->
                        <!--                                                        <template>-->
                        <!--                                                            <v-simple-table class="attachment_table">-->
                        <!--                                                                <template v-slot:default>-->
                        <!--                                                                    <thead>-->
                        <!--                                                                    <tr>-->
                        <!--                                                                        <th>{{ $t('date') }}</th>-->
                        <!--                                                                        <th>{{ $t('note') }}</th>-->
                        <!--                                                                        <th>{{ $t('topic') }}</th>-->
                        <!--                                                                        <th>{{ $t('who') }}</th>-->
                        <!--                                                                    </tr>-->
                        <!--                                                                    </thead>-->
                        <!--                                                                    <tbody>-->
                        <!--                                                                    <tr>-->
                        <!--                                                                        <td>01</td>-->
                        <!--                                                                        <td>JB00009</td>-->
                        <!--                                                                        <td>15/July/2020</td>-->
                        <!--                                                                        <td>VARIANCE</td>-->
                        <!--                                                                    </tr>-->
                        <!--                                                                    </tbody>-->
                        <!--                                                                </template>-->
                        <!--                                                            </v-simple-table>-->
                        <!--                                                        </template>-->
                        <!--                                                    </v-col>-->
                        <!--                                                </v-row>-->
                        <!--                                            </v-card>-->
                        <!--                                        </v-col>-->
                        <!--                                    </v-row>-->
                        <!--                                </v-col>-->
                        <!--                            </v-row>-->
                        <!--                        </v-tab-item>-->
                        <!-- Attachment -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg" style="width: 104%;">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="mb-2">
                                                            {{ $t("file_type") }} [PDF, JPG, JPEG, TIFF, PNG,
                                                            GIF] - 5MB
                                                        </p>
                                                        <template>
                                                            <v-file-input
                                                                v-model="files"
                                                                @change="onFileChange"
                                                                accept="image/jpg, image/jpeg, application/pdf"
                                                                :placeholder="$t('attachments')"
                                                                single
                                                                prepend-icon="mdi-paperclip"
                                                            >
                                                                <template v-slot:selection="{ text }">
                                                                    <v-chip small label color="primary">
                                                                        {{ text }}
                                                                    </v-chip>
                                                                </template>
                                                            </v-file-input>
                                                            <v-text-field
                                                                v-model="fileDesc"
                                                                outlined
                                                                :placeholder="$t('description')"
                                                                clearable
                                                            />
                                                        </template>
                                                        <v-btn
                                                            color="primary"
                                                            class="text-capitalize white--text"
                                                            @click="uploadFile"
                                                        >
                                                            <v-icon size="15" class="mr-2">fa-check</v-icon>
                                                            {{ $t("upload") }}
                                                        </v-btn>
                                                        <template>
                                                            <LoadingMe
                                                                :isLoading="showLoadingAtch"
                                                                :fullPage="false"
                                                                type="loading"
                                                                :myLoading="true"
                                                            >
                                                            </LoadingMe>
                                                            <kendo-datasource
                                                                ref="attachmentDS"
                                                                :data="attachmentList"
                                                            />
                                                            <kendo-grid
                                                                id="gridAttachment"
                                                                class="grid-function"
                                                                :data-source-ref="'attachmentDS'"
                                                                :editable="false"
                                                                :scrollable-virtual="true"
                                                            >
                                                                <kendo-grid-column
                                                                    :field="''"
                                                                    :title="$t('open')"
                                                                    :width="70"
                                                                    :template="fileUrl"
                                                                    :attributes="{ style: 'text-align: center' }"
                                                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                                                />
                                                                <kendo-grid-column
                                                                    :field="'fileName'"
                                                                    :title="$t('file_name')"
                                                                    :width="250"
                                                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                                                />
                                                                <kendo-grid-column
                                                                    :field="'description'"
                                                                    :title="$t('description')"
                                                                    :width="250"
                                                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                                                />
                                                                <kendo-grid-column
                                                                    :field="'fileType'"
                                                                    :title="$t('file_type')"
                                                                    :width="150"
                                                                    :headerAttributes="{
                                    style:
                                      'background-color: #EDF1F5, color: green !important',
                                  }"
                                                                />
                                                                <kendo-grid-column
                                                                    :field="'size'"
                                                                    :title="$t('size')"
                                                                    :width="150"
                                                                    :template="byteToMB"
                                                                    :headerAttributes="{
                                    style:
                                      'background-color: #EDF1F5, color: green !important',
                                  }"
                                                                />
                                                                <kendo-grid-column
                                                                    :field="'createdAt'"
                                                                    :title="$t('date')"
                                                                    :width="120"
                                                                    :template="
                                    '<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'
                                  "
                                                                    :headerAttributes="{
                                    style:
                                      'background-color: #EDF1F5, color: green !important',
                                  }"
                                                                />
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
import {dataStore} from "@/observable/store";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import CustomerModel from "@/scripts/model/Customer";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const customerModel = new CustomerModel({});
// const $ = require("jquery")
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const customerGroupHandler = require("@/scripts/customerGroupHandler");
const customerHandler = require("@/scripts/customerHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
    name: "CustomerCenter",
    props: ["id"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        Info: () => import("./Info"),
    },
    data: () => ({
        showLoading: false,
        showLoadingTxn: false,
        showLoadingAtch: false,
        info: {},
        customers: [],
        start_date: "",
        end_date: "",
        customerTypes: [],
        mCustomerType: {},
        headers: [],
        customerGroups: [],
        mCustomerGroup: {},
        journal_entries: [],
        forwarded: "",
        files: [],
        search: "",
        customer: customerModel,
        schemaDefinition: {
            model: {id: "id"},
        },
        groupDefinition: {
            field: "type",
        },
        txnList: [],
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ["Today", "This Week", "This Month", "This Year"],
        mDateSorter: "Today",
        rules: [
            (files) =>
                !files ||
                !files.some((file) => file.size > 5 * 1024 * 1024) ||
                "Avatar size should be less than 5 MB!",
        ],
        attachmentList: [],
        imgFile: "",
        src: "",
        file_: {},
        fileDesc: "",
        fileSize: 0,
        fileType: "",
        fileName: "",
    }),
    methods: {
        transactionDate(dataItem) {
            const txnDate = dataItem.transactionDate;
            const dateFormat = dataItem.dateFormat;
            if (txnDate) {
                return kendo.toString(new Date(txnDate), dateFormat);
            }
            return "";
        },
        byteToMB(dataItem) {
            const FileSize = dataItem.size || 0; // in MiB
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
                return (FileSize / kiloBytes).toFixed(decimal) + " KB";
            }
            // return MB if less than a GB
            else if (FileSize < gigaBytes) {
                return (FileSize / megaBytes).toFixed(decimal) + " MB";
            }
            // return GB if less than a TB
            else {
                return (FileSize / gigaBytes).toFixed(decimal) + " GB";
            }

            /* var FileSize = file.files[0].size / 1024 / 1024; // in MiB
                  if (FileSize > 2) {
                      alert('File size exceeds 2 MiB');
                     // $(file).val(''); //for clearing with Jquery
                  } else {
                              alert('File size' + FileSize);
                  } */
        },
        goEdit() {
        },
        onFileChange(e) {
            window.console.log('2', e)
            if (e) {
                this.fileDesc = e.name;
                this.fileName = e.name;
                this.fileSize = e.size;
                this.fileType = e.type;
                let input = this.files;
                // Ensure that you have a file before attempting to read it
                if (input) {
                    let reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result;
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input);
                    this.src = URL.createObjectURL(input);
                }
            }
        },
        async uploadFile() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.imgFile) {
                        const id = this.customer.id || "";
                        if (id) {
                            const name = this.customer.name || "";
                            let data = {
                                file: this.imgFile,
                                info: {
                                    name: this.fileName,
                                    description: this.fileDesc,
                                    size: this.fileSize,
                                    type: this.fileType,
                                },
                                type: "Contact",
                                id: id,
                                name: name,
                            };
                            this.showLoading = true;
                            billingHandler.attachment(data).then((res) => {
                                if (res.data.statusCode === 201) {
                                    this.showLoading = false;
                                    this.imgFile = null;
                                    this.src = "";
                                    this.fileDesc = "";
                                    this.fileName = "";
                                    this.fileSize = 0;
                                    this.fileType = "";
                                    this.$snotify.success("Success");
                                    this.loadAttachment();
                                    // this.txnList = JSON.parse(JSON.stringify(res.data.data))
                                    // window.console.log('transactions', this.txnList)
                                }
                            });
                        } else {
                            this.showLoading = false;
                            this.$snotify.error("Please select customer");
                        }
                    } else {
                        this.showLoading = false;
                        this.$snotify.error("Please browse to upload image");
                    }
                }, 10);
            });
        },
        fileUrl(dataItem) {
            if (dataItem.fileUrl) {
                return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`;
            }
            return ``;
        },
        referenceTemplate(data) {
            let url = "";
            if (data.type === "Invoice") {
                url = `invoice_view/${data.txnId}`;
            } else if (data.type === "Sale Quote") {
                url = `sale_quote_view/${data.txnId}`;
            } else if (data.type === "Delayed Invoice") {
                url = `delayed_invoice_view/${data.txnId}`;
            } else if (data.type === "Sale Order") {
                url = `sale_order_view/${data.txnId}`;
            } else if (data.type === "Purchase Order") {
                url = `purchase_order_view/${data.txnId}`;
            } else if (data.type === "Credit Memo") {
                url = `sale_return_view/${data.txnId}`;
            } else if (data.type === "Debit Memo") {
                url = `purchase_return_view/${data.txnId}`;
            } else if (data.type === "Inventory Adjustment") {
                url = `inventory_adjustment_view/${data.txnId}`;
            } else if (data.type === "Purchase") {
                url = `credit_purchase_view/${data.txnId}`;
            } else if (data.type === "Production Order") {
                url = `production_order_view/${data.txnId}`;
            } else if (data.type === "Production") {
                url = `production/${data.txnId}`;
            } 
            else if (data.type === "Cash Receipt") {
                url = `cash_receipt/${data.txnId}`;
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
        txnStatus(dataItem) {
            const status = dataItem.status || 1;
            let statusText = "";
            switch (status) {
                case 1:
                    statusText = "OPEN";
                    break;
                case 2:
                    statusText = "PARTIALLY PAID";
                    break;
                case 3:
                    statusText = "PAID";
                    break;
                case 4:
                    statusText = "VOID";
                    break;
            }
            return statusText;
        },
        async searchTransaction() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const id = this.customer.id || "";
                    if (id) {
                        this.showLoadingTxn = true;
                        const startDate = this.startDate;
                        const endDate = this.endDate;

                        if (id) {
                            const strFilter =
                                "?start=" + startDate + "&end=" + endDate + "&id=" + id;
                            billingHandler.customerTxn(strFilter).then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoadingTxn = false;
                                    this.txnList = JSON.parse(JSON.stringify(res.data.data));
                                }
                            });
                        }
                    }
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
                    today = new Date();
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
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.transactionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        onCustomerTypeChanged(search) {
            this.showLoading = true;
            this.loadCustomerCenter(search);
        },
        async loadCustomerGroup() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    customerGroupHandler.get().then((res) => {
                        this.showLoading = false;
                        this.customerGroups = res;
                        if (this.customerGroups.length > 0) {
                            this.mCustomerGroup = this.customerGroups[0];
                            this.loadCustomerCenter(this.search);
                        }
                    });
                }, 10);
            });
        },
        async customerInfo() {
            this.$emit("onUpdate", this.customer);
        },
        async onChanged() {
            let grid = kendo.jQuery("#gridCustomer").data("kendoGrid");
            let selectedItem = grid.dataItem(grid.select());
            this.customer = selectedItem;
            this.$emit("onUpdate", selectedItem);
            window.console.log("--", this.customer.id);
            if (this.customer.hasOwnProperty("id")) {
                if (this.customer.id !== "" || this.customer.id !== undefined) {
                    await this.searchTransaction();
                    await this.loadAttachment();
                }
            }
        },
        async loadCustomerType() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    customerTypeHandler.get().then((res) => {
                        // this.customerTypes = res;
                        if (this.appType == 'npo') {
                            if (res.length != 0) {
                                this.customerTypes = res.filter(o => {
                                    const nature = o.nature || {}
                                    const name = nature.name || ''
                                    if (name.includes('Individual-') === false) {
                                        return o
                                    }
                                });
                            }
                        } else {
                            this.customerTypes = res
                        }
                        if (this.customerTypes.length > 0) {
                            this.mCustomerType = this.customerTypes[0];
                            const group = this.mCustomerGroup || {};
                            if (group.id !== "") {
                                this.loadCustomerCenter(this.search);
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadCustomerCenter(search) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.customers = [];
                    let groupId = '';
                    let customerTypeId = '';
                    if (this.mCustomerGroup) {
                        groupId = this.mCustomerGroup.id || ''
                    }
                    if (this.mCustomerType) {
                        customerTypeId = this.mCustomerType.id || ''
                    }
                    let strFilter = "?is_donor=false";
                    if (this.appType === 'npo') {
                        strFilter = "?is_donor=true";
                    }
                    const strSearch = search || "";
                    window.console.log('strFilter', strFilter, strSearch)
                    const strFilterV1 = '?donor=0&ctid=' + customerTypeId + '&grp=' + groupId + '&search=' + strSearch
                    customerHandler
                        // .center(customerTypeId, groupId, strSearch, strFilter)
                        .centerv1(strFilterV1)
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.customers = res.data.data;
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
                const customer = this.$route.params.data;
                const index = this.customers.findIndex((item) => {
                    return customer.id === item.id;
                });
                if (index < 0) {
                    this.customers.push(customer);
                } else {
                    this.customers.splice(index, 1, customer);
                }
            }
            window.console.log("im changed", this.$route.params);
        },
        async loadAttachment() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    // if (this.$route.params.hasOwnProperty('id')) {
                    this.showLoadingAtch = true;
                    const strFilter = "?id=" + this.customer.id;
                    billingHandler.attachmentList(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoadingAtch = false;
                            this.attachmentList = res.data.data;
                        }
                    });
                    // }
                }, 10);
            });
        },
        async loadData() {
            await this.loadCustomerType();
            await this.loadCustomerGroup();
        },
    },
    async mounted() {
        await this.loadCustomerType();
        await this.loadCustomerGroup();
    },
    computed: {
        appType() {
            return dataStore.productType;
        },
    },
    watch: {
        $route: "callback",
    },
};
</script>
<style scoped>
@media (max-width: 576px) {
    .v-tab {
        min-width: auto !important;
    }

    .grid-center.center_heigth_npo {
        height: 466px !important;
    }

    .paddingLeft {
        margin-left: 15px;
    }
}
</style>
