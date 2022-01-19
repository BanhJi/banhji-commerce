<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="10" cols="12" class="pt-0">
                            <h2 class="mb-0 font_20">{{$t('tax_agents')}}</h2>
                        </v-col>
                        <v-col sm="2" cols="12" class="py-1">
                            <v-btn @click="dialog = true" class="float-right capitalize white--text" color="primary" >
                                {{$t('add_new')}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                      <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('name') }}</th>
                                    <th>{{ $t('email_personal') }}</th>
                                    <th>{{ $t('phone_personal') }}</th>
                                    <th>{{ $t('email') }}</th>
                                    <th>{{ $t('phone') }}</th>
                                    <th>{{ $t('banhji_id') }}</th>
                                    <th>{{ $t('action') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="ta in taxAgents" v-bind:key="ta.id">
                                    <td>{{ ta.name }}</td>
                                    <td>{{ ta.emailPersonal }}</td>
                                    <td>{{ ta.phonePersonal }}</td>
                                    <td>{{ ta.email }}</td>
                                    <td>{{ ta.phone }}</td>
                                    <td>{{ ta.banhjiId }}</td>
                                    <td class="text-center">
                                        <v-btn @click="editTaxAgent(ta)" class="btn_edit_setting">
                                            <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                            <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :type="'loading'"
                        :myLoading="true"
                       />
                </v-col>
                <v-col cols="12">
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{ $t("add_tax_agent") }}</v-card-title>
                                <v-icon @click="onClose">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content" >
                                <v-row>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label class="label">{{ $t("company_name") }}</label>
                                        <v-text-field v-model="taxAgent.name" class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label class="label">{{ $t("email_personal") }}</label>
                                        <v-text-field v-model="taxAgent.emailPersonal" class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <label class="label">{{ $t("phone_personal") }}</label>
                                        <v-text-field v-model="taxAgent.phonePersonal" class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <label class="label">{{ $t("email") }}</label>
                                        <v-text-field v-model="taxAgent.email" class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <label class="label">{{ $t("phone") }}</label>
                                        <v-text-field v-model="taxAgent.phone" class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <label class="label">{{ $t("banhji_id") }}</label>
                                        <v-text-field v-model="taxAgent.banhjiId" class="mt-1" outlined/>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider/>
                            <v-card-actions class="modal_footer d-flex justify-space-between">
                                <v-btn @click="onClose" color="primary"  outlined class="black--text capitlaize">{{ $t("cancel") }}</v-btn>
                                <v-btn @click="onCreate" color="primary" class="white--text capitalize"
                                >{{ $t("save_close") }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import TaxAgent from "@/scripts/compliance/model/TaxAgent";
const taxAgentHandler = require("@/scripts/compliance/handler/taxAgentHandler")
const taxAgent = new TaxAgent({})
export default {
    data: () => ({
        showLoading: false,
        dialog: false,
        taxAgent: taxAgent,
        taxAgents: []
    }),
    props: {},
    methods: {
        onClose() {
            this.dialog = false
            this.taxAgent = taxAgent
        },
        onCreate() {
            this.showLoading = true
            taxAgentHandler.create(this.taxAgent).then(res => {
                window.console.log(res)
                this.taxAgents.push(res.data.data)
                this.taxAgents = this.taxAgents.filter((e, i) => this.taxAgents.findIndex(o => e.name === o.name) === i)
                this.onClose()
                this.showLoading = false
            })
        },
        async onloadTaxAgent() {
            this.showLoading = true
            taxAgentHandler.get().then(res => {
                this.taxAgents = res.data.data
                this.showLoading = false
            })
        },
        editTaxAgent(item) {
            this.taxAgent = item
            this.dialog = true
        },
    },
    async mounted() {
        await this.onloadTaxAgent()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
    },
};
</script>
<style scoped>
 
</style>
