<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="font_20">{{ $t('company_information') }}</h2>
            <v-dialog v-model="dialog" scrollable max-width="700px">
                <template v-slot:activator="{on}">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on">
                        {{ $t('edit') }}
                    </v-btn>
                </template>

                <v-card class="sm_screen">
                    <div class="modal_header">
                        <v-icon class="btn_close float-right" @click="dialog = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="6" cols="12" class="">
                                <label class="label">{{ $t('company_name') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.name"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('company_logo') }}</label>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pb-0 ">
                                        <v-card width="100" height="80" outlined dense
                                                class="px-3 pt-3 mx-auto rounded-0">
                                            <v-img width="60" height="60" class="mx-auto" :src="src"/>
                                        </v-card>
                                        <template class="pt-0">
                                            <v-file-input class=" mt-0"
                                                          accept=".png, .jpg, .jpeg"
                                                          label="File input"
                                                          @change="onFileChange"
                                            />
                                            <input
                                                hidden
                                                type="file"
                                                name="image"
                                                id="image"
                                                :rules="fileSizeRules"
                                                accept=".png, .jpg, .jpeg"
                                                ref="fileupload"
                                                @change="onFileChange"/>
                                        </template>
                                    </v-col>
                                </v-row>

                            </v-col>
                            <v-col sm="6" cols="12" class="">
                                <label class="label">{{ $t('legal_name') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.legalName"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('registration_no') }}</label>
                                <v-text-field class="mt-1"
                                              outlined
                                              v-model="company.registration"
                                              dense
                                />
                                <label class="label">{{ $t('tax_type') }}</label>
                                <v-select class="mt-1"
                                          v-model="company.taxRegime"
                                          :items="taxRegimes"
                                          item-value="name"
                                          :rules="[v => !!v || 'Tax type is required']"
                                          item-text="name"
                                          outlined
                                          dense
                                />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t('legal_type') }}</label>
                                <v-select class="mt-1"
                                          :items="bt"
                                          v-model="businessType"
                                          item-value="id"
                                          :rules="[v => (!!v.id) || 'Legal type is required']"
                                          item-text="name"
                                          outlined
                                          dense
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t('industry') }}</label>
                                <v-select class="mt-1"
                                          v-model="sector"
                                          :items="sectors"
                                          item-value="id"
                                          :rules="[v => (!!v.id) || 'Industry is required']"
                                          item-text="name"
                                          outlined
                                          dense
                                />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t('company_address') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.companyAddress"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('invoicing_address') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.invoiceAddress"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('invoicing_email') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.invoiceEmail"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('website') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.website"
                                              outlined
                                              dense
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t('legal_address') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.legalAddress"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('company_email') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.companyEmail"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('company_phone') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.companyPhone"
                                              outlined
                                              dense
                                />
                                <label class="label">{{ $t('facebook_page') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="company.fbPage"
                                              outlined
                                              dense
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn
                                    color="primary"
                                    outlined
                                    class=" text-capitalize  black--text float-left"
                                    @click="dialog = false"
                                >{{ $t("cancel") }}
                                </v-btn
                                >
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn
                                    @click="onUpdateCompany"
                                    color="primary"
                                    class="px-3  white--text text-capitalize"
                                >{{ $t("save_close") }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <p class="mb-0">{{ $t('company_information_desc') }}</p>
            <table class="acc_setting">
                <tr>
                    <td rowspan="4" width="17.5%" class="text-bold">{{ $t('company_name') }}</td>
                    <td width="17.5%">
                        {{ $t('company_name') }}
                    </td>
                    <td class="text-bold">
                        {{ company.name }}
                    </td>
                </tr>
                <tr>
                    <td width="17.5%">
                        {{ $t('legal_name') }}
                    </td>
                    <td class="text-bold">
                        {{ company.legalName }}
                    </td>
                </tr>
                <tr>
                    <td width="17.5%">
                        {{ $t('company_logo') }}
                    </td>
                    <td/>
                </tr>
                <tr>
                    <td width="17.5%">
                        {{ $t('registration_no') }}
                    </td>
                    <td class="text-bold">
                        {{ company.registration }}
                    </td>
                </tr>

                <tr>
                    <td rowspan="5" class="text-bold">{{ $t('company_type') }}</td>
                    <td>
                        {{ $t('tax_type') }}
                    </td>
                    <td class="text_bold">
                        {{ company.taxRegime }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('tax_registration_no') }}
                    </td>
                    <td class="text_bold">
                        {{ company.vatTin }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('financial_reporting_standard') }}
                    </td>
                    <td class="text_bold">
                        {{ financialReportingStandards.name }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('legal_type') }}
                    </td>
                    <td class="text_bold">
                        {{ businessType.name }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('industry') }}
                    </td>
                    <td class="text_bold">
                        {{ sector.name }}
                    </td>
                </tr>

                <tr>
                    <td rowspan="3" class="text-bold">{{ $t('address') }}</td>
                    <td>
                        {{ $t('company_address') }}
                    </td>
                    <td class="text_bold">
                        {{ company.companyAddress }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('legal_address') }}
                    </td>
                    <td class="text_bold">
                        {{ company.legalAddress }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('invoicing_address') }}
                    </td>
                    <td class="text_bold">
                        {{ company.invoiceAddress }}
                    </td>
                </tr>

                <tr>
                    <td rowspan="5" class="text-bold">{{ $t('contact_info') }}</td>
                    <td>
                        {{ $t('company_email') }}
                    </td>
                    <td class="text_bold">
                        {{ company.companyEmail }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('invoicing_email') }}
                    </td>
                    <td class="text_bold">
                        {{ company.invoiceEmail }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('company_phone') }}
                    </td>
                    <td class="text_bold">
                        {{ company.companyPhone }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('website') }}
                    </td>
                    <td class="text_bold">
                        {{ company.website }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ $t('facebook_page') }}
                    </td>
                    <td class="text_bold">
                        {{ company.fbPage }}
                    </td>
                </tr>

            </table>
        </v-col>
    </v-row>
</template>

<script>
const cookieJS = require("@/cookie.js");
let cookie = cookieJS.getCookie();

const instituteHandler = require("@/scripts/instituteHandler")
export default {
    data: () => ({
        fileSizeRules: [
            files => !files || !files.some(file => file.size > 1024 * 1024) || 'Image size should be less than 1 MB!'
        ],
        company : cookie,
        dialogm1: '',
        dialog: false,
        show1: false,
        mInstitute: {},
        src: '',
        imgFile: '',
        bt: [],
        sectors: [],
        taxRegimes: [],
    }),
    props: {},
    watch: {},
    async mounted() {
        await this.getCookieData()
        await this.loadInstituteInfo()
        await this.loadDataBusiness()
    },
    methods: {
        async onUpdateCompany() {
            this.showLoading = true
            this.company.financialReportingStandards =this.financialReportingStandards
            this.company.businessType = this.businessType
            this.company.sector = this.sector
            this.company.imgProfile = this.src
            await this.saveImage()
            await instituteHandler.addCompany(this.company, this.mInstitute.creator).then(async () => {
                await this.loadInstituteInfo()
                this.showLoading = false
                this.dialog = false
            })
        },
        async saveImage() {
            const data = {data : this.imgFile}
            await instituteHandler.saveImageProfile(data).then(res => {
                this.src = res.url
                this.company.imgProfile = res.url
            })
        },
        async loadDataBusiness() {
            await instituteHandler.getBt().then(res => {
                this.bt = res
            })
            await instituteHandler.getSector().then(res => {
                this.sectors = res
            })
            await instituteHandler.getTaxRegime().then(res => {
                this.taxRegimes = res
            })
        },
        async onFileChange(e) {
            // const file = e.target.files[0];
            let input = e
            if (input.size > 1024 * 1024) {
                e.preventDefault();
                alert('File too big (> 1MB)');
                this.src = ''
                this.imgFile = ''
                this.$refs.fileupload.value = null;
            } else {
                // create a new FileReader to read this image and convert to base64 format
                let reader = new FileReader()
                // Define a callback function to run, when FileReader finishes its job
                this.imgFile = reader.result
                reader.onloadend = async (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imgFile = e.target.result
                    window.console.log(this.imgFile)
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsBinaryString(input)
                // this.url = input.files[0]
                this.src = URL.createObjectURL(input)
            }
        },
        async getCookieData() {
            this.mInstitute = cookie
            this.company = cookie
            // const cookie = this.getCookie("banhji-token");
            // if (cookie !== "") {
            //     let data = JSON.parse(cookie);
            //     this.mInstitute = {
            //         id: data.instituteId,
            //         name: data.email,
            //         email: data.email,
            //         user: data.user,
            //         plan: data.plan,
            //         creator: data.creator,
            //     };
            // }
            // window.console.log(this.mInstitute)
        },
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(this.mInstitute.id).then(res => {
                        this.company = res
                        this.src = res.imgProfile
                    })
                    resolve('resolved');
                }, 200);
            });
        },

    },
    components: {},
    computed: {
        financialReportingStandards() {
            if (this.company.financialReportingStandards) {
                return this.company.financialReportingStandards
            } else {
                return {}
            }
        },
        businessType() {
            if (this.company.businessType) {
                return this.company.businessType
            } else {
                return {}
            }
        },
        sector() {
            if (this.company.sector) {
                return this.company.sector
            } else {
                return {}
            }
        }
    }
};
</script>
<style scoped>
table.acc_setting {
    border: 1px solid #ccc;
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    color: #000;
}

table.acc_setting tr td {
    border: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_setting tr td p.third {
    margin-bottom: 0;
    background-color: #2CA01C;
    padding: 7px 15px;
    color: #fff;
    font-weight: 700;
    text-align: center;
}

table.acc_setting tr td p.text_bold {
    font-weight: 700;
    margin-bottom: 0;
}

table.acc_setting tr td:first-child {
    font-weight: 700;
}

.btn_edit {
    background-color: #21abf6 !important;
    text-transform: capitalize;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

@media (max-width: 576px) {

}
</style>
