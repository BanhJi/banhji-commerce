<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <v-tabs vertical class="tab_setting" slider-color="grayBg" slider-size="7">
<!--                <v-tab>-->
<!--					<span class="hidden-sm-and-up">-->
<!--						<v-icon left>mdi-pen</v-icon>-->
<!--					</span>-->
<!--                    <span class="hidden-sm-and-down text-capitalize">-->
<!--						{{$t('warehouse')}}-->
<!--					</span>-->
<!--                </v-tab>-->
                <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
						{{$t('zone')}}
					</span>
                </v-tab>
                <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
						{{$t('section')}}
					</span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{$t('rack')}}
                    </span>
                </v-tab>
                <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
						{{$t('level')}}
					</span>
                </v-tab>
<!--                <v-tab>-->
<!--					<span class="hidden-sm-and-up">-->
<!--						<v-icon left>mdi-pen</v-icon>-->
<!--					</span>-->
<!--                    <span class="hidden-sm-and-down text-capitalize">-->
<!--						{{$t('employee_to_warehouse')}}-->
<!--					</span>-->
<!--                </v-tab>-->
<!--                <v-tab>-->
<!--					<span class="hidden-sm-and-up">-->
<!--						<v-icon left>mdi-pen</v-icon>-->
<!--					</span>-->
<!--                    <span class="hidden-sm-and-down text-capitalize">-->
<!--						{{$t('transaction_prefix')}}-->
<!--					</span>-->
<!--                </v-tab>-->
<!--                <v-tab>-->
<!--					<span class="hidden-sm-and-up">-->
<!--						<v-icon left>mdi-pen</v-icon>-->
<!--					</span>-->
<!--                    <span class="hidden-sm-and-down text-capitalize">-->
<!--						{{$t('form')}}-->
<!--					</span>-->
<!--                </v-tab>-->

<!--                <v-tab-item>-->
<!--                    <v-card flat class="px-5 custom_vcard">-->
<!--                        <v-card-text class="pt-0 bg_white">-->
<!--                            <WarehouseSetting/>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-tab-item>-->
                <v-tab-item>
                              <v-card flat>
              <v-card-text class="pt-0">
                            <Zone/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat class="px-5 custom_vcard">
                        <v-card-text class="pt-0 bg_white">
                            <Section/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat class="px-5 custom_vcard">
                        <v-card-text class="pt-0 bg_white">
                            <Rack/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat class="px-5 custom_vcard">
                        <v-card-text class="pt-0 bg_white">
                            <Level/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
<!--                <v-tab-item>-->
<!--                    <v-card flat class="px-5 custom_vcard">-->
<!--                        <v-card-text class="pt-0 bg_white">-->
<!--                            <EmployeeToWarehouse/>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-tab-item>-->
<!--                <v-tab-item>-->
<!--                    <v-card flat class="px-5 custom_vcard">-->
<!--                        <v-card-text class="pt-0 bg_white">-->
<!--                            <TransactionPrefix/>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-tab-item>-->
<!--                <v-tab-item>-->
<!--                    <v-card flat class="px-5 custom_vcard">-->
<!--                        <v-card-text class="pt-0 bg_white">-->
<!--                            <Form/>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-tab-item>-->
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
 // import EmployeeToWarehouse from "./EmployeeToWarehouse";
    import Level from "./Level";
    import Rack from "./Rack";
    import Section from "./Section";
    import Zone from "./Zone";
    // import WarehouseSetting from "./WarehouseSetting";

    export default {
        data: () => ({
        }),
        props: {
        },
        methods: {
            clickMe(data) {
                // alert(data.link)
                this.$router.push(`${data.link}`);
                //this.$event.target.classList.toggle(active)
                //eslint-disable-next-line no-console
                console.log(data.link)
                //eslint-disable-next-line no-console
                //console.log(data)
            }
        },
        components: {
            Zone,
            Section,
            Rack,
            Level,
        },
    };
</script>
<style scoped>
    .v-tab{
        justify-content: left;
        font-size: 16px;
    }
    .v-tab--active{
        background-color: #ffffff !important;
        border-bottom: 4px solid #92d050;
        border-left: none;
    }
    .tab_setting .v-tab--active{
        font-weight: 700;
        color: #000;
    }

    @media (max-width: 576px){

    }
</style>
