<template>
	<v-row class="">
		<v-col sm="12" cols="12">
			<h2>{{$t('account_form')}}</h2>
			<v-dialog v-model="dialog" scrollable max-width="1024px">
				<template v-slot:activator="{on}">
					<v-btn class="btn_create_new float-right" v-on="on" @click="createNew">
						{{$t('create_new')}}
					</v-btn>
				</template>

				<v-card>
					<div class="modal_header">
						<v-card-title>{{$t('account_form')}}</v-card-title>
						<v-icon  @click="dialog = false">close</v-icon>
					</div>
					<v-card-text class="modal_text_content">
						<v-row>
							<v-col sm="3" cols="12" class="">
								<label class="label">{{$t('form_title')}}</label>
								<p class="text_tip">Input title form</p>
								<v-text-field class=" mb-3"
									outlined
									tage="Form Title"
									placeholder=""
									v-model="formOptionSetting.form_title"
								/>

								<label class="label">Position of Logo</label>
								<v-row>
									<v-col sm="4" cols="4" class="text-center">
										<button @click="logoCenter" class="logo_pos" >Center</button>
									</v-col>
									<v-col sm="4" cols="4" class="text-center">
										<button @click="logoLeft" class="logo_pos" >Left</button>
									</v-col>
									<v-col sm="4" cols="4" class="text-center">
										<button @click="logoRight" class="logo_pos" >Right</button>
									</v-col>
								</v-row>

								<label class="label">{{$t('signature')}}</label>
								<v-row>
									<v-col sm="4" cols="4" class="text-center">
										<v-text-field class=""
											outlined
											disabled
											tage="Signature"
											placeholder="1"
										></v-text-field>
									</v-col>
									<v-col sm="8" cols="4" class="text-center">
										<v-text-field class=""
											outlined
											placeholder="Prepared by"
											v-model="formOptionSetting.prepared_by"
										/>
									</v-col>
								
									<v-col sm="4" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											disabled
											placeholder="2"
										/>
									</v-col>
									<v-col sm="8" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											placeholder="Reviewed by"
											v-model="formOptionSetting.reviewed_by"
										/>
									</v-col>

									<v-col sm="4" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											disabled
											placeholder="3"
										/>
									</v-col>
									<v-col sm="8" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											placeholder="Verified by"
											v-model="formOptionSetting.verified_by"
										/>
									</v-col>

									<v-col sm="4" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											disabled
											placeholder="4"
										/>
									</v-col>
									<v-col sm="8" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											placeholder="Approved by"
											v-model="formOptionSetting.approved_by"
										/>
									</v-col>

									<v-col sm="4" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											disabled
											placeholder="5"
										/>
									</v-col>
									<v-col sm="8" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											placeholder="Recorded by"
											v-model="formOptionSetting.recorded_by"
										/>
									</v-col>
									<!-- color -->
									<v-divider />
									<v-col sm="4" cols="4" class="text-center pt-0">
										<v-text-field class=""
											outlined
											disabled
											placeholder="Color"
										/>
									</v-col>
									<v-col sm="8" cols="4" class="text-center pt-0">
										<input class="color_option" type="color"  v-model="formOptionSetting.color"  />
										<input class="color_option" type="color"  v-model="formOptionSetting.back_color" />
									</v-col>	
									<v-col sm="12" cols="4" class=" pt-0">
										<button @click="setFormDefualt" class="logo_pos" >Defualt</button>
									</v-col>
								
								</v-row>
							</v-col>
							<v-col sm="9" cols="11" class="bg_white">
								<v-row class="wrapper_form">
									<v-col sm="12" cols="12" >
										<v-row class="header" v-if="!formOptionSetting.is_logo_right">
											<v-col :sm="formOptionSetting.col_left" class="logo_company">
												<img src="@/assets/images/banhji_icon.png" />
											</v-col>
											<v-col :sm="formOptionSetting.col_right"  class="pb-0">
												<h2>Royal University of Phnom Penh</h2>
												<p class='address'>Address:
													<span>No. 113, Mao Tse Toung Blvd(245),Parkway Square, 1st Floor, Phnom Penh.KH</span>
												</p>
												<p class="phone_email">Phone:
													<span>0969868005</span>
													|
													<span>Email:</span>
												</p>
											</v-col>
										</v-row>
										<v-row class="header" v-if="formOptionSetting.is_logo_right">
											<v-col :sm="formOptionSetting.col_right" cols="12" class="pb-0">
												<h2>Royal University of Phnom Penh</h2>
												<p class='address'>Address:
													<span>No. 113, Mao Tse Toung Blvd(245),Parkway Square, 1st Floor, Phnom Penh.KH</span>
												</p>
												<p class="phone_email">Phone:
													<span>0969868005</span>
													|
													<span>Email:</span>
												</p>
											</v-col>
											<v-col :sm="formOptionSetting.col_left" cols="12" class="logo_company">
												<img src="@/assets/images/banhji_icon.png" />
											</v-col>
										</v-row>
										<v-row class="content">
											<v-col sm="12" cols="12">
												<h3 class="title mb-2">{{formOptionSetting.form_title}}</h3>

												<v-simple-table class='custom_table'>
													<template v-slot:default>
														<thead>
														<tr>
															<th style="width: 30%" class="text-bold">Type of Transaction</th>
															<th class="text-left">Journal</th>
															<th class="text-bold">Voucher No.</th>
															<th class="text-left">JV2000026</th>
														</tr>
														</thead>
														<tbody>
														<tr v-for="item in table1" :key="item.type">
															<td>{{ item.type }}</td>
															<td>{{ item.journal }}</td>
															<td class="text-bold">{{ item.number }}</td>
															<td>{{ item.date }}</td>
														</tr>
														</tbody>
													</template>
												</v-simple-table>

												<v-simple-table class='custom_table mt-3'>
													<template v-slot:default>
														<thead>
															<tr>
																<th colspan="4" class="text-bold">Description of the transaction:</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td colspan="4">bdsjfhbadsn,f,m</td>
															</tr>
															<tr v-for="item in table2" :key="item.type">
																<td style="width: 25%">{{ item.type }}</td>
																<td style="width: 25%">{{ item.journal }}</td>
																<td style="width: 25%">{{ item.number }}</td>
																<td style="width: 25%">{{ item.date }}</td>
															</tr>
														</tbody>
													</template>
												</v-simple-table>
											</v-col>

											<v-col sm="12" cols="12">
												<v-simple-table class='custom_table1'>
													<template v-slot:default>
														<thead>
															<tr>
																<th :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}" class="text-bold">Account</th>
																<th :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}" class="text-bold">Description</th>
																<th :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}" class="text-bold">Debit</th>
																<th :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}" class="text-bold">Credit</th>
																<th :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}" class="text-bold">Segments</th>
															</tr>
														</thead>
														<tbody>
															<tr v-for="item in table3" :key="item.type">
																<td style="width: 20%">{{ item.account }}</td>
																<td style="width: 20%">{{ item.desc }}</td>
																<td class="text-right" style="width: 15%">{{ item.debit }}</td>
																<td class="text-right" style="width: 15%">{{ item.credit }}</td>
																<td style="width: 25%">
																{{ item.segments }}</td>
															</tr>
														</tbody>
														<tfoot>
															<tr>
																<td class="text-right" colspan="2">TOTAL</td>
																<td class="text-right">54.00</td>
																<td class="text-right">54.00</td>
																<td ></td>
															</tr>
														</tfoot>
													</template>
												</v-simple-table>
											</v-col>

											<v-col sm="12" cols="12" class="pt-0">
												<v-simple-table class='custom_table1'>
													<template v-slot:default>
														<thead>
															<tr>
																<th class="text-bold" :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}">{{formOptionSetting.reviewed_by}}</th>
																<th class="text-bold" :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}">{{formOptionSetting.verified_by}}</th>
																<th class="text-bold" :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}">{{formOptionSetting.approved_by}}</th>
																<th class="text-bold" :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}">{{formOptionSetting.recorded_by}}</th>
																<th class="text-bold" :style="{'background-color':formOptionSetting.color,'color':formOptionSetting.back_color}">{{formOptionSetting.prepared_by}}</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td style="width: 20%; padding: 30px 10px;"/>
																<td style="width: 20%; padding: 30px 10px;"/>
																<td style="width: 20%; padding: 30px 10px;"/>
																<td style="width: 20%; padding: 30px 10px;"/>
																<td style="width: 20%; padding: 30px 10px;"/>
															</tr>
														</tbody>
													</template>
												</v-simple-table>
											</v-col>

											<v-col sm="4" cols="12" class="">
												<p class="mb-0">Attached Documents:</p>
												<v-simple-table class='tableAttached mt-2'>
													<template v-slot:default>
														<thead>
															<tr>
																<th class="text-bold">Name</th>
																<th class="text-bold">Description</th>
															</tr>
														</thead>
														<tbody>
															<tr v-for="item in tableAttached" :key="item.type">
																<td style="width: 25%">{{ item.namr }}</td>
																<td style="width: 25%">{{ item.desc }}</td>
															</tr>
														</tbody>
													</template>
												</v-simple-table>
											</v-col>

										</v-row>
									</v-col>
								</v-row>


								<!-- <h3 class="text-products mb-4">Journal Voucher</h3> -->
								
								<!-- <table class="tbl_form">
									<tr>
										<th>No.</th>
										<th>Account</th>
										<th>Description</th>
										<th>Ref No.</th>
										<th>Debit</th>
										<th>Credit</th>
									</tr>
									<tr>
										<td width="10%">1</td>
										<td></td>
										<td class=""></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>2</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</table> -->
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions class="modal_footer">
						<v-btn class="btn_save_close float-right"  @click="saveForm">{{$t('save_close')}}</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			
			<p class="mb-3">{{$t('acc_form_prefix')}}</p>

			<template>
				<v-data-table class="exchange-table"
					:headers="headers"
					:items="formOptionSettinglist"
					sort-by="">
					<template v-slot:item.actions= "{ item }">
						<v-btn width="100%" color="primary" class="rounded-0"  @click="EditItem(item)">
							<span class="text-capitalize text-bold text-white">{{$t('edit')}}</span>
						</v-btn>
					</template>
					<template slot="no-data">
						<LoadingMe 
							:isLoading ="compeletLoading" 
							:fullPage  ="false" 
							:myLoading ="true"/>
					</template>
				</v-data-table>
				<!-- <v-simple-table class="exchange-table">
					<template v-slot:default>
						<thead>
						<tr>
							<th class="text-uppercase">{{$t('name')}}</th>
							<th class="text-uppercase">{{$t('form_type')}}</th>
							<th class="text-uppercase">{{$t('last_edited')}}</th>
							<th class="text-uppercase">{{$t('action')}}</th>
						</tr>
						</thead>
						<tbody>
							<tr>
								<td width="17.5%">JOURNAL VOUCHER</td>
								<td width="20%">
									JOURNAL ENTRY
								</td>
								<td>
									19 April 2020
								</td>
								<td>
									<v-btn width="100%" color="primary" class="rounded-0">
										<span class="text-capitalize text-bold text-white">{{$t('edit')}}</span>
									</v-btn>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table> -->
			</template>
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

	const axios = require('axios')
	import { i18n } from '@/i18n'
	import LoadingMe from '@/components/Loading'
	export default {
		components: {
            LoadingMe
        },
		data () {
			return {
				dialogm1: '',
				dialog: false,
				compeletLoading: true,
				editedIndex: -1,
				option: 1,
				update_id: '',
				timeout: 3000,
				textStatus: 'Success',
				color: '#3DA72E',
				x: 'right',
				y: 'top',
				snackbar: false,
				formOptionSettinglist:[],
				formOptionSetting:{
					form_title: "JOURNAL VOUCHER",
					col_left : 2,
					col_right : 10,
					is_logo_right : false,
					prepared_by: 'Prepared By',
					reviewed_by: 'Reviewed By',
					verified_by: 'Verified By',
					approved_by: 'Approved By',
					recorded_by: 'Recorded By',
					back_color: "#DDDDDD",
					color: "#585858"
				},
				formDefualtSetting:{
					form_title: "JOURNAL VOUCHER",
					col_left : 2,
					col_right : 10,
					is_logo_right : false,
					prepared_by: 'Prepared By',
					reviewed_by: 'Reviewed By',
					verified_by: 'Verified By',
					approved_by: 'Approved By',
					recorded_by: 'Recorded By',
					back_color: "#DDDDDD",
					color: "#585858"
				},
				headers: [
					{text: i18n.t('name'),align: 'start',sortable: false,value: 'form_title',},
					{text: i18n.t('form_type'), value: 'form_title', sortable: false,},
					{text: i18n.t('last_edited'), value: 'updated_at', sortable: false,},
					{text: i18n.t('action'), value: 'actions', sortable: false},
				],
				account_type: [
					'test',
					'test1'
				],
				table1: [
					{
						type: 'Please Specify applicable',
						journal: '',
						number: 'Date',
						date: '05/08/2020',
					},
				],
				table2: [
					{
						type: 'Journal Voucher No.',
						journal: '',
						number: 'Advance Voucher No.',
						date: '',
					},
					{
						type: 'Name',
						journal: '',
						number: 'Payment Voucher No.',
						date: '',
					},
				],
				table3: [
					{
						account: '10120 - Current/Checking Account',
						desc: 'current acount',
						debit: '',
						credit: '54.00',
						segments: 'S1: Business Unit' + '\n' + 'S2: BanhJi Accounting' + '\n' + 'S3: BfdW',
					},
					{
						account: '62856 - Meals and Entertainment',
						desc: 'meals',
						debit: '54.00',
						credit: '',
						segments: '',
					},
				],
				tableAttached:[
					{
						name: '',
						desc: '',
					},
				]
			}
		},
		props: {
		},
		methods: {
			createNew(){
				this.option = 1
				this.update_id = '',
				this.setFormDefualt()
			},
			EditItem(item){
				this.formOptionSetting = this.formOptionSettinglist.indexOf(item)
				//eslint-disable-next-line no-console
				// console.log(this.formOptionSetting, item);
				this.formOptionSetting = Object.assign({}, item)
				this.option = 0
				this.update_id = item.id
				this.dialog = true
			},
			logoCenter(){
				this.formOptionSetting.col_left = 12,
				this.formOptionSetting.col_right = 12,
				this.formOptionSetting.is_logo_right = false 
			},
			logoLeft(){
				this.formOptionSetting.col_left = 2,
				this.formOptionSetting.col_right = 10,
				this.formOptionSetting.is_logo_right = false
			},
			logoRight(){
				this.formOptionSetting.col_left = 2,
				this.formOptionSetting.col_right = 10,
				this.formOptionSetting.is_logo_right = true
			},
			saveForm(){
				let url, method = ''
				let self = this
                if (this.option === 1) { // Create
                    url = 'http://laravelapi.com/api/addformdata'
                    method = 'post'
                } else if (this.option === 0) { // Update
                    url = 'http://laravelapi.com/api/updateform/'+this.update_id 
                    method = 'post'
				}
				self.compeletLoading = true
                axios({
                    method: method,
                    url: url,
                    data: this.formOptionSetting
                }).then(function (response) {
					//eslint-disable-next-line no-console
					if(response.status == 200){
						self.dialog = false
						self.snackbar = true
						self.compeletLoading = false
						if(self.option ==1 ){
							self.textStatus = "Added successfull"
							self.loadFormSetting()
						}else{
							self.textStatus = "Updated successfull"
							const index = self.formOptionSettinglist.findIndex(find => find.id === self.update_id);
							if(index !== -1){
								self.formOptionSettinglist.splice(index,1,self.formOptionSetting)
							}
						}
					}
				
				}).catch(function (error) {
					//eslint-disable-next-line no-console
					console.log(error)
				});
			},
			// getSettingFormData(){
			// 	if(typeof localStorage.formOption != "undefined"){
			// 		this.formOptionSetting = JSON.parse(localStorage.getItem('formOption'))
			// 	}else{
			// 		this.formOptionSetting = this.formDefualtSetting
			// 	}
			// },
			setFormDefualt(){
				this.formOptionSetting.col_left = 2,
				this.formOptionSetting.form_title = "JOURNAL VOUCHER",
				this.formOptionSetting.col_right = 10,
				this.formOptionSetting.is_logo_right = false,
				this.formOptionSetting.prepared_by = 'Prepared By',
				this.formOptionSetting.reviewed_by = 'Reviewed By',
				this.formOptionSetting.verified_by = 'Verified By',
				this.formOptionSetting.approved_by = 'Approved By',
				this.formOptionSetting.recorded_by = 'Recorded By',
				this.formOptionSetting.back_color = "#DDDDDD",
				this.formOptionSetting.color = "#585858"
			},
			async loadFormSetting() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        axios.get('http://laravelapi.com/api/getformdata')
                            .then(res => {
                                //eslint-disable-next-line no-console
                                // console.log(res.data)
                                this.formOptionSettinglist = res.data
                                // this.compeletLoading = false
                            })
                    }, 500);
                })
            },
		},
		computed: {
			
		},
		created(){
			// this.getSettingFormData()
		},
		mounted: async function () {
            this.loadFormSetting()
        }

		
	};
</script>
<style scoped>
	table.acc_form{
		border-top: 1px solid #ccc;
		width: 100%;
		border-collapse: collapse;
		margin-top: 10px;
		color: #000;
	}
	table.acc_form tr th{
		text-transform: uppercase;
		padding: 10px;
		border-top: 1px solid #ccc;
		border-bottom: 3px solid #ccc;
		vertical-align: middle;

	}
	table.acc_form tr td{
		border-bottom: 1px solid #ccc;
		padding: 8px;
		vertical-align: middle;
	}
	table.acc_form tr td:first-child{
		font-weight: 700;
	}
	table.acc_form tr td:last-child{
		text-align: center;
	}
	.btn_edit{
		background-color: #4e6470 !important;
		color: #fff !important;
		height: 35px;
	}
	.v-card__actions .v-btn.v-btn {
		padding: 0 16px;
	}
	.function_footer {
		padding: 15px;
		display: inline-block;
	}
	.bg_white{
		background-color: #fff;
		padding-left: 0;
		padding-top: 0;
	}
	.wrapper_form{
		width: 99%;
		margin: 0 auto;
	}
	.wrapper_form .header .logo_company{
		text-align: center;
		padding-top: 0 ;
	}
	.wrapper_form .header .logo_company img{
		width: 100px;
		height: auto;
	}
	.wrapper_form .header h2{
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 8px;
		font-size: 25px;
	}
	.wrapper_form .header p{
		text-align: center;
		margin-bottom: 8px;
		width: 93%;
		margin: 0 auto;
	}
	.wrapper_form .header p.phone_email{
		text-align: center;
	}
	.wrapper_form .content h3.title{
		text-transform: uppercase;
		text-align: center;
		font-size: 25px !important;
		font-weight: 700 !important;
	}
	.new_line{
		clear: both			
	}
	


	
	table.tbl_form{
		border-top: 1px solid #ccc;
		width: 95%;
		padding: 0 10px;
		border-collapse: collapse;
		margin-top: 10px;
		color: #000;
		margin-left: 10px;
	}
	table.tbl_form tr th{
		text-transform: uppercase;
		padding: 10px;
		border-top: 1px solid #ccc;
		border-bottom: 3px solid #ccc;
		vertical-align: middle;
	}
	table.tbl_form tr td{
		border: 1px solid #ccc;
		padding: 8px;
		vertical-align: middle;
	}
	table.tbl_form tr td:first-child{
		border-left: none;
		text-align: center;
	}
	table.tbl_form tr td:last-child{
		border-right: none;
	}
	.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
		font-family: 'Niradei-Bold',serif;
		color: #000 !important;
		border-top: 1px solid #000 !important;
		border-bottom: 0 !important;
		font-size: 15px !important;
	}
	.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td{
		color: #000 !important;
		padding: 5px !important;
	}
	.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row){
		border-top: 1px solid #000 !important;
		border-bottom: 0;
	}
	.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td{
		border-bottom: 1px solid #000 !important;
	}
	.logo_pos{
		padding: 5px 5px;
		background: #fff;
		width: 60px;
		font-size: 12px;
		border-radius: 6px;
	}
	.color_option{
		width: 62px;
		border: 1px solid #808080;
		margin-right: 4px;
		height: 37px;
		border-radius: 6px;
	}
	@media (max-width: 576px){
		
	}
</style>