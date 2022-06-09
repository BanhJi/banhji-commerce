<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("warranty_conditions") }}</h2>
            <v-dialog v-model="dialog" scrollable max-width="420px">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        class=" text-capitalize white--text float-right"
                        v-on="on"
                    >
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("warranty_conditions") }}</v-card-title>
                        <v-icon class="" @click="dialog = false">close</v-icon>
                   </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t("name") }}</label>
                                    <v-text-field
                                        v-model="warrantyCondition.name"
                                        class="mt-1"
                                        outlined
                                        :rules="[
                                                (v) => !!v || $t('name_is_required'),
                                                (v) => (v && v.length > 2) || $t('character_3'),
                                            ]"
                                        required
                                        placeholder=""
                                    />
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t("description") }}</label>
                                    <v-text-field
                                        v-model="warrantyCondition.description"
                                        class="mt-1"
                                        outlined
                                        tage="Abbreviation"
                                        placeholder=""
                                        :rules="[(v) => !!v || $t('code_is_required')]"
                                        required
                                    />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn
                                    color="black"
                                    outlined
                                    class=" text-capitalize  black--text float-left"
                                    @click="dialog = false"
                                >{{ $t("cancel") }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn
                                    @click="onCreateWarrantyCondition()"
                                    color="primary"
                                    class="px-3  white--text text-capitalize"
                                >
                                    {{ $t("save_close") }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <p class="mb-3">{{ $t("conditions_user_for_warrant") }}</p>
            <template>
                <v-simple-table class="exchange-table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t("name") }}</th>
                            <th class="text-uppercase">{{ $t("description") }}</th>
                            <th class="text-uppercase">{{ $t("action") }}</th>
                        </tr>
                        </thead>
                        <tbody v-for="wtc in warrantyConditions" v-bind:key="wtc.id">
                        <tr>
                            <td>{{ wtc.name }}</td>
                            <td>{{ wtc.description }}</td>
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
const WarrantyConditionHandler = require('@/scripts/warrantyConditionHandler')
export default {
    data() {
        return {
            dialogm1: "",
            dialog: false,
            valid: true,
            account_type: ["test", "test1"],
            table1: [
                {
                    type: "Please Specify applicable",
                    journal: "",
                    number: "Date",
                    date: "05/08/2020",
                },
            ],
            table2: [
                {
                    type: "Journal Voucher No.",
                    journal: "",
                    number: "Advance Voucher No.",
                    date: "",
                },
                {
                    type: "Name",
                    journal: "",
                    number: "Payment Voucher No.",
                    date: "",
                },
            ],
            table3: [
                {
                    account: "10120 - Current/Checking Account",
                    desc: "current acount",
                    debit: "",
                    credit: "54.00",
                    segments:
                        "S1: Business Unit" +
                        "\n" +
                        "S2: BanhJi Accounting" +
                        "\n" +
                        "S3: BfdW",
                },
                {
                    account: "62856 - Meals and Entertainment",
                    desc: "meals",
                    debit: "54.00",
                    credit: "",
                    segments: "",
                },
            ],
            tableAttached: [
                {
                    name: "",
                    desc: "",
                },
            ],
            warrantyCondition: {
                name: '',
                description: ''
            },
            warrantyConditions: []
        };

    },
    props: {},
    mounted() {
        this.onLoadWarrantyCondition()
    },
    methods: {
        onCreateWarrantyCondition() {
            WarrantyConditionHandler.save(this.warrantyCondition).then(res => {
                if (res.data.statusCode === 201) {
                    this.onLoadWarrantyCondition()
                    this.dialog = false
                }
            })
        },
        onLoadWarrantyCondition() {
            WarrantyConditionHandler.getAll().then(res => {
                this.warrantyConditions = res.data.data
            })
        },
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link);
            //eslint-disable-next-line no-console
            //console.log(data)
        },
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
    clear: both;
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

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> th {
    font-family: "Niradei-Bold", serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 0 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr
> td:not(.v-data-table__mobile-row) {
    border-top: 1px solid #000 !important;
    border-bottom: 0;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:last-child
td {
    border-bottom: 1px solid #000 !important;
}

@media (max-width: 576px) {
}
</style>
