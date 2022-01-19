<template>
	<v-row class="reports_wrapper">
		<v-col sm="12" cols="12" class="pt-0">
			<h2 class="black--text">{{$t('accounting_reports')}}</h2>
			<p class="mb-0" style="width:90%">{{$t('accounting_report_desc')}}</p>
			<v-row>
				<v-col  cols="">
					<v-card outlined dense class="no_border pa-3" style="min-height: 215px;">
						<router-link to="journal_reports" ><h3 class="primary--text">{{$t('journal_entry_report')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('journal_report_desc')}}</p>
					</v-card>
				</v-col>
				<v-col cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="general_ledger" ><h3 class="primary--text">{{$t('general_ledger')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('general_ledger_desc')}}</p>
					</v-card>
				</v-col>
				<v-col  cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="trial_balance" ><h3 class="primary--text">{{$t('trial_balance')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('trial_balance_desc')}}</p>
					</v-card>
				</v-col>
				<v-col  cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="account_type_balance" ><h3 class="primary--text">{{$t('account_types_balances')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('account_types_balances_desc')}}</p>
					</v-card>
				</v-col>
				<v-col  cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="account_group_balances" ><h3 class="primary--text">{{$t('account_group_balances')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('account_group_balances_desc')}}</p>
					</v-card>
				</v-col>
		
			</v-row>
			<v-row>
				<v-col cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="chart_of_account" ><h3 class="primary--text">{{$t('chart_of_accounts')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('chart_of_accounts_desc')}}</p>
					</v-card>
				</v-col>
				<v-col  cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="statement_of_profit_or_loss" ><h3>{{$t('statement_profit_lose')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('profit_lose_desc')}}</p>
					</v-card>
				</v-col>
				<v-col  cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="statement_of_financial_position" ><h3>{{$t('statement_financial_position')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('financial_position_desc')}}</p>
					</v-card>
				</v-col>
				<v-col cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="statement_of_cash_flow" ><h3>{{$t('statement_cash_flow')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('cash_flow_desc')}}</p>
					</v-card>
				</v-col>
				<v-col  cols="">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 215px;">
						<router-link to="statement_of_profit_or_loss_currency" ><h3>{{$t('statement_changes_equity')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('statement_changes_equity_desc')}}</p>
					</v-card>
				</v-col>
			
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		data: () => ({
		}),
		props: {
		},
		methods: {
			clickMe(data) {
				// alert(data.link)
				this.$router.push(`${data.link}`);
				//this.$event.target.classList.toggle(active)
				//eslint-disable-next-line no-console
				console.log(data.link)
				//eslint-disable-next-line no-console
				//console.log(data)
			}
		},
		components: {
        },
	};
</script>
<style scoped>
	.reports_wrapper h2{
		font-weight: 600;
		color: #203864;
		font-size: 25px;
		text-transform: capitalize;
		margin-bottom: 0;
	}
	.reports_wrapper a{
		text-decoration: none;
	}
	.reports_wrapper a h4{
		font-size: 16px;
		margin-bottom: 2px;
		color: #2CA01C;
	}
	.reports_wrapper .v-card{
		min-height: 190px;
	}
	@media (max-width: 576px){
		
	}
</style>