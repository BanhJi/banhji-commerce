<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="py-0">
			<h2 class="mb-0 primary--text">{{$t('purchase_management_report')}}</h2>
            <p class="mb-0">
                {{$t('purchase_management_report_desc')}}
            </p>
		</v-col>

        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
						<router-link to="purchase_summary_by_suppliers_employee" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('purchase_summary_by_suppliers_employee')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('purchase_summary_by_suppliers_employee_desc')}}</p>
					</v-card>
				</v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
						<router-link to="purchase_detail_by_suppliers_and_employee" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('purchase_detail_by_suppliers_and_employee')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('purchase_detail_by_suppliers_and_employee_desc')}}</p>
					</v-card>
				</v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="purchase_summary_by_items_brands" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('purchase_summary_by_items_brands')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('purchase_summary_by_items_brands_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="purchase_detail_by_item_brands" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('purchase_detail_by_item_brands')}}</h3></router-link>
                        <p class="mb-0 font_12">{{$t('purchase_detail_by_item_brands_desc')}}</p>
                    </v-card>
                </v-col>
			</v-row>

			<v-row>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="purchase_order_by_items_and_suppliers" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('purchase_order_by_items_and_suppliers')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('purchase_order_by_items_and_suppliers_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="deposit_detail_by_suppliers" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('deposit_detail_by_suppliers')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('deposit_detail_by_suppliers_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="open_purchase_order" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('open_purchase_order')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('open_purchase_order_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
						<router-link to="credit_card_purchase_reports" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('credit_card_purchase_reports')}}</h3>
                        </router-link>
						<p class="mb-0 font_12">{{$t('credit_card_purchase_reports_desc')}}</p>
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