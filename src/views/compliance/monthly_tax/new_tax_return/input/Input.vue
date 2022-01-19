<template>
    <div>
        <v-row>
            <v-col sm="4" cols="12">
                <label class="label">Please select the source of the data that you need to get from:</label>

            </v-col>
            <v-col sm="3" cols="12" class="mt-n2">
                <v-select class="disable_alert my-3"
                          :disabled="isDisabled"
                          v-model="dataForm"
                          placeholder="Please select one method"
                          :items="dataFormList"
                          item-value="id"
                          item-text="name"
                          @change="selectDataForm"
                          return-object
                          outlined
                          required
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="4" cols="12" class="pb-0 pt-0" >
                <v-card height="110" @click="linkRouteLinkImport" outlined color="white" class="block-gray white--text rounded-lg" :disabled="isEnable === false || this.code !== 1">
                    <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                            <h2 class="text-uppercase  mb-0 black--text">{{ $t('data_from') }}</h2>
                        </v-col>
                        <v-col sm="" cols="12" class="py-2">
                            <v-img class="mb-0" src="@/assets/images/banhji_accouning.png"
                                   width="158"
                                   alt="BanhJi Accounting"/>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col sm="4" cols="12" class="pb-0 pt-0">
                <v-card outlined height="110" color="white" class=" rounded-lg block-gray" :disabled="isEnable === false || this.code !== 2">
                    <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                            <h2 class="text-uppercase mb-0 black--text">{{ $t('data_from') }}</h2>
                        </v-col>
                        <v-col sm="" cols="12" class="py-2">
<!--                            <v-img class="mb-0" src="@/assets/images/Sap-B1-Logo.png"-->
<!--                                   width="158"-->
<!--                                   alt="SAP One Business"/>-->
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col sm="4" cols="12" class="pb-0 pt-0">
                <v-card height="110" color="white" @click="linkRouteImportData" outlined class="rounded-lg block-gray" :disabled="isEnable === false || this.code !== 3">
                    <v-row align="center" justify="center">
                        <v-col sm="12" cols="12" class="py-3 text-center">
                            <h2 class="text-uppercase mb-0 black--text">{{ $t('import_data_from_excel') }}</h2>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script src="./_input_return.js" lang="js"></script>
<style lang="css" scoped></style>
