<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{$t('financial_institution')}}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-row>
                                <v-col class="pb-0" sm="6" cols="12">
                                    <v-card outlined dense class="px-5 py-5 no_border" color="whiteGreen">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="phone_no_pb py-0">
                                                <label class="label">{{$t('abbr')}}</label>
                                                <p class="text_tip">{{$t('abbreviation_of_the_bank_name')}}</p>
                                                <h3 class="text-bold pb-2">BR</h3>

                                                <label class="label">{{$t('name')}}</label>
                                                <p class="text_tip">{{$t('official_name_of_the_bank')}}</p>
                                                <h3 class="text-bold pb-2">ABC</h3>

                                                <label class="label">{{$t('address')}}</label>
                                                <p class="text_tip">{{$t('bank_address')}}</p>
                                                <h3 class="text-bold pb-2">Phnom Penh</h3>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col class="pb-0" sm="6" cols="12">
                                    <v-card outlined dense class="px-5 py-5 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="phone_no_pb py-0">
                                                <label class="label">{{$t('email')}}</label>
                                                <p class="text_tip">{{$t('communicating_email_address')}}</p>
                                                <h3 class="text-bold pb-2">abc@gmail.com</h3>

                                                <label class="label">{{$t('phone')}}</label>
                                                <p class="text_tip">{{$t('bank_phone_number')}}</p>
                                                <h3 class="text-bold pb-2">0901212</h3>

                                                <label class="label">{{$t('swift_code')}}</label>
                                                <p class="text_tip">{{$t('bank_swift_code')}}</p>
                                                <h3 class="text-bold pb-2">abc243</h3>

                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-divider class="mt-1" />
                            <v-card outlined dense class="no_border function_footer py-2">
                                <v-btn
                                class="float-right save_option mx-1 capitalize"
                                color="primary"
                                >
                                {{ $t("print") }}
                                </v-btn>
                                <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="blue"
                                >
                                {{ $t("delete") }}
                                </v-btn>
                                <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="lightBlue"
                                >
                                {{ $t("edit") }}
                                </v-btn>
                            </v-card>
                            <v-divider />
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="true"
                    :myLoading="true"
                    :alertMessage="loadingAlert"
                    :color="loadingColorAlert"
                    :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
    import LoadingMe from '@/components/Loading'

    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();

    const bankHandler = require("@/scripts/bankHandler.js")

    export default {
        name: "Bank",
        components: {
            LoadingMe
        },
        data: () => ({
            bank: [],
            isEdit: false,
            // Form validation
            valid: true,
            showLoading: false,
            loadingAlert: false,
            loadingColorAlert: '',
            loadingTextAlert: '',
            saveMode: '',
        }),
        methods: {
            // Set Default
            setDefaultData() {
                this.saveMode = ''
                this.isEdit = false

                this.bank = {
                    abbr: '',
                    number: '',
                    name: '',
                    address: '',
                    email: '',
                    phone: '',
                    swift_code: '',
                    is_deleted: 0,
                    institute_id: instituteId,
                }
            },
            // Load bank according to query string {id}
            loadObj() {
                let self = this

                // Access Query String
                let q = this.$route.params
                if (q.id !== undefined) {
                    // Set Edit Mode
                    this.isEdit = true

                    bankHandler.getOne(q.id)
                        .then(res => {
                            if (res) {
                                // Bind Bank
                                this.bank = res.data
                            }
                        })
                        .finally(function () {
                            self.showLoading = false
                        })
                } else {
                    this.isEdit = false
                }
            },
            // All Saves
            saveNew() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveNew"
                    this.save();
                } else {
                    this.alertError()
                }
            },
            saveClose() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveClose"
                    this.save()
                } else {
                    this.alertError()
                }
            },
            cancel() {
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4d4848',
                    cancelButtonColor: '#ED1A3A',
                    confirmButtonText: 'Yes, reset it!'
                }).then((result) => {
                    if (result.value) {
                        this.$refs.form.reset();
                    }
                })
            },
            save() {
                let self = this

                this.showLoading = true
                // Sync Data
                bankHandler.save(this.bank)
                    .then(function (response) {
                        if (response) {
                            self.responseStatus(response.status);
                        } else {
                            self.alertError();
                        }
                    })
                    .catch(function (error) {
                        self.alertError(error);
                    })
                    .finally(function () {
                        self.showLoading = false
                    })
            },
            // Response Status
            responseStatus(status) {
                switch (status) {
                    case 200:// Ok
                        this.showAlert();
                        // Reset form
                        this.$refs.form.reset();

                        break;
                    case 201:// Duplicate
                        this.alertError('Duplicate entry!');
                        break;
                    default:
                        break;
                }
            },
            // Sweetalert2
            changeAlertStatus() {
                this.loadingAlert = true
                setTimeout(() => {
                    this.loadingAlert = false
                }, 6200);
            },
            showAlert() {
                this.showLoading = false
                this.changeAlertStatus()
                this.loadingTextAlert = "Added Successful"
                this.loadingColorAlert = "#3DA72E"
                switch (this.saveMode) {
                    case 'saveClose':// Save Close
                        // this.$swal({
                        // 	position: 'products',
                        // 	icon: 'success',
                        // 	title: 'Your work has been saved',
                        // 	showConfirmButton: true,
                        // }).then((result) => {
                        // 	if (result.value) {
                        // 		window.history.go(-1)

                        // 		return false
                        // 	}
                        // })
                        window.history.go(-1)
                        break;
                    default:// Save New
                        // this.$swal({
                        // 	position: 'products',
                        // 	icon: 'success',
                        // 	title: 'Your work has been saved',
                        // 	showConfirmButton: false,
                        // 	timer: 1500
                        // })
                        break;
                }
            },
            alertError(msg) {
                if (msg) {
                    // Code here
                } else {
                    msg = 'Something went wrong!';
                }
                this.showLoading = false
                this.loadingTextAlert = "Failed!"
                this.loadingColorAlert = "#eb8334"
                this.changeAlertStatus()
                // this.$swal({
                // 	position: 'products',
                // 	icon: 'error',
                // 	title: 'Oops...!',
                // 	text: msg,
                // 	showConfirmButton: true
                // })
            },
        },
        watch: {
            // call again the method if the route changes
            '$route': 'loadObj'
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.loadObj()
        },
        mounted() {
            // Set default
            this.setDefaultData()
        }
    };
</script>
<style scoped>
    .function_content {
        padding: 0 25px 25px;
        border-bottom: 0;
    }

    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }

    @media (max-width: 576px) {
        ..mb-6 {
            margin-bottom: 0 !important;
        }
    }
</style>