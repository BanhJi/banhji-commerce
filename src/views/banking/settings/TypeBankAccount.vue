<template>
    <v-row>
        <v-col sm="12" cols="12" class="py-0">
            <h2 class="font_20 mb-0">{{$t('type_of_bank_account')}}</h2>
            <p class="mb-0">
                {{$t('type_of_bank_account_desc')}}
            </p>
        </v-col>

        <v-col sm="12" cols="12">
            <kendo-datasource ref="bankAccountTypeDS"
                :transport-read-url="transportUrl"
                :transport-read-type="'GET'"
                :transport-read-data-type="'json'"
                :transport-update-url="transportUrl"
                :transport-update-type="'POST'"
                :transport-update-data-type="'json'"
                :transport-destroy-url="transportUrl"
                :transport-destroy-type="'POST'"
                :transport-destroy-data-type="'json'"
                :transport-create-url="transportUrl"
                :transport-create-type="'POST'"
                :transport-create-data-type="'json'"
                :transport-parameter-map="parameterMap"
                :schema-model-id="'uuid'"
                :schema-model-fields="schemaModelFields"
                :sort="sortField"
                :page-size='20' />

            <kendo-grid id="gridBankTransactionRule"
                :data-source-ref="'bankAccountTypeDS'"
                :noRecords="true"
                :column-menu="true"
                :navigatable="true"
                :pageable="true"
                :editable="'inline'"
                :toolbar="['create']">
                <kendo-grid-column
                    :field="'code'"
                    :title="$t('code')"
                />
                <kendo-grid-column
                    :field="'name'"
                    :attributes="{class:'tb_name_td'}"
                    :title="$t('name')"
                />
                <kendo-grid-column
                    :command="['edit','destroy']"
                    :title="$t('action')"
                    :width="200"
                    :attributes="{
                        style: 'text-align: products;'
                    }"
                    :headerAttributes="{
                        style: 'text-align: products; '
                    }"
                />
            </kendo-grid>
        </v-col>

    </v-row>
</template>

<script>
    // import {i18n} from '@/i18n'
    import kendo from '@progress/kendo-ui'

    const apiUrl = require('@/apiUrl.js') 
    
    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();


    export default {
        data: () => ({
            transportUrl : apiUrl.bank_account_types,
            sortField: { field: "code", dir: "asc" },
            schemaModelFields: {
                uuid: { editable: false, nullable: true },
                code: { validation: { required: true } },
                name: { validation: { required: true } },
                description: { type: 'string' },
                type_of: { type: 'string' },
                institute_id: { type: 'string', defaultValue: instituteId }
            }
        }),
        methods: {
            parameterMap: function(options, operation) {
                if (operation !== 'read' && options) {
                    return kendo.stringify(options)
                }
            }
        },
    };
</script>

<style scoped>

    .acc_group header {
        height: 10px !important;
    }

    table.acc_group tr td {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        vertical-align: middle;
    }

    table.acc_group tr td:first-child {
        font-weight: 700;
    }

    table.acc_group tr td:last-child {
        text-align: center;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-family: 'Niradei-Bold', serif;
        color: #000 !important;
        border-top: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
        font-size: 15px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
        color: #000 !important;
        padding: 5px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
        border-bottom: 1px solid #000 !important;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }
    .k-header.k-grid-toolbar > a.k-grid-add {
        background: #ED1A3A !important;
    }

.k-header.k-grid-toolbar > a.k-grid-add {
    background-color: #ED1A3A !important;
}
    @media (max-width: 576px) {

    }
</style>