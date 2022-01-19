<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('prefix')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('position')}}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{$t('abbr')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Abbr"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        v-model="prefix.abbr"
                                        placeholder=""/>
                                    <label class="label">{{$t('name')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Name"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        v-model="prefix.name"
                                        placeholder=""
                                        readonly/>
                                    <v-row>
                                        <v-col sm="6" cols="6" class="">
                                            <label class="label">{{$t('format')}}</label>
                                            <v-text-field class="mt-1"
                                                outlined
                                                tage="format"
                                                :rules="[v => !!v || $t('field_is_required')]"
                                                v-model="prefix.format"
                                                placeholder=""/>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="">
                                            <label class="label">{{$t('separator')}}</label>
                                            <v-select class="mt-1"
                                                id="acc_type_selector"
                                                :items="separators"
                                                item-text="name"
                                                :rules="[v => !!v || $t('field_is_required')]"
                                                tage="Separator"
                                                v-model="prefix.separator"
                                                item-value="uuid"
                                                outlined/>

                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn small color="primary" outlined class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn small color="primary" class="white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <p class="mb-0">{{$t('department_desc')}} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
				<kendo-datasource ref="prefixeDS" :data="prefixes" />
				<kendo-grid
					id="gridPrefix"
					class="grid-function"
					:data-source-ref="'prefixeDS'"
					:editable="false"
					:scrollable-virtual="true"
					:column-menu="false">
					<kendo-grid-column
						:field="'abbr'"
						:title="$t('abbr')"
						:template="'<span>#=abbr#</span>'"
						:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
						:field="'name'"
						:title="$t('name')"
						:template="'<span>#=name#</span>'"
						:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
						:field="'format'"
						:title="$t('format')"
						:template="'<span>#=format#</span>'"
						:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
						:field="'separator'"
						:title="$t('separator')"
						:template="'<span>#=separator#</span>'"
						:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
						:field="'preview'"
						:title="$t('preview')"
						:template="'<span>#=preview#</span>'"
						:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
					<kendo-grid-column
						:field="''"
						:title="$t('action')"
						:width="100"
						:command="[{iconClass: 'k-icon k-i-edit', text: 'Edit',click: goEdit}]"
						:headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
				</kendo-grid>
			</template>
        </v-col>
    </v-row>
</template>

<script>
    const payrollHandler = require("@/scripts/payrollHandler")
    import Prefix from '@/scripts/model/payrollsetting/Prefix'
    const prefixModel = new Prefix({})
    import kendo from "@progress/kendo-ui";
    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            valid: true,
            dialogm2: false,
            compeletLoading: true,
            prefix: prefixModel,
            departmentSelected: '',
            mSelected: '',
            departmentList: [],
            positionList: [],
            option: 1,
            prefixes: [],
            separators: [
                '-',
                '/',
                'N/A'
            ],
        }),
        props: {},
        computed: {},
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        created() {
        },
        methods: {
            goEdit(e){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        e.preventDefault();
                        let grid = kendo.jQuery("#gridPrefix").data("kendoGrid");
                        let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
                        this.prefix = new Prefix(dataItem)
                        this.dialogm2 = true
                    }, 300);
                })
            },
            zeroPad(num, places) {
                return String(num).padStart(places, '0')
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                const lastNumber = this.zeroPad(parseInt(1), this.prefix.format)
                if(this.prefix.separator =='N/A'){
                    this.prefix.preview  = this.prefix.abbr + lastNumber
                }else{
                    this.prefix.preview  = this.prefix.abbr + this.prefix.separator + lastNumber
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = new Prefix({
                            id                     : this.prefix.id,
                            abbr                   : this.prefix.abbr,
                            name                   : this.prefix.name,
                            format                 : this.prefix.format,
                            separator              : this.prefix.separator,
                            preview                : this.prefix.preview
                        })
                        window.console.log(1, data)
                        payrollHandler.createPrefix(data).then(response => {
                            window.console.log('response', response)
                            if (response.data.statusCode === 201) {
                                const res = response.data
                                const index = this.prefixes.findIndex(item => {
                                    return (res.data.id === item.id)
                                })
                                if (this.prefixes.length === 0) {
                                    this.loadPrefix()
                                } else {
                                    if (index < 0) {
                                        this.prefixes.push(res.data)
                                    } else {
                                        this.prefixes.splice(index, 1, res.data)
                                    }
                                }
                                this.$snotify.success('Success')
                                this.clear()
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            async loadPrefix(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPrefix().then(res => {
                            if(res.statusCode === 200){
                                let result = res.data
                                if(result.length > 0){
                                     this.prefixes = result
                                }else{
                                    this.prefixes =[{
                                        abbr:       'EM',
                                        name:       'Employee',
                                        format:     5,
                                        separator:  '-',
                                        preview:    'EM-00001'
                                    }]
                                }
                            }
                        })
                    }, 300);
                })
            },
            close() {
                this.dialogm2 = false
            },
            clear() {  
                this.departmentSelected   = ''
                this.mSelected = ''
                this.position = {}
            },
        },
        mounted: async function () {
            this.loadPrefix()
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

    @media (max-width: 576px) {

    }
</style>