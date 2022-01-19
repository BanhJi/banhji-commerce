<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('task') }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border mb-3" color="white">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("name") }}*</label>
                                        <v-text-field v-model="task.name" class="mt-1" outlined placeholder="Name"/>

                                        <label class="label">{{ $t("task_type") }}*</label>
                                        <v-select v-model="task.type" item-text="name" item-value="id" return-object
                                                  :items="taskTypes" class="mt-1" outlined placeholder="Sub task"/>

                                        <label class="label">{{ $t("assigned_to") }}</label>
                                        <v-col sm="12" cols="12"
                                               class="kendo_dropdown_custom pl-0 pb-3 pt-0">
                                            <dropdownlist
                                                :data-items="assignTos"
                                                @change="onChange"
                                                :value="task.assignTo"
                                                :data-item-key="dataItemKey"
                                                :text-field="textField"
                                                :default-item="defaultItem"
                                                :filterable="true"
                                                @filterchange="onFilterChange">
                                            </dropdownlist>
                                        </v-col>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("categories") }}*</label>
                                        <v-select :items="taskCategories" item-value="id" item-text="name" return-object
                                                  v-model="task.category" class="mt-1" outlined placeholder=""/>

                                        <label class="label">{{ $t("due_date") }}*</label>
                                        <app-datepicker :initialDate="task.dueDate" @emitDate="task.dueDate = $event"/>

                                        <label class="label">{{ $t("linked_to_account") }}</label>
                                        <v-select :items="linkAccs" item-text="name" item-value="uuid"
                                                  v-model="task.linkAcc" return-object class="mt-1" outlined
                                                  placeholder="Linked to account"/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("sub_type") }}*</label>
                                        <v-select :items="taskSubTypes" item-text="name" return-object item-value="id"
                                                  v-model="task.subType" class="mt-1" outlined placeholder=""/>

                                        <label class="label">{{ $t("frequency") }}*</label>
                                        <v-select :items="frequencies" item-value="id" return-object item-text="name"
                                                  v-model="task.frequency" class="mt-1" outlined
                                                  placeholder="Frequency"/>

                                        <label class="label">{{ $t("linked_to_other_tasks") }}</label>
                                        <v-select :items="linkTasks" v-model="task.linkTask" return-object class="mt-1"
                                                  outlined placeholder="Link to Other Task"/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pt-0">
                                        <label class="label">{{ $t("purpose") }}</label>
                                        <editor :resizable-content="true"
                                                :resizable-toolbar="true"
                                                :value="task.purpose"
                                                style="height:120px"
                                                class="mt-1"
                                                id="editorPurpose"
                                                rows="10"
                                                cols="30">
                                        </editor>

                                    </v-col>
                                    <v-col sm="6" cols="12" class="pt-0">
                                        <label class="label">{{ $t("instructions") }}</label>

                                        <editor :resizable-content="true"
                                                :resizable-toolbar="true"
                                                :value="task.instruction"
                                                style="height:120px"
                                                class="mt-1"
                                                id="editorInstruction"
                                                rows="10"
                                                cols="30">
                                        </editor>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-4"/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn color="black" class="text-capitalize  white--text float-left"
                                       @click="cancel">{{ $t('cancel') }}
                                </v-btn>
                                <!-- <v-btn color="primary" class="ml-2 float-right text-capitalize  white--text">
                                    {{$t('reconcile')}}
                                </v-btn> -->
                                <v-btn @click="saveTask" color="primary" class=" float-right text-capitalize  white--text">
                                    {{ $t('save_close') }}
                                </v-btn>
                            </v-card>

                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import {Editor} from '@progress/kendo-editor-vue-wrapper';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import Task from "@/scripts/model/Task";

const {accountHandler} = require("@/scripts/AppHandlers");
const taskHandler = require("@/scripts/taskHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const $ = require('jquery')
const keyField = 'id'
const textField = 'name'
const emptyItem = {[textField]: 'loading ...'}
export default {
    name: "Task",
    components: {
        // 'LoadingMe': LoadingMe,
        'app-datepicker': DatePickerComponent,
        'dropdownlist': DropDownList,
        'editor': Editor,
    },
    data: () => ({
        template: [],
        start_date: '',
        valid: true,
        task: new Task({}),
        taskTypes: [],
        taskSubTypes: [],
        taskCategories: [],
        assignTos: [],
        linkAccs: [],
        linkTasks: [],
        frequencies: [
            {id: 1, name: 'Daily'},
            {id: 2, name: 'Weekly'},
            {id: 3, name: 'Monthly'},
            {id: 4, name: 'Quarterly'},
            {id: 5, name: 'Annually'}
        ],
        dataItemKey: 'id',
        textField: 'name',
        defaultItem: {[textField]: 'Select employee...', [keyField]: null},
        employeeBaseUrl: employeeHandler.search()
    }),
    methods: {
        cancel() {
            window.history.go(-1)
            return false
        },
        async onGetTextPurpose() {
            const editor = $("#editorPurpose").data("kendoEditor");
            const editorContent = editor.value();
            editor.refresh();
            this.task.purpose = editorContent
        },
        async onGetTextInstruction() {
            const editor = $("#editorInstruction").data("kendoEditor");
            const editorContent = editor.value();
            editor.refresh();
            this.task.instruction = editorContent
        },
        async saveTask() {
            await this.onGetTextPurpose()
            await this.onGetTextInstruction()
            this.task.status = {id: 1, name: 'Assigned'}
            await taskHandler.saveTask(this.task).then(() => {
                window.history.go(-1)
            })
        },
        async loadAccount() {
            // Use remote data
            await accountHandler.getAll()
                .then(res => {
                    this.linkAccs = res.data
                });
        },
        async loadTaskSubType() {
            await taskHandler.getAllTaskSubType().then(res => {
                this.taskSubTypes = res
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
        },
        async loadEmployeeCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.assignTos = []
                    employeeHandler.center(this.search).then(res => {
                        // this.showLoading = true
                        if (res.data.statusCode === 200) {
                            // this.showLoading = false
                            this.assignTos = res.data.data
                        }
                    }).catch()
                    {
                        // this.showLoading = false
                    }
                }, 300)
            })
        },
        async onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            window.console.log(value)
            this.task.assignTo = value
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `/${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    // window.console.log(response.json())
                    return response.json()
                })
                .then(this.afterFetch)

        },
        afterFetch(json) {
            this.assignTos = json.data
        },
        onFilterChange(event) {
            const filter = event.filter.value
            this.requestData(0, filter, this.employeeBaseUrl)
            this.filter = filter
        },
    },
    async mounted() {
        this.task.purpose = ''
        this.task.instruction = ''
        await this.loadAccount()
        await this.loadTaskSubType()
        await this.loadTaskType()
        await this.loadTaskCategory()
        // await this.loadEmployeeCenter()
        this.requestData(0, '', employeeHandler.search())
    },

};
</script>

<style scoped>
@media (min-width: 1264px) {
    .container {
        max-width: 1080px !important;
    }
}

.k-dropdown {
    width: 100%;
    margin-top: 3px;
}
</style>
