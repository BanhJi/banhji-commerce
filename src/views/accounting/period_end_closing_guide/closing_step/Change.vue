<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-3 float-left primary--text text-uppercase">
                {{ $t("changes") }}
            </h2>
            <p class="mb-0 float-left">
                {{ $t("review_tab_desc") }}
            </p>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th>{{ $t("date") }}</th>
                            <th>
                                {{ $t("revised_date") }}
                            </th>
                            <th>{{ $t("type") }}</th>
                            <th>{{ $t("number") }}</th>
                            <th>{{ $t("changes") }}</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1/10/2020</td>
                            <td>31/10/2020</td>
                            <td>Invoice</td>
                            <td>INV023</td>
                            <td>Edit Qty</td>
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
</template>
<script>
</script>
<style scoped>
    .attachment_table.v-data-table > .v-data-table__wrapper > table > thead > tr > th, .attachment_table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        border-right: none !important;
    }
</style>