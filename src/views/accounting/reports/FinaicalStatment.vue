<template>
	<v-row class="reports_wrapper">
		<v-col sm="12" cols="12" class="pa-0">
	
			<v-row>
				<v-col  cols="12" sm="6" class="pt-0">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 100px;">
						<router-link to="statement_of_profit_or_loss" ><h3 class="font_18">{{$t('statement_profit_lose')}}</h3></router-link>
						<p class="mb-0 ">{{$t('profit_lose_desc')}}</p>
					</v-card>
				</v-col>
				<v-col  cols="12" sm="6" class="pt-0">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 100px;">
						<router-link to="statement_of_financial_position" ><h3 class="font_18">{{$t('statement_financial_position')}}</h3></router-link>
						<p class="mb-0 ">{{$t('financial_position_desc')}}</p>
					</v-card>
				</v-col>
				<v-col cols="12" sm="6" class="pt-0">
					<v-card outlined dense class="pa-3 no_border" style="min-height: 100px;">
						<router-link to="" ><h3 class="font_18">{{$t('statement_cash_flow')}}</h3></router-link>
						<p class="mb-0 ">{{$t('cash_flow_desc')}}</p>
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