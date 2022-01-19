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
                    <v-card outlined dense class="no_border" height="130px">
						<router-link to="customer_list" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('customer_list')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('customer_list_desc')}}</p>
					</v-card>
				</v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="customer_sale_recurring_lists" class="no-text-decoration" ><h3 class="mb-2 font_18 primary--text">{{$t('customer_sale_recurring_lists')}}</h3></router-link>
                        <p class="mb-0 font_12">{{$t('customer_sale_recurring_lists_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="customers_credit_limit_term_reports" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('customers_credit_limit_term_reports')}}</h3></router-link>
                        <p class="mb-0 font_12">{{$t('customers_credit_limit_term_reports_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="draft_transaction_lists" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('draft_transaction_lists')}}</h3></router-link>
                        <p class="mb-0 font_12">{{$t('draft_transaction_lists_desc')}}</p>
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
</style>