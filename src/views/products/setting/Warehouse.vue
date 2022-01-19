<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("warehouse") }}</h2>
            <v-dialog v-model="dialog" scrollable max-width="420px">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        class=" text-capitalize white--text float-right"
                        v-on="on" @click="onNewClick"
                    >
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("warehouse") }}</v-card-title>
                        <v-icon  @click="dialog = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t("name") }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="wh.name"
                                        outlined
                                        tage="Name"
                                        :rules="[
                      (v) => !!v || $t('name_is_required'),
                      (v) => (v && v.length > 2) || $t('character_3'),
                    ]"
                                        required
                                        placeholder=""
                                    />
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t("code") }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        outlined
                                        v-model="wh.code"
                                        tage="Code"
                                        placeholder=""
                                        :rules="[(v) => !!v || $t('code_is_required')]"
                                        required
                                    />
                                </v-col>
                                <v-col sm="12" cols="8" class="py-0">
                                    <label class="label">{{ $t("warehouse_type") }}</label>
                                    <v-select
                                        class="mt-1"
                                        v-model="mWhType"
                                        :items="whTypes"
                                        item-value="id"
                                        item-text="name"
                                        :rules="[(v) => !!v || $t('type_is_required')]"
                                        required
                                        return-object
                                        outlined
                                    />
                                </v-col>
                                <v-col sm="12" cols="8" class="py-0">
                                    <label class="label">{{ $t("address") }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        outlined
                                        v-model="wh.address"
                                        tage="Address"
                                        placeholder=""
                                        :rules="[(v) => !!v || $t('code_is_required')]"
                                        required
                                    />
                                </v-col>
                                <v-col sm="12" cols="12" class="my_checkbox py-0">
                                    <input type="checkbox" id="3" v-model="wh.isSale"/>
                                    <label for="3">{{ $t("saleable_from_this_location") }}</label>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn
                                    color="primary"
                                    outlined
                                    class=" text-capitalize  black--text float-left"
                                    @click="dialog = false"
                                >{{ $t("cancel") }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn
                                    color="primary"
                                    class="px-3  white--text text-capitalize" @click="onSaveClose"
                                >
                                    {{ $t("save_close") }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <p class="mb-3">{{ $t("location_product_keep") }}</p>
            <template>
                <v-simple-table class="exchange-table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t("type") }}</th>
                            <th class="text-uppercase">{{ $t("code") }}</th>
                            <th class="text-uppercase">{{ $t("name") }}</th>
                            <th class="text-uppercase">{{ $t("address") }}</th>
                            <th class="text-uppercase">{{ $t("salable") }}</th>
                            <th class="text-uppercase">{{ $t("action") }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="wh in whs" v-bind:key="wh.id">
                            <td width="17.5%" class="text-uppercase text-bold">
                                {{ wh.type.name }}
                            </td>
                            <td width="20%">
                                {{ wh.code }}
                            </td>
                            <td> {{ wh.name }}</td>
                            <td>{{ wh.address }}</td>

                            <td>
                                <v-checkbox class="ma-0 " readonly
                                            v-model="wh.isSale"/>
                            </td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(wh)">
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
const warehouseHandler = require("@/scripts/warehouseHandler")
export default {
    data() {
        return {
            dialog: false,
            valid: true,
            whTypes: [],
            mWhType: {},
            wh: {
                id: '',
                name: '',
                code: '',
                address: '',
                type: {},
                isSale: false
            },
            whs: [],
        };
    },
    props: {},
    methods: {
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.wh = value
                    this.mWhType = value.type
                    this.dialog = true
                }, 300);
            })
        },
        onNewClick() {
            this.wh.id = ''
            this.mWhType = {}
            this.clear()
        },
        close() {
            this.dialog = false
        },
        clear() {
            this.wh = {}
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.wh.id === '' || this.wh.id === undefined) {
                        let data = {
                            "code": this.wh.code,
                            "name": this.wh.name,
                            "address": this.wh.address,
                            "isSale": this.wh.isSale,
                            "type": this.mWhType
                        }
                        warehouseHandler.saveWarehouseSetting(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.loadWarehouses()
                                this.clear()
                                this.close()
                                this.$refs.form.reset()
                            }
                        }).catch(e => {
                            this.errors.push(e)
                        })
                    } else {
                        let isTypeChanged = 1;
                        if (this.mWhType.id === this.wh.type.id) {
                            isTypeChanged = 0
                        }
                        let data = {
                            "code": this.wh.code,
                            "name": this.wh.name,
                            "address": this.wh.address,
                            "isSale": this.wh.isSale,
                            "type": this.mWhType,
                            "isTypeChanged": isTypeChanged,
                            "delTypeId": this.wh.type.id
                        }
                        warehouseHandler.updateWarehouse(this.wh.id, data).then(response => {
                            if (response.data.statusCode === 201) {

                                this.loadWarehouses()
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
        async loadWarehouseType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    warehouseHandler.getWhtAll().then(res => {
                        this.compeletLoading = false
                        this.whTypes = res
                    })
                }, 300);
            })
        },
        async loadWarehouses() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    warehouseHandler.getWarehouseSettingAll().then(res => {
                        this.compeletLoading = false
                        this.whs = res
                    })
                }, 300);
            })
        },
    },
    components: {},
    mounted: async function () {
        await this.loadWarehouseType()
        await this.loadWarehouses()
    }
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

.my_checkbox input[type=checkbox] + label {
    display: grid;
    grid-template-columns: 13% 80%;
    /* margin: 0.2em; */
    margin: 0.2em 0px;
    cursor: pointer;
    line-height: 16px;
    padding: 0.2em;
}

@media (max-width: 576px) {
}
</style>
