<template>
    <v-row>
        <v-col sm="12" cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('name') }}</td>
                            <td class="text-left text-bold">{{ name }}</td>
                        </tr>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('code') }}</td>
                            <td class="text-left text-bold">{{ code }}</td>
                        </tr>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('type') }}</td>
                            <td class="text-left text-bold">{{ type }}</td>
                        </tr>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('discount_item') }}</td>
                            <td class="text-left text-bold">{{ discountItem }}</td>
                        </tr>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('effective_date') }}</td>
                            <td class="text-left text-bold">{{ effectiveDate }}</td>
                        </tr>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('end_date') }}</td>
                            <td class="text-left text-bold">{{ endDate }}</td>
                        </tr>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('description') }}</td>
                            <td class="text-left text-bold">{{ description }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <v-col sm="12" cols="6" class="py-0">
                        <router-link
                            :to="{path: routerTo, query: { type: 'edit'} }">
                            <v-btn width="100" color="primary" :disabled="btnEnabled"
                                   class=" white--text float-right text-capitalize">
                                {{ $t('edit_info') }}
                            </v-btn>
                        </router-link>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-0" v-if="!enableDelete">
                        <v-btn width="100" color="primary"
                               :disabled="enableDelete"
                               @click="deleteCampaign"
                               class=" white--text float-right text-capitalize mx-1">
                            {{ $t('delete') }}
                        </v-btn>
                    </v-col>
                </v-col>

            </v-row>
        </v-col>
    </v-row>
</template>
<script>

export default {
    name: "CampaignInfo",
    props: {campaign: {}},
    mounted() {
    },
    computed: {
        name() {
            if (this.campaign) {
                if (this.campaign.hasOwnProperty('name')) {
                    return this.campaign.name
                }
            }
            return ''
        },
        code() {
            if (this.campaign) {
                if (this.campaign.hasOwnProperty('code')) {
                    return this.campaign.code
                }
            }
            return ''
        },
        type() {
            if (this.campaign) {
                if (this.campaign.hasOwnProperty('type')) {
                    return this.campaign.type
                }
            }
            return ''
        },
        discountItem() {
            if (this.campaign) {
                if (this.campaign.hasOwnProperty('discountItem')) {
                    return this.campaign.discountItem.name
                }
            }
            return ''
        },
        effectiveDate() {
            if (this.campaign) {
                if (this.campaign.hasOwnProperty('effectiveDate')) {
                    return this.campaign.effectiveDate
                }
            }
            return ''
        },
        endDate() {
            if (this.campaign) {
                if (this.campaign.hasOwnProperty('endDate')) {
                    return this.campaign.endDate
                }
            }
            return ''
        },
        description() {
            if (this.campaign) {
                if (this.campaign.hasOwnProperty('description')) {
                    return this.campaign.description
                }
            }
            return ''
        },
        routerTo() {
            if (this.campaign) {
                return 'campaign' + `/${this.campaign ? this.campaign.id : ''}`
            }
            return ''
        }
    },
    data: () => ({
        enableDelete: false,
        btnEnabled: false,
    }),
    watch: {},
    methods: {
        deleteCampaign(){

        },

    }
}
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #4d4848 !important;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #ddd;
    border-bottom: thin solid #ddd;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}

.v-application .secondary,
.v-application .third {
    border-color: #fff !important;
}
</style>