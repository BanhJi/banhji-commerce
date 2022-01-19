<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0">{{$t('form')}}</h2>
            <v-dialog v-model="dialog" scrollable max-width="1024px">
                <template v-slot:activator="{on}">
                    <v-btn color="primary" class=" text-capitalize white--text float-right"
                           v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('account_form')}}</v-card-title>
                        <v-icon class="btn_close" @click="dialog = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="3" cols="12" class="">
                                <label class="label">{{$t('form_title')}}</label>
                                <p class="text_tip">{{$t('input_title_name')}}</p>
                                <v-text-field class="mt-1"
                                              outlined
                                              tage="Form Title"
                                              placeholder=""
                                />

                                <label class="label">{{$t('position_of_logo')}}</label>
                                <v-row>
                                    <v-col sm="4" cols="4" class="text-center">
                                        <v-text-field class="mt-1"
                                                      outlined
                                                      tage="Position of Logo"
                                                      placeholder=""
                                        />
                                        Center
                                    </v-col>
                                    <v-col sm="4" cols="4" class="text-center">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder=""
                                        />
                                        Left
                                    </v-col>
                                    <v-col sm="4" cols="4" class="text-center">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder=""
                                        />
                                        Right
                                    </v-col>
                                </v-row>

                                <label class="label">Signature</label>
                                <v-row>
                                    <v-col sm="4" cols="4" class="text-center">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="1"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="4" class="text-center">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="Prepared by"
                                        />
                                    </v-col>

                                    <v-col sm="4" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="2"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="Reviewed by"
                                        />
                                    </v-col>

                                    <v-col sm="4" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="3"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="Verified by"
                                        />
                                    </v-col>

                                    <v-col sm="4" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="4"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="Approved by"
                                        />
                                    </v-col>

                                    <v-col sm="4" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="4"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="4" class="text-center pt-0">
                                        <v-text-field class=""
                                                      outlined
                                                      placeholder="Recorded by"
                                        />
                                    </v-col>


                                </v-row>
                            </v-col>
                            <v-col sm="9" cols="11" class="bg_white">
                                <v-row class="wrapper_form">
                                    <v-col sm="12" cols="12">
                                        <v-row class="header">
                                            <v-col sm="2" cols="12" class="logo_company">
                                                <img src="@/assets/images/banhji_icon.png"/>
                                            </v-col>
                                            <v-col sm="10" cols="12" class="pb-0">
                                                <h2>Royal University of Phnom Penh</h2>
                                                <p class='address'>Address:
                                                    <span>No. 113, Mao Tse Toung Blvd(245),Parkway Square, 1st Floor, Phnom Penh.KH</span>
                                                </p>
                                                <p class="phone_email">Phone:
                                                    <span>0969868005</span>
                                                    |
                                                    <span>Email:</span>
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-row class="content">
                                            <v-col sm="12" cols="12">
                                                <h3 class="title mb-2">Journal Voucher</h3>

                                                <v-simple-table class='custom_table'>
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th style="width: 30%" class="text-bold">Type of
                                                                Transaction
                                                            </th>
                                                            <th class="text-left">Journal</th>
                                                            <th class="text-bold">Voucher No.</th>
                                                            <th class="text-left">JV2000026</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="item in table1" :key="item.type">
                                                            <td>{{ item.type }}</td>
                                                            <td>{{ item.journal }}</td>
                                                            <td class="text-bold">{{ item.number }}</td>
                                                            <td>{{ item.date }}</td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>

                                                <v-simple-table class='custom_table mt-3'>
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th colspan="4" class="text-bold">Description of the
                                                                transaction:
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td colspan="4">bdsjfhbadsn,f,m</td>
                                                        </tr>
                                                        <tr v-for="item in table2" :key="item.type">
                                                            <td style="width: 25%">{{ item.type }}</td>
                                                            <td style="width: 25%">{{ item.journal }}</td>
                                                            <td style="width: 25%">{{ item.number }}</td>
                                                            <td style="width: 25%">{{ item.date }}</td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>

                                            <v-col sm="12" cols="12">
                                                <v-simple-table class='custom_table1'>
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th class="text-bold">Account</th>
                                                            <th class="text-bold">Description</th>
                                                            <th class="text-bold">Debit</th>
                                                            <th class="text-bold">Credit</th>
                                                            <th class="text-bold">Segments</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="item in table3" :key="item.type">
                                                            <td style="width: 20%">{{ item.account }}</td>
                                                            <td style="width: 20%">{{ item.desc }}</td>
                                                            <td class="text-right" style="width: 15%">{{ item.debit }}
                                                            </td>
                                                            <td class="text-right" style="width: 15%">{{ item.credit
                                                                }}
                                                            </td>
                                                            <td style="width: 25%">
                                                                {{ item.segments }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                        <tfoot>
                                                        <tr>
                                                            <td class="text-right" colspan="2">TOTAL</td>
                                                            <td class="text-right">54.00</td>
                                                            <td class="text-right">54.00</td>
                                                            <td/>
                                                        </tr>
                                                        </tfoot>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>

                                            <v-col sm="12" cols="12" class="pt-0">
                                                <v-simple-table class='custom_table1'>
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th class="text-bold">Prepared By</th>
                                                            <th class="text-bold">Reviewed By</th>
                                                            <th class="text-bold">Vertified By</th>
                                                            <th class="text-bold">Approved By</th>
                                                            <th class="text-bold">Recored By</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td style="width: 20%; padding: 30px 10px;"/>
                                                            <td style="width: 20%; padding: 30px 10px;"/>
                                                            <td style="width: 20%; padding: 30px 10px;"/>
                                                            <td style="width: 20%; padding: 30px 10px;"/>
                                                            <td style="width: 20%; padding: 30px 10px;"/>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>

                                            <v-col sm="4" cols="12" class="">
                                                <p class="mb-0">Attached Documents:</p>
                                                <v-simple-table class='tableAttached mt-2'>
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th class="text-bold">Name</th>
                                                            <th class="text-bold">Description</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="item in tableAttached" :key="item.type">
                                                            <td style="width: 25%">{{ item.namr }}</td>
                                                            <td style="width: 25%">{{ item.desc }}</td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>

                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-btn class="btn_save_close float-right" @click="dialog = false">{{$t('save_close')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <p class="mb-3">{{$t('acc_form_prefix')}}</p>

            <template>
                <v-simple-table class="exchange-table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{$t('name')}}</th>
                            <th class="text-uppercase">{{$t('form_type')}}</th>
                            <th class="text-uppercase">{{$t('last_edited')}}</th>
                            <th class="text-uppercase">{{$t('action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td width="17.5%" class="text-uppercase text-bold">Cash Advance</td>
                            <td width="20%">
                                JOURNAL ENTRY
                            </td>
                            <td>
                                19 April 2020
                            </td>
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
</template>

<script>
    export default {
        data() {
            return {
                dialogm1: '',
                dialog: false,
                account_type: [
                    'test',
                    'test1'
                ],
                table1: [
                    {
                        type: 'Please Specify applicable',
                        journal: '',
                        number: 'Date',
                        date: '05/08/2020',
                    },
                ],
                table2: [
                    {
                        type: 'Journal Voucher No.',
                        journal: '',
                        number: 'Advance Voucher No.',
                        date: '',
                    },
                    {
                        type: 'Name',
                        journal: '',
                        number: 'Payment Voucher No.',
                        date: '',
                    },
                ],
                table3: [
                    {
                        account: '10120 - Current/Checking Account',
                        desc: 'current acount',
                        debit: '',
                        credit: '54.00',
                        segments: 'S1: Business Unit' + '\n' + 'S2: BanhJi Accounting' + '\n' + 'S3: BfdW',
                    },
                    {
                        account: '62856 - Meals and Entertainment',
                        desc: 'meals',
                        debit: '54.00',
                        credit: '',
                        segments: '',
                    },
                ],
                tableAttached: [
                    {
                        name: '',
                        desc: '',
                    },
                ]
            }
        },
        props: {},
        methods: {
            clickMe(data) {
                // alert(data.link)
                this.$router.push(`${data.link}`);
                //this.$event.target.classList.toggle(active)
                //eslint-disable-next-line no-console
                console.log(data.link)
                //eslint-disable-next-line no-console
                //console.log(data)
            }
        },
        components: {},
    };
</script>
<style scoped>
    .btn_edit {
        background-color: #4e6470 !important;
        color: #fff !important;
        height: 35px;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    .bg_white {
        background-color: #fff;
        padding-left: 0;
        padding-top: 0;
    }

    .wrapper_form {
        width: 99%;
        margin: 0 auto;
    }

    .wrapper_form .header .logo_company {
        text-align: center;
        padding-top: 0;
    }

    .wrapper_form .header .logo_company img {
        width: 100px;
        height: auto;
    }

    .wrapper_form .header h2 {
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 8px;
        font-size: 25px;
    }

    .wrapper_form .header p {
        text-align: center;
        margin-bottom: 8px;
        width: 93%;
        margin: 0 auto;
    }

    .wrapper_form .header p.phone_email {
        text-align: center;
    }

    .wrapper_form .content h3.title {
        text-transform: uppercase;
        text-align: center;
        font-size: 25px !important;
        font-weight: 700 !important;
    }

    .new_line {
        clear: both
    }


    table.tbl_form {
        border-top: 1px solid #ccc;
        width: 95%;
        padding: 0 10px;
        border-collapse: collapse;
        margin-top: 10px;
        color: #000;
        margin-left: 10px;
    }

    table.tbl_form tr th {
        text-transform: uppercase;
        padding: 10px;
        border-top: 1px solid #ccc;
        border-bottom: 3px solid #ccc;
        vertical-align: middle;
    }

    table.tbl_form tr td {
        border: 1px solid #ccc;
        padding: 8px;
        vertical-align: middle;
    }

    table.tbl_form tr td:first-child {
        border-left: none;
        text-align: center;
    }

    table.tbl_form tr td:last-child {
        border-right: none;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-family: 'Niradei-Bold', serif;
        color: #000 !important;
        border-top: 1px solid #000 !important;
        border-bottom: 0 !important;
        font-size: 15px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
        color: #000 !important;
        padding: 5px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row) {
        border-top: 1px solid #000 !important;
        border-bottom: 0;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
        border-bottom: 1px solid #000 !important;
    }

    @media (max-width: 576px) {

    }
</style>