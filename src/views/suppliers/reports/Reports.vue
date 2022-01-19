<template>
	<v-row class="">
		<v-col sm="12" cols="12">
            <v-tabs vertical class="tab_setting" slider-color="grayBg" slider-size="7">
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('purchase_management_report')}}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('payable_management_reports')}}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('order_report_list')}}
					</span>
				</v-tab>
				<!-- tabs ITem one -->
                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
							<PurchaseManagementReports/>
                        </v-col>
                    </v-row>
                </v-tab-item>

                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
							<PayableManagementReports/>
                        </v-col>
                    </v-row>
                </v-tab-item>

                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
							<OtherReportsList/>
                        </v-col>
                    </v-row>
                </v-tab-item>
			</v-tabs>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: 'Reports',
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
			OtherReportsList : () => import('./OtherReportsList'),
			PayableManagementReports: () => import('./PayableManagementReports'),
			PurchaseManagementReports : () => import('./PurchaseManagementReports')
        },
	};
</script>
<style scoped>
    .v-tab{
        justify-content: left;
        padding: 8px !important;
        height: 65px !important;
        text-align: left;
        float: left;
    }
    .v-tab--active{
        background-color: #ffffff !important;
        border-bottom: 4px solid #92d050;
        border-left: none;
    }
    .v-tabs-slider {
        background-color:#EDF1F5 !important;
        padding-left: 6px;
        height: 100%;
        width: 100%;
    }
    .theme--light.v-tabs .v-tabs-bar{
        width: 210px;
    }
    .tab_setting.theme--light.v-tabs.tab_setting .v-tabs-bar{
        min-height: 715px !important;
    }
</style>