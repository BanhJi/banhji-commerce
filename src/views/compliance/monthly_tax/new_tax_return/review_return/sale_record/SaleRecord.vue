<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <div style="background-color: #fff; padding: 20px 20px 5px">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <h2 class="text-capitalize mb-0">{{ $t("sale_record") }}</h2>
                                <v-icon
                                    @click="onClose()"
                                    style="cursor: pointer; color: #333; font-size: 25px"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12" cols="12" class="mb-1">
                                <v-card outlined color="grayBg" class="block-gray rounded-0">
                                    <v-row>
                                        <v-col sm="3" cols="12" class="pb-0">
                                            <label class="label">{{ $t('month_of') }}</label>
                                            <v-menu
                                                v-model="menu"
                                                disabled
                                                class="mt-1"
                                                :close-on-content-click="false"
                                                max-width="290">
                                                <template v-slot:activator="{ on,attrs }">
                                                    <v-text-field class="disable_alert my-0 mt-1"
                                                                  v-model="monthlyReturn.monthOf"
                                                                  readonly
                                                                  outlined
                                                                  disabled
                                                                  append-icon="event"
                                                                  v-on="on"
                                                                  v-bind="attrs"
                                                                  @click:clear="monthlyReturn.monthOf"
                                                                  @click:append="menu = true"
                                                                  required/>
                                                </template>
                                                <v-date-picker
                                                    :type="'month'"
                                                    v-model="monthlyReturn.monthOf"
                                                    no-title
                                                />
                                            </v-menu>
                                        </v-col>
                                        <v-col sm="3" cols="12" class="pb-0">
                                            <label class="label mb-0">{{ $t('number') }}</label>
                                            <v-row class="mt-1 mr-0">
                                                <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                    <div class="code_text text-bold">{{ monthlyReturn.abbr }}</div>
                                                </v-col>
                                                <v-col sm="9" cols="9" class="pt-0 pl-0 pr-1">
                                                    <v-text-field class=" custom-border "
                                                                  v-model="monthlyReturn.number"
                                                                  outlined
                                                                  disabled
                                                                  required/>
                                                </v-col>
                                            </v-row>
                                        </v-col>

                                        <v-col class="py-0" sm="3" cols="12">
                                            {{ $t("approved_exchange_rate_for_the_selected_month") }}
                                        </v-col>
                                        <v-col class="py-0" sm="1" cols="12">
                                            <p class="mb-0 primary--text font_18 text-bold">4200</p>
                                        </v-col>
                                        <v-col>
                                            <v-btn
                                                :disabled="isDisable"
                                                @click="onCreateSale()"
                                                class="my-n4 rounded-0"
                                                tile
                                                color="success"
                                                dark
                                            >
                                                {{ $t("add_new") }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12" cols="12">
                                <template>
                                    <v-data-table
                                        :items="sales"
                                        :headers="headersSale"
                                        hide-default-header
                                        :loading="sales.length <= 0"
                                        loading-text="Loading... Please wait"
                                        no-data-text="No Data Here!"
                                        :items-per-page="5"
                                        responsive
                                        class=""
                                    >
                                        <template v-if="sales.length <= 0" v-slot:progress>
                                            <v-progress-linear
                                                color="blue"
                                                rounded
                                                :active="progress_load"
                                                :indeterminate="progress_load"
                                            ></v-progress-linear>
                                            <v-card-text class="text-center">{{
                                                    text_load
                                                }}
                                            </v-card-text>
                                        </template>
                                        <template v-slot:header="{ props: { headers } }">
                                            <thead>
                                            <tr>
                                                <th rowspan="2" class="text-center">No.</th>
                                                <th rowspan="2" class="text-center">Date</th>
                                                <th rowspan="2" class="text-center">Reference</th>
                                                <th colspan="4" class="text-center">Customer</th>
                                                <th rowspan="2" class="text-center">Type of product/service</th>
                                                <th rowspan="2" class="text-center">Amount(VAT inclusive)</th>
                                                <th rowspan="2" class="text-center">Amount(net of VAT)</th>
                                                <th rowspan="2" class="text-center">Specific Tax</th>
                                                <th rowspan="2" class="text-center">Public Lighting Tax</th>
                                                <th rowspan="2" class="text-center">Accom. Tax</th>
                                                <th rowspan="2" class="text-center">Amount VAT</th>
<!--                                                <th rowspan="2" class="text-center">Data Source</th>-->
                                                <th rowspan="2" class="text-center">Status</th>
                                                <th rowspan="2" class="text-center">Action</th>
                                            </tr>
                                            <tr>
                                                <th class="text-center">Type</th>
<!--                                                <th class="text-center">Type Taxpayer</th>-->
                                                <th class="text-center">TID</th>
                                                <th class="text-center">Name in Khmer</th>
                                                <th class="text-center">Name in English</th>
                                            </tr>
                                            </thead>
                                        </template>
                                        <template v-slot:body="{ items }">
                                            <tbody style="white-space: nowrap">
                                            <tr v-for="(item, index) in items" :key="item.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.date }}</td>
                                                <td>{{ item.reference }}</td>
                                                <td>{{ item.customer.type }}</td>
<!--                                                <td>{{ item.customer.taxPayerType.name }}</td>-->
                                                <td>{{ item.customer.consumerId }}</td>
                                                <td>{{ item.customer.name }}</td>
                                                <td>{{ item.customer.name }}</td>
                                                <td>{{ item.typeProduct.defaultTax }}</td>
                                                <td class="text-right">
                                                    {{ item.totalAmountInclusive.toLocaleString() }}
                                                </td>
                                                <td class="text-right">
                                                    {{ item.totalAmountNetVat.toLocaleString() }}
                                                </td>
                                                <td class="text-right">
                                                    {{ item.totalSpecificTax.toLocaleString() }}
                                                </td>
                                                <td class="text-right">
                                                    {{ item.totalPubTax.toLocaleString() }}
                                                </td>
                                                <td class="text-right">
                                                    {{ item.totalAccomTax.toLocaleString() }}
                                                </td>
                                                <td class="text-right">
                                                    {{ item.totalVAT.toLocaleString() }}
                                                </td>
<!--                                                <td>{{ item.dataForm.name }}</td>-->
                                                <td>{{ item.status.name }}</td>
                                                <td>
                                                    <v-btn
                                                        :disabled="isDisable"
                                                        @click="editItemSale(item)"
                                                        small
                                                        outlined
                                                        fab
                                                        class="text-center no_border"
                                                        color="primary"
                                                    >
                                                        <v-icon class="primary--text" size="17">fas fa-edit</v-icon>
                                                    </v-btn>
                                                    <v-btn
                                                        :disabled="isDisable"
                                                        @click="deleteItemSales(item)"
                                                        small
                                                        outlined
                                                        fab
                                                        class="text-center no_border"
                                                        color="red"
                                                    >
                                                        <v-icon small size="17">fas fa-trash-alt</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-data-table>
                                </template>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script src="./_sale_record.js" lang="js"></script>
<style lang="css" scoped></style>
