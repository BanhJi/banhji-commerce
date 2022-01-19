<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="12" class="py-0 mt-1">
                        <v-btn class="btn_search"  color="primary">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <!-- <v-col sm="2" cols="12" class="py-0 text-right">
                        <v-btn icon color="black" class="bg-none float-right ">
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col> -->
                </v-row>


                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                         <v-simple-table class="attachment_table">
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th>{{$t('project')}}</th>
                                            <th>{{$t('name')}}</th>
                                            <th>{{$t('type')}}</th>
                                            <th>{{$t('num')}}</th>
                                            <th>{{$t('amount')}}</th>
                                            <th>{{$t('status')}}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SearchDateComponent from '@/components/custom_templates/SearchDate'
export default {
    data: () => ({
        startDate: "",
        endDate: "",

    }),
    components: {
        'app-searchdate': SearchDateComponent,
        // LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
  
    },
    computed: {},
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

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

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
