<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <v-row>
                    <v-col sm="10" cols="12">
                        <h2 class="mb-0 font_20">{{ $t("s_chart_of_accounts") }}</h2>
                        <p class="mb-4">{{$t('chart_of_accounts_desc2')}}</p>
                    </v-col>
                    <v-col sm="2" cols="12">
                        <v-btn color="primary" class="float-right">
                            <v-icon @click="onClickSearch" size="30" color="white">mdi-reload</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <treelistdatasource 
                                ref="coaDS"
                                :data="coaList"
                                :sort="sortDefinition"
                                :schema-model="model" />

                            <treelist 
                                ref="coaTreeList"
                                data-source-ref="coaDS"
                                :resizable="true"
                                :column-menu="true"
                                :columns="columns"
                                :toolbar="['excel']"
								:excel-file-name="'Chart of accounts.xlsx'"
								:excel-filterable="true"
								:excel-all-pages="true"
                                :dataBound="onDataBound" />
                        </template>
                        <LoadingMe 
							:isLoading ="showLoading" 
							:fullPage  ="false" 
							:myLoading ="true"
                            type="loading"/>

                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import kendo from '@progress/kendo-ui';
    import {i18n} from '@/i18n';
    // import Helper from "@/helper.js";
    /* TreeList */
    import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
    import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';

    import JSZip from "jszip";
    window.JSZip = JSZip;
    
    import AccountModel from "@/scripts/model/Account.js";
    import AccountingReportTreeListModel from "@/scripts/model/AccountingReportTreeList";
    // import store from "@/store";
    import { mapState } from 'vuex';

    const { trialBalanceHandler } = require("@/scripts/AppHandlers");

    export default {
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            'treelist': TreeList,
            'treelistdatasource': TreeListDataSource,
        },
        data: () => ({
            // Obj
            coa: [],
            coaList: [],
            // LoadingMe
            showLoading: false,
            /* KENDO */
            columns: [],
            sortDefinition : [
                { field: "account.type_code", dir: "asc" },
                { field: "number", dir: "asc" },
            ],
            model: {
                id: "uuid",
                expanded: true
            },
        }),
        methods: {
            onClickSearch(){
                /* Clear */
                // store.state.accounting.accountLoaded = false;

                // Empty dataSource
                let ds = this.$refs.coaDS.kendoWidget();
                ds.data([]);

                this.search();
            },
            // Search
            search(){
                this.showLoading = true;
                trialBalanceHandler.getTrialBalance({
                    params : {
                        as_of_date: kendo.toString(new Date(), 'yyyy-MM-dd') + 'T23:59:59.999Z',
                        include_0_balance: true
                    }
                })
                .then((res)=>{
                    if(res){
                        this.coa = res.data;
                        this.bindData();
                    }
                });
            },
            /* Bind Data */
            async bindData() {
                let g = {}, childIds = [];

                /* Call account list */
                await this.$store.dispatch('accounting/getAccounts');
                
                /* Balance Sheet */
                this.coa.tbdetails.forEach(value => {
                    let account = new AccountModel(value.account);
                    if(account.is_secondary === 1){/* Filter secondary Account Only */
                        /* GROUPING */
                        /* Top Level Account Type */
                        if(!g[account.type_code]){
                            g[account.type_code] = new AccountingReportTreeListModel({
                                uuid : account.type_code,
                                number : account.type_code,
                                name : account.account_type.name,
                                local_name : account.account_type.local_name,
                                account : account.account_type,
                            });
                        }

                        /* Parent Level */
                        let thisAccountParentId = "";
                        if(account.hasOwnProperty("parent_account")){
                            let currentParentAccount = new AccountModel(account.parent_account), counter = 0;
                            while (currentParentAccount.number !== "") {
                                /* Get account by uuid or banhji_account_number */
                                let accountParent = new AccountModel();
                                if(currentParentAccount.uuid !== ""){/* Get by uuid */
                                    accountParent = new AccountModel(this.accounts.find((item) => item.uuid === currentParentAccount.uuid));
                                }else{/* Get by banhji_account_number because default data has no uuid */
                                    if(currentParentAccount.banhji_account_number !== ""){
                                        accountParent = new AccountModel(this.accounts.find((item) => item.banhji_account_number === currentParentAccount.banhji_account_number));
                                    }
                                }

                                /* Set This Account Parent Id */
                                if(counter === 0){
                                    thisAccountParentId = accountParent.uuid;
                                }

                                /* Find Next Parent */
                                let nextParent = new AccountModel();
                                if(accountParent.hasOwnProperty("parent_account")){
                                    let parentOfAccountParent = new AccountModel(accountParent.parent_account);
                                    if(parentOfAccountParent.number !== ""){
                                        if(parentOfAccountParent.uuid !== ""){/* Get by uuid */
                                            nextParent = this.accounts.find((item) => item.uuid === parentOfAccountParent.uuid);
                                        }else{/* Get by banhji_account_number because default data has no uuid */
                                            if(parentOfAccountParent.banhji_account_number !== ""){
                                                nextParent = this.accounts.find((item) => item.banhji_account_number === parentOfAccountParent.banhji_account_number);
                                            }
                                        }
                                    }
                                }
                                
                                /* Set Parent Id */
                                let parentId = accountParent.type_code;
                                if(nextParent.number !== ""){
                                    parentId = nextParent.uuid;

                                    /* Set next parent account */
                                    Object.assign(currentParentAccount, nextParent);
                                }else{
                                    /* Set loop to end */
                                    currentParentAccount.number = "";
                                }

                                /* Add Parent Level */
                                if(!g[accountParent.uuid]){
                                    g[accountParent.uuid] = new AccountingReportTreeListModel({
                                        uuid : accountParent.uuid,
                                        number : accountParent.number,
                                        name : accountParent.name,
                                        local_name : accountParent.local_name,
                                        parentId : parentId,
                                        account : accountParent,
                                    });
                                }
                                
                                counter++;
                            }/* End While Loop */
                        }

                        /* Account Nature */
                        let balance = value.balance;
                        if(account.account_type.nature.toLowerCase() === "cr"){
                            balance *= -1;
                        }

                        /* Child Level */
                        if(!g[account.uuid]){
                            g[account.uuid] = new AccountingReportTreeListModel({
                                uuid : account.uuid,
                                number : account.number,
                                name : account.name,
                                local_name : account.local_name,
                                account : account,
                                balance : balance,
                            });
                        }

                        let childId = account.uuid;
                        if(thisAccountParentId !== ""){/* Child Level */
                            g[account.uuid].parentId = thisAccountParentId;
                        }else{/* Child As Parent */
                            g[account.uuid].parentId = account.type_code; /* Self As Parent */

                            if(value.balance !== 0){
                                g[account.uuid].balance = 0;
                                childId = account.number;

                                /* Self As Child With Balance */
                                if(!g[account.number]){
                                    g[account.number] = new AccountingReportTreeListModel({
                                        uuid : account.number,
                                        number : account.number,
                                        name : account.name,
                                        local_name : account.local_name,
                                        parentId : account.uuid,
                                        account : account,
                                        balance : balance,
                                    });
                                }
                            }
                        }

                        /* Child Id */
                        childIds.push(childId);
                    }
                });
                
                /* Parse Object Array */
                let entries = Object.values(g);

                /* Parent aggregate sum */
                for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i];
                    
                    if(~childIds.indexOf(entry.uuid)){
                        let parentId = entry.parentId;
                        while(parentId !== null){
                            if(parentId){
                                let parent = entries.find((item) => item.uuid === parentId);
                                if(parent){
                                    parent.balance += entry.balance;
                                    
                                    /* Set new parent id */
                                    parentId = parent.parentId;
                                }else{
                                    /* Set loop to end */
                                    parentId = null;
                                }
                            }else{
                                /* Set loop to end */
                                parentId = null;
                            }
                        }
                    }
                }
                
                /* BIND ACCOUNTS */
                this.coaList = entries;
                
                this.generateColumn();

                this.showLoading = false;
            },
            // Row Template
            nameTmpl(dataItem){
                /* Name in language */
                let name = dataItem.name;
                if(this.reportingLanguage === "local"){
                    name = dataItem.local_name;
                }

                /* Define result */
                let result = `<span>${dataItem.number} - ${name}</span>`;

                /* Top Level */
                if(dataItem.parentId === null){
                    result = `<span style='font-weight: bolder;'>${name}</span>`;
                }

                /* Parent Level */
                if(dataItem.hasChildren && dataItem.number.length > 3){
                    result = `<span style='font-weight: bolder;'>${dataItem.number} - ${name}</span>`;
                }

                return result;
            },
            /* On databound */
            onDataBound (e) {
                var headers = e.sender.thead.children();
                for (var i = 0; i < headers.length; i++) {
                    var th = kendo.jQuery(headers[i]);
                    th.css("font-weight", "bold");
                    th.css("text-align", "center");
                }

                var rows = e.sender.tbody.children();
                for (var j = 0; j < rows.length; j++) {
                    var row = kendo.jQuery(rows[j]);
                    var dataItem = e.sender.dataItem(row);
                    
                    /* Amount align right */
                    // row.css("text-align", "right");
                    
                    /* Parent in bold */
                    if(dataItem.get("hasChildren") || dataItem.get("parentId") === null){
                        row.css("font-weight", "bold");
                    }
                }
            },
            generateColumn() {
                let headerAttributes = {
                    class: "table-header-cell",
                    style: "font-weight: bold;text-align: center;padding-right: 35px; font-size: 14px",
                },
                attributes = {
                    class: "table-cell",
                    style: "text-align: right; font-size: 14px",
                };

                let columns = [
                    {
                        field: "name",
                        title: i18n.t("account"),
                        template: this.nameTmpl,
                        width: 300,
                        headerAttributes: headerAttributes,
                    },
                    {
                        field: "account.local_name",
                        title: i18n.t("local_name"),
                        width: 300,
                        hidden: true,
                        headerAttributes: headerAttributes,
                    },
                    {
                        field: "account.account_type.name",
                        title: i18n.t("type"),
                        width: 200,
                        headerAttributes: headerAttributes,
                    },
                   
                    {
                        field: "balance",
                        title: i18n.t("balance"),
                        format: "{0:n}",
                        width: 100,
                        headerAttributes: headerAttributes,
                        attributes: attributes,
                    },
                ];
                
                /* Set All Columns */
                this.columns = columns;
            },
        },
        watch: {
            accounts: "onClickSearch"
        },
        computed: mapState({
            accounts: state => state.accounting.accounts
        }),
        mounted() {
            this.search();
        },
    };
</script>
<style scoped>
</style>