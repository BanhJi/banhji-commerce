<template>
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


                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                                <ValueAdded :currency="currencies" :monthlyReturn="data" @getPurchase="getPurchase" @getSale="getSale"/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                                <Salary :currency="currencies" :monthlyReturn="data" @getSalary="getSalary"/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                                <Withholding :currency="currencies" :monthlyReturn="data" @getWithholding="getWithholding"/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Sales',
    data: () => ({
        isHide: false,
        sales: [],
        purchases: [],
    }),
    props: ['monthlyReturn', 'currency'],
    computed: {
        currencies() {
            if (this.currency) {
                return this.currency
            } else {
                return {}
            }
        },
        data() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn
            }else {
                return {}
            }
        }
    },
    methods: {
        getSalary(salary) {
            window.console.log(salary, 'get salary from input')
            this.onUpdateSalary(salary)
        },
        onUpdateSalary(salary) {
            this.$emit('getSalary', salary)
        },
        getSale(sale) {
            this.sales = sale
            this.onUpdateSale()
        },
        onUpdateSale() {
            this.$emit('getSale', this.sales)
        },
        getPurchase(purchase) {
            this.purchases = purchase
            this.onUpdatePurchase()
            window.console.log('vat purchase inputtab', this.purchases)
        },
        onUpdatePurchase() {
            this.$emit('getPurchase', this.purchases)
        },
        getWithholding(withholding) {
            this.onUpdateWithholding(withholding)
            window.console.log('vat withholding input', withholding)
        },
        onUpdateWithholding(withholding) {
            this.$emit('getWithholding', withholding)
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
        hideTabs(){
            this.isHide = !this.isHide;
        },
    },
    components: {
        ValueAdded: ()=> import('./ValueAdded'),
        Salary: ()=> import('./Salary'),
        Withholding: ()=> import('./Withholding')
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
.tab_product_service_show.theme--light .v-slide-group__content{
    width: 140px !important;
}

</style>
