<template>
        <v-row class="grayBg">
            <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                    <v-row class="">
                        <v-col sm="10" cols="12" class="py-0">
                                 <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                        </v-col>

                        <v-col sm="1" cols="1" class="py-0 mt-1">
                            <v-btn color="primary white--text"
                                    @click="searchTransaction"
                            >
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="">
                        <v-col sm="12" cols="12" class="py-0">
                            <v-simple-table class="attachment_table" fixed-header
                                            height="300px">
                                <v-data-table
                                    :headers="headers"
                                    :items="journal_entries"
                                    class="elevation-1"
                                >
                                    <!-- Journal Date -->
                                    <template v-slot:item.journal_date="{ item }">
                                        <span>{{ dateFormat(item.journal_date) }}</span>
                                    </template>

                                    <!-- Journal Number as Link -->
                                    <template v-slot:item.journal_number="{ item }">
                                        <router-link :to="'journal/view/' + item.id">{{
                                                item.journal_number
                                            }}
                                        </router-link>
                                    </template>
                                </v-data-table>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
</template>
<script>
import SearchDateComponent from '@/components/custom_templates/SearchDate'
  import {i18n} from '@/i18n'
export default {
    components: {
        'app-searchdate': SearchDateComponent,
    },
    data: () => ({
        attachments: [],
        endDate: '',
        startDate: '',
        journal_entries: [],
    }),
    computed: {
        headers() {
            return [
                {text: i18n.t('month'), value: 'month'},
                {text: i18n.t('name'), value: 'name'},
                {text: i18n.t('uom'), value: 'uom'},
                {text: i18n.t('unit'), value: 'uom'},
                {text: i18n.t('amount'), value: 'amount'},
            ]
        },
    },
    methods: {
        searchTransaction(){

        }
    }
}
</script>
<style scoped>
</style>