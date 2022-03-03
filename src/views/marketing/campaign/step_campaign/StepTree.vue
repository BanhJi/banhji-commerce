<template>
    <v-row>
        <v-col cols="12" class="pb-0">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <h2 class="primary--text font_20 mb-0">{{$t('step_tree')}}</h2>
                </v-col>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-card outlined dense class="no_border" color="white">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t('reward_base') }}</label>
                                <v-select
                                    class="mt-1"
                                    v-model="c.rewardBase"
                                    :items="rewardBases"
                                    @change="rewardBaseChange"
                                    item-value="id"
                                    item-text="name"
                                    placeholder="Select"
                                    outlined=""
                                />
                            </v-col>

                            <v-col sm="12" cols="12" class="py-0" v-if="c.rewardBase == `amountBase`">
                                <label class="label">{{ $t('reward_type') }}</label>
                                <v-select
                                    class="mt-1"
                                    v-model="c.rewardType"
                                    :items="rewardTypes"
                                    @change="rewardTypeChange"
                                    item-value="id"
                                    item-text="name"
                                    placeholder="Select"
                                    outlined=""
                                />
                                <v-col class="px-0" v-if="c.rewardType == `fixed`">
                                    <v-text-field
                                        class="mt-1"
                                        style="width: 60%;float: left;"
                                        v-model="c.rewardAmount"
                                        outlined
                                    />
                                    <v-select
                                        class="mt-1"
                                        v-model="c.rewardAmountType"
                                        :items="rewardAmountTypes"
                                        item-value="id"
                                        item-text="name"
                                        placeholder="Select"
                                        style="width: 38%; float: right;"
                                        outlined=""
                                    />
                                </v-col>
                                <v-col class="px-0" v-else>
                                    <template>
                                        <kendo-datasource
                                            ref="varianList"
                                            :data="rewardVarian"/>
                                        <kendo-grid
                                            id="varianList" class="grid-function"
                                            :data-source-ref="'varianList'"
                                            :sortable="true"
                                            :filterable="false"
                                            :column-menu="false"
                                            :editable="true"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeVarianRow, className: 'btn-plus isEditable'}"
                                                :title="''"
                                                :width="63"
                                                :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'conditionAmount'"
                                                :title="$t('condition_amount')"
                                                :width="100"
                                                :format="'{0:n}'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'conditionType'"
                                                :title="$t('condition_type')"
                                                :template="conditionTypeTpl"
                                                :editor="conditionTypeEditor"
                                                :width="100"
                                                :format="'{0:n}'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'rewardAmount'"
                                                :title="$t('amount')"
                                                :width="100"
                                                :format="'{0:n}'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'rewardType'"
                                                :title="$t('type')"
                                                :width="50"
                                                :template="rewardTypeTpl"
                                                :editor="rewardTypeEditor"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                        </kendo-grid>
                                    </template>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <v-row>
                                            <v-col sm="7" cols="12" class="pb-1 pt-0 pl-0">
                                                <v-btn
                                                    class="float-left btn_plus white--text mr-2"
                                                    color="primary" @click="addVarianRow">
                                                    <v-icon size="" class="ma-1">mdi mdi-plus
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-col>
                            </v-col>

                            <v-col sm="12" cols="12" class="py-0"  v-else>
                                <label class="label">{{ $t('base_on') }}</label>
                                <v-select
                                    class="mt-1"
                                    v-model="c.productBaseOn"
                                    :items="productBaseOns"
                                    @change="productBaseOnChange"
                                    item-value="id"
                                    item-text="name"
                                    placeholder="Select"
                                    outlined=""
                                />
                                <v-col class="px-0" v-if="c.productBaseOn == `category`">
                                    <template>
                                        <kendo-datasource
                                            ref="selectProCateList"
                                            :data="productCategorySelected"/>
                                        <kendo-grid
                                            id="selectProCateList" class="grid-function"
                                            :data-source-ref="'selectProCateList'"
                                            :sortable="true"
                                            :filterable="false"
                                            :column-menu="false"
                                            :editable="true"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeCateRow, className: 'btn-plus isEditable'}"
                                                :title="''"
                                                :width="63"
                                                :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'category'"
                                                :title="$t('category')"
                                                :width="150"
                                                :template="categoryTemplate"
                                                :editor="cateDropDownEditor"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'amount'"
                                                :title="$t('amount')"
                                                :width="100"
                                                :format="'{0:n}'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'type'"
                                                :title="$t('type')"
                                                :width="50"
                                                :template="`%`"
                                                :editable="()=>{ return false}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                        </kendo-grid>
                                    </template>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <v-row>
                                            <v-col sm="7" cols="12" class="pb-1 pt-0 pl-0">
                                                <v-btn
                                                    class="float-left btn_plus white--text mr-2"
                                                    color="primary" @click="addSelectCateRow">
                                                    <v-icon size="" class="ma-1">mdi mdi-plus
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-col>
                                <v-col class="px-0"  v-else-if="c.productBaseOn == `group`">
                                    <template>
                                        <kendo-datasource
                                            ref="selectProGroupList"
                                            :data="productGroupSelected"/>
                                        <kendo-grid
                                            id="selectProGroupList" class="grid-function"
                                            :data-source-ref="'selectProGroupList'"
                                            :sortable="true"
                                            :filterable="false"
                                            :column-menu="false"
                                            :editable="true"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeGroupRow, className: 'btn-plus isEditable'}"
                                                :title="''"
                                                :width="63"
                                                :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'group'"
                                                :title="$t('group')"
                                                :width="150"
                                                :template="groupTemplate"
                                                :editor="groupDropDownEditor"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'amount'"
                                                :title="$t('amount')"
                                                :width="100"
                                                :format="'{0:n}'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'type'"
                                                :title="$t('type')"
                                                :width="50"
                                                :template="`%`"
                                                :editable="()=>{ return false}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                        </kendo-grid>
                                    </template>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <v-row>
                                            <v-col sm="7" cols="12" class="pb-1 pt-0 pl-0">
                                                <v-btn
                                                    class="float-left btn_plus white--text mr-2"
                                                    color="primary" @click="addSelectGroupRow">
                                                    <v-icon size="" class="ma-1">mdi mdi-plus
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-col>
                                <v-col class="px-0" v-else-if="c.productBaseOn == `specific`">
                                    <template>
                                        <kendo-datasource
                                            ref="selectProList"
                                            :data="producSelected"/>
                                        <kendo-grid
                                            id="selectProList" class="grid-function"
                                            :data-source-ref="'selectProList'"
                                            :sortable="true"
                                            :filterable="false"
                                            :column-menu="false"
                                            :editable="true"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, className: 'btn-plus isEditable'}"
                                                :title="''"
                                                :width="63"
                                                :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'item'"
                                                :title="$t('item')"
                                                :template="itemTemplate"
                                                :editor="ItemDropDownEditor"
                                                :attributes="{class:'tb_name_td isEditable'}"
                                                :width="200"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'amount'"
                                                :title="$t('amount')"
                                                :width="100"
                                                :format="'{0:n}'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'type'"
                                                :title="$t('type')"
                                                :width="50"
                                                :template="rewardTypeTpl"
                                                :editor="rewardTypeEditor"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                        </kendo-grid>
                                    </template>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <v-row>
                                            <v-col sm="7" cols="12" class="pb-1 pt-0 pl-0">
                                                <v-btn
                                                    class="float-left btn_plus white--text mr-2"
                                                    color="primary" @click="addSelectProRow">
                                                    <v-icon size="" class="ma-1">mdi mdi-plus
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-col>
                            </v-col>
                                
                            
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn color="grayBg"
                                        outlined
                                        class=" text-capitalize  black--text float-left"
                                        @click="cancel">{{ $t('cancel') }}
                                </v-btn>
                                <v-btn color="primary"
                                        class="float-right white--text text-capitalize"
                                        :disabled="btnDisabled"
                                        @click="saveClose">
                                    {{ $t('save_close') }}
                                </v-btn>
                                <v-btn color="secondary"
                                        style="margin-right: 10px !important"
                                        class="white--text float-right text-capitalize"
                                        @click="saveNew" :hidden="hiddenButton">{{ $t("save_new") }}
                                </v-btn>
                            </v-card>
                            
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"  type="loading"/>
    </v-row>
</template>
<script>
    import {i18n} from '@/i18n';
    const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
    import {ShowResource} from '@/observable/store'
    import CampaignModel from "@/scripts/commerce/model/Campaign"
    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const Luhn = require('luhn-js')
    const cookie = cookieJS.getCookie();
    const discountItemHandler = require("@/scripts/discountItemHandler");
    const saleChannelHandler = require("@/scripts/saleChannelHandler");
    const categoryHandler = require("@/scripts/categoryHandler");
    const groupHandler = require("@/scripts/groupHandler");
    import kendo from "@progress/kendo-ui"
    const $ = kendo.jQuery
    const SECOND_DELAY = 1000;
    const customerTypeHandler = require("@/scripts/customerTypeHandler");
    const priceLevelHandler = require("@/scripts/priceLevelHandler");
    const productVariantHandler = require("@/scripts/productVariantHandler");

    export default {
        props:['StepTwo'],
        data: () =>({
            showLoading: false,

            timeF: false,
            timeT: false,
            timeFr: null,
            timeTo: null,
            menu2: false,
            modal2: false,
            selectProductCat: [],
            c: new CampaignModel({}),
            discountItems: [],
            saleChannels: [],
            isEdit: false,
            // LoadingMe
            loadingAlert: false,
            loadingColorAlert: '',
            loadingTextAlert: '',
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            alert: false,
            files: [],
            errors: [],
            // Form validation
            valid: true,
            col_expand: 9,
            col_hide: 3,
            isHideBar: false,
            transactionDate: new Date().toISOString().substr(0, 10),
            segments: [],
            //employee
            employees: [],
            transactionType: [],
            locations: [],
            isSaveNew: false,
            saveOption: '',
            company: {},
            btnDisabled: false,
            priceLevels: [],
            //categroup
            productCategories: [],
            productCategorySelected: [],
            //group
            productGroups: [],
            productGroupSelected: [],
            // product
            producSelected: [],
            //reward varian
            conditionTypes: [
                {id: '>', name: '>'},
                {id: '>=', name: '>='},
                {id: '=', name: '='}
            ],
            rewardVarian: [],
            // rule customer
            ruleCustomerTypes: [],
            customerTypes: [],
            ruleCustomers: [],
            ruleCate: [],
            ruleGroup: [],
            ruleProduct: [],
            //coupon
            couponAmount: 1,
            coupons: [],
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`),
        },
        methods:{
            stepTree(){
              this.$emit("finish")
            },
            //coupon
            couponGenerate(){
                let self = this
                for(let i = 1; i <= this.couponAmount; i++){
                    const pHead = 'CP-'
                    let pCode = ''
                    const number = self.numberGenerator(7)
                    pCode = pHead + Luhn.generate(number)
                    self.addCoupon(pCode)
                }
            },
            addCoupon(num){
                let ds = this.$refs.coupons.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    number: num
                })
            },
            numberGenerator(digit){
                return Math.random().toFixed(digit).split('.')[1]
            },
            rmCouponRow(e){
                e.preventDefault();
                const grid = kendo.jQuery("#coupons").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                dataSource.remove(dataItem);
            },
            // price level
            onPriceLevelChanged(){
            },
            loadPriceLevel(){
                const strFilter = '?nature=sale'
                priceLevelHandler.get(strFilter).then(res => {
                    const data = res || []
                    this.priceLevels = data
                    if(data.length > 0){
                        this.c.priceLevel = data[0]
                    }
                })
            },
            // rule 
            async rproductBaseOnChange(){
                if(this.c.ruleProductBaseOn == 'category'){
                    await this.loadProductCategory()
                    this.ruleCate = []
                    setTimeout(() => {
                        this.addRuleCateRow()
                    }, 300)
                }else if(this.c.ruleProductBaseOn == 'group'){
                    await this.loadProductGroup()
                    this.ruleGroup = []
                    setTimeout(() => {
                        this.addRuleGroupRow()
                    }, 300)
                }else if(this.c.ruleProductBaseOn == 'specific'){
                    this.producSelected = []
                    setTimeout(() => {
                        this.addRuleProRow()
                    }, 300)
                }
            },
            ruleRemovePro(e){
                e.preventDefault();
                const grid = kendo.jQuery("#ruleProduct").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            addRuleProRow(){
                let ds = this.$refs.ruleProduct.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    item: {}
                })
            },
            ruleRemoveGroup(e){
                e.preventDefault();
                const grid = kendo.jQuery("#ruleGroup").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            addRuleGroupRow(){
                let ds = this.$refs.ruleGroup.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    group: {}
                })
            },
            addRuleCateRow(){
                let ds = this.$refs.ruleCate.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    category: {}
                })
            },
            ruleRemoveCate(e){
                e.preventDefault();
                const grid = kendo.jQuery("#ruleCate").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            ruleBaseChange(){
                if(this.c.ruleBase == 'product'){
                    this.c.ruleProductBaseOn = 'all'
                }
            },
            async rCusBaseChange(){
                if(this.c.ruleCustomerBaseType == 'customerType'){
                    await this.loadCustomerType()
                    this.ruleCustomerTypes = []
                    this.c.ruleCustomerTypes = []
                }else if(this.c.ruleCustomerBaseType == 'specific'){
                    this.ruleCustomers = []
                    setTimeout(()=> {
                        this.addCustomerRow()
                    }, 500)
                }
            },
            addCustomerRow(){
                let ds = this.$refs.ruleCustomers.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    customer: {}
                })
            },
            removeCustomerRow(e){
                e.preventDefault();
                const grid = kendo.jQuery("#ruleCustomers").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            loadCustomerType(){
                customerTypeHandler.get().then((res) => {
                    this.customerTypes = res;
                });
            },
            customerTpl(dataItem){
                const item = dataItem;
                if (item) {
                    return `<span>${item.customer.numberName ? item.customer.numberName : `--Select--`}</span>`;
                } else {
                    return ``;
                }
            },
            cusDropDownEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: true,
                        autoWidth: true,
                        height: 400,
                        filter: "contains",
                        dataTextField: "numberName",
                        dataValueField: "id",
                        delay: SECOND_DELAY,
                        optionLabel: "--Select--",
                        template: "<span>#= numberName#</span>",
                        dataSource: new kendo.data.DataSource({
                            serverFiltering: true,
                            transport: {
                                read: {
                                    url: commerceHandler.customerSearchURL(),
                                },
                                dataType: "json",
                            },
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: {type: "string"},
                                        name: {type: "string"}
                                    },
                                },
                                data: function (response) {
                                    return response.data;
                                },
                                total: function (response) {
                                    return response.data.count;
                                },
                            },
                            // data: this.variants
                        }),
                    })
            },
            //reward varian
            rewardTypeChange(){
                if(this.c.rewardType == 'varian'){
                    this.rewardVarian = []
                    setTimeout(() => {
                        this.addVarianRow()
                    }, 500)
                }
            },
            removeVarianRow(e){
                e.preventDefault();
                const grid = kendo.jQuery("#varianList").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            addVarianRow(){
                let ds = this.$refs.varianList.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    conditionAmount: 0,
                    conditionType: '=',
                    rewardAmount: 0,
                    rewardType: 'percentage',
                })
            },
            rewardTypeEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: true,
                        autoWidth: true,
                        height: 400,
                        dataTextField: "name",
                        dataValueField: "id",
                        template: "<span>#= name#</span>",
                        optionLabel: "--Select--",
                        dataSource: new kendo.data.DataSource({
                            data: this.rewardAmountTypes
                        })
                    })
            },
            rewardTypeTpl(dataItem){
                const item = dataItem;
                if (item) {
                    return `<span>${item.rewardType == `amount` ? `$` : `%`}</span>`;
                } else {
                    return ``;
                }
            },
            conditionTypeTpl(dataItem){
                const item = dataItem;
                if (item) {
                    return `<span>${item.conditionType ? item.conditionType : ``}</span>`;
                } else {
                    return ``;
                }
            },
            conditionTypeEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: true,
                        autoWidth: true,
                        height: 400,
                        dataTextField: "name",
                        dataValueField: "id",
                        template: "<span>#= name#</span>",
                        dataSource: new kendo.data.DataSource({
                            data: this.conditionTypes
                        })
                    })
            },
            //category
            removeCateRow(e){
                e.preventDefault();
                const grid = kendo.jQuery("#selectProCateList").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            addSelectCateRow() {
                let ds = this.$refs.selectProCateList.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    category: {},
                    amount: 0,
                    type: '%',
                })
            },
            categoryTemplate(dataItem) {
                const acc = dataItem.category
                if (acc) {
                    return `<span>${acc.name ? acc.name : `--Select--`}</span>`
                } else {
                    return ``
                }
            },
            cateDropDownEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: true,
                        autoWidth: true,
                        height: 400,
                        filter: "startswith",
                        dataTextField: "name",
                        dataValueField: "id",
                        optionLabel: "--Select--",
                        template: "<span>#= name#</span>",
                        dataSource: new kendo.data.DataSource({
                            data: this.productCategories
                        })
                    })
            },
            //group
            addSelectGroupRow() {
                let ds = this.$refs.selectProGroupList.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    group: {},
                    amount: 0,
                    type: '%',
                })
            },
            groupTemplate(dataItem) {
                const acc = dataItem.group
                if (acc) {
                    return `<span>${acc.name ? acc.name : `--Select--`}</span>`
                } else {
                    return ``
                }
            },
            groupDropDownEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: true,
                        autoWidth: true,
                        height: 400,
                        filter: "startswith",
                        dataTextField: "name",
                        dataValueField: "id",
                        optionLabel: "--Select--",
                        template: "<span>#= name#</span>",
                        dataSource: new kendo.data.DataSource({
                            data: this.productGroups
                        })
                    })
            },
            removeGroupRow(e){
                e.preventDefault();
                const grid = kendo.jQuery("#selectProGroupList").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            //product
            addSelectProRow() {
                let ds = this.$refs.selectProList.kendoWidget(),
                    total = ds.total()
                ds.insert(total, {
                    item: {},
                    amount: 0,
                    type: 'percentage',
                })
            },
            ItemDropDownEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: true,
                        autoWidth: true,
                        height: 400,
                        filter: "contains",
                        dataTextField: "name",
                        dataValueField: "id",
                        delay: SECOND_DELAY,
                        optionLabel: "--Select--",
                        template: "<span>#= name#</span>",
                        dataSource: new kendo.data.DataSource({
                            serverFiltering: true,
                            transport: {
                                read: {
                                    url: productVariantHandler.itemSearchURL("?plId=" + this.c.priceLevel.id),
                                },
                                dataType: "json",
                            },
                            schema: {
                                model: {
                                    id: "pk",
                                    fields: {
                                        pk: {type: "string"},
                                        name: {type: "string"},
                                        sku: {type: "string"},
                                    },
                                },
                                data: function (response) {
                                    return response.data;
                                },
                                total: function (response) {
                                    return response.data.count;
                                },
                            },
                            // data: this.variants
                        }),
                    })
            },
            itemTemplate(dataItem) {
                const item = dataItem.item;
                // window.console.log(item, 'item in grid')
                if (item) {
                    return `<span>${item.name ? item.name : `--Select--`}</span>`;
                } else {
                    return ``;
                }
            },
            rowNumberTmpl(dataItem) {
                let ds = this.$refs.selectProList.kendoWidget(),
                    index = ds.indexOf(dataItem); 
                return index + 1;
            },
            removeRow(e) {
                e.preventDefault();
                const grid = kendo.jQuery("#selectProList").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            // base on
            async productBaseOnChange(){
                if(this.c.productBaseOn == 'category'){
                    await this.loadProductCategory()
                    this.productCategorySelected = []
                    setTimeout(() => {
                        this.addSelectCateRow()
                    }, 300)
                }else if(this.c.productBaseOn == 'group'){
                    await this.loadProductGroup()
                    this.productGroupSelected = []
                    setTimeout(() => {
                        this.addSelectGroupRow()
                    }, 300)
                }else if(this.c.productBaseOn == 'specific'){
                    this.producSelected = []
                    setTimeout(() => {
                        this.addSelectProRow()
                    }, 300)
                }
            },
            loadProductCategory(){
                this.productCategories = []
                this.showLoading = true
                categoryHandler.get().then((res) => {
                    this.showLoading = false;
                    let cate = res.filter(i => i.hasOwnProperty('type'))
                    this.productCategories = cate.filter(i => i.type.name === 'Product' || i.type.name === 'Service')
                });
            },
            loadProductGroup(){
                this.productGroups = []
                this.showLoading = true
                groupHandler.get().then((res) => {
                    this.showLoading = false
                    this.productGroups = res; //.filter(m => m.category.hasOwnProperty('type') && m.category.type.name === 'Product');
                });
            },
            // help
            Help(key_search) {
                ShowResource(key_search)
            },
            productCateChange(){
                window.console.log(this.selectProductCat)
            },
            rewardBaseChange(){
                this.c.productBaseOn = 'all'
                this.selectProductCat = []
            },
            loadDiscountItem(){
                this.showLoading = true;
                this.discountItems = []
                discountItemHandler.list("?type=Sale").then((res) => {
                    this.showLoading = false;
                    if (res.data.statusCode === 200){ 
                        this.discountItems = res.data.data;
                        if(this.discountItems.length > 0){
                            this.c.discountItem = this.discountItems[0]
                        }
                    }
                });
            },
            async loadSaleChannel() {
                this.showLoading = true;
                saleChannelHandler.get().then((res) => {
                    this.showLoading = false;
                    if (res.data.statusCode === 200) {
                        this.saleChannels = res.data.data;
                    }
                });
            },
            async initData() {
                await this.loadDiscountItem()
                await this.loadSaleChannel()
                await this.loadPriceLevel()
                if (this.$route.params.id !== undefined) {
                    this.isEdit = true
                    await this.loadCampaign()
                } else {
                    this.clear()
                }
            },
            loadCampaign(){
                this.showLoading = true
                commerceHandler.campaignGet(this.$route.params.id).then((res) => {
                    this.showLoading = false
                    if(res.status == 200){
                        this.c = res.data.data[0]
                    }else{
                        this.gotoCenter()
                    }
                })
            },
            gotoSetting(){
                this.$swal({
                    position: 'center',
                    icon: 'warning',
                    title: i18n.t('no_campaign'),
                    showConfirmButton: true,
                    confirmButtonColor: '#4d4848',
                    cancelButtonColor: '#ED1A3A',
                    confirmButtonText: i18n.t('back_to_center')
                }).then((result) => {
                    if (result.value) {
                        window.history.go(-1)
                        return false
                    }
                })
            },
            saveNew() {
                this.isSaveNew = true
                this.save()
            },
            saveClose() {
                this.isSaveNew = false
                this.save()
            },
            async save() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                // check coupon number
                if(this.c.type == 'coupon'){
                    let ds = this.$refs.coupons.kendoWidget()
                    let d = []
                    ds.data().forEach(e => {
                        if(e.number != ''){
                            d.push({
                                number: e.number
                            })
                        }
                    })
                    this.c.couponNumber = d
                    if(d.length <= 0){
                        this.$swal({
                            title: i18n.t('msg_title_warning'),
                            text: i18n.t('check_coupon_number'),
                            icon: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#4d4848",
                            cancelButtonColor: "#ED1A3A",
                            confirmButtonText: i18n.t('ok'),
                        })
                        return
                    }
                }
                //check expire date
                let td = kendo.toString(new Date(), 'yyyy-MM-dd')
                let ed = kendo.toString(new Date(this.c.endDate), 'yyyy-MM-dd')
                if(Date.parse(new Date(ed)) <= Date.parse(new Date(td))){
                    this.$swal({
                        title: i18n.t('msg_title_warning'),
                        text: i18n.t('it_almost_end_date'),
                        icon: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#4d4848",
                        cancelButtonColor: "#ED1A3A",
                        confirmButtonText: i18n.t('ok'),
                    })
                }
                //check time
                if(this.c.isTiming){
                    if(this.c.timeFrom == '' || this.c.timeTo == ''){
                        this.$swal({
                            title: i18n.t('msg_title_warning'),
                            text: i18n.t('check_time'),
                            icon: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#4d4848",
                            cancelButtonColor: "#ED1A3A",
                            confirmButtonText: i18n.t('ok'),
                        })
                        return
                    }
                }
                // check partner
                if(this.c.isPartner){
                    if(Object.keys(this.c.partner).length <= 0){
                        this.$swal({
                            title: i18n.t('msg_title_warning'),
                            text: i18n.t('check_partner'),
                            icon: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#4d4848",
                            cancelButtonColor: "#ED1A3A",
                            confirmButtonText: i18n.t('ok'),
                        })
                        return
                    }
                }
                // check rule
                if(this.c.ruleBase == 'customer'){
                    if(this.c.ruleCustomerBaseType == 'customerType'){
                        if(this.c.ruleCustomerTypes.length <= 0){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_customer_type'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }else if(this.c.ruleCustomerBaseType == 'specific'){
                        let ds = this.$refs.ruleCustomers.kendoWidget()
                        let d = []
                        ds.data().forEach(e => {
                            if(e.customer.hasOwnProperty('id')){
                                d.push({
                                    customer: {
                                        alternativeName: e.alternativeName,
                                        baseCurrency: e.baseCurrency,
                                        connectId: e.connectId,
                                        consumerId: e.consumerId,
                                        crn: e.crn,
                                        customerType: e.customerType,
                                        decimalFormat: e.decimalFormat,
                                        gender: e.gender,
                                        id: e.id,
                                        isDonor: e.isDonor,
                                        name: e.name,
                                        number: e.number,
                                        numberName: e.numberName,
                                        registeredDate: e.registeredDate,
                                        taxId: e.taxId,
                                        type: e.type
                                    }
                                })
                            }
                        })
                        this.c.ruleCustomers = d
                        if(d.length <= 0){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_customer'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }
                }else if(this.c.ruleBase == 'product'){
                    if(this.c.ruleProductBaseOn == 'category'){
                        let ds = this.$refs.ruleCate.kendoWidget()
                        let d = []
                        ds.data().forEach(e => {
                            if(e.category.hasOwnProperty('id')){
                                d.push({
                                    category_id: e.category.id
                                })
                            }
                        })
                        this.c.ruleProductCategory = d
                        if(d.length <= 0){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_rule_category'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }else if(this.c.ruleProductBaseOn == 'group'){
                        let ds = this.$refs.ruleGroup.kendoWidget()
                        let d = []
                        ds.data().forEach(e => {
                            if(e.group.hasOwnProperty('id')){
                                d.push({
                                    group_id: e.group.id
                                })
                            }
                        })
                        this.c.ruleProductGroup = d
                        if(d.length <= 0){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_rule_group'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }else if(this.c.ruleProductBaseOn == 'specific'){
                        let ds = this.$refs.ruleProduct.kendoWidget()
                        let d = []
                        ds.data().forEach(e => {
                            if(e.item.hasOwnProperty('id')){
                                d.push({
                                    item_id: e.item.id
                                })
                            }
                        })
                        this.c.ruleProduct = d
                        if(d.length <= 0){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_rule_item'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }
                }
                // check reward
                if(this.c.rewardBase == 'amountBase'){
                    if(this.c.rewardType == 'fixed'){
                        let isError = false
                        if(parseFloat(this.c.rewardAmount) <= 0){
                            isError = true
                        }
                        if(parseFloat(this.c.rewardAmount) > 100 && this.c.rewardAmountType == 'percentage'){
                            isError = true
                        }
                        if(isError){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_reward_amount'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }else if(this.c.rewardType == 'varian'){
                        let ds = this.$refs.varianList.kendoWidget()
                        let d = []
                        let isError = false
                        ds.data().forEach(e => {
                            if(parseFloat(e.rewardAmount) > 0){
                                if(e.rewardAmount > 100 && e.rewardType == 'percentage'){
                                    isError = true
                                }
                                if(e.rewardType != 'percentage' && parseFloat(e.rewardAmount) > parseFloat(e.conditionAmount)){
                                    isError = true
                                }
                                d.push(e)
                            }
                        })
                        d.sort(function (a, b) {
                            return parseFloat(b.conditionAmount) - parseFloat(a.conditionAmount)
                        })
                        this.c.ruleProduct = d
                        if(d.length <= 0){
                            isError = true
                        }
                        if(isError){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_rule_item'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }
                }else if(this.c.rewardBase == 'productBase'){
                    if(this.c.productBaseOn == 'category'){
                        let ds = this.$refs.selectProCateList.kendoWidget()
                        let d = []
                        let isError = false
                        ds.data().forEach(e => {
                            if(e.category.hasOwnProperty('id')){
                                if(parseFloat(e.amount) > 0){
                                    d.push({
                                        category_id: e.category.id,
                                        amount: e.amount
                                    })
                                    if(parseFloat(e.amount) > 100){
                                        isError = true
                                    }
                                }
                            }
                        })
                        this.c.rewardProductCategory = d
                        if(d.length <= 0){
                            isError = true
                        }
                        if(isError){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_reward_category'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }else if(this.c.productBaseOn == 'group'){
                        let ds = this.$refs.selectProGroupList.kendoWidget()
                        let d = []
                        let isError = false
                        ds.data().forEach(e => {
                            if(e.group.hasOwnProperty('id')){
                                if(parseFloat(e.amount) > 0){
                                    d.push({
                                        group_id: e.group.id,
                                        amount: e.amount
                                    })
                                    if(parseFloat(e.amount) > 100){
                                        isError = true
                                    }
                                }
                            }
                        })
                        this.c.rewardProductGroup = d
                        if(d.length <= 0){
                            isError = true
                        }
                        if(isError){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_reward_group'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }else if(this.c.productBaseOn == 'specific'){
                        let ds = this.$refs.selectProList.kendoWidget()
                        let d = []
                        let isError = false
                        ds.data().forEach(e => {
                            if(e.item.hasOwnProperty('id')){
                                if(parseFloat(e.amount) > 0){
                                    d.push({
                                        item_id: e.item.id,
                                        amount: e.amount
                                    })
                                    if(parseFloat(e.amount) > 100){
                                        isError = true
                                    }
                                }
                            }
                        })
                        this.c.rewardProduct = d
                        if(d.length <= 0){
                            isError = true
                        }
                        if(isError){
                            this.$swal({
                                title: i18n.t('msg_title_warning'),
                                text: i18n.t('check_reward_item'),
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#4d4848",
                                cancelButtonColor: "#ED1A3A",
                                confirmButtonText: i18n.t('ok'),
                            })
                            return
                        }
                    }
                }
                this.c.user = this.loggedUser
                window.console.log(this.c, 'campaig data')
                this.showLoading = true
                commerceHandler.campaignCreate(new CampaignModel(this.c)).then(response => {
                    this.showLoading = false
                    if (response.data.statusCode === 201) {
                        this.showLoading = false
                        this.$swal({
                            position: 'products',
                            icon: 'success',
                            title: i18n.t('your_work_has_been_saved'),
                            showConfirmButton: true,
                            confirmButtonColor: '#4d4848',
                            cancelButtonColor: '#ED1A3A',
                            confirmButtonText: i18n.t('ok')
                        })
                        if (this.isSaveNew == true) {
                            setTimeout(() => {
                                this.clear()
                            }, 10)
                        } else {
                            this.$router.push(`${i18n.locale}` + '/marketing_promotions');
                        }
                        // this.destroy()
                    }
                }).catch(e => {
                    this.showLoading = false
                    this.$snotify.error('Something went wrong')
                    this.errors.push(e)
                })
            },
            cancel() {
                this.$swal({
                    title: i18n.t('msg_title_warning'),
                    text: i18n.t('msg_discard'),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: i18n.t('cancel'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: i18n.t('discard'),
                }).then((result) => {
                    if (result.value) {
                        this.$router.push(`${i18n.locale}` + '/marketing_promotions');
                    }
                });
            },
            clear() {
                this.isEdit = false
                //set default segment
                this.c = new CampaignModel({})
                this.c.user = this.loggedUser
                if (this.isSaveNew == true) {
                    this.c.priceLevel = this.priceLevels[0]
                    this.c.discountItem = this.discountItems[0]
                }
            },
            hide_smallsitebar() {
                this.isHideBar = !this.isHideBar;
            },
            destroy() {
                this.$destroy();
            },
        },
        computed: {
            // reward
            typess(){
                return [
                    {id: 'automatic', name: i18n.t('automatic')},
                    {id: 'manual', name: i18n.t('manual')},
                    {id: 'coupon', name: i18n.t('coupon_number')},
                ]
            },
            rewardBases(){
                return [
                    {id: 'amountBase', name: i18n.t('amount_base')},
                    {id: 'productBase', name: i18n.t('product_base')}
                ]
            },
            rewardTypes(){
                return [
                    {id: 'fixed', name: i18n.t('fixed')},
                    {id: 'varian', name: i18n.t('varian')}
                ]
            },
            rewardAmountTypes(){
                return [
                    {id: 'percentage', name: '%'},
                    {id: 'amount', name: '$'}
                ]
            },
            productBaseOns(){
                return [
                    {id: 'all', name: i18n.t('all')},
                    {id: 'category', name: i18n.t('category')},
                    {id: 'group', name: i18n.t('group')},
                    {id: 'specific', name: i18n.t('specific')},
                ]
            },
            // rule
            ruleBases(){
                return [
                    {id: 'customer', name: i18n.t('customer_base')},
                    {id: 'product', name: i18n.t('product_base')}
                ]
            },
            ruleCustomerBaseTypes(){
                return [
                    {id: 'all', name: i18n.t('all')},
                    {id: 'customerType', name: i18n.t('customer_type')},
                    {id: 'specific', name: i18n.t('specific')},
                ]
            },
            // default
            id() {
                return this.$route.params.id
            },
            disabledMe() {
                return !!this.$route.params.id;
            },
            hiddenButton() {
                if (this.$route.params.id) {
                    return true
                } else {
                    return false
                }
            },
        },
        mounted: async function (){
            await this.initData()
        },
        watch: {
            '$route': 'initData'
        }
    }
</script>
<style scoped>
    .privacy{
        position: absolute;
        bottom: 20px;
        left: 10%;
        width: 100%;
    }
    .grayBg{
        background-color: #F8F8F9;
    }
    .my_table_darkv .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: #222a35;
        color: #fff !important;
    }
    .activeType{
        box-shadow: 0px 1px 16px 5px rgba(161,161,161,0.75) !important;
        -webkit-box-shadow: 0px 1px 16px 5px rgba(161,161,161,0.75)  !important;
        -moz-box-shadow: 0px 1px 16px 5px rgba(161,161,161,0.75)  !important;
    }
    p{
         font-family: "Niradei-Light" !important; 
    }

</style>