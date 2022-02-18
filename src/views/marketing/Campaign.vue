<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col class="bigSide py-0 pr-2" sm="12" cols="12" style="transition: .3s ease-in;"
                                       :class="{'hide_big_bar_class':isHideBar}">
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t('campaign') }}</h2>
                                        <v-icon v-if="isHideBar"
                                                @click="cancel()"
                                                style="cursor: pointer;  font-size: 40px;"
                                                color="grey--text"
                                                class="float-right"
                                        >close
                                        </v-icon>
                                    </v-card>
                                    <v-card outlined dense class="no_border" color="white">
                                        <v-row>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label ">{{ $t('name') }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="c.name"
                                                    outlined
                                                    :rules="[v => !!v || 'Name is required']"
                                                    required
                                                />
                                                <label class="label ">{{ $t('code') }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="c.code"
                                                    outlined
                                                    :rules="[v => !!v || 'Code is required']"
                                                    required
                                                />
                                                <label class="label ">{{ $t('type') }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="c.type"
                                                    :items="types"
                                                    item-value="id"
                                                    item-text="name"
                                                    placeholder="Select"
                                                    outlined=""
                                                />
                                                <label class="label">{{ $t('discount_item') }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="c.discountItem"
                                                    :items="discountItems"
                                                    item-value="id"
                                                    item-text="name"
                                                    return-object
                                                    placeholder="Select"
                                                    outlined=""
                                                />
                                                <label class="label">{{ $t('sale_channel') }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="c.saleChannel"
                                                    :items="saleChannels"
                                                    item-value="id"
                                                    item-text="name"
                                                    return-object
                                                    placeholder="Select"
                                                    outlined=""
                                                />
                                                <label class="label">{{ $t('effective_date') }}</label>
                                                <app-datepicker
                                                    :initialDate="c.effectiveDate"
                                                    @emitDate="c.effectiveDate = $event"/>
                                                <label class="label ">{{ $t('end_date') }}</label>
                                                <app-datepicker
                                                    :initialDate="c.endDate"
                                                    @emitDate="c.endDate = $event"/>
                                                <label class="label mb-0">{{ $t('description') }}</label>
                                                <v-textarea
                                                    v-model="c.description"
                                                    class="mt-4"
                                                    solo
                                                    :label="$t('description')+'...'"
                                                    name="input-7-4">
                                                </v-textarea>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label mb-0">{{ $t('overwrite_other_campaign') }}</label>
                                                <v-switch
                                                    v-model="c.isOverwrite"
                                                    color="primary"
                                                    :label="c.isOverwrite ? $t('yes') : $t('no')"
                                                />
                                                <label class="label mb-0">{{ $t('timing') }}</label>
                                                <v-switch
                                                    v-model="c.isTiming"
                                                    color="primary"
                                                    :label="c.isTiming ? $t('yes') : $t('no')"
                                                />
                                                <v-row v-if="c.isTiming">
                                                    <v-col sm="6" cols="12" class="pb-0">
                                                        <label class="label ">{{ $t('from') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="c.timeFrom"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="pb-0">
                                                        <label class="label ">{{ $t('to') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="c.timeTo"
                                                            outlined
                                                        />
                                                    </v-col>
                                                </v-row>
                                                <label class="label">{{ $t('reward_base') }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="c.rewardBase"
                                                    :items="rewardBases"
                                                    item-value="id"
                                                    item-text="name"
                                                    placeholder="Select"
                                                    outlined=""
                                                />
                                                <v-col v-if="c.rewardBase == `amountBase`">
                                                    <label class="label">{{ $t('reward_type') }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        v-model="c.rewardType"
                                                        :items="rewardTypes"
                                                        item-value="id"
                                                        item-text="name"
                                                        @change="rewardTypeChange"
                                                        placeholder="Select"
                                                        outlined=""
                                                    />
                                                    <label class="label" v-if="c.rewardType == `fixed`">{{ $t('reward_amount') }}</label>
                                                    <v-text-field
                                                        v-if="c.rewardType == `fixed`"
                                                        class="mt-1"
                                                        style="width: 80%;float: left;"
                                                        v-model="c.rewardAmount"
                                                        outlined
                                                    />
                                                    <v-select
                                                        v-if="c.rewardType == `fixed`"
                                                        class="mt-1"
                                                        v-model="c.rewardAmountType"
                                                        :items="rewardAmountTypes"
                                                        item-value="id"
                                                        item-text="name"
                                                        placeholder="Select"
                                                        style="width: 20%; float: left;"
                                                        outlined=""
                                                    />
                                                </v-col>
                                                <v-col v-else>
                                                    <label class="label">{{ $t('base_on') }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        v-model="c.productBaseOn"
                                                        :items="productBaseOns"
                                                        item-value="id"
                                                        item-text="name"
                                                        placeholder="Select"
                                                        outlined=""
                                                    />
                                                </v-col>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                            </v-col>
                                            <v-col sm="3" cols="12" class="">
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-btn color="grayBg"
                                               outlined
                                               class=" text-capitalize  black--text float-left"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <v-btn color="primary"
                                               class="float-right white--text text-capitalize"
                                               :disabled="btnDisabled"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                        <v-btn color="secondary"
                                               style="margin-right: 10px !important"
                                               class="white--text float-right text-capitalize"
                                               @click="saveNew" :hidden="hiddenButton">{{ $t("save_new") }}
                                        </v-btn>
                                    </v-card>
                                </v-col>
                                <v-col class="smallSide pl-2" sm="12" cols="12" style="transition: .3s ease-in;"
                                       :class="{'hide_small_bar_class':isHideBar}">
                                    <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                        class="text-uppercase float-right mt-n3">
                                        <span class="pointer" @click="Help('campaign')">
                                            {{ $t('help') }}
                                        </span>
                                        <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1"
                                        >close
                                        </v-icon>
                                    </h3>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from '@/i18n';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
import {ShowResource} from '@/observable/store'
import CampaignModel from "@/scripts/commerce/model/Campaign"
/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const discountItemHandler = require("@/scripts/discountItemHandler");
const saleChannelHandler = require("@/scripts/saleChannelHandler");
export default {
    name: "Campaign",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        c: new CampaignModel({}),
        discountItems: [],
        saleChannels: [],
        isEdit: false,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        alert: false,
        files: [],
        errors: [],
        // Form validation
        valid: true,
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        transactionDate: new Date().toISOString().substr(0, 10),
        segments: [],
        //employee
        employees: [],
        transactionType: [],
        locations: [],
        isSaveNew: false,
        saveOption: '',
        company: {},
        btnDisabled: false
    }),
    methods: {
        Help(key_search) {
            ShowResource(key_search)
        },
        rewardTypeChange(){
            window.console.log(this.c.rewardType)
        },
        loadDiscountItem(){
            this.showLoading = true;
            this.discountItems = []
            discountItemHandler.list("?type=Sale").then((res) => {
                this.showLoading = false;
                if (res.data.statusCode === 200){ 
                    this.discountItems = res.data.data;
                }
            });
        },
        async loadSaleChannel() {
            this.showLoading = true;
            saleChannelHandler.get().then((res) => {
                this.showLoading = false;
                if (res.data.statusCode === 200) {
                    this.saleChannels = res.data.data;
                }
            });
        },
        async initData() {
            await this.loadDiscountItem()
            await this.loadSaleChannel()
            if (this.$route.params.id !== undefined) {
                this.isEdit = true
                await this.loadCampaign()
            } else {
                this.clear()
            }
        },
        loadCampaign(){
            this.showLoading = true
            commerceHandler.campaignGet(this.$route.params.id).then((res) => {
                if(res.status == 200){
                    this.c = res.data.data[0]
                }else{
                    this.gotoCenter()
                }
            })
        },
        gotoSetting(){
            this.$swal({
                position: 'center',
                icon: 'warning',
                title: i18n.t('no_campaign'),
                showConfirmButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: i18n.t('back_to_center')
            }).then((result) => {
                if (result.value) {
                    window.history.go(-1)
                    return false
                }
            })
        },
        saveNew() {
            this.isSaveNew = true
            this.save()
        },
        saveClose() {
            this.isSaveNew = false
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    commerceHandler.campaignCreate(new CampaignModel(this.c)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.$swal({
                                position: 'products',
                                icon: 'success',
                                title: i18n.t('your_work_has_been_saved'),
                                showConfirmButton: true,
                                confirmButtonColor: '#4d4848',
                                cancelButtonColor: '#ED1A3A',
                                confirmButtonText: i18n.t('ok')
                            })
                            if (this.isSaveNew == true) {
                                setTimeout(() => {
                                    this.clear()
                                }, 10)
                            } else {
                                this.$router.push(`${i18n.locale}` + '/marketing_promotions');
                            }
                            this.destroy()
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 10);
            })
        },
        cancel() {
            this.$swal({
                title: i18n.t('msg_title_warning'),
                text: i18n.t('msg_discard'),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t('cancel'),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t('discard'),
            }).then((result) => {
                if (result.value) {
                    this.$router.push(`${i18n.locale}` + '/marketing_promotions');
                }
            });
        },
        clear() {
            this.isEdit = false
            //set default segment
            this.c = new CampaignModel({})
            this.c.user = this.loggedUser
        },
        hide_smallsitebar() {
            this.isHideBar = !this.isHideBar;
        },
        destroy() {
            this.$destroy();
        }
    },
    computed: {
        types(){
            return [
                {id: 'automatic', name: i18n.t('automatic')},
                {id: 'manual', name: i18n.t('manual')}
            ]
        },
        rewardBases(){
            return [
                {id: 'amountBase', name: i18n.t('amount_base')},
                {id: 'productBase', name: i18n.t('product_base')}
            ]
        },
        rewardTypes(){
            return [
                {id: 'fixed', name: i18n.t('fixed')},
                {id: 'varian', name: i18n.t('varian')}
            ]
        },
        rewardAmountTypes(){
            return [
                {id: 'percentage', name: '%'},
                {id: 'amount', name: '$'}
            ]
        },
        productBaseOns(){
            return [
                {id: 'all', name: i18n.t('all')},
                {id: 'category', name: i18n.t('category')},
                {id: 'group', name: i18n.t('group')},
                {id: 'specific', name: i18n.t('specific')},
            ]
        },
        id() {
            return this.$route.params.id
        },
        disabledMe() {
            return !!this.$route.params.id;
        },
        hiddenButton() {
            if (this.$route.params.id) {
                return true
            } else {
                return false
            }
        }
    },
    created() {
    },
    mounted: async function () {
        await this.initData()
    },
    watch: {
        '$route': 'initData'
    }
};
</script>

<style scoped>
.small_sidebar {
    height: 94%;
    position: relative;
    padding: 12px;
}

.hide_small_bar_class {
    max-width: 0;
    transition: .5s ease-in;
    flex: 0 0 0;
    padding: 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
}

.iconArrow {
    right: -35px;
    position: absolute;
    bottom: -10px;
}

.iconArrowHide {
    position: absolute;
    right: -7px;
    bottom: -10px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.detial_smallside_p {
    position: absolute;
    padding-right: 12px;
    bottom: 10px;
}

</style>