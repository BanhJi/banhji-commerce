<template>
    <v-row>
       <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col cols="12" sm="9" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('tasks_management') }}</h2>
                        <p class="mb-0">{{ $t('task_management_desc') }}</p>
                    </v-col>
                    <v-col cols="12" sm="3" class="">
                        <v-btn to="task" color="primary"
                               class="white--text float-right text-capitalize">
                            {{ $t('new_task') }}
                        </v-btn>
                    </v-col>
                </v-row>
                <!-- loading -->
                <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="false"
                    :myLoading="true">

                </LoadingMe>

                <v-row class="">
                    <v-col sm="4" cols="12" class="pb-0">
                        <v-select class="mt-1"
                                  :items="dateSorters"
                                  item-value="id"
                                  item-text="name"
                                  v-model="dataSorter"
                                  return-object
                                  clearable
                                  outlined
                                  placeholder="ALL"
                        />
                    </v-col>

<!--                    <v-col sm="3" cols="12" class="pb-0">-->
<!--                        <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>-->
<!--                    </v-col>-->

<!--                    <v-col sm="3" cols="12" class="pb-0">-->
<!--                        <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>-->
<!--                    </v-col>-->

                    <v-col sm="2" cols="1" class="pb-0 pt-4">

                        <v-btn @click="searchTaskByFrequency" color="primary white--text">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-dialog v-model="dialog" max-width="450px">
                    <v-card>
                        <div class="modal_header">
                            <v-card-title>{{ task.name }}</v-card-title>
                            <v-icon @click="cancel">close</v-icon>
                        </div>
                        <v-card-text class="modal_text_content">
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col sm="12" cols="12" class="">
                                        <label class="label">{{ $t("completed_by") }}</label>
                                        <v-autocomplete
                                            v-model="task.completedBy"
                                            :items="employees"
                                            item-value="id"
                                            item-text="name"
                                            :rules="[v => !!v || 'employee is required']"
                                            outlined
                                            return-object
                                            clearable
                                            class=""
                                        />
                                    </v-col>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label class="label">{{ $t("completed_date") }}</label>
                                        <app-datepicker :initialDate="task.completedDate" @emitDate="task.completedDate = $event"/>
                                    </v-col>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label class="label">{{ $t("reference") }}</label>
                                        <v-text-field v-model="task.reference" outlined/>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions class="modal_footer">
                            <v-btn class="btn_cancel">{{ $t("cancel") }}</v-btn>
                            <v-btn @click="completed" class="btn_save_close"
                            >{{ $t("save_close") }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <div class="reports_table">
                            <kendo-datasource ref="dataSource"
                                              :data="tasks"
                                              :schema="gridSchema"
                                              :server-paging="false"
                                              :group="groupDefinition"/>
                            <kendo-grid id="grid"
                                        class="grid-function"
                                        :data-source-ref="'dataSource'"
                                        :style="{width: '100%'}"
                                        :noRecords="true"
                                        :groupable="true"
                                        :column-menu="true"
                                        :pageable-numeric="false"
                                        :pageable-previous-next="false"
                                        :pageable-messages-display="'Showing {2} data items'"
                                        :scrollable-virtual="true">

                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :width="150"
                                    :template="'<span>#=name#</span>'"
                                    :groupHeaderColumnTemplate="'#=value#'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'category.name'"
                                    :title="$t('categories')"
                                    :template="'<span>#=category.name#</span>'"
                                    :width="120"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'purpose'"
                                    :title="$t('purpose')"
                                    :template="'<span>#=purpose#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'type.name'"
                                    :title="$t('task_type')"
                                    :template="'<span>#=type.name#</span>'"
                                    :width="120"
                                    :hidden="true"    
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'subType.name'"
                                    :template="'<span>#=subType.name#</span>'"
                                    :title="$t('sub_type')"
                                    :width="120"
                                    :hidden="true"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'dueDate'"
                                    :title="$t('due_date')"
                                    :width="120"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'frequency.name'"
                                    :title="$t('frequency')"
                                    :width="120"
                                    :template="'<span>#=frequency.name#</span>'"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'linkAcc.name'"
                                    :template="'<span>#=linkAcc.name#</span>'"
                                    :title="$t('linked_to_account')"
                                    :width="120"
                                    :hidden="true"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'assignTo.name'"
                                    :template="'<span>#=assignTo.name#</span>'"
                                    :title="$t('assigned_to')"
                                    :width="120"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'reference'"
                                    :title="$t('ref')"
                                    :width="120"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'status.name'"
                                    :title="$t('status')"
                                    :width="120"
                                    :template="'<span>#=status.name#</span>'"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :width="140"
                                    v-on:databound="dataBound"
                                    :command="[{iconClass: 'k-icon k-i-edit', text: 'Completed', click: goCompleted , className: 'k-state-disabled isStatus' }]"
                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                            </kendo-grid>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import LoadingMe from '@/components/Loading'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import Task from "@/scripts/model/Task";
const taskHandler = require("@/scripts/taskHandler")
const employeeHandler = require("@/scripts/employeeHandler");
const $ = require('jquery')
import kendo from "@progress/kendo-ui";
export default {
    name: "",
    components: {
        LoadingMe,
        'app-datepicker': DatePickerComponent,
        // BankConnection,
    },
    watch: {
        // async searchCompany() {
        //     // Items have already been loaded
        //     if (this.employees.length > 0) return
        //
        //     this.isLoading = true
        //     // Lazily load input items
        //     fetch(await employeeHandler.search())
        //         .then(res => res.clone().json())
        //         .then(res => {
        //             this.employees = res.data
        //         })
        //         .catch(err => {
        //             window.console.log(err)
        //         })
        //         .finally(() => (this.isLoading = false))
        // },
    },
    data: () => ({
        start_date: "",
        end_date: "",
        dateSorters: [
            {id: 1, name: 'Daily'},
            {id: 2, name: 'Weekly'},
            {id: 3, name: 'Monthly'},
            {id: 4, name: 'Quarterly'},
            {id: 5, name: 'Annually'}
        ],
        dataSorter: {},
        journal_entries: [],
        // LoadingMe
        compeletLoading: false,
        isLoaded: false,
        tasks: [],
        schemaDefinition: {
            model: {id: "id"}
        },
        /* Sort by account number */
        sortDefinition: {field: "number"},
        gridSchema: {
            model: {
                id: "id"
            }
        },
        groupDefinition: {
            field: "category.name",
        },
        search: '',
        categories: [],
        dialog: false,
        valid: true,
        task: new Task({}),
        employees: [],
    }),
    methods: {
        cancel() {
            this.dialog = false
            this.task = new Task({})
        },
        async searchTaskByFrequency() {
            if (this.dataSorter !== undefined) {
                await taskHandler.getTaskByFrequency(this.dataSorter.id).then(res => {
                    this.tasks = res
                    window.console.log(res)
                })
            } else {
                await this.onloadTask()
            }

        },
        async completed() {
            this.task.status = {id: 2, name: 'Completed'}
            window.console.log(this.task)
            await taskHandler.saveTask(this.task).then(() => {
                this.dialog = false
                this.onloadTask()
            })
        },
        async onloadTask() {
            await taskHandler.getAllTask().then(res => {
                this.tasks = res
            })
        },
        dataBound: function (e) {
            const grid = kendo.jQuery("#gridServiceUOM").data("kendoGrid")
            const items = e.sender.items()
            // window.console.log(items)
            items.each(function () {
                let dataItem = grid.dataItem(this);
                $("tr[data-uid='" + dataItem.uid + "']").find(".isStatus").each(function () {
                    if (dataItem.status.id === 1) {
                        $(this).removeClass('k-state-disabled')
                    }
                })
            })
        },
        goCompleted(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            window.console.log(dataItem)
            this.task = dataItem
            this.task.completedBy = this.task.assignTo
            this.task.completedDate = new Date().toISOString().substr(0, 10)
            this.dialog = true
            employeeHandler.getAll().then(res => {
                this.employees = res.data.data
            })
            window.console.log(this.task, 'task')
        },
    },
    async mounted() {
        await this.onloadTask()
    },
    computed: {},
};
</script>
<style scoped>
    @media (max-width: 576px) {
        .pt-4{
        
            padding-top: 0 !important;
        }
    }
</style>
