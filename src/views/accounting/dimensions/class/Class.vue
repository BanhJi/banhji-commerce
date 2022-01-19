<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6">
			<v-card color="white" class="pa-3 no_border" elevation="0">
				<v-row>
					<v-col sm="12" cols="12" class="pt-0">
						<h2 class="mb-0 font_20">{{ $t("class_item") }}</h2>
						<v-btn width="120" color="primary"
						class="white--text float-right text-capitalize ml-5" @click="onCreateNew">{{ $t('create_new') }}
						</v-btn>
						<v-dialog v-model="dialogM2" max-width="650px">
                            <v-card>
                                <div class="modal_header">
                                    <v-card-title>{{ $t("class_item") }}</v-card-title>
                                    <v-icon @click="dialogM2 = false">close</v-icon>
                                </div>
                                <v-card-text class="modal_text_content">
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="">
                                                <v-row>
                                                    <v-col sm="2" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("nature") }}:</p>
                                                    </v-col>
                                                    <v-col sm="4" class="pt-0 pl-0">
                                                        <v-select
                                                            class="mt-1"
                                                            id="acc_type_selector"
                                                            :items="clazzes"
                                                            :item-text="item =>`${item.code} - ${item.name}`"
                                                            :rules="[(v) => !!v['id'] || $t('field_is_required')]"
                                                            tage="Department"
                                                            :loading="cLoading"
                                                            v-model="clazz"
                                                            item-value="uuid"
                                                            outlined
                                                            @change="changeClass"
                                                            return-object/>
                                                    </v-col>
                                                    <v-col sm="2" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("type") }}:</p>
                                                    </v-col>
                                                    <v-col sm="4" class="pt-0 pl-0">
                                                        <v-select
                                                            class="mt-1"
                                                            id="acc_type_selector"
                                                            :items="clazzTypes"
                                                            :item-text="item =>`${item.code} - ${item.name}`"
                                                            :rules="[(v) => !!v['id'] || $t('field_is_required')]"
                                                            tage="Department"
                                                            v-model="classType"
                                                            item-value="uuid"
                                                            :loading="tLoading"
                                                            @change="changeType"
                                                            outlined
                                                            return-object/>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="2" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("group") }}:</p>
                                                    </v-col>
                                                    <v-col sm="4" class="pt-0 pl-0">
                                                        <v-select
                                                            class="mt-1"
                                                            id="acc_type_selector"
                                                            :items="classGroups"
                                                            :item-text="item =>`${item.code} - ${item.name}`"
                                                            tage="Department"
                                                            :loading="gLoading"
                                                            v-model="classGroup"
															@change="changeGroup"
                                                            item-value="uuid"
                                                            clearable
                                                            outlined
                                                            return-object/>
                                                    </v-col>
													<v-col sm="2" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("sub_group") }}:</p>
                                                    </v-col>
                                                    <v-col sm="4" class="pt-0 pl-0">
                                                        <v-select
                                                            class="mt-1"
                                                            id="acc_type_selector"
                                                            :items="classSubGroups"
                                                            :item-text="item =>`${item.code} - ${item.name}`"
                                                            tage="Department"
                                                            :loading="sgLoading"
                                                            v-model="classSubGroup"
                                                            item-value="uuid"
                                                            clearable
                                                            outlined
                                                            return-object/>
                                                    </v-col>
                                                </v-row>   
                                                <v-row>
                                                    <v-col sm="2" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("code") }}:</p>
                                                    </v-col>
                                                    <v-col sm="4" class="pt-0 pl-0">
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                            v-model="classItem.code"
                                                            id="Class type"
                                                            placeholder="Code"
                                                            :rules="[(v) => !!v || 'Code is required']"/>
                                                    </v-col>
                                                    <v-col sm="2" class="pt-0 pr-0">
                                                        <label class="label">{{ $t("name") }}</label>
                                                    </v-col>
                                                    <v-col sm="4" class="pt-0 pl-0">
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                            v-model="classItem.name"
                                                            id="Class Name"
                                                            placeholder="Name"
                                                            :rules="[(v) => !!v || 'Name is required']"/>
                                                    </v-col>
                                                </v-row>
												<v-row>
													<v-col sm="12" class="pt-2 pr-0">
														<v-textarea
															class="mt-1"
															autocomplete="description"
															label="description"
															v-model="classItem.description"
															rows="3"
															outlined/>
													</v-col>
												</v-row>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                                <v-divider />
                                <v-card-actions class="modal_footer">
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-0 text-left">
                                            <v-btn color="black"
                                                outlined
                                                class=" text-capitalize  black--text float-left"
                                                @click="dialogM2 = false"
                                                >{{ $t("cancel") }}</v-btn>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-0 text-right">
                                            <v-btn @click="onSaveClose"
                                                :disabled="btnEnable"
                                                color="primary"
                                                class=" white--text text-capitalize">{{ $t("save_close") }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
						<p class="mb-0">{{ $t("class_func_setting_desc") }}</p>
					</v-col>
					<v-col sm="12" cols="12">
						<template>
							<div v-if="!isLoaded">
								<LoadingMe
								:isLoading="showLoading"
								:fullPage="false"
								:myLoading="true"
								type="loading"/>
							</div>
						<kendo-datasource
							ref="classItemDS"
							:data="classItems"
                            :sort="sort"
                            :group="group"/>
						<kendo-grid
							id="gridClassItem"
							class="grid-function"
							ref="gridComponent"
							:data-source-ref="'classItemDS'"
							:pageable="true"
                            :groupable="true"
                            :resizable="true"
                            :sortable="true"
                            :column-menu="true"
                            :filterable="true"
							:scrollable-virtual="true">
							<!-- <kendo-grid-column
								:field="'no'"
								:title="$t('no')"
								:template="rowNumberTmpl"
								:width="40"
								:column-menu="false"
								:headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-center'}"
								:attributes="{ style: 'text-align: center' }"/> -->
                            <kendo-grid-column
								:field="'code'"
								:title="$t('code')"
                                :filterable-multi="true"
                                :filterable-search="true"
                                :width="90"
								:template="'<span>#=code#</span>'"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
							<kendo-grid-column
								:field="'name'"
								:attributes="{ class: 'tb_name_td' }"
								:title="$t('name')"
								:template="'<span>#=name#</span>'"
                                :filterable-multi="true"
                                :filterable-search="true"
                                :width="190"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
								:field="'description'"
								:attributes="{ class: 'tb_name_td' }"
								:title="$t('description')"
                                :width="200"
                                :hidden="true"
                                :filterable-multi="true"
                                :filterable-search="true"
								:template="'<span>#=description || ``#</span>'"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
							<kendo-grid-column
                                :field="'clazz.name'"
                                :title="$t('nature')"
                                :filterable-multi="true"
                                :filterable-search="true"
                                :template="'<span>#=clazz.code# - #=clazz.name#</span>'"
                                :group-header-template="'#=value#'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'classType.name'"
                                :title="$t('type')"
                                :filterable-multi="true"
                                :filterable-search="true"
                                :group-header-template="'#=value#'"
                                :template="'<span>#=classType.code# - #=classType.name#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'classGroup.name'"
                                :title="$t('group')"
                                :filterable-multi="true"
                                :filterable-search="true"
                                :group-header-template="'#=value#'"
                                :template="'<span>#=classGroup.code || ``# - #=classGroup.name || ``#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
							<kendo-grid-column
                                :field="'classSubGroup.name'"
                                :title="$t('sub_group')"
                                :filterable-multi="true"
                                :filterable-search="true"
                                :template="'<span>#=classSubGroup.code || ``# - #=classSubGroup.name || ``#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
							<kendo-grid-column
								:field="''"
								:title="$t('action')"
								:width="100"
								:command="[{iconClass: 'k-icon k-i-edit',text: 'Edit',click: goEdit}]"
								:headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
						</kendo-grid>
						</template>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import ClassItemModel from "@/scripts/model/Clazz";
import kendo from "@progress/kendo-ui";

const classItemModel = new ClassItemModel({});
const $ = require("jquery");
const settingsHandler = require("@/scripts/settingsHandler");

export default {
	components: {
		LoadingMe: () => import(`@/components/Loading`)
	},
	data: () => ({
		dialogM2: 		false,
		showLoading: 	true,
		isLoaded: 		false,
		btnEnable: 		false,
		valid: 			false,
		gLoading: 		true,
		tLoading: 		true,
		cLoading: 		true,
		sgLoading: 		true,
		classItems: 	[],
		classItem: 		classItemModel,
		clazzes: 		[],
		clazz: 			{id: ''},
		clazzTypes: 	[],
		classType: 		{id: ''}, 
		classGroups: 	[],
		classGroup: 	{id: ''},
		classSubGroups: [],
		classSubGroup: 	{id: ''},
        group: [{ field: 'classType.name'},{field: 'classGroup.name' }],
        sort: { field: "clazz.code", dir: "ASC" }
	}),
	props: {},
	mounted: async function(){
		await this.loadClassItem();
	},
	methods: {
		close() {
			this.classItem 			= new ClassItemModel();
			this.clazzes  			= [];
			this.clazz 				= {};
			this.clazzTypes 		= [];
			this.classType 			= {};
			this.classGroups		= [];
			this.classGroup 		= {};
			this.classSubGroups 	= [];
			this.classSubGroup  	= {};
			this.dialogM2 			= false;
		},
		goEdit(e) {
			e.preventDefault();
			let grid 			= kendo.jQuery("#gridClassItem").data("kendoGrid");
			let dataItem 		= grid.dataItem($(e.currentTarget).closest("tr"));
			window.console.log('dataItem', dataItem)
			this.classItem 		= new ClassItemModel(dataItem);
			this.clazz 			= new ClassItemModel(dataItem.clazz)
			this.classType 		= new ClassItemModel(dataItem.classType)
			this.classGroup 	= new ClassItemModel(dataItem.classGroup)
			this.classSubGroup 	= new ClassItemModel(dataItem.classSubGroup)
			this.loadClass()
			this.changeClass()
			this.changeType()
			this.changeGroup()
			this.dialogM2 		= true;
		},
		rowNumberTmpl(dataItem) {
			let ds = this.$refs.classItemDS.kendoWidget(),
				index = ds.indexOf(dataItem);
			return index + 1;
		},
		async loadClassItem() {
			let params = {
				type:           "class_item"
			}
			new Promise((resolve) => {
				setTimeout(() => {
					resolve("resolved");
					this.clazzes = [];
					settingsHandler.getClazz(params).then((res) => {
						this.showLoading = true;
						if (res.data.statusCode === 200) {
							this.showLoading = false;
							this.classItems = res.data.data;
						}
					}).catch();
					{
						this.showLoading = false;
					}
				}, 300);
			});
		},
		async onSaveClose() {
			if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            if(this.classGroup === null){
                this.classGroup = {id: ''}
            }
            if(this.classSubGroup === null){
                this.classSubGroup = {id: ''}
            }
			new Promise((resolve) => {
				setTimeout(() => {
					resolve("resolved");
                    window.console.log('this.classGroup', this.classGroup)
					let data = new ClassItemModel({
						id:             	this.classItem.id ? this.classItem.id : "",
                        name:           	this.classItem.name,
                        code:           	this.classItem.code,
                        isShow:         	this.classItem.isShow,
						description: 		this.classItem.description,
                        clazz:          	this.clazz || {},
                        clazzId:        	this.clazz.id || '',
                        classType:      	this.classType || {},
                        classTypeId:    	this.classType.id || '',
                        classGroup:     	this.classGroup  || {},
                        classGroupId:   	this.classGroup.id || '',
						classSubGroup:     	this.classSubGroup  || {},
                        classSubGroupId:   	this.classSubGroup.id || '',
                        type:           	"class_item"
					});
					this.btnEnable = true;
					window.console.log('data', data)
					settingsHandler.create(data).then((response) => {
						if (response.data.statusCode === 201) {
							const res = response.data.data;
							const index = this.classItems.findIndex((item) => {
								return res.id === item.id;
							});
							if (this.classItems.length === 0) {
								this.loadClassItem();
							} else {
								if (index < 0) {
									this.classItems.push(res);
								} else {
									this.classItems.splice(index, 1, res);
								}
							}
							this.btnEnable = false;
							this.$snotify.success("Success");
							this.close();
						}
					}).catch((e) => {
						this.btnEnable = false;
						this.$snotify.error("Something went wrong");
						this.errors.push(e);
					});
				}, 300);
			});
		},
		async onCreateNew(){
			await this.loadClass()
            this.dialogM2 = true;
        },
		changeClass(){
            window.console.log(1, this.clazz)
            this.loadType(this.clazz.id)
        },
		changeType(){
            window.console.log(2, this.classType)
            this.loadGroup(this.classType.id)
        },
		changeGroup(){
            if(this.classGroup === null){
                this.classSubGroups = []
            }else{
                this.loadSubGroup(this.classGroup.id)
            }
		},
		async loadClass() {
            let params = {
                type:       'class'
            }
            new Promise((resolve) => {
                setTimeout(() => {
                resolve("resolved");
                this.clazzes = [];
                settingsHandler.getClazz(params).then((res) => {
                    this.showLoading = true;
                    if (res.data.statusCode === 200) {
                        this.showLoading = false;
                        this.clazzes = res.data.data;
                        if(this.clazzes.length > 0){
                            this.cLoading = false
                        }
                    }
                }).catch();
                {
                    this.showLoading = false;
                }
                }, 300);
            });
        },
		async loadType(clazzId) {
            let params = {
                type:       'class_type',
                clazzId:    clazzId
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.clazzTypes = [];
                    settingsHandler.getClazz(params).then((res) => {
                        this.showLoading = true;
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.clazzTypes = res.data.data;
                            if(this.clazzTypes.length > 0){
                                this.tLoading = false
                            }
                        }
                    }).catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
		async loadGroup(classTypeId) {
            let params = {
                type:           'class_group',
                clazzId:        this.clazz.id || '',
                classTypeId:    classTypeId
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.classGroups = [];
                    settingsHandler.getClazz(params).then((res) => {
                        this.showLoading = true;
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.classGroups = res.data.data;
                            if(this.classGroups.length > 0){
                                this.gLoading = false
                            }
                        }
                    }).catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
		async loadSubGroup(classGroupId) {
            let params = {
                type:           	'class_sub_group',
                clazzId:        	this.clazz.id || '',
				classTypeId: 		this.classType.id || '',
                classGroupId:    	classGroupId
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingsHandler.getClazz(params).then((res) => {
                        this.showLoading = true;
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.classSubGroups = res.data.data;
                            if(this.classSubGroups.length > 0){
                                this.sgLoading = false
                            }
                        }
                    }).catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
	}
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

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-family: "Niradei-Bold", serif;
  color: #000 !important;
  border-top: 1px solid #000 !important;
  border-bottom: 1px solid #000 !important;
  font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  color: #000 !important;
  padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

.function_footer {
  padding: 15px;
  display: inline-block;
}

@media (max-width: 576px) {
}
</style>
