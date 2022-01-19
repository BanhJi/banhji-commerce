<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<div class="reports_list pt-3">
						<h2>{{$t('chart_of_account')}}</h2>
						<v-icon 
							onclick="window.history.go(-1); return false;" 
							style="cursor: pointer; color: #333; font-size: 40px;"
							class="float-right"
						>close</v-icon>

						<div class="report_filter">
							<v-row>
								<v-col sm="10" cols="12">
									<v-row>
										<v-col sm="3" cols="12" class="py-0">
											<label class="label">{{$t('as_of')}}</label>
											<v-menu 
												ref="menu1"
												v-model="menu1"
												:close-on-content-click="true"
												transition="scale-transition"
												offset-y
												max-width="290px"
												min-width="290px"
											>
												<template v-slot:activator="{ on, attrs}">
													<v-text-field class="mt-1"
														v-model="dateFormatted"
														hint=""
														persistent-hint
														outlined
														tage="As Of"
														dense
														append-icon="event"
														@blur="date = parseDate(dateFormatted)"
														v-on="on"
														v-bind="attrs"
														readonly
														@click:append="menu1 = true"
													/>
												</template>
												<v-date-picker v-model="date" no-title @input="menu1 = false"/>
											</v-menu>
										</v-col>
										<v-col sm="2" cols="12" class="dv_mt mt-6 py-0">
											<v-btn class="white--text" color="primary">
												<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
											</v-btn>
										</v-col>
									</v-row>
								</v-col>
								<v-col sm="2" cols="12" >
									<div class="report_export">
										<p class="mb-1">{{$t('export_as')}}:</p>
										<i class="fa fa-print" style="font-size:34px; padding-right:6px;" aria-hidden="true"></i>
										<i class="fa fa-file-excel"  style="font-size:34px;padding-right:6px;"  aria-hidden="true"></i>
										<i class="fa fa-file-pdf" style="font-size:34px;padding-right:6px;" aria-hidden="true"></i>
									</div>
								</v-col>
							</v-row>
						</div>

						<div class="report_block">
							<v-row>
								<v-col sm="2" cols="12">
									<v-card class="pa-3 third rounded-0">
										<p class="text">{{$t('no_of_account')}}</p>
										<p class="number">100</p>
									</v-card>
								</v-col>
								<v-col sm="2" cols="12">
									<v-card class="pa-3 third rounded-0">
										<p class="text">{{$t('asset_accounts')}}</p>
										<p class="number">200</p>
									</v-card>
								</v-col>
								<v-col sm="2" cols="12">
									<v-card class="pa-3 third rounded-0">
										<p class="text">{{$t('liability_accounts')}}</p>
										<p class="number">200</p>
									</v-card>
								</v-col>
								<v-col sm="2" cols="12">
									<v-card class="pa-3 third rounded-0">
										<p class="text">{{$t('equity_account')}}</p>
										<p class="number">200</p>
									</v-card>
								</v-col>
								<v-col sm="2" cols="12">
									<v-card class="pa-3 third rounded-0">
										<p class="text">{{$t('revenues_accounts')}}</p>
										<p class="number">200</p>
									</v-card>
								</v-col>
								<v-col sm="2" cols="12">
									<v-card class="pa-3 third rounded-0">
										<p class="text">{{$t('expenses_accounts')}}</p>
										<p class="number">200</p>
									</v-card>
								</v-col>
							</v-row>
						</div>
						
						<div class="reports_table">
							<v-row>
								<v-col sm="12" cols="12" class="pt-0">
										<kendo-grid class="custom_grid" :data-source="localDataSource" :sortable="false" :filterable="false" :column-menu="true" >
											<kendo-grid-column 
												:field="'Number'" 
												:title="$t('number')" 
												:width="100"
												:headerAttributes="{
													style: ''
												}"
											/>
											<kendo-grid-column 
												:field="'Name'"
												:title="$t('name')"
												:width="140"
												:headerAttributes="{
													style: ''
												}"
											/>
											<kendo-grid-column 
												:field="'Type'"
												:title="$t('type')"
												:width="100"
												:format="'{0:c}'"
												:headerAttributes="{
													style: ''
												}"
											/>
											<kendo-grid-column 
												:field="'Group'"
												:title="$t('group')"
												:width="100"
												:format="'{0:c}'"
												:headerAttributes="{
													style: ''
												}"
											/>
											
											<kendo-grid-column 
												:field="'Nature_Balance'"
												:title="$t('nature_balance')"
												:width="150"
												:headerAttributes="{
													style: ''
												}"
											/>
											<kendo-grid-column 
												:field="'Balance'"
												:title="$t('balance')"
												:width="140"
												:headerAttributes="{
													style: ''
												}"
											/>
										</kendo-grid>
									</v-col>
							</v-row>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	export default {
		name: "",
		data: (vm) => ({
			all_fliter: [
				'All',
				'This Month'
			],
			date: new Date().toISOString().substr(0, 10),
			dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
			menu1: false,
			// Kendo Grid
			localDataSource: [{
					"Number": "JV2001000001",
					"Name": "JV2001000001",
					"Type": "Journal",
					"Group": "03-01-2020",
					"Nature_Balance": "test",
					"Balance": "testing",
				},
				{
					"Number": "JV2001000001",
					"Name": "JV2001000001",
					"Type": "Journal",
					"Group": "03-01-2020",
					"Nature_Balance": "test",
					"Balance": "testing",
				},
				{
					"Number": "JV2001000001",
					"Name": "JV2001000001",
					"Type": "Journal",
					"Group": "03-01-2020",
					"Nature_Balance": "test",
					"Balance": "testing",
				},
				{
					"Number": "JV2001000001",
					"Name": "JV2001000001",
					"Type": "Journal",
					"Group": "03-01-2020",
					"Nature_Balance": "test",
					"Balance": "testing",
				},
				{
					"Number": "JV2001000001",
					"Name": "JV2001000001",
					"Type": "Journal",
					"Group": "03-01-2020",
					"Nature_Balance": "test",
					"Balance": "testing",
				},
				{
					"Number": "JV2001000001",
					"Name": "JV2001000001",
					"Type": "Journal",
					"Group": "03-01-2020",
					"Nature_Balance": "test",
					"Balance": "testing",
				}
			],
		}),
		watch:{
			date () {
				this.dateFormatted = this.formatDate(this.date)
			},
		},
		methods:  {
			clickMe (data) {
				this.$route.push(data.link)
			},
			formatDate (date) {
				if (!date) return null

				const [year, month, day] = date.split('-')
				return `${month}/${day}/${year}`
				},
				parseDate (date) {
				if (!date) return null

				const [month, day, year] = date.split('/')
				return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
			},
			// Kendo Grid
			createRandomData(count) {
				const productNames = ['Chai', 'Chang', 'Syrup', 'Apple', 'Orange', 'Banana', 'Lemon', 'Pineapple', 'Tea', 'Milk',];
				const unitPrices = [12.5, 10.1, 5.3, 7, 22.53, 16.22, 20, 50, 100, 120]

				return Array(count).fill({}).map((_, idx) => ({
					ProductID: idx + 1,
					ProductName: productNames[Math.floor(Math.random() * productNames.length)],
					UnitPrice: unitPrices[Math.floor(Math.random() * unitPrices.length)]
				}));
			}
		},
		mounted() {
			// Kendo Grid
			this.itemss = this.createRandomData(50);
		},
		computed: {
			computedDateFormatted () {
				return this.formatDate(this.date)
			},
		},
		components: {
		},
	};
</script>
<style scoped>
	.reports_list{
		width: 100%;
		background-color: #fff;
		padding: 20px 20px 5px; 
	}
	.report_filter{
		background-color: #EDF1F5;
		padding: 0 20px 5px 20px;
		position: relative;
	}
	.report_export{
		position: absolute;
		top: 20px;
	}
	.dv_mt{
		margin-top: 20px;
	}
	.dv_mt8{
		margin-top: 30px;
	}
	.report_block .v-card.third{
		border: none;
		box-shadow: none;
		background-color: #2CA01C;
		color: #fff;
		text-transform: uppercase;
		min-height: 100px;
	}
	.report_block .v-card.third p.text{ 
		text-align: left;
		font-size: 17px;
	}
	.report_block .v-card.third p.number{ 
		text-align: center; 
		font-size: 25px;
		font-weight: 700;
		margin-bottom: 0;
	}
	@media (max-width: 576px){
		.dv_mt, .dv_mt8{ margin-top: 0;}
		.reports_list{ margin-top: 0; }
	}
</style>