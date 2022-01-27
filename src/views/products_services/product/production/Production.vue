<template>
    <v-row>
        <v-col cols="12" sm="12" class="pt-3">
            <v-row>
                <v-col sm="8" class="py-0">
                    <h2 class="mb-3 float-left">
                        {{ $t("cash_bank_reconciliation") }}
                    </h2>
                    <p class="mb-0 float-left">
                        {{ $t("reconciliation_desc") }}
                    </p>
                </v-col>
                <v-col sm="4" class="py-0">
                    <!-- <v-btn color="primary" class="rounded-pill white--text float-right text-capitalize" link to="period_end_closing_guide">
                        {{ $t('new_reconciliation') }}
                    </v-btn> -->
                    <v-menu
                            nudge-bottom="4"
                            bottom
                            offset-y
                            origin="bottom top"
                            transition="scroll-y-reverse-transition"
                    >
                        <template v-slot:activator="{ on }">
                        <span class="hidden-sm-and-up">
                            <div class="dropdown_transactions">
                                <v-icon v-on="on" left>mdi-attachment</v-icon>
                                <v-icon size="" class="ma-1">expand_more</v-icon>
                            </div>
                        </span>
                            <span class="hidden-sm-and-down">
                            <v-btn color="primary" v-on="on"
                                   class="dropdown_transactions white--text float-right text-capitalize">
                                {{$t('new_reconciliation')}}
                                <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                        </span>
                        </template>

                        <v-list>
                            <v-list-item link route to="">
                                <v-list-item-title> {{$t('cash_reconciliation')}}</v-list-item-title>
                            </v-list-item>
                            <v-list-item link route to="">
                                <v-list-item-title> {{$t('bank_reconciliation_manual')}}</v-list-item-title>
                            </v-list-item>
<!--                            <v-list-item link route to="">-->
<!--                                <v-list-item-title> {{$t('bank_reconciliation_back_feeds')}}</v-list-item-title>-->
<!--                            </v-list-item>-->
                        </v-list>
                    </v-menu>
                </v-col>
                <v-col sm="12" cols="12" class="pb-0">
                    <template>
                        <v-simple-table
                                class="attachment_table"
                        >
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t("account") }}</th>
                                    <th>
                                        {{ $t("balance") }}
                                    </th>
                                    <th>{{ $t("reconciled_date") }}</th>
                                    <th>{{ $t("type") }}</th>
                                    <th>{{ $t("number") }}</th>
                                    <th>{{ $t("action") }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td>
                                        <v-btn class="bg-none">
                                            <v-icon class="primary--text" size="17">
                                                fas fa-eye
                                            </v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
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
</script>
<style scoped>
    .attachment_table.v-data-table > .v-data-table__wrapper > table > thead > tr > th, .attachment_table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        border-right: none !important;
    }
</style>