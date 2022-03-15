<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="12" cols="12" style="transition: .3s ease-in;"
                                   >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header">
                                        <h2>{{$t('store_credit_card')}}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <div class="">
                                        <!-- Form -->
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-col sm="12" col="12">
                                                 <v-row>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{ $t('card_number') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            type="number"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{$t('serial_number')}}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            type="number"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{$t('name')}}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{ $t('gender') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            item-text="name"
                                                            item-value="id"
                                                            :placeholder="$t('select')"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="mb-0">{{ $t('phone_number') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            type="number"
                                                            tage="Phone Number"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{$t('email')}}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="mb-0">{{ $t('dob') }}</label>
                                                        <app-datepicker/>
                                                    </v-col>
                                                    
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="mb-0">{{$t('nationality')}}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            item-text="name"
                                                            item-value="id"
                                                            :placeholder="$t('cambodia')"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    
                                                </v-row>
                                            </v-col>
                                        </v-form>
                                    </div>
                                    <div class="function_footer">
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-btn outlined color="#494846" class="float-left text-capitalize"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <v-btn color="secondary" class="float-right white--text text-capitalize"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                        <v-btn color="primary"
                                               class="float-right  white--text text-capitalize mr-3 "
                                               @click="saveNew">
                                            {{ $t('save_new') }}
                                        </v-btn>
                                    </div>
                                </v-form>
                            </v-col>
                        </v-row>
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
import {i18n} from '@/i18n';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'


export default {
    props: {
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,

    },
    data: () => ({
        valid: true,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        alert: false,
    }),
    methods: {
        errorMessage() {
        },
        cancel() {
            this.$swal({
                title: i18n.t('msg_title_warning'),
                text: i18n.t('msg_discard'),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t('cancel'),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t('discard'),
            }).then((result) => {
                if (result.value) {
                    this.clear();
                    this.$router.go(-1);
                }
            });
        },
        saveNew() {
        },
        saveClose() {
        },
    },
    computed:{
        genders(){
            return [
                {id: 1, name: i18n.t('male')},
                {id: 2, name: i18n.t('female')},
                // {id: 3, name: i18n.t('others')}
            ]
        },
    }
};
</script>
