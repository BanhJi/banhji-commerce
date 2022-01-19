<template>
    <v-row>
        <v-col sm="12" cols="12" class="pb-0">
            <h1 class="primary--text niradie_heavy">{{$t(types)}}</h1>
        </v-col>
        <v-col cols="12" class="mt-1">
            <v-simple-table class="attachment_table">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>{{$t('default_customer_type')}} </th>
                            <th>{{$t('default_segment')}} </th>
                            <th>{{$t('default_item')}} </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Student</td>
                            <td style="text-align: left;">RUPP</td>
                            <td>Tuition Fee</td>
                        </tr>
<!--                        <tr>-->
<!--                            <td>University</td>-->
<!--                            <td style="text-align: right;">44</td>-->
<!--                            <td style="text-align: right;">abc</td>-->
<!--                        </tr>-->
                    
                    
                    </tbody>
                </template>
            </v-simple-table>
            <p class="text-center privacy mb-0 mt-10">
                <v-icon size="13" class="third--text mr-2 black--text">mdi-key</v-icon>
                {{ $t('at_banhJi_the_privacy') }}
            </p>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" type="loading"/>
    </v-row>
</template>
<script>

    export default {
        props:['propFinalize','types'],
        data: () =>({
            showLoading: false,
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        methods: {

        }
    }
</script>
<style scoped>
    .grayBg{
        background-color: #F8F8F9;
    }
    .my_table_darkv .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: #222a35;
        color: #fff !important;
    }
       .privacy{
        position: absolute;
        bottom: 20px;
        left: 7%;
        width: 100%;
    }

</style>





