<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="py-0">
			<h2 class="mb-0 primary--text">{{$t('receivable_management_reports')}}</h2>
			<p class="mb-0">
				{{$t('receivable_management_reports_desc')}}
			</p>
		</v-col>
		<v-col sm="12" cols="12" class="py-0">
			<v-row>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="130px">
						<router-link to="customer_balance_summary" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('customer_balance_summary')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('customer_balance_summary_desc')}}</p>
					</v-card>
				</v-col>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="130px">
                        <router-link to="customer_balance_detail" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('customer_balance_detail')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('customer_balance_detail_desc')}}</p>
					</v-card>
				</v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="receivable_aging_summary" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('receivable_aging_summary')}}</h3></router-link>
                        <p class="mb-0 font_12">{{$t('receivable_aging_summary_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="receivable_aging_detail" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('receivable_aging_detail')}}</h3></router-link>
                        <p class="mb-0 font_12">{{$t('receivable_aging_detail_desc')}}</p>
                    </v-card>
                </v-col>
			</v-row>

			<v-row>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="receivable_aging_detail_by_items" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('receivable_aging_detail_by_items')}}</h3></router-link>
                        <p class="mb-0 font_12">{{$t('receivable_aging_detail_by_items_desc')}}</p>
                    </v-card>
                </v-col>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="130px">
                        <router-link to="receivable_aging_detail_by_employee" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('receivable_aging_detail_by_employee')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('receivable_aging_detail_by_employee_desc')}}</p>
					</v-card>
				</v-col>


				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="130px">
                        <router-link to="receivable_collection_reports" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('receivable_collection_reports')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('receivable_collection_reports_desc')}}</p>
					</v-card>
				</v-col>
				<v-col sm="3" cols="12">
					<v-card outlined dense class="no_border" height="130px">
                        <router-link to="list_of_invoice_to_be_collected" class="no-text-decoration"><h3 class="mb-2 font_18 primary--text">{{$t('list_of_invoice_to_be_collected')}}</h3></router-link>
						<p class="mb-0 font_12">{{$t('list_of_invoice_to_be_collected_desc')}}</p>
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