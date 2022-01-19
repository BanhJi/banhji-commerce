<template>
    <v-row class="">
        <v-col sm="3" cols="12">
            <v-card outlined dense class="pa-3 no_border mb-3" color="grayBg" height="123px">
                <v-text-field class=""
                              v-model="search"
                              @change="onSupplierTypeChanged"
                              outlined
                              :placeholder="$t('search')"
                              append-icon="search"
                              clearable/>
                <v-select class=""
                          :items="supplierTypes"
                          @change="onSupplierTypeChanged"
                          item-value="id"
                          item-text="name"
                          v-model="mSupplierType"
                          :placeholder="$t('customer_type')"
                          clearable
                          outlined/>
            </v-card>
            <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"/>
                <kendo-datasource ref="supplierDS"
                                  :data="suppliers"
                                  :schema="schemaDefinition"
                />

                <kendo-grid id="gridSupplier" class="grid-center"
                            :change="onChanged"
                            :data-source-ref="'supplierDS'"
                            :selectable="true"
                            :persistSelection="true"
                            :noRecords="true"
                            :scrollable="true"
                            :height="535"
                            :pageable-numeric="false"
                            :pageable-previous-next="false"
                            :pageable-messages-display="'Showing {2} data items'">
                    <kendo-grid-column
                        :field="'name'"
                        :attributes="{class:'tb_name_td'}"
                        :title="'name'"
                        :hidden="true"
                        :group-header-template="'#=value#'"
                    />
                    <kendo-grid-column
                        :field="'name'"
                        :title="'&nbsp;'"
                        :template="'<span>#=number# - #=name#</span>'"
                    />
                </kendo-grid>
            </v-card>
        </v-col>
        <v-col sm="9" cols="12">
            <v-row>
                <v-col sm="6" cols="12" class="pt-0">
                    <v-card outlined dense class="pa-3 no_border" style="height: 88px; background-color: #92d050;">
                        <router-link
                            :to="{path: routerTo, query: { type: 'edit'} }">
                            <v-btn class="btn_edit float-right" @click="goEdit" :disabled="btnEnabled">
                                {{ $t('edit') }}
                            </v-btn>
                        </router-link>
                        <span>{{ supplier.name }}</span><br/>
                        <span>{{ supplier.number }}</span><br/>
                        <span>{{ supplier.supplierType.name }}</span>
                        <!--                        <v-tooltip top>-->
                        <!--                            <template v-slot:activator="{ on, attrs }">-->
                        <!--                                <p class="title" color="whiteR"-->
                        <!--                                   dark-->
                        <!--                                   v-bind="attrs"-->
                        <!--                                   v-on="on">-->
                        <!--                                    <span>ABC</span>-->
                        <!--                                </p>-->
                        <!--                            </template>-->
                        <!--                            <span>ABC</span>-->
                        <!--                        </v-tooltip>-->

                    </v-card>

                </v-col>
                <v-col sm="6" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0 pl-0">
                            <v-card outlined dense class="pa-2 no_border mb-2 text-white"
                                    style="height: 40px; background-color: #00b050;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('balance') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                            <v-card outlined dense class="pa-2 no_border text-white"
                                    style="height: 40px; background-color: #00b050;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('deposit') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                        </v-col>
                        <v-col sm="6" cols="12" class="py-0 pl-0">
                            <v-card outlined dense class="pa-2 no_border mb-2 text-white"
                                    style="height: 40px; background-color: #000;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('open') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                            <v-card outlined dense class="pa-2 no_border text-white"
                                    style="height: 40px; background-color: #000;">
                                <p class="mb-0">
                                    <span class="float-left text-uppercase">{{ $t('over_due') }}</span>
                                    <span class="float-right" v-text="forwarded"/>
                                </p>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row>
                <v-col sm="12" cols="12" class="pt-0">
                    <v-tabs>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down  text-upercase">
								{{ $t('transactions') }}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down text-upercase">
								{{ $t('communications') }}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down text-upercase">
								{{ $t('attachments') }}
							</span>
                        </v-tab>

                        <!-- Transactions -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 pl-6">
                                    <v-row class="grayBg">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="4" cols="12" class="pt-1 pb-0">
                                                        <v-select class=""
                                                                  :items="dateSorters"
                                                                  @change="onSorterChanges"
                                                                  clearable
                                                                  outlined
                                                                  placeholder="ALL"
                                                        />
                                                    </v-col>

                                                    <v-col sm="3" cols="12" class="py-0">
                                                        <app-datepicker :initialDate="start_date"
                                                                        @emitDate="start_date = $event"/>
                                                    </v-col>

                                                    <v-col sm="3" cols="12" class="py-0">
                                                        <app-datepicker :initialDate="end_date"
                                                                        @emitDate="end_date = $event"/>
                                                    </v-col>

                                                    <v-col sm="1" cols="1" class="py-0 mt-1">
                                                        <v-btn color="primary white--text"
                                                               @click="searchTransaction">
                                                            <i class="b-search" style="font-size: 18px; color:#fff"/>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-simple-table class="attachment_table" fixed-header
                                                                        height="300px">
                                                            <v-data-table
                                                                :headers="headers"
                                                                :items="journal_entries"
                                                                class="elevation-1"
                                                            >
                                                                <!-- Journal Date -->
                                                                <template v-slot:item.journal_date="{ item }">
                                                                    <span>{{ dateFormat(item.journal_date) }}</span>
                                                                </template>

                                                                <!-- Journal Number as Link -->
                                                                <template v-slot:item.journal_number="{ item }">
                                                                    <router-link :to="'journal/view/' + item.id">{{
                                                                            item.journal_number
                                                                        }}
                                                                    </router-link>
                                                                </template>
                                                            </v-data-table>
                                                        </v-simple-table>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!-- Communication -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 pl-6">
                                    <v-row class="grayBg">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-btn class="white--text text-capitalize float-right"
                                                               color="primary" to="cash_reconciliation">
                                                            {{ $t('new_note') }}
                                                        </v-btn>
                                                    </v-col>

                                                    <v-col sm="12" cols="12" class="">
                                                        <template>
                                                            <v-simple-table class="attachment_table">
                                                                <template v-slot:default>
                                                                    <thead>
                                                                    <tr>
                                                                        <th>{{ $t('date') }}</th>
                                                                        <th>{{ $t('note') }}</th>
                                                                        <th>{{ $t('topic') }}</th>
                                                                        <th>{{ $t('who') }}</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>01</td>
                                                                        <td>JB00009</td>
                                                                        <td>15/July/2020</td>
                                                                        <td>VARIANCE</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!-- Attachment -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 pl-6">
                                    <v-row class="grayBg">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="mb-2">{{ $t('file_type') }} [PDF, JPG, JPEG, TIFF,
                                                            PNG, GIF]</p>
                                                        <template>
                                                            <v-file-input
                                                                v-model="files"
                                                                :placeholder="$t('attachments')"
                                                                multiple
                                                                prepend-icon="mdi-paperclip">
                                                                <template v-slot:selection="{ text }">
                                                                    <v-chip
                                                                        small
                                                                        label
                                                                        color="primary"
                                                                    >
                                                                        {{ text }}
                                                                    </v-chip>
                                                                </template>
                                                            </v-file-input>
                                                        </template>

                                                        <v-simple-table class="attachment_table mb-3">
                                                            <template v-slot:default>
                                                                <thead>
                                                                <tr>
                                                                    <th>{{ $t('file_name') }}</th>
                                                                    <th>{{ $t('description') }}</th>
                                                                    <th>{{ $t('date') }}</th>
                                                                    <th class="text-center"/>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr v-for="item in attachments" :key="item.file">
                                                                    <td>{{ item.file }}</td>
                                                                    <td>{{ item.desc }}</td>
                                                                    <td>{{ item.date }}</td>
                                                                    <td class="text-center">
                                                                        <v-btn color="primary" class="mr-2 pa-0">
                                                                            <v-icon size="" class="ma-1">edit</v-icon>
                                                                        </v-btn>
                                                                        <v-btn color="primary" class="mr-2 pa-0">
                                                                            <v-icon size="" class="ma-1">delete</v-icon>
                                                                        </v-btn>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </template>
                                                        </v-simple-table>

                                                        <v-btn color="primary" class="text-capitalize white--text">
                                                            <v-icon size="15" class="mr-2">fa-check</v-icon>
                                                            {{ $t('save') }}
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>

                    </v-tabs>
                </v-col>
            </v-row>
        </v-col>

    </v-row>

</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import SupplierModel from "@/scripts/model/Supplier";
import kendo from "@progress/kendo-ui";

const supplierModel = new SupplierModel({})
// const $ = require("jquery")
const supplierTypeHandler = require("@/scripts/supplierTypeHandler")
const supplierHandler = require("@/scripts/supplierHandler")

export default {
    name: "SupplierCenter",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        showLoading: true,
        info: {},
        suppliers: [],
        start_date: '',
        end_date: '',
        supplierTypes: [],
        mSupplierType: {},
        supplier: supplierModel,
        headers: [],
        customerGroups: [],
        mCustomerGroup: {},
        files: '',
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        journal_entries: [],
        search: '',
        accounts: [],
        accounts_bk: [],
        account_types: [],
        account: [],
        attachments: [],
        balance: 0,
        backdated: 0,
        forwarded: 0,
        isLoaded: false,
        schemaDefinition: {
            model: {id: "id"}
        },
        groupDefinition: {
            field: "account_type.name",
            compare: function (a, b) {
                if (a.items[0].number === b.items[0].number) {
                    return 0;
                } else if (a.items[0].number > b.items[0].number) {
                    return 1;
                } else {
                    return -1;
                }
            }
        },
    }),
    methods: {
        onSorterChanges() {

        },
        searchTransaction() {

        },
        goEdit() {
        },
        onSupplierTypeChanged() {
            this.showLoading = true
            this.loadSupplierCenter()
        },
        async customerInfo() {
            this.$emit('onUpdate', this.supplier)
        },
        async onChanged() {
            let grid = kendo.jQuery("#gridSupplier").data("kendoGrid")
            let selectedItem = grid.dataItem(grid.select())
            this.supplier = selectedItem
            this.$emit('onUpdate', selectedItem)
            // window.console.log(this.customer.name, 'selected')
        },
        async loadSupplierType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    supplierTypeHandler.get().then(res => {
                        this.supplierTypes = res
                        if (this.supplierTypes.length > 0) {
                            this.mSupplierType = this.supplierTypes[0]
                            this.loadSupplierCenter()
                        }
                    })
                }, 300)
            })
        },
        async loadSupplierCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.suppliers = []
                    let supplierTypeId = undefined
                    if (this.mSupplierType) {
                        supplierTypeId = this.mSupplierType.hasOwnProperty('id') ? this.mSupplierType.id : this.mSupplierType
                    }
                    supplierHandler.center(supplierTypeId, this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.suppliers = res.data.data
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        callback() {
            if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                const supplier = this.$route.params.data
                const index = this.suppliers.findIndex(item => {
                    return (supplier.id === item.id)
                })
                if (index < 0) {
                    this.suppliers.push(supplier)
                } else {
                    this.suppliers.splice(index, 1, supplier)
                }
            }
            window.console.log('im changed', this.$route.params)
        }
    },
    mounted() {
        this.loadSupplierType()
    },
    computed: {
        btnEnabled() {
            return !this.supplier.name
        },
        routerTo() {
            if (this.supplier.type === 'Individual') {
                return 'individual_supplier' + `/${this.supplier ? this.supplier.id : ''}`
            } else if (this.supplier.type === 'Company') {
                return 'company_supplier' + `/${this.supplier ? this.supplier.id : ''}`
            }
            return ''
        }
    },
    watch: {
        '$route': 'callback'
    },
};
</script>
<style scoped>
.dropdown_view.theme--light.v-btn.v-btn--icon {
    color: rgba(0, 0, 0, 0.54);
    padding: 0px 40px 0px 50px;
}

.v-menu__content {
    top: 595px !important;
    left: 1243px !important;
}

.v-menu__content .v-list .v-list-item {
    min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
    font-size: 12px;
}

.v-card {
    background-color: rgb(237, 241, 245);
}

.v-card.bg_blue {
    background-color: #92d050;
    color: #fff;
    min-height: 88px;
}

.v-card.bg_black {
    background-color: #333;
    color: #fff;
    min-height: 72px;
}

.v-card.bg_blue p.title {
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.btn_edit {
    background-color: #00b050 !important;
    color: #fff;
    font-size: 16px;
    height: 33px !important;
    padding: 0px 10px;

}

.v-card.bg_blue p {
    color: #FFF;
}

.v-card.third {
    background-color: #2CA01C;
    color: #FFF;
    display: grid;
    min-height: 52px;
}

p.title {
    margin-bottom: 0;
    font-weight: 700;
    color: #333;
    text-align: left;
}

.v-tab--active {
    background-color: rgb(237, 241, 245);
}

.tab_txn_att .v-tab--active {
    font-weight: 700;
}

.bg_white {
    background-color: #fff;
}

.no_border .v-data-table {
    height: 470px;
    overflow-y: scroll !important;
}

.no_border.hidden-sm-and-down .v-data-table td {
    height: 40px;
}

.custom_vcard.v-card {
    overflow-wrap: initial;
}

.k-grid td.k-state-selected, .k-grid tr.k-state-selected > td {
    background-color: rgba(67, 168, 52, 0.25);
}

.attachment_file {
    background-color: #EFEDED;
    border-radius: 0 !important;
}

.view_action {
    text-transform: uppercase;
}

.funct_3 {
    min-height: 40px;
    background-color: #00b050;
    font-weight: bold;
    color: #fff;
}

.funct_back {
    min-height: 40px;
    background-color: #181717;
    font-weight: bold;
    color: #fff;
}

.bg_blue_in {
    background-color: #92d050;
    color: #fff;
    min-height: 48px;
}

.disabled-header.k-grid tr * {
    cursor: pointer;
}
.b-search:before{
    color: #fff !important;
}


@media (max-width: 576px) {

}
</style>