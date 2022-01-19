<template>
    <v-row>
        <v-col cols="12" sm="12">
            <!-- loading -->
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true">

            </LoadingMe>
            <v-row>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="pa-5 no_border text-center" color="primary" min-height="110">
                        <h2 class="white--text  d-block mb-0">100,500,00</h2>
                        <p class=" mb-0">{{ $t('amount_collected_this_month') }}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense color="primary" class="pa-2 no_border text-center" min-height="110">
                        <h2 class="mb-0 d-block white--text">100,500</h2>
                        <p class=" mb-0">{{ $t('no_of_collection_tran_month') }}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="pa-5 no_border" color="whiteGreen" min-height="110">
                        <v-row>
                            <v-col sm="6" cols="12" class="text-center py-0">
                                <h2 class="mb-0 pt-3 primary--text">{{ totalCollectionAccount }}</h2>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <p class="mb-0">{{ $t('connected_collection_accounts') }}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense color="third" class="pa-3 no_border" min-height="110">
                        <v-row class="mt-2">
                            <v-col sm="6" cols="12" class="text-center">
                                <h2 class="ma-0 white--text">10</h2>
                            </v-col>
                            <v-col sm="6" cols="12">
                                <p class="mb-0 white--text">{{ $t('rejected_transaction') }}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('transaction') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('connected_accounts') }}
                    </span>
                </v-tab>
                <!--                <v-tab>-->
                <!--                    <span class="hidden-sm-and-up text-capitalize">-->
                <!--                        <v-icon left>mdi-attachment</v-icon>-->
                <!--                    </span>-->
                <!--                    <span class="hidden-sm-and-down text-capitalize">-->
                <!--                        {{$t('default_account')}}-->
                <!--                    </span>-->
                <!--                </v-tab>-->
                <v-tab-item>
                    <v-row class="">
                        <v-col sm="4" cols="12" class="pb-0">
                            <v-select class="mt-1"
                                      :items="dateSorters"
                                      clearable
                                      outlined
                                      placeholder="ALL"
                            />
                        </v-col>

                        <v-col sm="3" cols="12" class="pb-0">
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="pb-0">
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>

                        <v-col sm="1" cols="1" class="pt-4">
                            <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)">
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <div class="reports_table">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{ $t('date') }}</th>
                                        <th>{{ $t('account_type') }}</th>
                                        <th>{{ $t('type') }}</th>
                                        <th>{{ $t('reference') }}</th>
                                        <th>{{ $t('amount') }}</th>
                                        <th>{{ $t('status') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>JB00009</td>
                                        <td>15/July/2020</td>
                                        <td>VARIANCE</td>
                                        <td>15/July/2020</td>
                                        <td>VARIANCE</td>
                                        <td class="text-center">80%</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </div>
                </v-tab-item>

                <v-tab-item>
                    <v-row class="">
                        <v-col sm="12" cols="12">
                            <h2 class="mb-0">{{ $t('connected_accounts') }}</h2>
                            <v-btn to="connect_collection_account" color="primary"
                                   class="white--text float-right text-capitalize">{{ $t('new_connection') }}
                            </v-btn>
                            <!-- <v-dialog v-model="dialogm3" max-width="740px" persistent>
                                <template v-slot:activator="{ on }">
                                    <v-btn rounded class="btn_create_new float-right" v-on="on">
                                        {{$t('new_connection')}}
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>{{$t('connect_collection_account')}}</v-card-title>
                                    <v-icon class="btn_close" @click="CloseModelConnect">close</v-icon>
                                    <v-divider/>
                                    <v-card-text style="height: 440px; background-color: #EDF1F5; color: #333;">
                                    <LoadingMe
                                            :isLoading="connectLoading"
                                            :fullPage="false"
                                            :myLoading="true">

                                    </LoadingMe>
                                        <v-row class="pt-5"  v-if="!bankClick && !connectBankSuccess">
                                          
                                        
                                            <v-col sm="6" cols="12" class="py-2">
                                                <p class="my-2 dark--text">{{$t('please_select_financial_to_connect')}}</p>
                                                <v-row>
                                                    <v-col sm="4" cols="12">
                                                        <v-img @click="ConnectClck('amret.png')" class="rounded" width="100%" src="@/assets/images/amret.png"/>
                                                    </v-col>
                                                    <v-col sm="4" cols="12">
                                                        <v-img @click="ConnectClck('amk.png')" class="rounded" width="100%" src="@/assets/images/amk.png"/>
                                                    </v-col>
                                                    <v-col sm="4" cols="12">
                                                        <v-img @click="ConnectClck('ppcb.png')" class="rounded" width="100%" src="@/assets/images/ppcb.png"/>
                                                    </v-col>
                                                    <v-col sm="4" cols="12">
                                                        <v-img @click="ConnectClck('aba.png')" class="rounded" width="100%" src="@/assets/images/aba.png"/>
                                                    </v-col>
                                                    <v-col sm="4" cols="12">
                                                        <v-img @click="ConnectClck('emoney.png')" class="rounded" width="100%" src="@/assets/images/emoney.png"/>
                                                    </v-col>
                                                    <v-col sm="4" cols="12">
                                                        <v-img @click="ConnectClck('acleda.jpg')" class="rounded" width="100%" src="@/assets/images/acleda.jpg"/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row v-else-if="bankClick && !connectBankSuccess">
                                            <v-col cols="12" class="pb-0">
                                                <v-btn class="green" @click="backToConnect">Back</v-btn>
                                            </v-col>
                                            <v-col cols="12" sm="12">
                                                <BankConnection :imageName="pic">
                                                    <template v-slot:account>
                                                        <label class="label">{{$t('nature')}}</label>
                                                        <p class="text_tip">{{$t('nature_customer_desc')}}</p>
                                                        <v-select class=" mt-4 "
                                                        :items="account"
                                                        outlined
                                                        return-object/>
                                                        <v-btn width="100%"  class="green mt-6 radius_30 white--text" @click="ConnectClick">
                                                            <v-icon size="13" class="dark--text mr-2">fa fa-lock</v-icon>
                                                            <span class="white--text text-capitalize">{{$t('connect_collection_account')}}</span>
                                                        </v-btn>
                                                    </template>
                                                </BankConnection>
                                            </v-col>
                                        </v-row>
                                        <v-row v-else-if="connectBankSuccess">
                                            <v-col class="">
                                                <h2 class="primary--text text-products font_3em my-10 mt-16">{{$t('congratulation')}}</h2>
                                                <p class="text-products font_20">Your collection account connection is successful. </p>
                                            </v-col>
                                        </v-row>
                                        <p class="text-products"> <v-icon size="13" class="dark--text mr-2">fa fa-lock</v-icon> At BanhJi, the privacy and security of your information are top priorities.</p>
                                    </v-card-text>
                                </v-card>
                            </v-dialog> -->
                            <p class="mb-0">{{ $t('current_bank_des') }} </p>
                        </v-col>

                        <v-row>
                            <v-col sm="12" cols="12" class="reports_table">
                                <template>
                                    <kendo-datasource ref="connectedDS"
                                                      :data="connectedList"/>
                                    <kendo-grid id="gridLeft" class="grid-function"
                                                :data-source-ref="'connectedDS'"
                                                :editable="false"
                                                :scrollable-virtual="true">
                                        <kendo-grid-column
                                            :field="'no'"
                                            :title="$t('no')"
                                            :template="rowNumberTmplL"
                                            :width="45"
                                            :column-menu="false"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                            :attributes="{style: 'text-align: center'}"/>
                                        <kendo-grid-column
                                            :field="'image'"
                                            :title="$t('fls')"
                                            :width="150"
                                            :template="loadImage"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'number'"
                                            :title="$t('number')"
                                            :width="150"
                                            :template="'<span>#=number#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'name'"
                                            :title="$t('name')"
                                            :attributes="{class:'tb_name_td'}"
                                            :width="150"
                                            :template="'<span>#=name#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'currency'"
                                            :title="$t('currency')"
                                            :width="150"
                                            :template="'<span>#=currency.code#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'connectedOn'"
                                            :title="$t('connect_on')"
                                            :width="150"
                                            :template="formatDate"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="''"
                                            :title="$t('amount')"
                                            :width="150"
                                            :template="'<span>#=0#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    </kendo-grid>
                                </template>
                            </v-col>
                        </v-row>
                    </v-row>

                </v-tab-item>
                <v-tab-item>
                    <v-row class="">
                        <v-col sm="12" cols="12">
                            <h2 class="mb-0">{{ $t('default_connection_setting') }}</h2>
                            <v-dialog v-model="dialogM2" max-width="400px">
                                <template v-slot:activator="{  }">
                                    <v-btn rounded class="btn_create_new float-right">
                                        {{ $t('new_default') }}
                                    </v-btn>
                                </template>
                                <v-card>
                                    <div class="modal_header">
                                        <v-card-title>{{ $t('customer_type') }}</v-card-title>
                                        <v-icon  @click="dialogM2 = false">close</v-icon>
                                    </div>
                                    <v-card-text class="modal_text_content">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pb-0">
                                                <label class="label">{{ $t('customer_type_name') }}</label>
                                                <p class="text_tip">{{ $t('customer_type_name_desc') }}</p>
                                                <v-text-field class=" mb-1 mt-2"
                                                              outlined
                                                              tage="Customer Type Name"
                                                              placeholder=""/>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <v-row>
                                                    <v-col sm="4" cols="4">
                                                        <label class="label">{{ $t('abbreviation') }}</label>
                                                        <p class="text_tip">{{ $t('abbreviation_customer_desc') }}</p>
                                                        <v-text-field class=" mb-3 mt-4"
                                                                      outlined
                                                                      tage="Abbreviation"
                                                                      placeholder=""/>
                                                    </v-col>
                                                    <v-col sm="8" cols="8">
                                                        <label class="label">{{ $t('nature') }}</label>
                                                        <p class="text_tip">{{ $t('nature_customer_desc') }}</p>
                                                        <v-select class=" mt-4 "
                                                                  id="acc_type_selector"
                                                                  item-text="name"
                                                                  tage="Nature"
                                                                  item-value="selected_acctount_type"
                                                                  outlined
                                                                  return-object/>
                                                    </v-col>
                                                </v-row>

                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-divider/>
                                    <v-card-actions class="modal_footer">
                                        <v-btn class="btn_cancel" @click="dialogM2 = false">
                                            {{ $t('cancel') }}
                                        </v-btn>
                                        <v-btn class="btn_save_close"
                                               @click.native="OnSaveClick(false,option)">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                    </v-card-actions>

                                </v-card>
                            </v-dialog>
                            <p class="mb-0">{{ $t('default_account_desc') }} </p>
                        </v-col>

                        <v-row>
                            <v-col sm="12" cols="12" class="reports_table">
                                <template>
                                    <v-simple-table class="attachment_table">
                                        <template v-slot:default>
                                            <thead>
                                            <tr>
                                                <th>{{ $t('fls') }}</th>
                                                <th>{{ $t('number') }}</th>
                                                <th>{{ $t('currency') }}</th>
                                                <th>{{ $t('connect_on') }}</th>
                                                <th>{{ $t('no_of_transactions') }}</th>
                                                <th>{{ $t('amount') }}</th>
                                                <th>{{ $t('action') }}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <v-img width="30" src="@/assets/images/amk.png"/>
                                                </td>
                                                <td>JB00009</td>
                                                <td>USA</td>
                                                <td>12/12/2020</td>
                                                <td>100,00</td>
                                                <td>100,1000,0</td>
                                                <td class="text-center"/>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <v-img width="30" src="@/assets/images/ppcb.png"/>
                                                </td>
                                                <td>JB00009</td>
                                                <td>USA</td>
                                                <td>12/12/2020</td>
                                                <td>100,00</td>
                                                <td>100,1000,0</td>
                                                <td class="text-center"/>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </template>
                            </v-col>
                        </v-row>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
import kendo from '@progress/kendo-ui'
import {i18n} from '@/i18n'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import BankPaymentModel from "@/scripts/model/BankPayment";

const bankPaymentHandler = require("@/scripts/bankPaymentHandler")
const bankPaymentModel = new BankPaymentModel({})
export default {
    name: "Collection",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent
    },
    data: () => ({
        connectedList: [],
        start_date: "",
        end_date: "",
        dialogM2: false,
        bankClick: false,
        connectBankSuccess: false,
        connectLoading: false,
        dialogM3: false,
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        isLoaded: false,
        showLoading: false,
        bankPayment: bankPaymentModel,
        dateFormat: bankPaymentModel.dateFormat,
        pic: '',
        totalCollectionAccount: 0
    }),
    methods: {
        callBack() {
            if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                this.loadConnectedBankAccount()
                // const data = this.$route.params.data
                // // let flag = false
                // const index = this.connectedList.findIndex(item => {
                //     return (item.id === data.id)
                // })
                // if (this.connectedList.length > 0) {
                //     if (index < 0) {
                //         this.connectedList.push(data)
                //     } else {
                //         this.connectedList.splice(index, 1, data)
                //     }
                // } else {
                //     this.loadConnectedBankAccount()
                // }
            }
        },
        loadImage(dataItem) {
            if (dataItem.hasOwnProperty('image')) {
                const url = dataItem.image
                return "<img width='50' height='50' style= 'margin: auto;display: block;' src='" + url + "' />"
            }
            return ''
        },
        formatDate(dataItem) {
            return kendo.toString(new Date(dataItem.connectedOn), `${this.dateFormat}`)
        },
        async loadConnectedBankAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    bankPaymentHandler.gets().then(res => {
                        if (res.data.statusCode === 200) {
                            this.connectedList = res.data.data
                            this.totalCollectionAccount = this.connectedList.length
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        rowNumberTmplL(dataItem) {
            let ds = this.$refs.connectedDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        ConnectClck(params) {
            this.pic = params
            this.bankClick = true
        },
        backToConnect() {
            this.bankClick = false
        },
        ConnectClick() {
            this.connectLoading = true
            setTimeout(() => {
                this.connectBankSuccess = true
                this.connectLoading = false
            }, 300);
        },
        CloseModelConnect() {
            this.connectBankSuccess = false
            this.bankClick = false
            this.dialogM3 = false
        }
    },
    mounted: async function () {
        await this.loadConnectedBankAccount()
    },
    watch: {
        '$route': 'callBack'
    },
    computed: {
        headers() {
            return [
                {text: i18n.t('date'), value: 'journal_date'},
                {text: i18n.t('type'), value: 'journal_type'},
                {text: i18n.t('number'), value: 'journal_number'},
                {text: i18n.t('description'), value: 'description'},
                {text: i18n.t('debit'), value: 'dr'},
                {text: i18n.t('credit'), value: 'cr'},
            ]
        },
    },
};
</script>
<style scoped>
.purchases {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20px 20px 5px;
}

.report_filter {
    background-color: #edf1f5;
    padding: 0 20px 0px 20px;
}

.report_block .v-card.third {
    background-color: #00b050;
    border: none;
    box-shadow: none;
    color: #ffffff;
    float: left;
    width: 100%;
}

.report_block .v-card.third p.text {
    text-align: left;
    font-size: 17px;
}

.report_block .v-card.third p.number {
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0;
}

.dv_mt {
    margin-top: 20px;
}

.report_block .left_card p:nth-child(2) {
    width: 100%;
    font-size: 19px;
    font-family: "Niradei-Bold", serif;
    padding: 7px 0 0 0;
    text-align: right;
}

.v-tab--active {
    background-color: #F8F8F9;
    color: #000;
}

.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {
    .dv_mt,
    .dv_mt8 {
        margin-top: 0;
    }

    .purchases {
        margin-top: 0;
    }
}
</style>