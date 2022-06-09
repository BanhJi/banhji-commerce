<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-row>
                <v-col sm="6" cols="12" class="py-0">
                    <h2 class="mb-0 font_20">{{ $t("batch_lots") }}</h2>
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                    <v-dialog v-model="dialogm3" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="primary"
                                class=" white--text float-right text-capitalize"
                                v-on="on"
                            >
                                {{ $t("new_batch") }}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>{{ $t("batch") }}</v-card-title>
                            <v-icon class="btn_close" @click="dialogm3 = false">close</v-icon>
                            <v-card-text
                                style="height: 200px; background-color: #EDF1F5; color: #333;"
                            >
                                <v-row>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label>{{ $t("batch_id") }}</label>
                                        <v-text-field
                                            v-model="batch.batchId"
                                            class=" my-2"
                                            tage="Batch Id"
                                            outlined
                                            clearable
                                        />
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label class="label">{{ $t("expiration_date") }}</label>
                                        <app-datepicker :initialDate="batch.expireDate" @emitDate="batch.expireDate = $event" />
                                    </v-col>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label>{{ $t("descriptions") }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            v-model="batch.description"
                                            outlined
                                            tage="Descriptions"
                                            clearable
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="pa-5">
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0 text-left">
                                        <v-btn
                                            color="black"
                                            outlined
                                            class=" text-capitalize  black--text float-left"
                                            @click="dialogm2 = false"
                                        >{{ $t("cancel") }}
                                        </v-btn
                                        >
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0 text-right">
                                        <v-btn
                                            @click="onCreateBatch()"
                                            color="primary"
                                            class="px-3  white--text text-capitalize"
                                        >{{ $t("save_close") }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="9" cols="12" class="py-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select
                                class="mt-1"
                                :items="dateSorters"
                                clearable
                                outlined
                                placeholder="ALL"
                            />
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker
                                :initialDate="start_date"
                                @emitDate="start_date = $event"
                            />
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker
                                :initialDate="end_date"
                                @emitDate="end_date = $event"
                            />
                        </v-col>

                        <v-col sm="1" cols="12" class="py-1">
                            <v-btn
                                class="btn_search"
                                style="background-color: rgb(237, 241, 245)"
                            >
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t("batch_id") }}</th>
                                    <th>{{ $t("expiration_date") }}</th>
                                    <th>{{ $t("stock") }}</th>
                                </tr>
                                </thead>
                                <tbody v-for="batch in batchs" v-bind:key="batch.id">
                                <tr>
                                    <td>{{ batch.batchId }}</td>
                                    <td>{{ batch.expireDate }}</td>
                                    <td>{{ batch.stock }}</td>
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
import {BatchModel} from "@/scripts/model/AppModels";

const batchHandler = require('@/scripts/batchHandler')
export default {
    data: () => ({
        // Search transaction dates
        start_date: "",
        end_date: "",
        dateSorters: ["Today", "This Week", "This Month", "This Year"],
        account: [],
        files: [],
        attachments: [],

        dialogm3: false,
        // LoadingMe
        isLoaded: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {
                id: "id",
            },
        },
        /* Sort by account number */
        sortDefinition: {
            field: "number",
        },
        batch: new BatchModel({}),
        batchs: []
    }),
    props: {},
    methods: {
        onCreateBatch() {
            window.console.log(this.batchs)
            batchHandler.save(this.batch).then(res => {
                if (res.data.statusCode === 201) {
                    this.onLoadBatch()
                    this.dialogm3 = false
                }
            })
        },
        async onLoadBatch() {
            batchHandler.getAll().then(res => {
                this.batchs = res.data.data
            })
        }
    },
    async mounted() {
        await this.onLoadBatch()
    },
    computed: {},
    components: {
        "app-datepicker": () => import('@/components/custom_templates/DatePickerComponent'),
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
