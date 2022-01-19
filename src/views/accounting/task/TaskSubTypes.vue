<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="9" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('task_sub_types') }}</h2>
                        <p class="mb-0">{{ $t('task_sub_types_desc') }}</p>
                    </v-col>
                    <v-col sm="3" cols="12" class="">
                        <v-btn @click="onloadDialog" color="primary"
                               class="white--text float-right text-capitalize">
                            {{ $t('new_sub_type') }}
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- loading -->
                <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="false"
                    :myLoading="true">

                </LoadingMe>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{ $t('name') }}</th>
                                        <th>{{ $t('task_types') }}</th>
                                        <th>{{ $t('description') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="tst in taskSubTypes" v-bind:key="tst.id">
                                        <td class="text-bold">{{ tst.name }}</td>
                                        <td>{{ tst.type.name }}</td>
                                        <td>{{ tst.description }}</td>
                                        <td class="text-center">
                                            <!-- <v-btn class="bg-none">
                                                <v-icon class="primary--text" size="17">fas fa-eye</v-icon>
                                            </v-btn> -->
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
            <v-dialog v-model="dialogM" max-width="500px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("task_sub_type") }}</v-card-title>
                        <v-icon @click="dialogM = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label class="label">{{ $t("name") }}</label>
                                <v-text-field v-model="taskSubType.name" class="mt-1" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label class="label">{{ $t("task_sub_type") }}</label>
                                <v-select v-model="taskSubType.type" :items="taskTypes" item-value="id" item-text="name" return-object class="mt-1" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t("description") }}</label>
                                <v-textarea v-model="taskSubType.description" class="mt-1" no-resize height="100px" outlined rows="3"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="modal_footer d-flex justify-space-between">
                        <v-btn outlined color="primary" class="black--text capitalize">{{ $t("cancel") }}</v-btn>
                        <v-btn @click="saveTaskSubType" color="primary" class="capitalize white--text"
                        >{{ $t("save_close") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
import LoadingMe from '@/components/Loading'
import TaskSubType from "@/scripts/model/TaskSubType";
const taskHandler = require("@/scripts/taskHandler")
export default {
    name: "",
    components: {
        LoadingMe,
        // 'app-datepicker': DatePickerComponent,
        // BankConnection,
    },
    data: () => ({
        start_date: "",
        end_date: "",
        dialogM: false,
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        journal_entries: [],
        // LoadingMe
        compeletLoading: false,
        isLoaded: false,
        taskSubType: new TaskSubType({}),
        taskSubTypes: [],
        taskTypes: []
    }),
    methods: {
        async onloadDialog() {
            await this.loadTaskType()
            this.dialogM = true
        },
        async loadTaskType() {
            await taskHandler.getAllTaskType().then(res => {
                this.taskTypes = res
            })
        },
        async saveTaskSubType() {
            this.taskSubType.types = 'subType'
            await taskHandler.saveTaskSubType(this.taskSubType).then(() => {
                this.loadTaskSubType()
                this.dialogM = false
            })
        },
        async loadTaskSubType() {
            await taskHandler.getAllTaskSubType().then(res => {
                this.taskSubTypes = res
            })
        },
    },
    async mounted() {
        await this.loadTaskSubType()
    },
    computed: {},
};
</script>
<style scoped>
</style>
