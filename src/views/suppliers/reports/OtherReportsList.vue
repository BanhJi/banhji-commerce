<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="py-0">
			<h2 class="mb-0 primary--text">{{$t('other_reports_list')}}</h2>
			<p class="mb-0">
				{{$t('other_reports_list_desc')}}
			</p>
		</v-col>
		<v-col sm="12" cols="12" class="py-0">
			<v-row>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="150px">
						<router-link to="customer_list" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('customer_list')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('customer_list_desc')}}</p>
					</v-card>
				</v-col>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="150px">
						<router-link to="draft_transaction_lists" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('draft_transaction_lists')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('draft_transaction_lists_desc')}}</p>
					</v-card>
				</v-col>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="150px">
						<router-link to="suppliers_payment_recurring_lists" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('suppliers_payment_recurring_lists')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('suppliers_payment_recurring_lists_desc')}}</p>
					</v-card>
				</v-col>

				<v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
						<router-link to="suppliers_credit_limit_term_reports" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('suppliers_credit_limit_term_reports')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('suppliers_credit_limit_term_reports_desc')}}</p>
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
	.v-application a {
		color: #2CA01C;
		text-decoration: none;
	}
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