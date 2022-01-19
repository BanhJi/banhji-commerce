<template>
    <v-row>
        <v-col cols="12" sm="12" class="pt-0">
            <v-row>
                <v-col sm="7" class="py-0">
                    <h2 class="mb-3 float-left primary--text text-uppercase">
                        {{ $t("finalize") }}
                    </h2>
                    <p class="mb-0 float-left">
                        {{$t("finalize_desc") }}
                    </p>
                </v-col>
                <v-col sm="5" class="py-0">
                    <v-dialog v-model="dialog" max-width="400px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" v-on="on" class="dropdown_transactions white--text float-right text-capitalize">
                                {{ $t('new_closing_date') }}
                            </v-btn>
                        </template>
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{ $t('closing_date') }}</v-card-title>
                                <v-icon @click="dialog = false">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <label class="label">{{ $t('closing_date') }}</label>
                                        <p class="text_tip">{{ $t('closing_date_form_tips') }}</p>
                                        <v-text-field class="mt-1"
                                                    outlined
                                                    id="ClosingDate"
                                                    placeholder=""/>
                                        <label class="label">{{ $t('password') }}</label>
                                        <p class="text_tip">{{ $t('password_form_tips') }}</p>
                                        <v-text-field class="mt-1"
                                                    outlined
                                                    id="ClosingDate"
                                                    placeholder=""/>
                                         
                                    </v-col>
                                </v-row>
                            </v-card-text>
                     
                            <v-card-actions class="modal_footer">
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0">
                                        <v-btn color="primary"
                                            outlined
                                            class="text-capitalize  black--text"
                                            @click="dialog = false">{{ $t('cancel') }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0">
                                        <v-btn color="primary"
                                            class="px-3  white--text text-capitalize float-right"
                                           >
                                            {{ $t('save_close') }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>

                        </v-card>
                    </v-dialog>
                </v-col>
         
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
    export default{
        data: ()=>({
            dialog: false
        })
    }
</script>
<style scoped>
    .attachment_table.v-data-table > .v-data-table__wrapper > table > thead > tr > th, .attachment_table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        border-right: none !important;
    }
</style>