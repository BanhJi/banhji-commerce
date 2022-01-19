<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="py-0">
			<h2 class="mb-0 primary--text">{{$t('payable_management_reports')}}</h2>
			<p class="mb-0">
				{{$t('payable_management_reports_desc')}}
			</p>
		</v-col>
		<v-col sm="12" cols="12" class="py-0">
			<v-row>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="150px">
						<router-link to="supplier_balance_summary" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('supplier_balance_summary')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('supplier_balance_summary_desc')}}</p>
					</v-card>
				</v-col>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="150px">
						<router-link to="suppliers_balance_detail" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('suppliers_balance_detail')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('suppliers_balance_detail_desc')}}</p>
					</v-card>
				</v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="payable_aging_summary" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('payable_aging_summary')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('payable_aging_summary_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="payable_aging_detail" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('payable_aging_detail')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('payable_aging_detail_desc')}}</p>
                    </v-card>
                </v-col>
			</v-row>

			<v-row>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="150px">
						<router-link to="payable_aging_detail_by_items" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('payable_aging_detail_by_items')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('payable_aging_detail_by_items_desc')}}</p>
					</v-card>
				</v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="bill_payment_reports" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('bill_payment_reports')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('bill_payment_reports_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="list_of_bill_to_be_paid" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('list_of_bill_to_be_paid')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('list_of_bill_to_be_paid_desc')}}</p>
                    </v-card>
                </v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>

	export default {
		components: {
        },
		data () {
		},
		props: {
		},
		methods: {
		},
		computed: {
		},
		created(){
		},
		mounted: async function () {
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
	.v-application a {
		color: #2CA01C;
		text-decoration: none;
	}
	.theme--light.v-tabs.tab_setting>.v-tabs-bar{
		min-height: auto !important;
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