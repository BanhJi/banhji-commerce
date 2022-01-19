<template>
    <v-row>
        <v-col sm="12" cols="12" class="ml-3 pt-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">{{ $t('no_of_employees') }}</th>
                            <th class="text-left">{{ $t('salary_to_paid') }}</th>
                            <th class="text-left">{{ $t('spouse') }}</th>
                            <th class="text-left">{{ $t('no_of_minor') }}</th>
                            <th class="text-left">{{ $t('tax_rate') }}</th>
                            <th class="text-left">{{ $t('tax_on_salary') }}</th>
                        </tr>
                        </thead>
                        <tbody class="ts_tbody">
                        <tr v-for="ts in taxSalary" :key="ts.no_of_employees">
                            <td>{{ ts.no_of_employees }}</td>
                            <td>{{ ts.salary_to_paid }}</td>
                            <td>{{ ts.spouse }}</td>
                            <td>{{ ts.no_of_minor }}</td>
                            <td>{{ ts.tax_rate }}</td>
                            <td>{{ ts.tax_on_salary }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <v-row>
                <v-col sm="5" cols="12">
                    <v-btn link route to="salary_record" class="my-n1" tile color="success"
                           dark>
                        {{ $t('view_detail_salary_tax') }}
                    </v-btn>
                </v-col>
                <v-col sm="7" cols="12" class="pl-3">
                    <label class="label">The data in above table is generated from the detail salary
                        record.</label>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script src="./_tax_salary.js" lang="js"></script>
<style lang="css" scoped></style>
