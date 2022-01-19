<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="py-0">
			<v-row>
				<v-col sm="4" cols="12">
					<v-card outlined dense color="grayBg" class="py-5 px-7 no_border" min-height="150">
						<router-link to="cash_movement" ><h4>{{$t('cash_movement')}}</h4></router-link>
						<p class="mb-0">{{$t('cash_movement_desc')}}</p>
					</v-card>
				</v-col>
				<v-col sm="4" cols="12">
					<v-card outlined dense color="grayBg" class="py-5 px-7 no_border" min-height="150">
						<router-link to="cash_collection" ><h4>{{$t('cash_collection')}}</h4></router-link>
						<p class="mb-0">{{$t('cash_collection_desc')}}</p>
					</v-card>
				</v-col>
				<v-col sm="4" cols="12">
					<v-card outlined dense color="grayBg" class="py-5 px-7 no_border" min-height="150">
						<router-link to="bill_payment_desc" ><h4>{{$t('bill_payment')}}</h4></router-link>
						<p class="mb-0">{{$t('bill_payment_desc')}}</p>
					</v-card>
				</v-col>
			</v-row>

			<v-row>
				<v-col sm="4" cols="12">
					<v-card outlined dense color="grayBg" class="py-5 px-7 no_border" min-height="150">
						<router-link  to="cash_advance_its_settlements" ><h4 >{{$t('cash_advance_its_settlements')}}</h4></router-link>
						<p class="mb-0">{{$t('cash_advance_its_settlements_desc')}}</p>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name:'',
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
    .no_border a{
        text-decoration: none !important; ;
    }
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
		background-color: rgb(237, 241, 245);
	}
	@media (max-width: 576px){
		
	}
</style>