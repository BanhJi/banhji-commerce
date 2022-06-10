<template>
    <v-row class="">
        <!-- not modal -->
        <v-col sm="12" cols="12" class="grayBg pr-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <h2 class="font_20 mb-0">{{$t('bank_wallets')}}</h2>
                        <p class="mb-0">{{ $t('bank_wallets_des') }} </p>                           
                        <v-row class="mt-2">
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/bakong.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="bakongBank"
                                                        color="primary"
                                                        :label="bakongBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/aba.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="abaBank"
                                                        color="primary"
                                                        :label="abaBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/aclada.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="acladaBank"
                                                        color="primary"
                                                        :label="acladaBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/amret.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="amretBank"
                                                        color="primary"
                                                        :label="amretBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/bred.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="bredBank"
                                                        color="primary"
                                                        :label="bredBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/phillip.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="phillipBank"
                                                        color="primary"
                                                        :label="phillipBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/ppcb.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="ppcbBank"
                                                        color="primary"
                                                        :label="ppcbBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col> 
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/sathapana.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="sathapanaBank"
                                                        color="primary"
                                                        :label="sathapanaBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>   
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/wing.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="wingBank"
                                                        color="primary"
                                                        :label="wingBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/jtrust.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="jtrustBank"
                                                        color="primary"
                                                        :label="jtrustBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/Kookmin.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="KookminBank"
                                                        color="primary"
                                                        :label="KookminBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/maybank.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="maybankBank"
                                                        color="primary"
                                                        :label="maybankBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/prince.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="princeBank"
                                                        color="primary"
                                                        :label="princeBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/sbi.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="sbiBank"
                                                        color="primary"
                                                        :label="sbiBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/shinhan.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="shinhanBank"
                                                        color="primary"
                                                        :label="shinhanBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                            <v-col sm="2" cols="6" class="pt-0">
                                <v-card
                                    class="mx-auto"
                                    max-width="465"
                                    outlined
                                   
                                >
                                    <v-list-item three-line>
                                        <v-list-item-content class="pk-3">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <img
                                                        class="img-1"
                                                        src="@/assets/images/bank/amk.png"
                                                        width="100%"
                                                    />
                                                    <v-switch
                                                        class="px-2"
                                                        v-model="amkBank"
                                                        color="primary"
                                                        :label="amkBank ? 'ON' : 'OFF'"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-col>             
                        </v-row>
                        <v-divider/>

                        <v-card outlined dense class="no_border function_footer">
                            <v-btn color="primary" class="float-right white--text" @click="onSaveClose">
                                {{ $t('save') }}
                            </v-btn>
                        </v-card>
                    </v-col>
                </v-row>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {

    components: {},
    data: () => ({
        bakongBank : " ",
        abaBank : " ",
        acladaBank : " ",
        amretBank : " ",
        bredBank : " ",
        phillipBank : " ",
        ppcbBank : " ",
        sathapanaBank : " ",
        jtrust : " ",
        KookminBank : " ",
        maybankBank : " ",
        princeBank : " ",
        sbiBank : "",
        shinhanBank : " ",
        amkBank : " ",
        wingBank : " ",
        }
    ),
    props: {}
    ,
    computed: {}
    ,
    watch: {}
    ,
    created() {
    }
    ,
    methods: {
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        id: this.saleFormContent.id ? this.saleFormContent.id : '',
                        serviceDate: this.saleFormContent.serviceDate,
                        serviceDateTo: this.saleFormContent.serviceDateTo,
                        discountItem: this.saleFormContent.discountItem,
                        otherCharge: this.saleFormContent.otherCharge,
                        specificTax: this.saleFormContent.specificTax,
                        otherTax: this.saleFormContent.otherTax,
                        publicLightingTax: this.saleFormContent.publicLightingTax,
                        saleUnit: this.saleFormContent.saleUnit,
                        modifier: this.saleFormContent.modifier,
                        employee: this.saleFormContent.employee,
                        decimal: this.saleFormContent.decimal,
                        saleQuote: this.saleFormContent.saleQuote,
                        saleOrder: this.saleFormContent.saleOrder,

                        negativeInventory: this.saleFormContent.negativeInventory,
                        lateFee: this.saleFormContent.lateFee,
                        email: this.saleFormContent.email,
                        pdfAttachment: this.saleFormContent.pdfAttachment,
                        invoiceReminder: this.saleFormContent.invoiceReminder,
                        reminder1: this.saleFormContent.reminder1,
                        reminder2: this.saleFormContent.reminder2,
                        reminder3: this.saleFormContent.reminder3,
                        statement: this.saleFormContent.statement
                    }
                    saleFormContentHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data
                            this.saleFormContent = res
                            this.$snotify.success('Update Successfully')
                            // this.$refs.form.reset()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })

                }, 300);
            })
        },
        async loadSaleFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.saleFormContent = data[0]
                            }
                        }

                    })
                }, 10)
            })
        },
    }
    ,
    mounted: async function () {
        await this.loadSaleFormContent()
    }
}
;
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
    border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
}

.btn_save {
    color: #ffffff;
    text-transform: capitalize;
}
.w_100{
    width: 100px !important;
}

.float-right {
    margin-top: 0px !important;
}

.float-left {
    margin-top: 0px !important;

}

.v-input--switch {
    margin-top: 0px;
    height: 30px;
}



</style>