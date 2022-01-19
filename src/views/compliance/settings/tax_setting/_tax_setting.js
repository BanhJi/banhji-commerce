/*
 * Last modified : 3/29/21, 11:11 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
import {i18n} from "@/i18n";
import {
    ListTaxModel,
    NatureTaxPayerModel,
    SupplierCustomerTaxModel,
    TaxPayerModel,
    TypeTaxModel
} from "@/scripts/model/AppModels";

const apiUrl = require('@/apiUrl')
const taxSetting = require('@/store/taxSetting');
const taxSettingHandler = require('@/scripts/taxSettingHandler')
export default {
    name: 'Tax_setting',

    components: {
        LoadingMe: () => import('@/components/Loading')
    },

    mixins: [],

    props: {},

    data () {
        return {
            showLoading: false,
            tabTaxSetting: [
                {
                    id: 1,
                    name: i18n.t('type_of_tax')
                },
                {
                    id: 2,
                    name: i18n.t('list_of_tax')
                },
                {
                    id: 3,
                    name: i18n.t('type_of_tax_payer')
                },
                {
                    id: 4,
                    name: i18n.t("nature_of_tax_payer")
                },
                {
                    id: 5,
                    name: i18n.t("type_of_customer_supplier")
                }
            ],
            title: '',
            step: 1,
            dialogCloneTypeTax: false,
            noClone: false,
            selectTax: {},
            defaultTaxFix: '',
            listTaxClones: [],
            progress_load: true,
            text_load: i18n.t('loading_please_wait'),
            headerListTax: [
                {
                    text: i18n.t('id'),
                    value: 'id',
                    align: 'center',
                },
                {
                    text: i18n.t('sub_id'),
                    value: 'subId',
                    align: 'center',
                },
                {
                    text: i18n.t('default_tax'),
                    value: 'defaultTax',
                    align: 'center',
                },
                {
                    text: i18n.t('transaction'),
                    value: 'transac',
                    align: 'center',
                },
                {
                    text: i18n.t('description'),
                    value: 'desc',
                    align: 'center',
                    width: "25%"
                },
                {
                    text: i18n.t('accounts'),
                    value: 'acc',
                    align: 'center',
                },
                {
                    text: i18n.t('tax_base'),
                    value: 'taxBase',
                    align: 'center',
                },
                {
                    text: i18n.t('rate'),
                    value: 'rate',
                    align: 'center',
                },
                {
                    text: i18n.t('base_amount'),
                    value: 'baseAmount',
                    align: 'center',
                },
                {
                    text: i18n.t('nature_of_tax_payers'),
                    value: 'natureTaxPayer',
                    align: 'center',
                },
                {
                    text: i18n.t('action'),
                    value: 'action',
                    align: 'center',
                },

            ],
            typeTax: new TypeTaxModel({}),
            listTax: new ListTaxModel({}),
            supplierCustomerTax: new SupplierCustomerTaxModel({}),
            taxPayer: new TaxPayerModel({}),
            natureTaxPayer: new NatureTaxPayerModel({}),
        }
    },

    computed: {
        listTaxs: {
            set(listTax) {
                taxSetting.default.commit("setListTax", listTax)
            },
            get() {
                return taxSetting.default.state.listTax
            }
        },
        typeTaxs: {
            set(typeTax) {
                taxSetting.default.commit("setTypeTax", typeTax)
            },
            get() {
                return taxSetting.default.state.typeTax
            }
        },
        supplierCustomerTaxs: {
            set(SuppliersCustomerTax) {
                taxSetting.default.commit("setSupplierCustomerTax", SuppliersCustomerTax)
            },
            get() {
                return taxSetting.default.state.supplierCustomerTax
            }
        },
        taxPayers: {
            set(taxPayer) {
                taxSetting.default.commit("setTaxPayer", taxPayer)
            },
            get() {
                return taxSetting.default.state.taxPayer
            }
        },
        natureTaxPayers: {
            set(natureWithholding) {
                taxSetting.default.commit("setNatureWithholdingTax", natureWithholding)
                this.loadData()
            },
            get() {
                return taxSetting.default.state.natureTaxPayer
            }
        },
    },

    watch: {},

    created () {},

    mounted() {
        this.loadData()
    },

    methods: {
        async onClickCloneTax() {
            this.dialogCloneTypeTax = true
            this.title = "clone_tax"
            this.selectTax = []
            this.step = 1
            for (let i = 0; i < this.listTaxs.length; i++) {
                if (this.listTaxs[i].isClone !== 1) {
                    this.listTaxClones.push(this.listTaxs[i])
                }
            }
        },
        async onClone() {
            if (this.selectTax.length !== 0) {
                this.selectTax.id = ''
                this.defaultTaxFix = this.selectTax.defaultTax
                this.step = 2
                this.noClone = false
            } else {
                alert("Please Choose one tax of default tax")
            }
        },
        async onEditTax(item) {
            this.step = 2
            this.selectTax = []
            this.title = 'Edit Tax "' + item.defaultTax + '"'
            setTimeout(() => {
                this.dialogCloneTypeTax = true
            }, 300)
            this.defaultTaxFix = ''
            this.selectTax = item
            this.noClone = true
        },
        async onSaveCloseTax() {
            window.console.log(this.selectTax.defaultTax)
            let ListTax
            if (this.selectTax.id) {
                ListTax = {
                    id: this.selectTax.id,
                    defaultTax: this.selectTax.defaultTax,
                }
            } else {
                ListTax = {
                    id: this.selectTax.id || '',
                    subId: this.selectTax.subId,
                    defaultTax: this.defaultTaxFix,
                    desc: this.selectTax.desc,
                    acc: this.selectTax.acc,
                    natureTaxPayer: this.selectTax.natureTaxPayer,
                    rate: this.selectTax.rate,
                    taxBase: this.selectTax.taxBase,
                    baseAmount: this.selectTax.baseAmount,
                    transac: this.selectTax.transac,
                    formula: this.selectTax.formula,
                }
            }

            taxSettingHandler.save(ListTax).then(() => {
                this.selectTax = []
                this.step = 1
                this.dialogCloneTypeTax = false

            })
        },

        async timeSet() {
            setTimeout(() => {
                this.progress_load = false
                this.text_load = 'No Data Here!'
            }, 3000)
        },
        async loadListTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_list_get, "listTax", "setListTax")
                }, 500)
            })
        },
        async loadTypeTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_type_get, "typeTax", "setTypeTax")
                }, 200)
            })
            window.console.log(this.typeTax)
        },
        async loadTaxPayer() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_payer_get, "taxPayer", "setTaxPayer")
                }, 1000)
            })
        },
        async loadTypeCustomer() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_supcus_get, "taxCustomerSupplier", "setSupplierCustomerTax")
                }, 3000)
            })
        },
        async loadNatureTaxPayer() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_nature_get, "natureTaxPayer", "setNatureTaxPayer")
                }, 2000)
            })
        },
        async loadData() {
            this.showLoading = true
            await this.loadTypeCustomer()
            await this.loadListTax()
            await this.loadNatureTaxPayer()
            await this.loadTypeTax()
            await this.loadTaxPayer()
            this.showLoading = false
        }
    }
}
