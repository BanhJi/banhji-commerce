<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('resident') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('non_resident') }}
                    </span>
                </v-tab>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Resident :withholding="withholdings" @getAmountResident="getAmountResident"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <NoResident :withholding="withholdings" @getAmountNonResident="getAmountNonResident"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>

const withholdingHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
export default {
    data: () => ({
        withholdings: [],
        amount: 0,
    }),
    props: ['withholding'],
    watch: {'withholdingSP': 'onloadWithholding'},
    methods: {
        async onloadWithholding() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.withholdingSP.length <= 0) {
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve('resolved');
                                withholdingHandler.getByMrId(this.$route.params.id).then(async res => {
                                    this.withholdings = res.data.data
                                    window.console.log('withholding', this.withholdings)
                                })
                            }, 100)
                        })
                    } else {
                        this.withholdings = this.withholdingSP
                    }
                }, 300)
            })

        },
        async getAmountResident(amount) {
            this.amount += amount
            window.console.log(amount, 'get amount resident')
            await this.onUpdate()
        },
        async getAmountNonResident(amount) {
            this.amount += amount
            window.console.log(amount, 'get amount non resident')
            await this.onUpdate()
        },
        async onUpdate() {
            this.$emit('getAmountWithholdingTax', this.amount)
        },
    },
    async mounted() {
        await this.onloadWithholding()
    },
    computed: {
        withholdingSP() {
            if (this.withholding !== undefined) {
                return this.withholding
            } else {
                return []
            }
        }
    },
    components: {
        Resident: () => import('./withholdingtax/Resident'),
        NoResident: () => import('./withholdingtax/NoResident'),
    },
};
</script>

<style scoped>
.v-tab--active {
    background-color: #E5EFFA;
    color: #000;
}

.v-tab {
    min-width: 30px;
    font-size: 17px;
    text-transform: capitalize;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}
</style>
