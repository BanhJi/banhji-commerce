<template>
    <v-row>
        <v-col sm="7" cols="12" class="pb-0">
            <h2>{{$t('usage_limits')}}</h2>
            <p>{{$t('usage_desc')}} 
                <router-link to="new_plane" class="lightBlue1">{{$t('new_plan')}}</router-link>
            </p>
            <v-row>
                <v-col sm="12" cols="12" class="py-2">
                    <h3 class="float-left mb-1 black--text">{{$t('billable_user')}}</h3>
                    <p class="float-right mb-1">1 OF 5</p>
                    <v-card outlined dense class="no_border progress">
                        <v-card outlined dense class="no_border bar" style="width:35%">
                            <!-- <p class="percent">35%</p> -->
                        </v-card>
                    </v-card>
                    <p class="lightBlue1">1 user</p>
                </v-col>
                <v-col sm="12" cols="12" class="py-2">
                    <h3 class="float-left mb-1 black--text">{{$t('chart_of_account')}}</h3>
                    <p class="float-right mb-1">100 OF 250</p>
                    <v-card outlined dense class="no_border progress">
                        <v-card outlined dense class="no_border bar" style="width:35%">
                            <!-- <p class="percent">35%</p> -->
                        </v-card>
                    </v-card>
                    <p class="lightBlue1 mb-0">100 account (s)</p>
                </v-col>
                <v-col sm="12" cols="12" class="py-2">
                    <h3 class="float-left mb-1 black--text">{{$t('segment_class')}}</h3>
                    <p class="float-right mb-1">1 OF 40</p>
                    <v-card outlined dense class="no_border progress">
                        <v-card outlined dense class="no_border bar" :width="bar_with">
                            <!-- <p class="percent">35%</p> -->
                        </v-card>
                    </v-card>
                    <p class=" mb-0"><span class="lightBlue1">1 segment (s)</span> and <span class="lightBlue1"> 5 class (es)</span></p>
                </v-col>
            </v-row>
        </v-col>
        <v-col sm="5" cols="12" class="pb-0">
            <v-card outlined dense class="pa-5 no_border"  color="grayBg">
                <v-row>
                    <v-col sm="6" cols="6" class="py-0">
                       <v-img width="150" src="@/assets/images/banhji_accouning.png"/>
                    </v-col>
                    <v-col class="py-0">
                        <v-btn class="text-capitalize white--text rounded-0" color="greyGreen">{{$t('advanced_edition')}}</v-btn>
                    </v-col>
                    <v-col sm="12" cols="12" class="text-left">
                        <h4 class="text-left">{{$t('usage_desc1')}}</h4>
                        <ul class="text-left pl-4">
                            <li>{{$t('usage_list2')}}</li>
                            <li>{{$t('usage_list3')}}</li>
                            <li>{{$t('usage_list4')}}</li>
                            <li>{{$t('usage_list5')}}</li>
                            <li>{{$t('usage_list6')}}</li>
                            <li>{{$t('usage_list7')}}</li>
                            <li>{{$t('usage_list8')}}</li>
                            <li>{{$t('usage_list9')}}</li>
                            <li>{{$t('usage_list10')}}</li>
                        </ul>
                         <v-btn class="float-left text-capitalize white--text rounded-0 mt-3" color="primary">{{$t('upgrade_now')}}</v-btn>
                    </v-col>
                </v-row>

            </v-card>

        </v-col>
    </v-row>
</template>

<script>
    import {i18n} from '@/i18n'

    export default {
        components: {},
        data: () => ({
            bar_with: "65%",
            invoices: [
                {
                    name: 'Subscribe date',
                    calories: '26/10/2020',
                },
                {
                    name: 'To be renewed',
                    calories: '26/10/2020',
                },
                {
                    name: 'Subscription Fre per month',
                    calories: '50',
                }

            ],

        }),
        mounted() {
        },
        computed: {
            fields() {
                return [
                    '30 ' + i18n.t('days_summary'),
                    '60 ' + i18n.t('days_summary'),
                ]
            },
        },
    };
</script>
<style scoped>
.progress {
  margin: 0px 0px;
  padding:0;
  width:100%;
  height:30px;
  overflow:hidden;
  background:#e2f0d9;
  border-radius:6px;
}

.bar {
  position:relative;
  float:left;
  min-width:1%;
  height:100%;
  background:#385723;
}
.lightBlue1{
    color: #0eb6f1;
    text-decoration: none;
}
</style>