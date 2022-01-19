<template>
    <v-row>
          <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="9" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('task_types') }}</h2>
                        <p class="mb-0">{{ $t('task_types_desc') }}</p>
                    </v-col>
                    <v-col sm="3" cols="12" class="">
                        <v-btn @click="onloadDialog" color="primary"
                               class="white--text float-right text-capitalize">
                            {{ $t('new_type') }}
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
                                        <th>{{ $t('task_categories') }}</th>
                                        <th>{{ $t('description') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="tt in taskTypes" v-bind:key="tt.id">
                                        <td class="text-bold">{{ tt.name }}</td>
                                        <td>{{ tt.category.name }}</td>
                                        <td>{{ tt.description }}</td>
                                        <td class="text-center">

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
                        <v-card-title>{{ $t("task_types") }}</v-card-title>
                        <v-icon @click="dialogM = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content" >
                        <v-row>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label class="label">{{ $t("name") }}</label>
                                <v-text-field v-model="taskType.name" class="mt-1" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label class="label">{{ $t("task_categories") }}</label>
                                <v-select :items="taskCategories" return-object item-text="name" item-value="id" v-model="taskType.category" class="mt-1" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t("description") }}</label>
                                <v-textarea v-model="taskType.description" class="mt-1" no-resize height="100px" outlined rows="3"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="modal_footer d-flex justify-space-between">
                        <v-btn @click="dialogM = false" outlined color="primary" class="black--text capitalize">{{ $t("cancel") }}</v-btn>
                        <v-btn @click="saveTaskType" color="primary" class="whit--text capitalize"
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
import TaskType from "@/scripts/model/TaskType";
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
        dialogM: "",
        end_date: "",
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        journal_entries: [],
        // LoadingMe
        compeletLoading: false,
        isLoaded: false,
        taskType: new TaskType({}),
        taskTypes: [],
        taskCategories: [],
    }),
    methods: {
        async onloadDialog() {
            await this.loadTaskCategory()
            this.dialogM = true
        },
        async saveTaskType() {
            this.taskType.types = 'type'
            await taskHandler.saveTaskType(this.taskType).then(() => {
                this.loadTaskType()
                this.dialogM = false
            })
        },
        async loadTaskType() {
            await taskHandler.getAllTaskType().then(res => {
                this.taskTypes = res
            })
        },
        async loadTaskCategory() {
            await taskHandler.getAllTaskCategory().then(res => {
                this.taskCategories = res
            })
        }
    },
    async mounted() {
        await this.loadTaskType()
    },
    computed: {},
};
</script>
<style scoped>
</style>
