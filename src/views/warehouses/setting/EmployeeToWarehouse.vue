<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pa-0">
            <h2 >{{$t('linked_employee_to_warehouse')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{  }">
                    <v-btn color="primary"  class="white--text text-capitalize  float-right" v-on="on" >
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('level')}}</v-card-title>
                        <v-icon @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="">
                                <label class="label">{{$t('section')}}</label>
                                <v-select class=" mt-2 mb-3"
                                          id="acc_type_selector"
                                          :items="accountTypes"
                                          item-text="name"
                                          item-value="uuid"
                                          tage="Section"
                                          outlined
                                          return-object/>

                                <label class="label">{{$t('rack')}}</label>
                                <v-select class=" mt-2 mb-n2"
                                          id="acc_type_selector"
                                          :items="accountTypes"
                                          item-text="name"
                                          item-value="uuid"
                                          tage="Rack"
                                          outlined
                                          return-object/>
                            </v-col>
                            <v-col sm="6" cols="6">
                                <label class="label">{{$t('name')}}</label>
                                <v-text-field class=" mt-2"
                                              outlined
                                              placeholder=""/>
                            </v-col>
                            <v-col sm="6" cols="6">
                                <label class="label">{{$t('code')}}</label>
                                <v-text-field class=" mt-2"
                                              outlined
                                              placeholder=""/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="primary" outlined class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="primary" class="white--text text-capitalize">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
<!--                        <v-btn color="white" class=" black&#45;&#45;text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>-->
<!--                        <v-btn color="blue" class=" white&#45;&#45;text text-capitalize float-right" >{{$t('save_new')}}-->
<!--                        </v-btn>-->

                    </v-card-actions>

                </v-card>
            </v-dialog>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                    <v-simple-table class="attachment_table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th>{{$t('name')}} </th>
                                <th>{{$t('role')}} </th>
                                <th>{{$t('warehouse')}} </th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>JB00009</td>
                                <td>15/July/2020</td>
                                <td class="text-center">
                                    <v-btn class="btn_edit_setting">
                                        <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                        <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>

    export default {
        data: () => ({
            dialogm2: false,
        }),
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        mounted() {

        },
        computed: {
        },
        components: {
        },
    };
</script>
<style scoped>
    @media (max-width: 576px) {

    }
</style>