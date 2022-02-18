<template>
    <v-app>
        <v-container>
            <v-row v-if="isHaveCompany" class="mt-3">
                <!-- col left -->
                <v-col sm="8" md="8" cols="12" class="pr-2">
                    <v-row>
                        <v-col sm="12" class="pb-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="364px"
                            >
                                <v-row>
                                    <v-col md="4" sm="5" cols="12" class="py-1 pr-0">
                                        <h3
                                            class="font_30 line_28 my-2 ml-0 text-left thirdText--text"
                                        >
                                            {{ $t("welcome_to") }}
                                        </h3>
                                        <img
                                            style="height:40px;margin-top: 10px"
                                            src="@/assets/images/banhji-logo-r.png"
                                        />
                                        <p class=" line_18 font mb-1 mt-2">
                                            {{ $t("welcome_to_desc") }}
                                        </p>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pb-0">
                                                <p class="mb-0 mt-4">
                                                    {{ $t("create_your_first_software") }}
                                                </p>
                                            </v-col>
                                            <v-col sm="12" cols="12">
                                                <v-btn
                                                    :to="this.$i18n.locale + '/new_company'"
                                                    style="height: 43px !important;"
                                                    class="text-capitalize float-left font_16 rounded-4 white--text mt-2"
                                                    color="secondary"
                                                >
                                                    + {{ $t("add_company") }}
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col md="8" sm="7" cols="12" class="py-1 pt-6 pr-0">
                                        <img
                                            style="width:98%;"
                                            src="@/assets/images/home_banner.png"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="4" cols="12" class="pt-2 pr-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-5 no_border"
                                min-height="240px"
                            >
                                <v-row>
                                    <v-col sm="3" class="pr-0">
                                        <v-img
                                            class="float-left img_red_filter"
                                            width="60"
                                            src="@/assets/images/icon-01.png"
                                        />
                                    </v-col>
                                    <v-col sm="8" class="pl-0">
                                        <h3
                                            class=" font_22 line_22 float-left ml-4 text-left grey--text"
                                        >
                                            {{ $t("your_info") }}
                                        </h3>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" class="clear-both py-0">
                                        <p class="py-5 mb-0 text-left">
                                            {{ $t("personal_info_desc") }}
                                        </p>
                                        <v-btn
                                            :to="this.$i18n.locale + '/personal_info'"
                                            width="100%"
                                            color="primary"
                                            height="50px"
                                            class="rounded-4 mt-2"
                                        >
                                            <span class="white--text  text-capitalize">{{$t("manage_this_info") }}</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="4" cols="12" class="pt-2 px-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-5 no_border"
                                min-height="240px"
                            >
                                <v-row>
                                    <v-col sm="3" class=" pr-0">
                                        <v-img width="60" class="img_red_filter" src="@/assets/images/icon-02.png"/>
                                    </v-col>
                                    <v-col sm="8" class=" pl-0">
                                        <h3 class="ml-4 font_22 text-left grey--text line_22">
                                            {{ $t("security_privacy") }}
                                        </h3>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" class="clear-both py-0">
                                        <p class="py-5 mb-0 text-left">
                                            {{ $t("security_privacy_desc") }}
                                        </p>
                                        <v-btn
                                            :to="this.$i18n.locale + '/security_privacy'"
                                            width="100%"
                                            color="secondary"
                                            class="rounded-4 mt-2"
                                            height="50px"
                                        >
                                            <span class="white--text  text-capitalize">{{$t("manage_security")}}</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="4" cols="12" class="pt-2 pl-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                height="240px"
                            >
                                <v-row>
                                    <v-col sm="3" class=" pr-0">
                                        <v-img
                                            class="float-left img_red_filter"
                                            width="50"
                                            src="@/assets/images/001.png"
                                        />
                                    </v-col>
                                    <v-col sm="8" class="pl-0">
                                        <h3
                                            class=" font_22 float-left ml-4 text-left grey--text line_22"
                                        >
                                            {{ $t("market_place") }}
                                        </h3>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" class="clear-both py-0">
                                        <p class="py-5 mb-0 text-left">
                                            {{ $t("products_billing_desc") }}
                                        </p>
                                        <v-btn
                                            :to="this.$i18n.locale + '/market_place'"
                                            width="100%"
                                            color="secondary"
                                            height="50px"
                                            class="rounded-4 mt-7"
                                        >
                                            <span class="white--text  text-capitalize">{{$t("view_products")}}</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- Cols right -->
                <v-col sm="4" cols="12" class="pl-2">
                    <v-row>
                        <v-col sm="12" cols="12" class="pb-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="180px"
                            >
                                <v-row>
                                    <v-col sm="12" class="">
                                        <p class="text-right text-bold mb-0">
                                            {{ time }}
                                        </p>
                                        <p class=" line_18 mb-1 mt-2">
                                            {{ $t("welcome_desc_2") }}
                                        </p>
                                        <v-card
                                            width="100%"
                                            height="50px"
                                            elevation="0"
                                            @click="onCopyBcid"
                                            color="secondary"
                                            style="cursor: pointer;"
                                            class="rounded-4 pr-2 pl-2 mt-4 d-flex align-center justify-space-between"
                                        >
                                            <p class="white--text mb-0 ml-1 font_12">
                                                {{ $t("banhji_connect_id") }}
                                            </p>
                                            <h3 id="toCopy" class="white--text font_22">
                                                {{ bcId }}
                                            </h3>
                                        </v-card>
                                        <v-snackbar
                                            v-model="snackbar"
                                            :timeout="1500"
                                        >
                                            {{ bcId.replaceAll(' ', '') }}

                                            <template v-slot:action="{ attrs }">
                                                <v-btn
                                                    color="primary"
                                                    text
                                                    v-bind="attrs"
                                                    @click="snackbar = false"
                                                >
                                                    Close
                                                </v-btn>
                                            </template>
                                        </v-snackbar>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="12" cols="12" class="py-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="162px"
                                max-height="448px"
                                style="overflow: hidden; overflow-y: auto; "
                                height="450px"
                                v-if="userNoti.length === 0"
                            >
                                <LoadingMe
                                    :isLoading="isNotification"
                                    :fullPage="false"
                                    :myLoading="true"
                                    :type="'loading'"
                                />
                                <h3 class="noti">{{ $t("notifications") }}</h3>
                            </v-card>
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="162px"
                                max-height="448px"
                                style="overflow-y: auto; overflow-x: hidden;"
                                height="450px"
                                v-else
                            >
                                <LoadingMe
                                    :isLoading="isNotification"
                                    :fullPage="false"
                                    :myLoading="true"
                                    :type="'loading'"
                                />
                                <h3 class="noti">{{ $t("notifications") }}</h3>
                                <v-card
                                    max-height="150px"
                                    class="mt-2 pa-2 no_border shadow_hover"
                                    outlined
                                    v-for="un in userNoti"
                                    v-bind:key="un.id"
                                >
                                    <v-row>
                                        <v-col sm="2" cols="2" class="">
                                            <div
                                                v-if="Object.keys(un).length > 0"
                                                :class="un.imgProfile ? un.imgProfile.url ? `transparent company card` : `third company_card` : `third company_card`">
                                                <img
                                                    class="company_card"
                                                    v-if="un.imgProfile ? un.imgProfile.url : false"
                                                    :alt="un.name"
                                                    :src="un.imgProfile ? un.imgProfile.url : ''"
                                                />
                                                <span v-else class="white--text text-bold font_18">{{
                                                        un.cpName
                                                    }}</span>
                                            </div>
                                            <div v-else class="lightGray1 company_card">
                                                <span class="white--text"></span>
                                            </div>
                                        </v-col>
                                        <v-col sm="10" cols="10" class="pl-1">
                                            <label class="font_12">{{ $t('you_have_been_invited') }}</label>
                                            <label class="font_14 text-bold"> {{ un.cName }}</label> {{ $t('as') }}
                                            <label v-if="un.userRole.length === 1" class="font_14 text-bold">{{ un.userRole[0].name }}</label>
                                            <label v-if="un.userRole.length > 1" class="font_14 text-bold"> {{ un.userRole.length + ' ' + $t('roles') }}</label>
                                        </v-col>
                                    </v-row>
                                    <v-card-actions class="pl-0">
                                        <v-btn
                                            @click="onAccept(un)"
                                            style="width: 50%"
                                            color="primary"
                                            class="rounded-4 text-capitalize white--text float-right"
                                        >
                                            {{ $t("Accept") }}
                                        </v-btn>
                                        <v-btn
                                            style="width: 50%"
                                            color="gray"
                                            class="rounded-4 text-capitalize float-right"
                                        >
                                            {{ $t("Decline") }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-card>
                        </v-col>
                        <!--                        <v-col sm="12" cols="12" class="pt-2">-->
                        <!--                            <v-card-->
                        <!--                                outlined-->
                        <!--                                dense-->
                        <!--                                color="primary"-->
                        <!--                                class="pa-4 no_border"-->
                        <!--                                height="240px"-->
                        <!--                            >-->
                        <!--                                <img-->
                        <!--                                    style="height:40px;margin-top: 10px"-->
                        <!--                                    src="@/assets/images/banhji-logo-r.png"-->
                        <!--                                />-->
                        <!--                                <h3 class="font_24 line_24 my-2 ml-0 text-left white&#45;&#45;text">-->
                        <!--                                    {{ $t("truly_accounting") }}-->
                        <!--                                </h3>-->
                        <!--                                <p class="line_18 font mb-1 mt-1">-->
                        <!--                                    {{ $t("truly_accounting_desc") }}-->
                        <!--                                </p>-->
                        <!--                            </v-card>-->
                        <!--                        </v-col>-->
                    </v-row>
                </v-col>
                <!-- end col right -->
            </v-row>
            <!-- When have company -->
            <!-- Welcome abck -->
            <v-row v-else class="mt-3">
                <v-col sm="8" md="8" cols="12" class="pr-2">
                    <v-row>
                        <v-col sm="12" class="pb-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="364px"
                            >
                                <v-row>
                                    <v-col sm="5" cols="12" md="4" class="py-1 mt-7 pr-0">
                                        <h2
                                            class="font_30 my-2 line_28 ml-0 text-left thirdText--text"
                                        >
                                            {{ $t("welcome_back") }}
                                        </h2>
                                        <h2 class="font_24">
                                            {{ userInfo.firstName }} {{ userInfo.lastName }}
                                        </h2>
                                        <p class=" line_24 font_18 mb-1 mt-2">
                                            {{ $t("welcome_to_desc") }}
                                        </p>
                                    </v-col>
                                    <v-col sm="7" cols="12" md="8" class="py-1 mt-5 pr-5">
                                        <img
                                            style="width:98%;"
                                            src="@/assets/images/home_banner.png"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="6" cols="12" class="pt-2 pr-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-5 no_border"
                                min-height="260px"
                            >
                                <LoadingMe
                                    :isLoading="isOverlay"
                                    :fullPage="false"
                                    :type="'loading'"
                                    :myLoading="true"
                                />
                                <v-row>
                                    <v-col sm="10">
                                        <h3 class="font_20">{{ $t("your_companyies") }}</h3>
                                        <p class="mb-0 mt-1 width_70">
                                            {{ $t("your_companies_desc") }}
                                        </p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" class="py-2" cols="12">
                                        <template>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-left greyText--text">
                                                            {{ $t("active_companies") }}
                                                        </td>
                                                        <td class="text-right  font_22 niradei_medium">
                                                            {{ amtSubscribe }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left greyText--text">
                                                            {{ $t("renewing") }}
                                                        </td>
                                                        <td class="text-right font_22  niradei_medium">
                                                            {{ amtRenew }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left greyText--text">
                                                            {{ $t("trial") }}
                                                        </td>
                                                        <td class="text-right font_22 niradei_medium">
                                                            {{ amtTrial }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                        <v-btn
                                            :to="this.$i18n.locale + '/new_company'"
                                            width="100%"
                                            color="primary"
                                            class="rounded-4 white--text mt-5 text-capitalize"
                                        >
                                            <span class="material-icons font_18 white--text">add</span>
                                            {{ $t("add_new_company") }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="6" cols="12" class="pt-2 px-2 pr-3">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-5 no_border"
                                min-height="260px"
                            >
                                <LoadingMe
                                    :isLoading="isOverlay"
                                    :fullPage="false"
                                    :type="'loading'"
                                    :myLoading="true"
                                />
                                <v-row>
                                    <v-col sm="10">
                                        <h3 class="font_20">{{ $t("subscriptions") }}</h3>
                                        <p class="mb-0 mt-1 width_70">{{ $t("sub_fee_desc") }}</p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" class="py-2" cols="12">
                                        <template>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-left greyText--text">
                                                            {{ $t("total_subscription_fer_month") }}
                                                        </td>
                                                        <td class="text-right font_22 niradei_medium">
                                                            {{ totalAmtSubscribe }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left greyText--text">
                                                            {{ $t("no_of_subscription") }}
                                                        </td>
                                                        <td class="text-right font_22 niradei_medium">
                                                            {{ amtSignUp }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left greyText--text">
                                                            {{ $t("open_invoices") }}
                                                        </td>
                                                        <td class="text-right font_22 niradei_medium">
                                                            {{ openInvoice }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                        <v-btn
                                            :to="this.$i18n.locale + '/subscriptions'"
                                            width="100%"
                                            color="secondary"
                                            class="rounded-4 mt-5"
                                        >
                      <span class="white--text  text-capitalize">{{
                              $t("manage_subscription")
                          }}</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- Cols right -->
                <v-col sm="4" cols="12" class="pl-2">
                    <v-row>
                        <v-col sm="12" cols="12" class="pb-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="180px"
                            >
                                <v-row>
                                    <v-col sm="12" cols="12" class="">
                                        <p class="text-right text-bold mb-0">
                                            {{ `${time}` }}
                                        </p>
                                        <p class=" line_18 mb-1 mt-2">
                                            {{ $t("welcome_desc_2") }}
                                        </p>
                                        <v-card
                                            width="100%"
                                            height="50px"
                                            elevation="0"
                                            color="secondary"
                                            @click="onCopyBcid(bcId)"
                                            style="cursor: pointer;"
                                            class="rounded-4 pr-2 pl-2 mt-4 d-flex align-center justify-space-between"
                                        >
                                            <p class="white--text mb-0 ml-1 font_12">
                                                {{ $t("banhji_connect_id") }}
                                            </p>
                                            <h3 class="white--text font_22">
                                                {{ bcId }}
                                            </h3>
                                        </v-card>
                                        <v-snackbar
                                            v-model="snackbar"
                                            :timeout="1500"
                                        >
                                            {{ bcId.replaceAll(' ', '') }}

                                            <template v-slot:action="{ attrs }">
                                                <v-btn
                                                    color="primary"
                                                    text
                                                    v-bind="attrs"
                                                    @click="snackbar = false"
                                                >
                                                    Close
                                                </v-btn>
                                            </template>
                                        </v-snackbar>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="12" cols="12" class="py-2">
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="162px"
                                max-height="448px"
                                style="overflow: hidden; overflow-y: auto; "
                                height="450px"
                                v-if="userNoti.length === 0"
                            >
                                <LoadingMe
                                    :isLoading="isNotification"
                                    :fullPage="false"
                                    :myLoading="true"
                                    :type="'loading'"
                                />
                                <h3 class="noti">{{ $t("notifications") }}</h3>
                            </v-card>
                            <v-card
                                outlined
                                dense
                                color="white"
                                class="pa-4 no_border"
                                min-height="162px"
                                max-height="448px"
                                style="overflow: hidden; overflow-y: auto; "
                                height="450px"
                                v-else
                                v-scroll
                            >
                                <LoadingMe
                                    :isLoading="isNotification"
                                    :fullPage="false"
                                    :myLoading="true"
                                    :type="'loading'"
                                />
                                <h3 class="noti">{{ $t("notifications") }}</h3>
                                <v-card
                                    max-height="150px"
                                    class="mt-2 pa-2 no_border shadow_hover"
                                    outlined
                                    v-for="un in userNoti"
                                    v-bind:key="un.id"
                                >
                                    <v-row>
                                        <v-col sm="2" cols="2" class="">
                                            <div
                                                v-if="Object.keys(un).length > 0"
                                                :class="un.imgProfile ? un.imgProfile.url ? `transparent company card` : `third company_card` : `third company_card`">
                                                <img
                                                    class="company_card"
                                                    v-if="un.imgProfile ? un.imgProfile.url : false"
                                                    :alt="un.name"
                                                    :src="un.imgProfile ? un.imgProfile.url : ''"
                                                />
                                                <span v-else class="white--text text-bold font_18">{{
                                                        un.cpName
                                                    }}</span>
                                            </div>
                                            <div v-else class="lightGray1 company_card">
                                                <span class="white--text"></span>
                                            </div>
                                        </v-col>
                                        <v-col sm="10" cols="10" class="pl-1">
                                            <label class="font_12">{{ $t('you_have_been_invited') }}</label>
                                            <label class="font_14 text-bold"> {{ un.cName }}</label> {{ $t('as') }}
                                            <label v-if="un.userRole.length === 1" class="font_14 text-bold">{{ un.userRole[0].name }}</label>
                                            <label v-if="un.userRole.length > 1" class="font_14 text-bold"> {{ un.userRole.length + ' ' + $t('roles') }}</label>
                                        </v-col>
                                    </v-row>
                                    <v-card-actions class="pl-0">
                                        <v-btn
                                            @click="onAccept(un)"
                                            style="width: 50%"
                                            color="primary"
                                            class="rounded-4 text-capitalize white--text float-right"
                                        >
                                            {{ $t("Accept") }}
                                        </v-btn>
                                        <v-btn
                                            style="width: 50%"
                                            color="gray"
                                            class="rounded-4 text-capitalize float-right"
                                        >
                                            {{ $t("Decline") }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-card>
                        </v-col>
                        <!--                        <v-col sm="12" cols="12" class="pt-2">-->
                        <!--                            <v-card-->
                        <!--                                outlined-->
                        <!--                                dense-->
                        <!--                                color="primary"-->
                        <!--                                class="pa-4 no_border"-->
                        <!--                                height="260px"-->
                        <!--                            >-->
                        <!--                                <img-->
                        <!--                                    style="height:40px;margin-top: 10px"-->
                        <!--                                    src="@/assets/images/banhji-logo-r.png"-->
                        <!--                                />-->
                        <!--                                <h3 class="font_24 line_24 my-2 ml-0 text-left white&#45;&#45;text">-->
                        <!--                                    {{ $t("truly_accounting") }}-->
                        <!--                                </h3>-->
                        <!--                                <p class="line_18 font mb-1 mt-1">-->
                        <!--                                    {{ $t("truly_accounting_desc") }}-->
                        <!--                                </p>-->
                        <!--                            </v-card>-->
                        <!--                        </v-col>-->
                    </v-row>
                </v-col>
            </v-row>
            <v-dialog persistent v-model="dialogm" max-width="600px">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"
                />
                <v-card>
                    <v-card-title>{{ $t("personal_info") }}</v-card-title>
                    <!--                    <v-icon class="btn_close" @click="dialogm = false">close</v-icon>-->
                    <v-card-text
                        style="height: 340px; background-color: #EDF1F5; color: #333;"
                    >
                        <v-row>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label>{{ $t("first_name") }}*</label>
                                <v-text-field
                                    class="mt-1"
                                    v-model="personal.firstName"
                                    :rules="[(v) => !!v || 'First Name is required']"
                                    outlined
                                    clearable
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label class="label">{{ $t("last_name") }}*</label>
                                <v-text-field
                                    class=" mt-1"
                                    v-model="personal.lastName"
                                    :rules="[(v) => !!v || 'Last Name is required']"
                                    clearable
                                    outlined
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label>{{ $t("date_of_birth") }}*</label>
                                <v-menu
                                    v-model="menuJDate"
                                    :close-on-content-click="false"
                                    max-width="290"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            class="disable_alert my-0"
                                            v-model="personal.dob"
                                            readonly
                                            outlined
                                            append-icon="event"
                                            v-on="on"
                                            v-bind="attrs"
                                            @click:clear="personal.dob = undefined"
                                            @click:append="menuJDate = true"
                                            required
                                        />
                                    </template>
                                    <v-date-picker
                                        @change="menuJDate = false"
                                        v-model="personal.dob"
                                        no-title
                                    />
                                </v-menu>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label>{{ $t("gender") }}*</label>
                                <v-select
                                    class="mt-1"
                                    v-model="personal.gender"
                                    outlined
                                    :rules="[(v) => !!v || 'Gender is required']"
                                    tage="Currency"
                                    :items="genderData"
                                    return-object
                                    clearable
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label>{{ $t("occupation") }}*</label>
                                <v-text-field
                                    class="mt-1"
                                    v-model="personal.occupation"
                                    outlined
                                    item-value="id"
                                    :rules="[(v) => !!v || 'Occupation is required']"
                                    clearable
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label>{{ $t("address") }}*</label>
                                <v-text-field
                                    class="mt-1"
                                    v-model="personal.address"
                                    :rules="[(v) => !!v || 'Address is required']"
                                    outlined
                                    clearable
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t("phone") }}*</label>
                                <v-row class="mt-1 my_checkbox">
                                    <v-col sm="5" cols="5" class="py-0 pr-0">
                                        <v-autocomplete
                                            item-value="code"
                                            item-text="dial_code"
                                            :items="listCodePhone"
                                            v-model="codePhone"
                                            class="custom-border"
                                            return-object
                                            outlined
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pb-3">
                                        <v-text-field
                                            v-model="personal.phone"
                                            :rules="[(v) => !!v || 'Phone is required']"
                                            outlined
                                            clearable
                                            class="code_text"/>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="pa-5">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <!--                                <v-btn color="black" outlined-->
                                <!--                                       class=" text-capitalize rounded-4 black&#45;&#45;text float-left"-->
                                <!--                                       @click="dialogm = false">{{ $t('cancel') }}-->
                                <!--                                </v-btn>-->
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn
                                    color="primary"
                                    @click="updateInfo"
                                    class="px-3 rounded-4 white--text text-capitalize"
                                >
                                    {{ $t("save_close") }}
                                </v-btn>

                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'Home',
    components: {
    },
    computed: {
    },
    data: () => ({
       
    }),
    methods: {
       
    },
};
</script>
<style scoped>
.shadow_hover {
    transition: 0.5s ease;
    border: 1px solid #efefef;
    -webkit-box-shadow: 3px 0px 62px -23px rgba(0, 0, 0, 0.25) !important;
    -moz-box-shadow: 3px 0px 62px -23px rgba(0, 0, 0, 0.25) !important;
    box-shadow: 3px 0px 62px -23px rgba(0, 0, 0, 0.25) !important;
}

.shadow_hover:hover {
    -webkit-box-shadow: 3px 0px 62px -23px rgba(0, 0, 0, 0.75) !important;
    -moz-box-shadow: 3px 0px 62px -23px rgba(0, 0, 0, 0.75) !important;
    box-shadow: 3px 0px 62px -23px rgba(0, 0, 0, 0.75) !important;
}

.company_card {
    width: 40px;
    height: 40px;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.k-chart {
    height: 190px !important;
}

.five {
    font-weight: 700;
    font-size: 26px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.border-bottom {
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.font-small {
    font-size: 12px;
    line-height: 15px;
}

.font-26 {
    font-size: 26px !important;
}

.dark_grey {
    color: #7e7a7a;
}

.img_red_filter {
    -webkit-filter: invert(40%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(4);
    filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(4.8);
}

.noti {
    /*border-bottom: 2 xp solid gray !important;*/
    /*border-bottom: 2px solid gray;*/
    color: gray;
    width: 50%;
}
</style>
