<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("account_type") }}</h2>
            <kendo-datasource ref="datasource1"
                :transport-read-url="apiUrl.account_types"
                :transport-read-data-type="'json'"
                :transport-read-type="'GET'"
                :transport-update-url="apiUrl.account_types"
                :transport-update-data-type="'json'"
                :transport-update-type="'POST'"
                :transport-parameter-map="parameterMap"
                :schema-model-id="'uuid'"
                :schema-model-fields="schemaModelFields"
                :page-size='20'>
            </kendo-datasource>

            <kendo-grid :height="600"
                        :data-source-ref="'datasource1'"
                        :editable="'inline'"
                        :pageable="true">
                <kendo-grid-column 
                    :field="'name'"
                    :title="'Name'"
                    :width="120" />
                <kendo-grid-column 
                    :field="'local_name'"
                    :title="'Local Name'"
                    :width="120" />
                <kendo-grid-column 
                    :field="'description'" 
                    :title="'Description'"
                    :width="120" />
                <kendo-grid-column 
                    :command="['edit']"
                    :title="'&nbsp;'"
                    :width="100" />
            </kendo-grid>
        </v-col>
        <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :color="color"
                :left="x === 'left'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
        >
            {{ textStatus }}
        </v-snackbar>
    </v-row>
</template>

<script>
    // const accountGroup = require("../../scripts/model/AcountGroup")
    // import { i18n } from '@/i18n'
    // import LoadingMe from '@/components/Loading'
    
    import kendo from "@progress/kendo-ui";

    const apiUrl = require('@/apiUrl.js');

    export default {
        data: () => ({
            // Snackbar
            snackbar: false,
            textStatus: "Success",
            color: "#3DA72E",
            timeout: 6000,
            x: "right",
            y: "top",
            // Kendo
            apiUrl: apiUrl,
            schemaModelFields: {
                uuid: { editable: false, nullable: true },
                name: { validation: { required: true } },
                local_name: { type: 'string', validation: { required: true } },
                description: { type: "string" },
            }
        }),
        methods: {
            parameterMap: function(options, operation) {
                if (operation !== 'read' && options) {                   
                    return kendo.stringify(options);
                }
            }
        },
    };
</script>

<style scoped>
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

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    @media (max-width: 576px) {
    }
</style>
