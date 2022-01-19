<template>
    <v-row>
        <v-col cols="12" sm="12" class="pt-0">
            <v-row>
                <v-col sm="12" class="py-0">
                    <h2 class="mb-3 pt-2 float-left primary--text text-uppercase">
                        {{ $t("key_accounts") }}
                    </h2>
                    <p class="mb-0 float-left">
                        {{ $t("reconciliation_desc3") }}
                    </p>
                </v-col>
                <!-- <v-col sm="5" class="py-0">
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
                                <v-list-item-title> Reconciliation</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col> -->
                <v-col sm="12" cols="12" class="pb-0">
                    <template>
                        <v-simple-table
                                class="attachment_table"
                        >
                            <template v-slot:default>
                                <!-- <thead>
                                <tr>
                                    <th>{{ $t("account") }}</th>
                                    <th>
                                        {{ $t("gl_balance") }}
                                    </th>
                                    <th>{{ $t("txn_balance") }}</th>
                                    <th>{{ $t("variance") }}</th>
                                </tr>
                                </thead> -->
                                <tbody>
                                <tr>
                                    <td class="text-uppercase text-bold">{{ $t("account") }}</td>
                                    <td class="text-uppercase text-bold">
                                        {{ $t("gl_balance") }}
                                    </td>
                                    <td class="text-uppercase text-bold">{{ $t("txn_balance") }}</td>
                                    <td class="text-uppercase text-bold">{{ $t("variance") }}</td>
                                </tr>
                                <tr>
                                    <td class="text-uppercase text-bold">{{$t('receivables')}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                  <tr>
                                    <td class="text-uppercase text-bold">{{$t('payables')}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="text-uppercase text-bold">{{$t('inventory')}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="text-uppercase text-bold">{{$t('cash_advance')}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:nth-child(1) > td {
        border-top: thin solid rgba(0, 0, 0, 0.12);
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

</style>