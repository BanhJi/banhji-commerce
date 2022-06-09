<template>
    <v-row>
        <v-col cols="12" sm="12">
            <!-- loading -->
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true"/>
            <!-- <v-row>
                      <v-col class="py-0" cols="">
                          <v-card outlined dense color="secondary" class="pa-3 white--text mb-3 no_border d-flex justify-space-between align-center" height="70">
                              <h3 class="text-left text-uppercase font_13 flex-1">
                                  {{$t('incoming_transfer')}}</h3>
                              <h3 class="text-right font_20 mb-0 flex-1">100</h3>
                          </v-card>
                      </v-col>
                      <v-col class="py-0" cols="">
                          <v-card outlined dense color="third" class="pa-3 white--text mb-3 no_border d-flex justify-space-between align-center" height="70">
                              <h3 class="text-left text-uppercase font_13 flex-1">
                                  {{$t('incoming_receipt')}}</h3>
                              <h3 class="text-right font_20 mb-0 flex-1">100</h3>
                          </v-card>
                      </v-col>
                      <v-col class="py-0" cols="">
                          <v-card outlined dense color="grayBg" class="pa-3 black--text mb-3 no_border d-flex justify-space-between align-center" height="70">
                              <h3 class="text-left text-uppercase font_13 flex-1">
                                  {{$t('incoming_delivery')}}</h3>
                              <h3 class="text-right font_20 mb-0  flex-1">100</h3>
                          </v-card>
                      </v-col>
                  </v-row> -->

            <v-row class="">
                <v-col sm="3" cols="12" class="py-0">
                    <!--                    <v-select class="mt-1"-->
                    <!--                              :items="dateSorters"-->
                    <!--                              @change="onSorterChanges"-->
                    <!--                              clearable-->
                    <!--                              outlined-->
                    <!--                              placeholder="ALL"-->
                    <!--                    />-->
                </v-col>

                <v-col sm="3" cols="12" class="py-0">
                    <!--                    <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>-->
                </v-col>

                <v-col sm="3" cols="12" class="py-0">
                    <!--                    <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>-->
                </v-col>

                <v-col sm="1" cols="1" class="pt-1">
                </v-col>
                <v-col sm="2" cols="1" class="pt-1">
                    <v-dialog v-model="dialogm2" max-width="400px">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="primary"
                                @click="getWht"
                                v-if="plan > 1"
                                class="white--text text-capitalize  float-right"
                                v-on="on"
                            >
                                {{ $t("create_new") }}
                            </v-btn>
                        </template>
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{ $t("warehouse_location") }}</v-card-title>
                                <v-icon @click="onClose">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content">
                                <v-row>
                                    <v-col sm="6" cols="6" class="pb-0">
                                        <label class="label">{{ $t("name") }}</label>
                                        <v-text-field
                                            class=" mt-1"
                                            v-model="wh.name"
                                            outlined
                                            placeholder=""
                                        />
                                    </v-col>
                                    <v-col sm="6" cols="6" class="pb-0">
                                        <label class="label">{{ $t("code") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            v-model="wh.code"
                                            outlined
                                            placeholder=""
                                        />
                                    </v-col>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label class="label">{{ $t("warehouse_type") }}</label>
                                        <v-select
                                            class="mt-1"
                                            id="acc_type_selector"
                                            :items="whTypes"
                                            v-model="wh.type"
                                            tage="Warehouse Type"
                                            item-text="name"
                                            item-value="id"
                                            outlined
                                            return-object
                                        />

                                        <label class="label">{{ $t("address") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            v-model="wh.address"
                                            outlined
                                            placeholder=""
                                        />
                                        <label class="label">{{ $t("location") }}</label>
                                        <v-select
                                            class=" mt-1"
                                            id="acc_type_selector"
                                            :items="locations"
                                            v-model="location"
                                            tage="location"
                                            item-text="name"
                                            item-value="id"
                                            outlined
                                            return-object
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="modal_footer">
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0 text-left">
                                        <v-btn
                                            color="black"
                                            outlined
                                            class=" text-capitalize  black--text float-left"
                                            @click="dialogm2 = false"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0 text-right">
                                        <v-btn
                                            @click="addWhSetting"
                                            color="primary"
                                            class="px-3  white--text text-capitalize"
                                        >{{ $t("save_close") }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>

            <div class="reports_table">
                <template>
                    <v-simple-table class="attachment_table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th>{{ $t("no") }}</th>
                                <th>{{ $t("code") }}</th>
                                <th>{{ $t("name") }}</th>
                                <th>{{ $t("type") }}</th>
                                <th>{{ $t("address") }}</th>
                                <th>{{ $t("location") }}</th>
                                <th>{{ $t("action") }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(w, index) in warehouses" v-bind:key="w.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ w.code }}</td>
                                <td class="text-bold">{{ w.name }}</td>
                                <td>{{ w.type ? wh.type.name : "" }}</td>
                                <td>{{ w.address }}</td>
                                <td>{{ w.location ? w.location.name : "" }}</td>
                                <td>
                                    <v-btn @click="onEdit(w)" color="primary" class="rounded-4">
                                        {{ $t('edit') }}
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import {i18n} from "@/i18n";
import LoadingMe from "@/components/Loading";

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

// const $ = require("jquery")
// const accountTypeHandler = require("@/scripts/handler/accounting/accountType.js")
// const accountHandler = require("@/scripts/handler/accounting/account.js")

const warehouseHandler = require("@/scripts/warehouseHandler");
const locationHandler = require("@/scripts/locationHandler");
export default {
    name: "Cash",
    components: {
        LoadingMe,
    },
    data: () => ({
        warehouses: [],
        showLoading: false,
        wh: {},
        whTypes: [],
        dialogm2: false,
        locations: [],
        location: {},
    }),
    methods: {
        onClose() {
            this.dialogm2 = false
            this.onClear()
        },
        onEdit(item) {
            item.location.id = item.location.pk
            this.location = item.location
            this.wh = item
            this.dialogm2 = true
        },
        async loadLocation() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.locations = [];
                    locationHandler
                        .list()
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.locations = res.data.data;
                                if (this.locations.length > 0) {
                                    this.location = this.locations[0];
                                }
                                // this.segmentList = res.data.data
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
        onClear() {
            this.wh = {};
            this.location = {};
        },
        async addWhSetting() {
            window.console.log(this.wh, " hhh");
            let data = {
                name: this.wh.name,
                code: this.wh.code,
                address: this.wh.address,
                type: this.wh.type,
                location: this.location,
            };
            warehouseHandler
                .saveWarehouseSetting(data)
                .then((response) => {
                    this.warehouses.push(response.data.data);
                    this.dialogm2 = false;
                    this.onClear();
                    window.console.log(response, "wh");
                })
                .catch((error) => {
                    self.alertError(error);
                });
        },
        async getWht() {
            this.onClear();
            warehouseHandler.getWhtAll().then((res) => {
                if (res.data) {
                    this.whTypes = res.data;
                    window.console.log("dsa", this.whTypes);
                }
            });
        },
        async loadWarehouses() {
            await warehouseHandler.getWarehouseSettingAll().then((res) => {
                this.warehouses = res;
            });
            window.console.log(this.warehouses);
        },
    },
    async mounted() {
        await this.loadWarehouses();
        await this.loadLocation();
        // Call Account Type List
    },
    computed: {
        plan() {
            return cookie.plan;
        },
        headers() {
            return [
                {text: i18n.t("date"), value: "journal_date"},
                {text: i18n.t("type"), value: "journal_type"},
                {text: i18n.t("number"), value: "journal_number"},
                {text: i18n.t("description"), value: "description"},
                {text: i18n.t("debit"), value: "dr"},
                {text: i18n.t("credit"), value: "cr"},
            ];
        },
    },
};
</script>
<style scoped>
.purchases {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20px 20px 5px;
}

.report_filter {
    background-color: #edf1f5;
    padding: 0 20px 0px 20px;
}

.report_block .v-card.third {
    background-color: #00b050;
    border: none;
    box-shadow: none;
    color: #ffffff;
    float: left;
    width: 100%;
}

.report_block .v-card.third p.text {
    text-align: left;
    font-size: 17px;
}

.report_block .v-card.third p.number {
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0;
}

.dv_mt {
    margin-top: 20px;
}

.report_block .left_card p:nth-child(2) {
    width: 100%;
    font-size: 19px;
    font-family: "Niradei-Bold", serif;
    padding: 7px 0 0 0;
    text-align: right;
}

.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {
    .dv_mt,
    .dv_mt8 {
        margin-top: 0;
    }

    .purchases {
        margin-top: 0;
    }
}
</style>
