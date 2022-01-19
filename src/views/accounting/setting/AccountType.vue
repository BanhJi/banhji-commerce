<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <h2 class="mb-0">{{ $t("account_type") }}</h2>
            <v-dialog v-model="dialogm2" max-width="450px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on">
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("account_type") }}</v-card-title>
                        <v-icon @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="">
                                <label class="label">{{ $t("account_type") }}</label>
                                <v-text-field class="" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="">
                                <label class="label">{{ $t("name_in_reporting_language") }}</label>
                                <v-text-field class="" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t("description") }}</label>
                                <v-textarea class="" label="" outlined rows="3"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-btn class="btn_cancel">{{ $t("cancel") }}</v-btn>
                        <v-btn class="btn_save_close float-right"
                        >{{ $t("save_close") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <p class="mb-3">{{ $t("account_type_desc") }}</p>
            <v-row>
                <v-col sm="12" cols="12">
                    <template>
                        <v-simple-table class="exchange-table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="text-uppercase">{{$t('code')}}</th>
                                    <th class="text-uppercase">{{$t('account_type')}}</th>
                                    <th class="text-uppercase">{{$t('name_in_reporting_language')}}</th>
                                    <th class="text-uppercase">{{$t('description')}}</th>
                                    <th class="text-uppercase">{{$t('action')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-bold text-uppercase" >30</td>
                                        <td class="text-uppercase text-bold">Capital</td>
                                        <td>មូលធនភាគហ៊ុន</td>
                                        <td>Capital investment of shareholders</td>
                                        <td>
                                            <v-btn class="btn_edit_setting">
                                                <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                                <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-bold text-uppercase" >30</td>
                                        <td class="text-uppercase text-bold">Capital</td>
                                        <td>មូលធនភាគហ៊ុន</td>
                                        <td>Capital investment of shareholders</td>
                                        <td>
                                            <v-btn class="btn_edit_setting">
                                                <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                                <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
            </v-row>
        </v-col>
        <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :color="color"
                :left="x === 'left'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
        >
            {{ textStatus }}
        </v-snackbar>
    </v-row>
</template>

<script>
    // const accountGroup = require("../../scripts/model/AcountGroup")
    // import { i18n } from '@/i18n'
    // import LoadingMe from '@/components/Loading'
    export default {
        components: {
            // LoadingMe
        },
        data: () => ({
            dialogm1: "",
            dialogm2: false,
            compeletLoading: true,
            isFullpage: false,
            snackbar: false,
            textStatus: "Success",
            color: "#3DA72E",
            timeout: 6000,
            x: "right",
            y: "top",
        }),
        props: {},
        computed: {},
        watch: {},
        created() {
        },
        methods: {},
        beforeCreate() {
            // get the account type.
        },
        mounted: async function () {
        },
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
