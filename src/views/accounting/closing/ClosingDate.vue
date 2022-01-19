<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="font_20">{{ $t("closing_date") }}</h2>
            <v-dialog v-model="dialogM2" max-width="400px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on">
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("closing_date") }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogM2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <label class="label">{{ $t("closing_date") }}</label>
                                <p class="text_tip mb-0">{{ $t('closing_date_form_tips') }}</p>
                                <app-datepicker :initialDate="closingDateM.closingDate"
                                                @emitDate="closingDate = $event"/>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t("password") }}</label>
                                <p class="text_tip">{{ $t('closing_date_form_tips1') }}</p>
                                <v-text-field class=" pt-2" v-model="closingDateM.password" outlined placeholder="" />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="modal_footer">
                        <v-btn class="btn_cancel">{{ $t("cancel") }}</v-btn>
                        <v-btn class="btn_save_close" @click="onSaveClose"
                        >{{ $t("save_close") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <p class="mb-3">{{ $t("closing_date_desc") }}</p>
            <v-row>
                <v-col sm="12" cols="12">
                    <template>
                        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
                        <kendo-datasource ref="gridSaleChannelDS"
                                          :data="closingDateList"/>
                        <kendo-grid id="gridClosingDate" class="grid-function"
                                    :data-source-ref="'gridSaleChannelDS'"
                                    :editable="false"
                                    :scrollable-virtual="true">
                            <kendo-grid-column
                                :field="'no'"
                                :title="$t('no')"
                                :template="rowNumberTmpl"
                                :width="30"
                                :column-menu="false"
                                :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                :attributes="{style: 'text-align: center'}"/>
                            <kendo-grid-column
                                :field="'closingDate'"
                                :title="$t('closing_date')"
                                :width="80"
                                :attributes="{class:'tb_name_td'}"
                                :template="loadClosingDate"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'createdAt'"
                                :title="$t('created_on')"
                                :width="80"
                                :template="loadCreatedAt"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'password'"
                                :title="$t('password')"
                                :width="90"
                                :template="'<span>#=password#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'createdBy.email'"
                                :title="$t('created_by')"
                                :width="120"
                                :template="'<span>#=createdBy.email#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="70"
                                :command="[{ iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                                :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                        </kendo-grid>
                    </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import ClosingDateModel from "@/scripts/model/ClosingDate";
import kendo from "@progress/kendo-ui"

const $ = require("jquery")

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const CryptoJS = require("crypto-js");
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

const closingDateHandler = require("@/scripts/closingDateHandler")
const closingDateModel = new ClosingDateModel({})
export default {
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialogM2: false,
        showLoading: true,
        closingDate: new Date().toISOString().substr(0, 10),
        closingDateM: closingDateModel,
        closingDateList: []

    }),
    methods: {
        loadClosingDate(dataItem) {
            return kendo.toString((new Date(dataItem.closingDate)), this.closingDateM.dateFormat)
        },
        loadCreatedAt(dataItem) {
            return kendo.toString((new Date(dataItem.createdAt)), this.closingDateM.dateFormat)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridSaleChannelDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        onNewClick() {
            this.closingDateM = {}
            this.closingDateM.id = undefined
        },
        goEdit(e) {
            e.preventDefault()
            let grid = kendo.jQuery("#gridClosingDate").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            window.console.log(dataItem, '-')
            this.closingDateM = dataItem
            this.dialogM2 = true
        },
        close() {
            this.dialogM2 = false
        },
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        id: this.closingDateM.id ? this.closingDateM.id : '',
                        closingDate: this.closingDate,
                        password: CryptoJS.AES.encrypt(this.closingDateM.password, instituteId).toString(),
                        createdBy: this.closingDateM.createdBy
                    }
                    closingDateHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.loadClosingDateList()
                            // const res = response.data.data
                            // const index = this.closingDateList.findIndex(item => {
                            //     return (res.id === item.id)
                            // })
                            // // res.closingDate = kendo.toString((new Date(res.closingDate)), this.closingDateM.dateFormat)
                            // // res.createdAt = kendo.toString((new Date(res.createdAt)), this.closingDateM.dateFormat)
                            // if (this.closingDateList.length === 0) {
                            //     this.loadClosingDateList()
                            // } else {
                            //     if (index < 0) {
                            //         this.closingDateList.push(res)
                            //     } else {
                            //         this.closingDateList.splice(index, 1, res)
                            //     }
                            // }

                            this.$snotify.success('Success')
                            this.close()
                            // this.$refs.form.reset()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })

                }, 300);
            })
        },
        async loadClosingDateList() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    closingDateHandler.get().then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            // const cld = res.data.data
                            this.closingDateList = res.data.data
                            this.closingDateList.forEach(element => {
                                element.password = CryptoJS.AES.decrypt(element.password, instituteId).toString(CryptoJS.enc.Utf8);
                            });
                            
                            // this.closingDateList.dateFormat = this.closingDateM.dateFormat
                            // this.closingDateList = cld.map(m => {
                            //     return {
                            //         id: m.id,
                            //         closingDate: m.closingDate,
                            //         password: m.password,
                            //         dateFormat: this.closingDateM.dateFormat,
                            //         createdAt: m.createdAt,
                            //         createdBy: m.createdBy
                            //     }
                            // })
                            window.console.log(this.closingDateList)
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        window.console.log(this.closingDateList)
        await this.loadClosingDateList()
    }
};
</script>
<style scoped>
.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

@media (max-width: 576px) {
}
</style>
