<template>
    <v-row>
         <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col cols="12" sm="9" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('task_categories') }}</h2>
                        <p class="mb-0">{{ $t('task_categories_desc') }}</p>
                    </v-col>
                    <v-col cols="12" sm="3" class="">
                        <v-btn @click="dialogM = true" color="primary"
                               class="white--text float-right text-capitalize">
                            {{ $t('new_categories') }}
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
                                        <th>{{ $t('description') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="tc in taskCategories" v-bind:key="tc.id">
                                        <td class="text-bold">{{ tc.name }}</td>
                                        <td>{{ tc.description }}</td>
                                        <td class="text-center">
                                            <v-btn class="bg-none">
                                                <v-icon class="primary--text" size="17">fas fa-eye</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
            <v-dialog v-model="dialogM" max-width="400px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("task_categories") }}</v-card-title>
                        <v-icon  @click="dialogM = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <label class="label">{{ $t("name") }}</label>
                                <v-text-field v-model="taskCategory.name" class="mt-1" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t("description") }}</label>
                                <v-textarea v-model="taskCategory.description" class="mt-1" no-resize height="100px" outlined rows="3"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
      
                    <v-card-actions class="modal_footer d-flex justify-space-between">
                        <v-btn @click="dialogM = false" outlined color="primary" class="black--text capitalize">{{ $t("cancel") }}</v-btn>
                        <v-btn @click="saveTaskCategory" color="primary" class="white--text capitalize"
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
import TaskCategory from "@/scripts/model/TaskCategory";
const taskCategoryHandler = require("@/scripts/taskHandler")
export default {
    name: "",
    components: {
        LoadingMe,
        // 'app-datepicker': DatePickerComponent,
        // BankConnection,
    },
    data: () => ({
        start_date: "",
        closingDate: "",
        dialogM: false,
        end_date: "",
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        journal_entries: [],
        // LoadingMe
        compeletLoading: false,
        isLoaded: false,
        taskCategory: new TaskCategory({}),
        taskCategories: []
    }),
    methods: {
        async saveTaskCategory() {
            this.taskCategory.types = 'category'
            await taskCategoryHandler.saveTaskCategory(this.taskCategory).then(() => {
                this.loadTaskCategory()
                this.dialogM = false
            })
        },
        async loadTaskCategory() {
            await taskCategoryHandler.getAllTaskCategory().then(res => {
                this.taskCategories = res
            })
        }
    },
    async mounted() {
        await this.loadTaskCategory()
    },
    computed: {},
};
</script>
<style scoped>
</style>
