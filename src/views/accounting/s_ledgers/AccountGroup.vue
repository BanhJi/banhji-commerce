<template>
    <v-row class="mt-0">
        <v-col sm="12" cols="12" class="pt-0" >
            <h2 class="mb-0 font_20">{{$t('account_group')}}</h2>
            <!-- <v-dialog v-model="dialogm2" max-width="700px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>{{$t('account_group')}}</v-card-title>
                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    <v-divider/>
                    <v-card-text style="height: 240px; background-color: #EDF1F5; color: #333;">
                        <v-row>
                            <v-col sm="6" cols="12" class="">
                                <label class="label">{{$t('account_type')}}</label>
                                <p class="text_tip">The nature of account and use for reporting purpose</p>
                                <v-select class=" mb-5"
                                          id="acc_type_selector"
                                          :items="account_type_datasource"
                                          item-text="name"
                                          item-value="selected_acctount_type"
                                          v-model="selected_acctount_type"
                                          outlined
                                          return-object
                                          @change="OnAccountTypeSelectedChange()"
                                >
                                </v-select>
                                <label class="label">{{$t('account_group_name')}}</label>
                                <p class="text_tip">A short name of the account group</p>
                                <v-text-field class=""
                                              outlined
                                              tage="Account Group Name"
                                              placeholder=""
                                              v-model="account_group.name"/>
                            </v-col>
                            <v-col sm="6" cols="12" class="">
                                <label class="label">{{$t('local_name_optional')}}</label>
                                <p class="text_tip">{{$t('local_name_of_the_account_group')}}</p>
                                <v-textarea class=""
                                            label=""
                                            outlined
                                            rows="5"
                                            v-model="account_group.local_name">

                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="function_footer">
                        <v-btn class="btn_cancel float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                        <v-btn class="btn_save_new float-right" @click.native="OnSaveClick(true,option)">{{$t('save_new')}}
                        </v-btn>
                        <v-btn class="btn_save_close float-right" @click.native="OnSaveClick(false,option)">{{$t('save_close')}}
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog> -->

            <p class="mb-3">{{$t('account_group_desc')}}</p>
            <v-data-table class="attachment_table"
                          :headers="headers"
                          :items="accountGroupList"
                          @click:row="onEditClick"
                          sort-by="code">
                <!-- <template v-slot:[`item.actions`]>
                    <v-btn class="btn_edit_setting"  @click="dialogm2=true">
                        <v-icon class="white--text" size="14">mdi-pen</v-icon>
                        <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                    </v-btn>
                </template> -->
                
                 <template slot="no-data">
                    <LoadingMe 
                        :isLoading ="compeletLoading" 
                        :fullPage  ="isFullpage" 
                        :myLoading ="true"/>
                </template>

                <!--                <template v-slot:no-data>-->
                <!--                    <v-btn color="primary" @click="initialize">Reset</v-btn>-->
                <!--                </template>-->
            
            </v-data-table>
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
    const axios = require('axios')
    const apiUrl = require('@/apiUrl.js')
    
    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();

    import { i18n } from '@/i18n'
    import LoadingMe from '@/components/Loading'
    export default {
        components: {
            LoadingMe
        },
        data: () => ({
            dialogm1: '',
            dialogm2: false,
            compeletLoading: true,
            isFullpage     : false,
            snackbar: false,
            textStatus: 'Success',
            color: '#3DA72E',
            timeout: 6000,
            x: 'right',
            y: 'top',
            account_type_datasource: [],
            selected_acctount_type: {
                name: '',
                nature: '',
                statement_group: '',
                number: 0,
            },
            account_group: {
                name: '',
                account_type: undefined,
                local_name: '',
                description: '',
                institute_id: instituteId,
                uuid: ''
            },
            headers: [
                {text: i18n.t('code'), value: 'code', sortable: true,  align: 'start ',},
                {
                    text: i18n.t('name'),
                    align: 'start tb_name_td',
                    sortable: false,
                    value: 'name',
                },
                {text: i18n.t('local_name'), value: 'local_name', sortable: false,  align: 'start ',},
                {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: 'start d-none'},
                {text:  i18n.t('account_type'), value: 'account_type.name', sortable: false,  align: 'start',},
                // {text: i18n.t('action'), value: 'actions', sortable: false,  align: 'start',},
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                local_name: 0,
                description: 0,
                account_type: 0,
            },
            defaultItem: {
                name: '',
                local_name: 0,
                description: 0,
                account_type: 0,
            },
            accountGroupList: [],
            option: 1
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
            async loadAccountGroupList() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        axios.get(apiUrl.account_groups)
                            .then(res => {
                                //eslint-disable-next-line no-console
                                // console.log(res.data)
                                this.accountGroupList = res.data
                                this.compeletLoading = false
                            })
                    }, 500);
                })
            },
            async onEditClick(value) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        //eslint-disable-next-line no-console
                        console.log(value)
                        this.account_group = value
                        this.selected_acctount_type = this.account_group.account_type
                        this.option = 2
                    }, 500);
                })
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            OnSaveClick(isNew, option) {
                //eslint-disable-next-line no-console
                let self = this
                let url, method = ''
                if (option === 1) { // Create
                    url = apiUrl.account_groups
                    method = 'post'
                } else if (option === 2) { // Update
                    url = apiUrl.account_groups + `/${self.account_group.uuid}/update`
                    method = 'post'
                }
                //eslint-disable-next-line no-console
                console.log(self);
                // this.isFullpage = true
                axios({
                    method: method,
                    url: url,
                    data: self.account_group
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            self.snackbar = true
                            self.textStatus = "Success"
                            self.color      = "#3DA72E"
                            if (isNew === true) {
                                // clreat form
                                self.dialogm2 = true
                                self.clear()
                                self.loadAccountGroupList()
                            } else {
                                //close form.
                                self.dialogm2 = false
                                self.clear()
                                self.loadAccountGroupList()
                            }
                        }
                    })
                    .catch(function (error) {
                        self.snackbar = true
                        self.textStatus = "Failed"
                        self.color      = "#EF5350"
                        //eslint-disable-next-line no-console
                        console.log(error)
                    });

            },
            OnAccountTypeSelectedChange: function () {
                this.account_group.account_type = this.selected_acctount_type
                //eslint-disable-next-line no-console
                // console.log(this.account_group);
            },
            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogm2 = true
            },
            deleteItem(item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },
            close() {
                this.dialogm2 = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            clear() {
                this.account_group.name = ''
                this.account_group.account_type = ''
                this.account_group.institute_id = ''
                this.account_group.local_name = ''
                this.account_group.uuid = ''
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
        beforeCreate() {
            // get the account type.
            axios.get(apiUrl.account_type_list_get)
                .then(res => {
                    this.account_type_datasource = res.data
                })
        },
        mounted: async function () {
            this.loadAccountGroupList()
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

    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td{
        color: #000 !important;
        padding: 5px !important;
    }
    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row){
        border-top: 1px solid #000 !important;
        border-bottom: 0;
    }
    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td{
        border-bottom: 1px solid #000 !important;
    }
    .text-start{
       text-align: left !important;
    }


    @media (max-width: 576px) {

    }
</style>