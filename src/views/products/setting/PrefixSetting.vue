<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('account_prefix_setting') }}</h2>
            <v-dialog v-model="dialog" scrollable max-width="700px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('transaction_prefix') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialog = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-row>
                                <v-col sm="6" cols="12" class="">
                                    <label class="label">{{ $t('transaction_type') }}</label>
                                    <p class="text_tip">{{ $t('acc_trans_setting_dialog_desc_1') }}</p>
                                    <v-text-field class="" v-bind:value="prefix.name"
                                                  outlined
                                                  tage="Transaction Type"
                                                  readonly
                                                  placeholder=""
                                    />
                                    <label class="label">{{ $t('transaction_prefix') }}</label>
                                    <p class="text_tip">{{ $t('acc_trans_setting_dialog_desc_2') }}</p>

                                    <v-text-field class="" v-bind:value="prefix.abbr"
                                                  v-model="prefix.abbr"
                                                  outlined
                                                  tage="Transaction Prefix"
                                                  :rules="[v => !!v || $t('abb_is_required')]"
                                                  required
                                                  @input="onNumberingStructureChange"
                                                  placeholder=""
                                    />

                                    <label class="label">{{ $t('starting_number') }}</label>
                                    <p class="text_tip">{{ $t('acc_trans_setting_dialog_desc_3') }}</p>
                                    <v-text-field class="" v-bind:value="prefix.number" type="number"
                                                  v-model="prefix.number"
                                                  @keypress="onlyNumber" @input="onlyNumber"
                                                  outlined
                                                  tage="Starting Number"
                                                  min="1"
                                                  placeholder=""
                                    />

                                    <label class="label">{{ $t('format') }}</label>
                                    <p class="text_tip">{{ $t('acc_trans_setting_dialog_desc_4') }}</p>
                                    <v-text-field class="" v-bind:value="prefix.format" type="number"
                                                  v-model="prefix.format"
                                                  @keypress="onlyNumber" @input="onlyNumber"
                                                  outlined
                                                  tage="Format"
                                                  min="3"
                                                  max="10"
                                                  placeholder=""
                                    />

                                </v-col>
                                <v-col sm="6" cols="12" class="">
                                    <label class="label">{{ $t('numbering_structure') }}</label>
                                    <p class="text_tip">{{ $t('acc_trans_setting_dialog_desc_5') }}</p>
                                    <v-row>
                                        <v-radio-group v-model="prefix.sequence" :mandatory="false" class="mt-0"
                                                       @change="onNumberingStructureChange">
                                            <v-col sm="3" cols="2" class="pa-0 ml-2 mb-3" style="line-height: 40px;">
                                                <v-radio :label="$t('year')+'(yyyy)'" :value=0 color="blue"/>
                                            </v-col>
                                            <v-col sm="3" cols="2" class="pa-0 ml-2 mb-3" style="line-height: 40px;">
                                                <v-radio :label="$t('year')+'(yy)'" :value=1 color="blue"/>
                                            </v-col>
                                            <v-col sm="3" cols="4" class="pa-0 ml-2 mb-3" style="line-height: 40px;">
                                                <v-radio :label="$t('year/month')+'(yyyymm)'" :value=2 color="blue"/>
                                            </v-col>
                                            <v-col sm="3" cols="4" class="pa-0 ml-2 mb-3" style="line-height: 40px;">
                                                <v-radio :label="$t('year/month')+'(yymm)'" :value=3 color="blue"/>
                                            </v-col>
                                        </v-radio-group>
                                    </v-row>

                                    <label class="label">{{ $t('preview') }}</label>
                                    <p class="text_tip">{{ $t('acc_trans_setting_dialog_desc_6') }}</p>
                                    <v-text-field class="" v-bind:value="prefix.preview"
                                                  outlined
                                                  tage="Preview"
                                                  readonly
                                                  placeholder=""
                                    />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-btn class="btn_cancel" @click="dialog = false">{{ $t('cancel') }}</v-btn>
                        <v-btn class="btn_save_close" @click="onSaveClose">{{ $t('save_close') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <p class="mb-3">{{ $t('acc_prefix_setting_desc') }}</p>

            <template>
                <v-simple-table class="exchange-table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('abbr') }}</th>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('structure') }}</th>
                            <th class="text-uppercase">{{ $t('starting_no') }}</th>
                            <th class="text-uppercase">{{ $t('action') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="prefix in account_prefixes" v-bind:key="prefix.sk">
                            <td style="text-align: center">{{ prefix.abbr }}</td>
                            <td classt="text-bold" width="15%" style="text-align: left">
                                {{ prefix.name }}
                            </td>
                            <td style="text-align: center">
                                {{ prefix.suffix }}
                            </td>
                            <td style="text-align: center">
                                {{
                                prefix.abbr + prefix.suffix + '0'.repeat(prefix.format -
                                prefix.number.toString().length) +
                                prefix.number
                                }}
                            </td>
                            <td style="text-align: center">
                                <v-btn class="btn_edit_setting" @click="onViewClick(prefix), dialog=true">
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
    const prefixHandler = require("@/scripts/prefixHandler.js")

    export default {
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        data() {
            return {
                dialogm1: '',
                dialog: false,
                compeletLoading: true,
                valid: true,
                account_prefixes: [],
                prefix: {
                    number: '',
                    format: '',
                    type: '',
                    abbr: '',
                    name: '',
                    suffix: '',
                    sk: '',
                    preview: '',
                    sequence: 0,
                    uuid: ''
                }
            }
        },
        props: {},
        methods: {
            async onViewClick(row) {
                //eslint-disable-next-line no-console
                // console.log(row)
                this.prefix.number = row.number
                this.prefix.format = row.format
                this.prefix.type = row.type
                this.prefix.name = row.name
                this.prefix.suffix = row.suffix
                this.prefix.sk = row.sk
                this.prefix.sequence = row.sequence
                this.prefix.abbr = row.abbr
                this.prefix.uuid = row.uuid
                this.prefix.preview = row.abbr + row.suffix + '0'.repeat(row.format - row.number.toString().length) + row.number
            },
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "abbr": this.prefix.abbr,
                            "number": this.prefix.number,
                            "format": this.prefix.format,
                            "sequence": this.prefix.sequence,
                            "suffix": this.prefix.suffix,
                        }
                        prefixHandler.update(this.prefix.sk, data).then(response => {
                            if (response.data.statusCode === 200) {
                                this.dialog = false
                                this.loadPrefixes()
                            }
                        }).catch(e => {
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            async onNumberingStructureChange() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        //eslint-disable-next-line no-console
                        // console.log(this.prefix.number)
                        let year = new Date().getFullYear()
                        let shortMonth = ("0" + (new Date().getMonth() + 1)).slice(-2)
                        if (this.prefix.sequence === 0) {
                            this.prefix.suffix = year
                        } else if (this.prefix.sequence === 1) {
                            this.prefix.suffix = year.toString().substr(2)
                        } else if (this.prefix.sequence === 2) {
                            this.prefix.suffix = year + shortMonth
                        } else if (this.prefix.sequence === 3) {
                            this.prefix.suffix = year.toString().substr(2) + shortMonth
                        }
                        this.prefix.preview = this.prefix.abbr + this.prefix.suffix + '0'.repeat(this.prefix.format - this.prefix.number.toString().length) + this.prefix.number
                    }, 300);
                })
            },
            async loadPrefixes() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        prefixHandler.get('transaction').then(res => {
                            this.compeletLoading = false
                            this.account_prefixes = res
                        })
                    }, 300);
                })
            },
            onlyNumber($event) {
                //console.log($event.keyCode); //keyCodes value
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
                    $event.preventDefault();
                } else {
                    this.onNumberingStructureChange()
                }

            },
        },
        mounted: async function () {
            await this.loadPrefixes()
        }
    };
</script>
<style scoped>
    table.acc_prefix_Setting {
        border-top: 1px solid #ccc;
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        color: #000;
    }

    table.acc_prefix_Setting tr th {
        text-transform: uppercase;
        padding: 10px;
        border-top: 1px solid #ccc;
        border-bottom: 3px solid #ccc;
        vertical-align: top;

    }

    table.acc_prefix_Setting tr td {
        border-bottom: 1px solid #ccc;
        padding: 3px 0;
        vertical-align: middle;
        font-size: 13px;
    }

    table.acc_prefix_Setting tr td:first-child {
        font-weight: 700;
    }

    table.acc_prefix_Setting tr td:last-child {
        text-align: center;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
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

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row) {


        border-bottom: 0;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
        border-bottom: 1px solid #000 !important;
    }

    @media (max-width: 576px) {

    }
</style>