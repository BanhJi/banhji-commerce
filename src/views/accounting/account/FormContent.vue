<template>
    <v-row class="">
        <!-- not modal -->
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('accounting_form_content') }}</h2>
            <p class="mb-3">{{ $t('accounting_form_content_desc') }} </p>
            <template>
                <v-simple-table class="attachment_table">
                    <template>
                        <tbody>
                            <tr>
                                <td class="text-bold">{{ $t('class_one') }}</td>
                                <td>{{ $t('class_one_desc') }}</td>
                                <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                    <v-switch v-model="accountingFormContent.C1"
                                        color="primary"
                                        :label="accountingFormContent.C1 ? 'ON' : 'OFF'"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('class_two') }}</td>
                                <td>{{ $t('class_two_desc') }}</td>
                                <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                    <v-switch v-model="accountingFormContent.C2"
                                        color="primary"
                                        :label="accountingFormContent.C2 ? 'ON' : 'OFF'"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('class_three') }}</td>
                                <td>{{ $t('class_three_desc') }}</td>
                                <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                    <v-switch v-model="accountingFormContent.C3"
                                        color="primary"
                                        :label="accountingFormContent.C3 ? 'ON' : 'OFF'"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('class_four') }}</td>
                                <td>{{ $t('class_four_desc') }}</td>
                                <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                    <v-switch v-model="accountingFormContent.C4"
                                        color="primary"
                                        :label="accountingFormContent.C4 ? 'ON' : 'OFF'"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('class_five') }}</td>
                                <td>{{ $t('class_five_desc') }}</td>
                                <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                    <v-switch v-model="accountingFormContent.C5"
                                        color="primary"
                                        :label="accountingFormContent.C5 ? 'ON' : 'OFF'"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('secondary_account') }}</td>
                                <td>{{ $t('secondary_account_desc') }}</td>
                                <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                    <v-switch
                                        v-model="accountingFormContent.secondaryAccount"
                                        color="primary"
                                        :label="accountingFormContent.secondaryAccount ? 'ON' : 'OFF'"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('decimal') }}</td>
                                <td>{{ $t('decimal_setting_desc') }}</td>
                                <td style="width:120px"  class="primary--text align-center justify-center d-flex text-bold">
                                    <v-select class="w_100"
                                            v-model="accountingFormContent.decimal"
                                            :items="decimalStyle"
                                            color="primary"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('account_language') }}</td>
                                <td>{{ $t('acc_setting_content_desc') }}</td>
                                <td style="width:120px"  class="primary--text hide_form_alert">
                                    <v-select class="my-1 w_100" 
                                        style="margin: 15px auto !important;"
                                        v-model="accountingFormContent.accountLanguage"
                                        :placeholder="$t('sale_quote')"
                                        :items="accountLanguages"
                                        outlined/>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
            <v-divider/>
            <v-card outlined dense class="no_border function_footer">
                <v-btn class="float-right btn_save white--text text-capitalize" color="primary" @click="onSaveClose">
                    {{ $t('save') }}
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import AccountingFormContentModel from "@/scripts/model/AccountingFormContent"

const accountingFormContentModel = new AccountingFormContentModel({})
const formContentHandler = require("@/scripts/formContentHandler")
// const settingsHandler = require("@/scripts/settingsHandler");
import store from "@/store";

export default {
    components: {},
    data: () => ({
        decimalStyle: [2, 3, 4, 5],
        accountingFormContent: accountingFormContentModel,
        accountLanguages: ['ខ្មែរ', 'English'],
    }),
    props: {},
    computed: {},
    watch: {},
    created() {
    },
    methods: {
        async onSaveClose() {
            this.$store.state.accounting.secondaryAccount = false;
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = new AccountingFormContentModel({
                        id:                 this.accountingFormContent.id,
                        C1:                 this.accountingFormContent.C1,
                        C2:                 this.accountingFormContent.C2 ,
                        C3:                 this.accountingFormContent.C3,
                        C4:                 this.accountingFormContent.C4,
                        C5:                 this.accountingFormContent.C5,
                        secondaryAccount:   this.accountingFormContent.secondaryAccount,
                        accountLanguage:    this.accountingFormContent.accountLanguage,
                        decimal:            this.accountingFormContent.decimal
                    })
                    window.console.log('data', data)
                    formContentHandler.createAccount(data).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data
                            this.accountingFormContent = res
                            this.$snotify.success('Update Successfully')
                            this.loadAccountingFormContent()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        async loadAccountingFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    formContentHandler.getAccount().then(res => {
                        window.console.log('1', res)
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.accountingFormContent = data[0]
                                store.state.accounting.secondaryAccount = data[0].secondaryAccount;
                                store.state.accounting.accountLanguage = data[0].accountLanguage;
                                var className = {
                                    C1: data[0].C1,
                                    C2: data[0].C2,
                                    C3: data[0].C3,
                                    C4: data[0].C4,
                                    C5: data[0].C5,
                                };
                                store.state.accounting.classSetting = className;

                            }
                        }

                    })
                }, 300)
            })
        },
    },
    mounted: async function () {
        await this.loadAccountingFormContent()
    }
};
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
    border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
}

.float-right {
    margin-top: 0px !important;
}

.float-left {
    margin-top: 0px !important;

}

.v-input--switch {
    margin-top: 0px;
    height: 30px;
}

.lightBlue {
    color: #68cbfb;
}


</style>