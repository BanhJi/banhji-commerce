<template>
  <v-app>
    <v-container>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pb-2 pt-2">
                        <v-icon
                            onclick="window.history.go(-1);" 
                            style="
                                cursor: pointer;
                                color: #333;
                                font-size: 40px;
                                "
                                class="float-right"
                            >close
                        </v-icon>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                        <h2 class="mb-3 primary--text font_24">{{$t('you_can_accept_your_customers_payments_online')}}</h2>
                        <p class="font_20" style="line-height: 30px;">
                            <span class="text-bold">
                                {{$t('via_our_partners_payment')}}
                            </span>
                            {{$t('fees_terms')}}
                        </p>
                        <v-card outlined dense class="pa-5 no_border" color="borderGray" min-height="90">
                            <p class=" mb-0 text-bold font_20" style="line-height: 25px;">{{ $t('please_contact_our_team') }}</p>
                        </v-card>
    
                        <p class="mb-0 mt-3 font_14 greyText--text">
                            {{$t('it_is_important_to_note')}}
                        </p>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                        <p class="mb-0 font_20" style="line-height: 30px">
                            {{$t('we_have_partners_with_the')}}
                        </p>
                        
                        <v-data-iterator
                            :items="partnerServices"
                            item-key="name"
                            :items-per-page="4"
                            hide-default-footer
                        >
                            <template v-slot:default="{ items }">
                                <v-row>
                                    <v-col
                                        v-for="item in items"
                                        :key="item.name"
                                        cols="12"
                                        sm="6"
                                        md="4"
                                        lg="3"
                                    >
                                        <v-card @click="onClickBank(item)" class="pa-2">
                                            <img style="height:130px; margin: auto; display:block;" class="borderRadius20" :src="item.image" />
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-data-iterator>
    
                        <p class="mb-0 mt-10 font_12 greyText--text" style="line-height: 18px;">
                            {{$t('these_logo_are')}}
                        </p>
                    </v-col>
                   
                </v-row>

            </v-card>
        </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
    import BankPartnerServiceModel from "@/scripts/model/banking/BankPartnerService.js";

    const BankPartnerServiceHandler = require("@/scripts/handler/banking/BankPartnerService.js");
    const BankPartnerType = require("@/scripts/default_setup/BankPartnerType.js");

    export default {
        data: () => ({
            partnerServices : [],
        }),
        methods: {
            loadPartnerService () {
                BankPartnerServiceHandler.getAll()
                .then((res)=>{
                    let services = [];
                    res.data.forEach(value => {
                        if(value.type.toLowerCase() === BankPartnerType.CARD){
                            services.push(new BankPartnerServiceModel(value));
                        }
                    });

                    this.partnerServices = services;
                });
            },
            onClickBank (bankPartnerService) {
                this.$router.push({ name: 'Connect Bill Payment Account', params: { initBankPartnerService: new BankPartnerServiceModel(bankPartnerService) } });
            },
        },
        mounted() {
            this.loadPartnerService();
        }
    };
</script>
<style scoped>
    .theme--light.v-data-table {
        background-color: transparent !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .borderRadius20{
        border-radius: 20% !important;
    }


    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
    @media (min-width: 1264px) {
  .container {
    max-width: 1080px !important;
  }
}
</style>