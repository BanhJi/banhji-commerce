<template>
	<v-row class="">
		<v-col sm="12" cols="12">
            <v-tabs vertical class="tab_setting" slider-color="grayBg" slider-size="7">
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('payment_method')}}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('payment_term')}}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('txn_prefix_setting')}}
					</span>
				</v-tab>
				<!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('bank_account_type')}}
					</span>
				</v-tab> -->
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('forms')}}
					</span>
				</v-tab>

                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
							<PaymentMethod/>
                        </v-col>
                    </v-row>
				</v-tab-item>
				<v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
							<PaymentTerm/>
                        </v-col>
                    </v-row>
				</v-tab-item>
				<v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
							<TransactionPrefixSetting/>
                        </v-col>
                    </v-row>
				</v-tab-item>
				<!-- <v-tab-item>
					<v-card flat class="px-5 custom_vcard">
						<v-card-text class="pt-0 bg_white">
							<BankAccountType/>
						</v-card-text>
					</v-card>
				</v-tab-item> -->
				<v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
							<Form/>
                        </v-col>
                    </v-row>
				</v-tab-item>
				
			</v-tabs>
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
			PaymentMethod :()=> import('./PaymentMethod'),
			PaymentTerm :()=> import('./PaymentTerm'),
			TransactionPrefixSetting :()=> import('./TransactionPrefixSetting'),
			Form :()=> import('./Form')
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
        border-bottom: 4px solid #92d050;
        border-left: none;
    }
	.tab_setting .v-tab--active{
		font-weight: 700;
		color: #000;
	}
	
	@media (max-width: 576px){
		
	}
</style>