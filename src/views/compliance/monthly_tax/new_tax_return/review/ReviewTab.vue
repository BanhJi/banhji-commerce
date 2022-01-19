<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col sm="12" cols="12">
                <div style="background-color: #fff; padding: 0 0 5px;">
                    <v-tabs vertical class="tab_small" slider-color="grayBg" slider-size="7">
                        <!-- <span class="hideAbs">
                            <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
                            >mdi-chevron-left-circle
                            </v-icon>
                            <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
                            >mdi-chevron-right-circle
                            </v-icon>
                        </span> -->
                        <!--                    <v-tab>-->
                        <!--                        <span class="hidden-sm-and-up">-->
                        <!--                            <v-icon left>mdi-pen</v-icon>-->
                        <!--                        </span>-->
                        <!--                        <span class="hidden-sm-and-down text-capitalize">-->
                        <!--                            {{ $t('tax_credit') }}-->
                        <!--                        </span>-->
                        <!--                    </v-tab>-->
                        <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                            <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('value_added_tax') }}
                        </span>
                        </v-tab>
                        <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                            <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('tax_on_salary') }}
                        </span>
                        </v-tab>
                        <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                            <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('withholding_tax') }}
                        </span>
                        </v-tab>

                        <!--                    <v-tab-item>-->
                        <!--                        <v-row>-->
                        <!--                            <v-col sm="12" cols="12" class="pl-6 pt-0">-->
                        <!--                                <TaxCredit :monthlyReturn="monthlyReturn"/>-->
                        <!--                            </v-col>-->
                        <!--                        </v-row>-->
                        <!--                    </v-tab-item>-->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-6 pt-0">
                                    <ValueAdded :sale="sales" :purchase="purchases"
                                                @getOtherAmount="getOtherAmount" @getAmountPurchaseExcul="getAmountPurchaseExcul"
                                                @getAmountSale="getAmountSale" @getAmountSaleExcul="getAmountSaleExcul"
                                                @getTotalAmountPurchase="getTotalAmountPurchase"/>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-6 pt-0">
                                    <TaxOnSalalry :salary="salaries" @getTaxSalary="getTaxSalary" @getTaxBenefit="getTaxBenefit"/>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-6 pt-0">
                                    <Withholdingtax :withholding="withholdings" @getAmountWithholdingTax="getWithholdingTax"/>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </v-tabs>
                </div>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
// const saleHandler = require("@/scripts/compliance/handler/saleHandler")
export default {
    name: 'ReviewTab',
    data: () => ({
        isHide: false,
        amount: 0,
        statusGot: false,
        valid: true,
        amountWht: 0,
        amountSalary: 0,
        amountBenefit: 0,
        amountSale: 0,
        amountSaleExcul: 0,
        amountTotalPurchase: 0,
        amountPurchaseExcul: 0,
        otherAmount: 0,
    }),
    props: ['monthlyReturn', 'sale', 'purchase', 'salary', 'withholding'],
    watch: {
        // 'status': 'getAllAmount',
    },
    computed: {
        sales() {
            if (this.sale !== undefined) {
                window.console.log('sale reveiw tab', this.sale)
                return this.sale
            } else {
                return []
            }
        },
        purchases() {
            if (this.purchase !== undefined) {
                return this.purchase
            } else {
                return []
            }
        },
        salaries() {
            if (this.salary !== undefined) {
                return this.salary
            } else {
                return []
            }
        },
        withholdings() {
            if (this.withholding !== undefined) {
                return this.withholding
            } else {
                return []
            }
        },
    },
    methods: {
        // async getAllAmount() {
        //     window.console.log(this.status, '09876')
        //     if (this.status) {
        //         await this.onloadSale()
        //         new Promise(resolve => {
        //             setTimeout(async () => {
        //                 resolve('resolved');
        //                 await this.onUpdate()
        //             }, 100)
        //         })
        //         this.statusGot = true
        //     }
        // },
        // async onloadSale() {
        //     this.showLoading = true
        //     new Promise(resolve => {
        //         setTimeout(async () => {
        //             resolve('resolved');
        //             await saleHandler.getByMrId(this.$route.params.id).then(async res => {
        //                 this.sales = res.data.data
        //                 await this.onCalculateSaleTax(res.data.data)
        //             })
        //         }, 100)
        //     })
        // },
        // async onCalculateSaleTax(data) {
        //     this.showLoading = true
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved');
        //             // let totalAmountNet = 0
        //             let amountNet1 = 0,
        //                 amountNet2 = 0, amountSNet1 = 0,
        //                 amountNet3 = 0, amountNet4 = 0,
        //                 amountNet5 = 0, amountSNet2 = 0
        //             for (let i = 0; i < data.length; i++) {
        //                 if (data[i].customer.nature.name.toLowerCase() === 'individual-local' || data[i].customer.nature.name.toLowerCase() === 'taxable entity') {
        //                     if (data[i].totalAmountInclusive > 0) {
        //                         amountNet1 += data[i].totalAmountInclusive
        //                             + data[i].totalSpecificTax
        //                             + data[i].totalPubTax
        //                             + data[i].totalAccomTax
        //                     }
        //                     if (data[i].totalAmountNetVat > 0) {
        //                         amountNet4 += data[i].totalAmountNetVat
        //                     }
        //                 }else if (data[i].customer.nature.name.toLowerCase() === 'non-taxable entity') {
        //                     if (data[i].totalAmountInclusive > 0) {
        //                         amountNet2 += data[i].totalAmountInclusive
        //                             + data[i].totalSpecificTax
        //                             + data[i].totalPubTax
        //                             + data[i].totalAccomTax
        //                     }
        //                     if (data[i].totalAmountNetVat > 0) {
        //                         amountNet5 += data[i].totalAmountNetVat
        //                     }
        //                 }else if (data[i].customer.nature.name.toLowerCase() === 'foreign entity' || data[i].customer.nature.name.toLowerCase() === 'individual-foreign') {
        //                     amountNet3 += data[i].totalAmountInclusive
        //                         + data[i].totalAmountNetVat
        //                         + data[i].totalSpecificTax
        //                         + data[i].totalPubTax
        //                         + data[i].totalAccomTax
        //                 }
        //                 if (data[i].typeProduct.defaultTax === "VAT 10 (State Charge)") {
        //                     if (data[i].customer.nature.name.toLowerCase() === 'individual-local' || data[i].customer.nature.name.toLowerCase() === 'taxable entity') {
        //                         amountSNet1 += data[i].totalAmountInclusive
        //                     } else if (data[i].customer.nature.name.toLowerCase() === 'non-taxable entity') {
        //                         amountSNet2 += data[i].totalAmountInclusive
        //                     }
        //                 }
        //             }
        //             window.console.log(amountNet1, amountNet2, amountNet3, amountNet4, amountNet5, amountSNet1, amountSNet2,'123')
        //             this.amount = amountNet1 + amountNet2 + amountNet3 + amountNet4 + amountNet5 + amountSNet1 + amountSNet2
        //         }, 200)
        //     })
        // },
        getOtherAmount(amount) {
            this.otherAmount = amount
            this.onUpdate()
        },
        getWithholdingTax(amount) {
            window.console.log('review tab wht', amount)
            this.amountWht = amount
            this.onUpdate()
        },
        getTaxSalary(amount) {
            this.amountSalary = amount
            this.onUpdate()
        },
        getTaxBenefit(amount) {
            this.amountBenefit = amount
            this.onUpdate()
        },
        getAmountSale(amount) {
            if (!this.statusGot) {
                this.amountSale = amount
            }
            window.console.log(this.amountSale, 'ReviewTab s')
            this.onUpdate()
        },
        getAmountSaleExcul(saleExcul) {
            this.amountSaleExcul = saleExcul
            this.onUpdate()
            window.console.log(this.amountSaleExcul, 'ReviewTab se')
        },
        getTotalAmountPurchase(amount) {
            if (!this.statusGot) {
                this.amountTotalPurchase = amount
            }
            window.console.log(this.amountPurchase, 'ReviewTab p')
            this.onUpdate()
        },
        getAmountPurchaseExcul(amount) {
            this.amountPurchaseExcul = amount
        },
        async onUpdate() {
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    window.console.log(this.amountSale, this.amountPurchase, this.amountSalary, 'afsd')
                    if (this.amountSale >= 0 || this.amountTotalPurchase >= 0 || this.amountSalary >= 0 || this.amountBenefit >= 0) {
                        this.$emit('getAmountSale', this.amountSale)
                        this.$emit('getTotalAmountPurchase', this.amountTotalPurchase)
                        this.$emit('getAmountPurchaseExcul', this.amountPurchaseExcul)
                        this.$emit('getAmountWht', this.amountWht)
                        this.$emit('getTaxSalary', this.amountSalary)
                        this.$emit('getTaxBenefit', this.amountBenefit)
                        this.$emit('getOtherAmount', this.otherAmount)
                        this.$emit('getAmountSaleExcul', this.amountSaleExcul)
                        this.$emit('isValidate2', true)
                        window.console.log('1234')
                    } else {
                        this.$emit('isValidate2', false)
                        window.console.log('554')
                    }
                }, 500)
            })

        },
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link)
            //eslint-disable-next-line no-console
            //console.log(data)
        },
        hideTabs() {
            this.isHide = !this.isHide;
        },
    },
    components: {
        // TaxCredit: () => import('../confirm/TaxCredit'),
        ValueAdded: () => import('./ValueAdded'),
        TaxOnSalalry: () => import('./TaxOnSalalry'),
        Withholdingtax: () => import('./Withholdingtax')
    },
};
</script>
<style scoped>
.v-tab--active {
    background-color: rgb(255, 255, 255);
}

.v-tab {
    justify-content: left;
    font-size: 16px;
}

.tab_setting .v-tab--active {
    font-weight: 700;
    color: #000;
}

.v-tab--active {
    background-color: #ffffff !important;
    border-bottom: 4px solid #92d050;
    border-left: none;
}

.tab_product_service_show.theme--light .v-slide-group__content {
    width: 140px !important;
}

</style>
