<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <h2 class="mb-0 font_20">{{ $t('accounting_content') }}</h2>
            <v-btn @click="Edit" class="white--text float-right text-capitalize" color="primary" v-on="on">
                {{ $t(save_status) }}
            </v-btn>
            <p class="mb-4">{{ $t('accounting_setting_content_sub') }}</p>

            <template>
                <v-simple-table class="attachment_table">
                    <template>
                        <tbody>
                        <tr>
                            <td width="30%" class="text-bold">{{$t('chart_of_accounts')}}</td>
                            <td width="50%">{{$t('acc_setting_content_desc')}}</td>
                            <td v-if="is_edit" class="primary--text align-center justify-center d-flex text-bold hide_form_alert">
                                <v-select class="my-1"
                                          width="140px"
                                          placeholder="English"
                                          :items="items"
                                          v-model="lang"
                                          outlined
                                          return-object
                                />
                            </td>
                            <td v-else>{{lang}}</td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{$t('segment')}}</td>
                            <td>{{$t('display_of_class_all')}}</td>
                            <td v-if="is_edit" class="align-center justify-center d-flex text-bold">
                                <v-switch
                                        v-model="nagative_inventroy"
                                        color="primary"
                                        :label="nagative_inventroy ? $t('on') : $t('off')"
                                />
                            </td>
                            <td v-else>{{nagative_inventroy ? $t('on') : $t('off')}}</td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{$t('class')}}</td>
                            <td>{{$t('display_of_class_1')}}</td>
                            <td v-if="is_edit" class="align-center justify-center d-flex text-bold">
                                <v-switch
                                        v-model="nagative_inventroy"
                                        color="primary"
                                        :label="nagative_inventroy ? $t('on') : $t('off')"
                                />
                            </td>
                            <td v-else>{{nagative_inventroy ? $t('on') : $t('off')}}</td>
                        </tr>
                        <tr>
                            <td class="text-bold"></td>
                            <td>{{$t('display_of_class_2')}}</td>
                            <td v-if="is_edit" class="align-center justify-center d-flex text-bold">
                                <v-switch
                                        v-model="nagative_inventroy"
                                        color="primary"
                                        :label="nagative_inventroy ? $t('on') : $t('off')"
                                />
                            </td>
                            <td v-else>{{nagative_inventroy ? $t('on') : $t('off')}}</td>
                        </tr>
                        <tr>
                            <td class="text-bold"></td>
                            <td>{{$t('display_of_class_3')}}</td>
                            <td  v-if="is_edit" class="align-center justify-center d-flex text-bold">
                                <v-switch
                                        v-model="nagative_inventroy"
                                        color="primary"
                                        :label="nagative_inventroy ? $t('on') : $t('off')"
                                />
                            </td>
                            <td v-else>{{nagative_inventroy ? $t('on') : $t('off')}}</td>
                        </tr>
                        <tr>
                            <td class="text-bold"></td>
                            <td>{{$t('display_of_class_4')}}</td>
                            <td v-if="is_edit" class="align-center justify-center d-flex text-bold">
                                <v-switch
                                        v-model="nagative_inventroy"
                                        color="primary"
                                        :label="nagative_inventroy ? $t('on') : $t('off')"
                                />
                            </td>
                            <td v-else>{{nagative_inventroy ? $t('on') : $t('off')}}</td>
                        </tr>
                        <tr>
                            <td class="text-bold"></td>
                            <td>{{$t('display_of_class_5')}}</td>
                            <td v-if="is_edit" class="align-center justify-center d-flex text-bold">
                                <v-switch
                                        v-model="nagative_inventroy"
                                        color="primary"
                                        :label="nagative_inventroy ? $t('on') : $t('off')"
                                />
                            </td>
                            <td v-else>{{nagative_inventroy ? $t('on') : $t('off')}}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        components: {},
        data: () => ({
            dialog: false,
            show_more_statment: false,
            is_edit: false,
            save_status : "edit",
            service_date: true,
            lang: "English",
            nagative_inventroy: false,
            items: ['Enlgish', 'Khmer'],


        }),
        props: {},
        computed: {},
        watch: {},
        created() {
        },
        methods: {
            Edit(){
                this.is_edit = !this.is_edit
                if(this.is_edit){
                    this.save_status = "save"
                }else{
                    this.save_status = "edit"
                }
            },
            Reminder(val) {
                this.dialogRemind1 = true
                this.reminder_num = val
            }
        },
        mounted: async function () {
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