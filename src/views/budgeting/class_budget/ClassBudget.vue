<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<v-card
						outlined
						dense
						class="pa-4 no_border rounded-sm"
						color="white"
					>
						<v-form ref="form" v-model="valid" lazy-validation>
							<v-card elevation="0" class=" mb-1">
								<h2 class="mb-0">{{ $t("class_budget") }}</h2>
								<v-icon
									onclick="window.history.go(-1); return false;"
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
									>close
								</v-icon>
							</v-card>

							<v-card
								outlined
								class="pa-3 pb-0 no_border"
								color="grayBg"
								min-height="98px"
							>
								<v-row>
									<v-col sm="6" cols="12" class="py-0">
										<label class="label">{{ $t("name") }}</label>
										<v-text-field
											class="mt-1"
											v-model="budget.name"
											:placeholder="$t('name')"
											outlined
											required
										/>
									</v-col>
									<v-col sm="3" cols="12" class="py-0">
										<label class="label">{{ $t("fiscal_year") }}</label>
										<app-fiscal-date-dropdownlist
											:initFiscalDate="budget.fiscal_year"
											@emitFiscalDate="budget.fiscal_year = $event"
										/>
									</v-col>
								</v-row>
								<v-row>
									<v-col sm="3" cols="12" class="py-0">
										<label class="label">{{ $t("budget_type") }}</label>
										<budget-type-dropdownlist
											:initBudgetType="budgetType"
											@emitBudgetType="budgetType = $event"
											@onChanged="onBudgetTypeChanges"
										/>
									</v-col>
									<v-col sm="3" cols="12" class="py-0" v-show="budgetType === 'segment'">
										<label class="label">{{ $t("segment") }}</label>
										<app-segment-dropdownlist
											:initSegment="segment"
											@emitSegment="segment = $event"
										/>
									</v-col>
									<v-col sm="3" cols="12" class="py-0" v-show="budgetType === 'location'">
										<label class="label">{{ $t("location") }}</label>
										<app-location-dropdownlist
											:initLocation="location"
											@emitLocation="location = $event"
										/>
									</v-col>
									<v-col sm="3" cols="12" class="py-0" v-show="budgetType === 'project'">
										<label class="label">{{ $t("project") }}</label>
										<app-project-dropdownlist
											:initProject="project"
											@emitProject="project = $event"
										/>
									</v-col>
									<v-col sm="3" cols="12" class="py-0">
										<v-btn
                                            class="text-capitalize  white--text"
                                            color="primary"
                                            @click="confirmReload"
                                        >
                                            {{ $t("load_class") }}
                                        </v-btn>
									</v-col>
								</v-row>
							</v-card>

							<!-- Dialog -->
                            <div class="text-center">
                                <v-dialog
                                    v-model="dialog"
                                    width="500"
                                >
                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-2">
                                            {{ selectedRow.number }} - {{ selectedRow.name }}
                                        </v-card-title>

                                        <v-card-text>
                                            <v-text-field
                                                class="mt-7"
                                                type="number"
                                                v-model="crossAmount"
                                                outlined
                                            />
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-btn
                                                color="secondary"
                                                text
                                                @click="dialog = false"
                                                outlined
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="primary"
                                                text
                                                @click="applyAcrossAmount"
                                                outlined
                                            >
                                                Enter
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>

							<v-card
								outlined
								class="rounded-0 mt-1"
								color="white"
								min-height="98px"
							>
								<v-row>
									<v-col sm="12" cols="12" class="">
										<!-- Tree List -->
                                        <div id="budgetLineTreeList" />
									</v-col>
								</v-row>
							</v-card>

							<LoadingMe
								type="loading"
								:isLoading="showLoading"
								:myLoading="true"
								:fullPage="true"
							/>

							<!-- <v-divider /> -->
							<v-card outlined dense class="no_border  function_footer">
								<v-alert type="warning" v-model="alert" dismissible>
									<span v-html="errorMessage" />
								</v-alert>

								<v-btn
									color="primary"
									outlined
									class="text-capitalize  black--text float-left"
									@click="cancel"
									>{{ $t("cancel") }}
								</v-btn>
								<v-btn
									class="float-right text-capitalize  white--text"
									color="primary"
									@click="onSaveOptionClick(SaveOption.SAVECLOSE)"
								>
									{{ $t("save_close") }}
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
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import BudgetModel from "@/scripts/model/Budget.js";
import BudgetLineModel from "@/scripts/model/BudgetLine.js";
import BudgetLineExtendedModel from "@/scripts/model/BudgetLineExtended.js";
import SegmentModel from "@/scripts/model/Segment.js";
import LocationModel from "@/scripts/model/Location.js";
import ProjectModel from "@/scripts/model/Project.js";
import ClassModel from "@/scripts/model/Clazz.js";
import NumberInputBoxEditor from "@/scripts/kendo_editor/NumberInputBox.js";

/* Vuex */
import { mapState } from 'vuex';

const budgetHandler = require("@/scripts/handler/workingcapital/budgetHandler.js");
const { SaveOption } = require("@/scripts/default_setup/Collections");

export default {
	name : "ClassBudget",
	props: {
		initBudget: {
			type: BudgetModel,
		},
	},
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"budget-type-dropdownlist": () =>
			import("@/components/dropdownlist/BudgetType"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
	},
	data: () => ({
		// Obj
		budget: new BudgetModel(),
		budgetLines: [],
		budgetType: "segment",
		segment: new SegmentModel(),
		location: new LocationModel(),
		project: new ProjectModel(),
		user: Helper.getUser(),
		// Form validation
		valid: true,
		isEdit: false,
		alert: false,
		errorMessage: "",
		saveMode: "",
		SaveOption: SaveOption,
		// LoadingMe
		showLoading: false,
		/* Dialog */
        dialog: false,
        selectedRow: new BudgetLineExtendedModel(),
		crossAmount: 0,
		/* Kendo */
		columns: [],
        budgetLineDS : new kendo.data.TreeListDataSource({
            sort: [
                { field: "account.type_code", dir: "asc" },
                { field: "number", dir: "asc" },
            ],
            schema: {
                model: {
                    id: "uuid"
                }
            }
        }),
	}),
	methods: {
		// Initial Data
		initialData() {
			if (this.initBudget) {
				// Edit Mode
				this.isEdit = true;
				this.budget = this.initBudget;
				this.bindData();
			} else {
				// Brand New
				this.isEdit = false;
				this.setDefaultData();
			}
		},
		/* Initial Tree List */
        initialTreeList(){
            kendo.jQuery("#budgetLineTreeList").kendoTreeList({
                dataSource: new kendo.data.TreeListDataSource(),
                dataBound: this.onDataBound,
                editable: "incell",
                resizable: true,
                columnMenu: true,
                columns: this.columns,
            });
        },
		// Set default data
		setDefaultData() {
			this.budget = new BudgetModel({
				budget_type: "class",
				fiscal_year: Helper.getFiscalDateByDate(new Date()),
			});
		},
		/* Confirm Reload Accounts */
        confirmReload() {
            if(this.budgetLineDS.total() === 0){
                this.setDefaultBudgetLine();
            }else{
                this.$swal({
                    title: i18n.t('reload_data_?'),
                    text: i18n.t('this_will_reset_all_amount_to_zero'),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: i18n.t('cancel'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: i18n.t('reload'),
                }).then((result) => {
                    if (result.value) {
                        this.setDefaultBudgetLine();
                    }
                });
            }
        },
		// Bind data for edit mode
		async bindData() {
			/* Segment */
			if(this.budget.segment_uuid !== ""){
				this.bugetType = "segment";
				await this.$store.dispatch("segments/getList");
				this.segment = new SegmentModel(
					this.segments.find((i) => i.id === this.budget.segment_uuid)
				);
			}

			/* Location */
			if(this.budget.location_uuid !== ""){
				this.bugetType = "location";
				await this.$store.dispatch("locations/getList");
				this.location = new LocationModel(
					this.locations.find((i) => i.id === this.budget.location_uuid)
				);
			}

			/* Project */
			if(this.budget.project_uuid !== ""){
				this.bugetType = "project";
				await this.$store.dispatch("projects/getList");
				this.project = new ProjectModel(
					this.projects.find((i) => i.id === this.budget.project_uuid)
				);
			}

			this.setDefaultBudgetLine();
		},
		// Set Budget Lines
		async setDefaultBudgetLine() {
			this.showLoading = true;

			// Classes
			await this.$store.dispatch("classes/getList");

			let g = {};
            this.classes.forEach(value => {
                let clazz = new ClassModel(value),
					classParentId = clazz.clazz.id;

				/* GROUPING */
				/* Top Level Nature */
				if(!g[clazz.clazz.id]){
					g[clazz.clazz.id] = new BudgetLineExtendedModel({
						uuid : clazz.clazz.id,
						account_uuid : clazz.clazz.id,
						number : clazz.clazz.code,
						name : clazz.clazz.name,
						clazz : clazz.clazz,
					});
				}

				/* Type */
				if(clazz.classType.id !== ""){
					classParentId = clazz.classType.id;

					if(!g[clazz.classType.id]){
						g[clazz.classType.id] = new BudgetLineExtendedModel({
							uuid : clazz.classType.id,
							account_uuid : clazz.classType.id,
							number : clazz.classType.code,
							name : clazz.classType.name,
							clazz : clazz.classType,
							parentId : clazz.clazz.id,
						});
					}
				}

				/* Group */
				if(clazz.classGroup.id !== ""){
					classParentId = clazz.classType.id;

					if(!g[clazz.classGroup.id]){
						g[clazz.classGroup.id] = new BudgetLineExtendedModel({
							uuid : clazz.classGroup.id,
							account_uuid : clazz.classGroup.id,
							number : clazz.classGroup.code,
							name : clazz.classGroup.name,
							clazz : clazz.classGroup,
							parentId : clazz.classType.id,
						});
					}
				}

				/* Subgroup */
				if(clazz.classSubGroup.id !== ""){
					classParentId = clazz.classSubGroup.id;

					if(!g[clazz.classSubGroup.id]){
						g[clazz.classSubGroup.id] = new BudgetLineExtendedModel({
							uuid : clazz.classSubGroup.id,
							account_uuid : clazz.classSubGroup.id,
							number : clazz.classSubGroup.code,
							name : clazz.classSubGroup.name,
							clazz : clazz.classSubGroup,
							parentId : clazz.classGroup.id,
						});
					}
				}
				
				/* Child Level */
				if(!g[clazz.id]){
					g[clazz.id] = new BudgetLineExtendedModel({
						uuid : clazz.id,
						account_uuid : clazz.id,
						number : clazz.code,
						name : clazz.name,
						clazz : clazz,
						parentId : classParentId,
					});
				}

				// 12 months with amount
				for (let i = 0; i < 12; i++) {
					// Set Month Of
					let sdate = new Date(this.budget.fiscal_year.start_date);
					sdate.setMonth(sdate.getMonth() + i);

					g[clazz.id].monthly_amount.push({
						month_of : sdate.toISOString().substr(0, 7),
						amount : 0,
					});
				}

				/* Matching Account */
				if(this.isEdit){
					let bline = this.budget.lines.find((item) => item.account_uuid === value.uuid);
					if(bline){
						g[clazz.id] = bline;
					}
				}
            });
			
            /* Bind Budget Line */
            this.budgetLineDS.data(Object.values(g));

            /* Set New Datasource */
            let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
            treeList.setDataSource(this.budgetLineDS);

            this.showLoading = false;
		},
		// Row Template
        nameTmpl(dataItem){
            /* Define result */
            let result = `<span>${dataItem.number} - ${dataItem.name}</span>`;

            // /* Top Level */
            if(dataItem.parentId === null){
                result = `<span style='font-weight: bolder;'>${dataItem.name}</span>`;
            }

            /* Parent Level */
            if(dataItem.hasChildren){
                result = `<span style='font-weight: bolder;'>${dataItem.number} - ${dataItem.name}</span>`;
            }

            return result;
        },
        copyAcross(e){
            e.preventDefault();

            let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
            this.selectedRow = treeList.dataItem(kendo.jQuery(e.target).closest("tr"));

            this.dialog = true;
        },
        applyAcrossAmount(){
            this.dialog = false;

            this.selectedRow.monthly_amount.forEach(value => {
                value.amount = kendo.parseFloat(this.crossAmount);
            });
            this.selectedRow.amount = kendo.parseFloat(this.crossAmount) * 12;

            /* Refresh */
            let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
            treeList.refresh();

            this.crossAmount = 0;
        },
        generateColumn() {
            let headerAttributes = {
                class: "table-header-cell",
                style: "font-weight: bold;text-align: center;padding-right: 35px; font-size: 14px",
            },
            attributes = {
                class: "table-cell",
                style: "text-align: right; font-size: 14px",
            };

            let columns = [
                {
                    field: "name",
                    title: i18n.t("class"),
                    template: this.nameTmpl,
                    editable: ()=>{ return false },
                    width: 300,
                    headerAttributes: headerAttributes,
                },
                {
                    field: "note",
                    title: i18n.t("note"),
                    width: 200,
                },
                {
                    title: i18n.t("action"),
                    command: [{
                        name: "copycross",
                        text: "copy cross",
                        click: this.copyAcross,
                    }],
                    width: 150,
                }
            ];
            
            /* 12 Months */
            for (let i = 0; i < 12; i++) {
                columns.push({
                    field: `monthly_amount[${i}].amount`,
                    format: "{0:n}",
                    editor: NumberInputBoxEditor,
                    width: 150,
                    attributes: attributes,
                });
            }

            /* Total */
            columns.push({
                field: "amount",
                title: i18n.t("total"),
                format: "{0:n}",
                editable: ()=>{return false},
                width: 150,
                attributes: attributes,
            });

            /* Set All Columns */
            this.columns = columns;
        },
		/* On databound */
        onDataBound (e) {
            /* Titles */
            let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
            if(this.budget.fiscal_year){
                let fiscalMonths = Helper.generateFiscalMonths(this.budget.fiscal_year.start_date, this.budget.fiscal_year.end_date, "12");
                for (let k = 0; k < 12; k++) {
                    const element = fiscalMonths[k];
                    treeList.thead.find(`[data-field~='monthly_amount[${k}].amount']`).html(element);
                }
            }

            /* Headers */
            var headers = e.sender.thead.children();
            for (var i = 0; i < headers.length; i++) {
                var th = kendo.jQuery(headers[i]);
                th.css("font-weight", "bold");
                th.css("text-align", "center");
            }

            /* Items */
            var items = e.sender.items();
            for (var j = 0; j < items.length; j++) {
                var dataItem = e.sender.dataItem(items[j]);
                var row = kendo.jQuery(items[j]);

                /* Parent in bold */
                if(dataItem.get("hasChildren") || dataItem.get("parentId") === null){
                    row.find("[data-command='copycross']").hide();
                    row.css("font-weight", "bold");
                }
            }
        },
		// DataSource Changes
		onDataSourceChanges() {
			this.dataSourceAutoCalculate();
		},
		// Auto Calculate In DataSource
		dataSourceAutoCalculate() {
			// Sum Amount
			this.budgetLineDS.data().forEach((value) => {
				let sumAmt = 0;
				value.monthly_amount.forEach((ele) => {
					sumAmt += ele.amount;
				});
				value.set("amount", sumAmt);
			});
		},
		/* Budget Type Changes */
		onBudgetTypeChanges(){
			switch (this.budgetType) {
				case "segment":
					this.location = new LocationModel();
					this.project = new ProjectModel();
					break;

				case "location":
					this.segment = new SegmentModel();
					this.project = new ProjectModel();
					break;
			
				case "project":
					this.segment = new SegmentModel();
					this.location = new LocationModel();
					break;
			}
		},
		// Shrink Data
		shrinkData() {
			// Budget Types
			this.budget.segment_uuid = this.segment.id;
			this.budget.location_uuid = this.location.id;
			this.budget.project_uuid = this.project.id;

			// Lines
			let lines = [];
			this.budgetLineDS.data().forEach((value) => {
				// Add class line with amount not 0
				if (value.amount !== 0) {
					lines.push(new BudgetLineModel(value));
				}
			});
			this.budget.lines = lines;

			// User
			if (this.isEdit) {
				this.budget.modified_by = this.user;
			} else {
				this.budget.created_by = this.user;
			}
		},
		// Validating
		validateForm() {
			let result = true,
				msg = "";

			// Name
			if (this.budget.name === "") {
				msg += `<p>${i18n.t("name_is_required")}</p>`;
				result = false;
			}

			// Segment
			if (this.segment === null && this.bugetType === "segment") {
				msg += `<p>${i18n.t("segment_is_required")}</p>`;
				result = false;
			}

			// Location
			if (this.location === null && this.bugetType === "location") {
				msg += `<p>${i18n.t("location_is_required")}</p>`;
				result = false;
			}

			// Project
			if (this.project === null && this.bugetType === "project") {
				msg += `<p>${i18n.t("project_is_required")}</p>`;
				result = false;
			}

			// Fiscal Year
			if (this.budget.fiscal_year === null) {
				msg += `<p>${i18n.t("fiscal_date_is_required")}</p>`;
				result = false;
			}

			// Amount
			let hasZeroAmount = true;
			this.budgetLineDS.data().forEach((value) => {
				if (value.amount !== 0) {
					hasZeroAmount = false;

					return false;
				}
			});
			if (hasZeroAmount) {
				msg += `<p>${i18n.t("please_enter_amount")}</p>`;
				result = false;
			}

			// Show Alert
			this.errorMessage = msg;
			this.alert = false;
			if (result === false) {
				this.alert = true;
			}

			return result;
		},
		// All Saves
		async onSaveOptionClick(mode) {
			if (this.$refs.form.validate() && this.validateForm()) {
				this.saveMode = mode;
				this.save();
			}
		},
		cancel() {
			this.$swal({
				title: i18n.t("msg_title_warning"),
				text: i18n.t("msg_discard"),
				icon: "warning",
				showCancelButton: true,
				cancelButtonText: i18n.t("cancel"),
				confirmButtonColor: "#4d4848",
				cancelButtonColor: "#ED1A3A",
				confirmButtonText: i18n.t("discard"),
			}).then((result) => {
				if (result.value) {
					this.clear();
					this.$router.go(-1);
				}
			});
		},
		clear() {
			this.isEdit = false;
			this.saveMode = "";

			this.budget = new BudgetModel();
			this.segment = new SegmentModel();
			this.location = new LocationModel();
			this.project = new ProjectModel();
			this.bugetType = "segment";

			// Datasoure
            this.budgetLineDS.data([]);

			this.setDefaultData();
		},
		save() {
			let self = this;

			// Shrink Data
			this.shrinkData();

			// Sync Data
			this.showLoading = true;
			budgetHandler
				.saveClassBudget(this.budget)
				.then((response) => {
					if (response) {
						/* Update Vuex Data */
						this.$store.dispatch("budgets/saveBudget", response.data);

						self.responseStatus(response);
					}else{
                        this.$snotify.error(i18n.t("error_something_wrong"));
                    }
				})
				.catch((error) => {
					self.showLoading = false;
					this.$snotify.error(error);
				})
				.finally(() => {
					self.showLoading = false;
				});
		},
		// Response Status
        responseStatus(response) {
            if (response.status === 200) {
                /* Save Close or Delete Action */
				if (
					this.saveMode === SaveOption.SAVECLOSE ||
					this.saveMode === SaveOption.DELETE
				) {
					if (this.isEdit) {
						this.$router.go(-1);
					}
				}

				/* Reset Data */
				this.clear();

                /* Alert Success */
                this.$snotify.success(i18n.t("successful"));
            } else {
                /* Alert Error */
                this.$snotify.error(i18n.t("error_something_wrong"));
            }
        },
	},
	watch: {
        initBudget: "initialData"
    },
    computed: mapState({
        classes: state => state.classes.list,
        segments: state => state.segments.list,
		locations: state => state.locations.list,
		projects: state => state.projects.list,
    }),
    mounted () {
        // Initial Data
        this.initialData();
        this.generateColumn();
        this.initialTreeList();

        /* Datasource bind functions */
        this.budgetLineDS.bind("change", this.onDataSourceChanges);
    },
};
</script>

<style scoped>
.function_content {
	padding: 0 25px 25px;
	border-bottom: 0;
	background-color: #fff !important;
}

@media (min-width: 1264px) {
	.container {
		max-width: 1185px;
		/* max-width: 1280px !important; */
	}
}

.grayBg {
	background-color: #f8f8f9;
}

@media (max-width: 576px) {
	.mb-6 {
		margin-bottom: 0 !important;
	}
}

.section2 {
	border: 1px solid #d6d7d8;
}

.border_grey {
	border: 1px solid #d6d7d8;
}

.attachment_table {
	width: 100%;
}

.greyDark {
	background-color: #f2f2f2;
}

.upload_btn {
	width: 54%;
	margin: auto;
	padding: 10px 6px;
	text-align: center;
	color: #ffff;
	border-radius: 22px;
	background: #92d050;
}

.my_box_min_heihgt {
	height: 295px;
}

.width_100 {
	width: 100px;
}
.v-data-table.simple_table.theme--light {
	border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple_table > .v-data-table__wrapper > table > tbody > tr > td {
	height: 32px !important;
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
	border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table
	> .v-data-table__wrapper
	> table
	> thead
	> tr
	> th {
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table
	> .v-data-table__wrapper
	> table
	> thead
	> tr:last-child
	> th {
	border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table
	> .v-data-table__wrapper
	> table
	> thead
	> tr
	> th:last-child,
.v-data-table.simple_table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr
	> td:last-child {
	border-right: none !important;
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: transparent !important;
}

.primary--text.text-left.v-btn:hover,
.theme--light.v-btn:hover::before {
	background: none !important;
}
</style>