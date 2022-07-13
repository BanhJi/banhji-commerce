<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('sale_unit_categories') }}</h2>
            <v-dialog v-model="dialogm2" max-width="400px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('sale_unit_categories') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                     <v-card-text class="modal_text_content">
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0">
                                    <v-row>
                                        <v-col sm="6" cols="6">
                                            <label class="label">{{ $t('name') }}</label>
                                            <v-text-field class=" mt-1" v-model="saleUC.name"
                                                          outlined
                                                          :rules="[v => !!v || $t('name_is_required'),v => (v && v.length > 2) || $t('character_3')]"
                                                          required
                                                          placeholder=""/>
                                        </v-col>
                                        <v-col sm="6" cols="6">
                                            <label class="label">{{ $t('code') }}</label>
                                            <v-text-field class="mt-1" v-model="saleUC.code"
                                                          outlined
                                                          :rules="[v => !!v || $t('code_is_required'),v => (v && v.length > 2) || $t('character_3')]"
                                                          required
                                                          placeholder=""/>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="primary" outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialogm2 = false">{{ $t('cancel') }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="primary" class="white--text text-capitalize"
                                       @click="onSaveClose">
                                    {{ $t('save_close') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{ $t('sale_unit_categories_desc') }} </p>
        </v-col>

        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="exchange-table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('code') }}</th>
                            <th class="text-uppercase">{{ $t('action') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="suc in saleUCs" v-bind:key="suc.id">
                            <td class="text-bold">{{ suc.name }}</td>
                            <td>{{ suc.code }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(suc)">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        <LoadingMe
                                :isLoading="compeletLoading"
                                :fullPage="false"
                                :myLoading="true"/>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    const saleUCHandler = require("@/scripts/saleUCHandler")
    import {i18n} from '@/i18n'

    export default {
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        data: () => ({
            dialogm2: false,
            compeletLoading: true,
            isFullpage: false,
            valid: true,
            snackbar: false,
            textStatus: 'Success',
            color: '#3DA72E',
            timeout: 6000,
            x: 'right',
            y: 'top',
            saleUC: {
                id: '',
                name: '',
                code: ''
            },
            saleUCs: [],
            headers: [
                {
                    text: i18n.t('name'),
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {text: i18n.t('description'), value: 'description', sortable: false,},
                {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: ' d-none'},
                {text: i18n.t('account_type'), value: 'account_type.name', sortable: false,},
                {text: i18n.t('action'), value: 'actions', sortable: false},
            ]
        }),
        props: {},
        computed: {},
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        created() {
        },
        methods: {
            async onEditClick(value) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.saleUC = value
                        this.dialogm2 = true
                    }, 300);
                })
            },
            onNewClick() {
                this.saleUC.id = ''
                this.clear()
            },
            close() {
                this.dialogm2 = false
            },
            clear() {
                this.saleUC = {}
            },
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        if (this.saleUC.id === '' || this.saleUC.id === undefined) {
                            let data = {
                                "name": this.saleUC.name,
                                "code": this.saleUC.code
                            }
                            saleUCHandler.create(data).then(response => {
                                if (response.data.statusCode === 201) {
                                    this.loadSaleUC()
                                    this.clear()
                                    this.close()
                                    this.$refs.form.reset()
                                }
                            }).catch(e => {
                                this.errors.push(e)
                            })
                        } else {
                            let data = {
                                "name": this.saleUC.name,
                                "code": this.saleUC.code
                            }
                            saleUCHandler.update(this.saleUC.id, data).then(response => {
                                if (response.data.statusCode === 201) {
                                    this.loadSaleUC()
                                    this.clear()
                                    this.close()
                                    this.$refs.form.reset()
                                }
                            }).catch(e => {
                                this.errors.push(e)
                            })
                        }
                    }, 300);
                })
            },
            async loadSaleUC() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        saleUCHandler.get().then(res => {
                            this.compeletLoading = false
                            this.saleUCs = res
                        })
                    }, 300);
                })
            },
        },
        mounted: async function () {
            await this.loadSaleUC()
        }
    };
</script>
<style scoped>
    .acc_group header {
        height: 10px !important;
    }

    table.acc_group tr td {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        vertical-align: middle;
    }

    table.acc_group tr td:first-child {
        font-weight: 700;
    }

    table.acc_group tr td:last-child {
        text-align: center;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

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

    }
</style>