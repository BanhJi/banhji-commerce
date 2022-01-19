<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-row>
                <v-col sm="7" class="py-0">
                    <h2 class="mb-0 float-left">{{ $t('period_end_closing_guide') }}</h2>
                    <p class="mb-0 float-left">{{$t('period_end_closing_desc')}}</p>
                </v-col>
                <v-col sm="5" class="py-0">
                    <v-btn color="primary" class=" white--text float-right text-capitalize" link
                           to="period_end_closing_guide">
                        {{ $t('start_new_closing') }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col sm="12" cols="12" class="pb-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('from') }}</th>
                                    <th>{{ $t('to') }}</th>
                                    <th>{{ $t('month_of') }}</th>
                                    <th>{{ $t('description') }}</th>
                                    <th>{{ $t('status') }}</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1/10/2020</td>
                                    <td>31/10/2020</td>
                                    <td>OCT 2020</td>
                                    <td>Month-end closing for Oct</td>
                                    <td>In Progress</td>
                                    <td>
                                        <v-btn class="bg-none">
                                            <v-icon class="primary--text" size="17">fas fa-eye</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>


                                <LoadingMe
                                        :isLoading="compeletLoading"
                                        :fullPage="false"
                                        :myLoading="true"/>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data: () => ({}),
        props: {},
        methods: {},
        mounted: async function () {

        },
        computed: {},
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
    };
</script>

<style scoped>
    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }

    .actionBtn {
        height: 47.2px !important;
    }

    .text_tip {
        font-size: 9px;
        line-height: 10px;
    }

    @media (max-width: 576px) {
    }
</style>
