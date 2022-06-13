<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <v-card color="white" class="pl-2 no_border" elevation="0">

                            <h2 class="mb-0 font_20">{{ $t('order_type') }}</h2>
                            <v-dialog v-model="dialogm2" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                                        {{ $t('create_new') }}
                                    </v-btn>
                                </template>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card>
                                        <v-card-title>{{ $t('add_order_type') }}</v-card-title>
                                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                                        <v-divider/>
                                        <v-card-text style="background-color: #EDF1F5; color: #333333;">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <label class="label">{{ $t('name') }}</label>
                                                    <v-text-field
                                                        class="mt-1"
                                                        v-model="p.name"
                                                        @change="checkPinName"
                                                        outlined
                                                        placeholder=""
                                                        :rules="[v => !!v || 'name is required']"
                                                    />
                                                    <label class="label">{{ $t('abbr') }}</label>
                                                    <v-text-field
                                                        class="mt-1"
                                                        v-model="p.abbr"
                                                        @change="checkPinAbbr"
                                                        outlined
                                                        placeholder=""
                                                        :rules="[v => !!v || 'name is required']"
                                                    />
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
                                                            class=" text-capitalize  black--text float-left"
                                                            @click="dialogm2 = false">{{ $t('cancel') }}
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col sm="6" cols="6" class="py-0 pr-0">
                                                        <v-btn color="secondary"
                                                            class="px-3  white--text text-capitalize float-right"
                                                            @click="saveClose">
                                                            {{ $t('save_close') }}
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-card-actions>
                                        </v-col>
                                    </v-card>
                                </v-form>
                            </v-dialog>
                        </v-card>
                    </v-col>
                    <v-col sm="12" cols="12">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-uppercase">{{ $t('name') }}</th>
                                        <th class="text-uppercase">{{ $t('abbr') }}</th>
                                        <th style="width: 50px"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="d in ps" v-bind:key="d.id">
                                        <td>{{ d.name }}</td>
                                        <td>{{ d.abbr }}</td>
                                        <td>
                                            <v-btn class="btn_edit_setting" @click="onEditClick(d)">
                                                <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                                <span class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="true"
                        :myLoading="true"/>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
// import { i18n } from '@/i18n';
import generalSettingModel from "@/scripts/commerce/model/GeneralSetting"
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
// import kendo from "@progress/kendo-ui"
// const $ = kendo.jQuery
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        groupMemberList: [],
        showLoading: false,
        show1: false,
        //
        valid: true,
        saveOption: '',
        p: { name: '', pinCode: ''},
        ps: [],
        oldps: [],
        edit: false,
        checkPinData: [],
        checkPinNameData: [],
    }),
    props: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    methods: {
        async loadSaleFormContent() {
            this.showLoading = true
            commerceHandler.settingGet().then(res => {
                this.showLoading = false
                if (res.data.statusCode === 200) {
                    const data = res.data.data
                    let d = data.filter((o) => {return o.type == 'retail'})
                    if (d.length > 0) {
                        this.g = new generalSettingModel(d[0])
                        this.g.id = d[0].pk
                        this.ps = this.g.orderTypes
                        this.checkPinData = this.g.orderTypes
                    }
                }
            })
        },
        async onEditClick(value) {
            this.edit = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.p = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.edit = false
            this.p = {
                name: '',
                abbr: ''
            }
        },
        saveClose() {
            this.showLoading = true
            this.checkPin()
            this.g.orderTypes.push(this.p)
            commerceHandler.settingCreate(new generalSettingModel(this.g)).then(response => {
                if (response.data.statusCode === 201) {
                    const res = response.data.data
                    this.g = res
                    this.$snotify.success('Update Successfully')
                    this.showLoading = false
                    this.dialogm2 = false
                }
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                this.showLoading = false
            })
        },
        close() {
            this.dialogm2 = false
        },
        checkPin(){
            window.console.log(this.p.abbr, this.oldps, this.ps)
            let ex = this.checkPinData.filter((obj) => {
                return obj.abbr == this.p.abbr || obj.name == this.p.name
            })
            if(ex.length > 0){
                this.p.abbr = ''
                this.p.name = ''
                this.$snotify.error('Name or abbr is exist!')
                return
            }
        },
        checkPinAbbr(){
            let ex = this.checkPinData.filter((obj) => {
                return obj.abbr == this.p.abbr
            })
            if(ex.length > 0){
                this.p.abbr = ''
                this.$snotify.error('Abbr is exist!')
            }
        },
        checkPinName(){
            let ex = this.checkPinData.filter((obj) => {
                return obj.name == this.p.name
            })
            if(ex.length > 0){
                this.p.name = ''
                this.$snotify.error('Name is exist!')
            }
        }
    },
    mounted: async function () {
        await this.loadSaleFormContent()
    },
    created: async function () {
    },
    computed: {
    },
};
</script>
<style scoped>
.v-application--is-ltr .v-messages {
    text-align: center !important;;
}
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>