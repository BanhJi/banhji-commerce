<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="pt-0">
            <v-tabs vertical class="tab_setting tab_product_service_show" slider-color="grayBg" slider-size="7">
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('accounting_setting')}}
					</span>
				</v-tab>
				<!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('account_type')}}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('account_group')}}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>2
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('closing_date')}}
					</span>
				</v-tab> -->
				<!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('accounting_content')}}
					</span>
				</v-tab> -->
				
				<v-tab-item>
					<v-card flat class="custom_vcard">
						<v-card-text class="pt-0 bg_white">
							<FinancialSetting/>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<!-- <v-tab-item>
					<v-card flat class="custom_vcard">
						<v-card-text class="pt-0 bg_white">
							<AccountType />
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat class="custom_vcard">
						<v-card-text class="pt-0 bg_white">
							<AccountGroup/>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat class=" custom_vcard">
						<v-card-text class="pt-0 bg_white">
							<ClosingDate/>
						</v-card-text>
					</v-card>
				</v-tab-item> -->
				<!-- <v-tab-item>
					<v-card flat class=" custom_vcard">
						<v-card-text class="pt-0 bg_white">
							<AccountingContent/>
						</v-card-text>
					</v-card>
				</v-tab-item> -->
				
				
			</v-tabs>
		</v-col>
		
	

	</v-row>
</template>

<script>
	import FinancialSetting from './setting/FinancialSetting.vue'
	// import AccountGroup from './setting/Group.vue'
	// import AccountType from './setting/AccountType.vue'
	// import ClosingDate from './setting/ClosingDate'
	// import AccountingContent from './setting/AccountingContent'
	export default {
		data: () => ({
		}),
		props: {
		},
		methods: {
			clickMe(data) {
				this.$router.push(`${data.link}`);
			}
		},
		components: {
			FinancialSetting,
			// AccountGroup,
			// AccountType,
			// ClosingDate, 
			// AccountingContent
        },
	};
</script>
<style scoped>
	.v-tab{
		justify-content: left;
		font-size: 16px;
	}
	.v-tab--active{
		background-color: rgb(255, 255, 255);
	}
    .v-tab--active{
        background-color: #ffffff !important;
        border-bottom: 4px solid #f44336;
        border-left: none;
    }
	.tab_setting .v-tab--active{
		font-weight: 700;
		color: #000;
	}
	
	@media (max-width: 576px){
		
	}
</style>