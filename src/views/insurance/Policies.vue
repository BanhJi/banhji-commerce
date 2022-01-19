<template>
  <v-row>
    <v-col>
      <v-row class="px-1">
        <v-col sm="6" cols="12">
          <h2 class="line_30 mb-1">{{ $t("choose_right_protection") }}</h2>
          <p class="mb-0">{{ $t("choose_right_protection_desc") }}</p>
        </v-col>
        <v-col sm="6" cols="12">
          <v-img
            class="mx-auto"
            width="130"
            src="@/assets/insurance/logo-home.png"
          />
          <p class="mx-10 mb-0 primary--text text-center">
            {{ $t("forte_decs") }}
          </p>
        </v-col>
      </v-row>
      <!-- All insurance -->
      <v-row class="mt-0 px-1">
        <v-col to="test" md="3" sm="3" cols="12" class=" pt-0">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('automobile',0)"
          >
            <img
              style="width:55px;height:55px;margin-top:-10px"
              src="@/assets/insurance/automobile.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{ $t("automobile") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("automobile") }}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class=" pt-0">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('burglary',1)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/burglary.png"
            />
            <div class="flex-1  ml-1" v-if="lang == '/en'">
              <h4>{{ $t("burglary") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1  ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("burglary") }}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class=" pt-0">
        </v-col>
        <v-col md="3" sm="3" cols="12" class=" pt-0">
        </v-col>
        <!-- row 2 -->
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('contractor_all_rists',2)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/contractor-s.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{ $t("contractor_all_rists") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4>{{ $t("contractor_all_rists") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }} </p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
              @click="goDetail('electronic_equipment',3)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/electronic-equipment.png"
            />
            <div class="flex-1  ml-1">
              <h4>{{ $t("electronic_equipment") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
             @click="goDetail('emcare',4)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/emcare.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>EmCare</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">EmCare</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('fidelity_guarantee',5)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/fidelity-guarantee.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{ $t("fidelity_guarantee") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1"> {{ $t("fidelity_guarantee") }}</p>
            </div>
          </v-card>
        </v-col>
        <!-- row 3 -->
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
             @click="goDetail('fire',6)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/fire.png"
            />
            <div class="flex-1 ml-1">
              <h4>{{ $t("fire") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('group_personal_accident',7)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/group-personal.png"
            />
            <div class="flex-1  ml-1" v-if="lang == '/en'">
              <h4>{{ $t("group_personal_accident") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1  ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("group_personal_accident") }} </p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('hospital_and_surgical',8)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/hospital.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{ $t("hospital_and_surgical") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("hospital_and_surgical") }}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="" >
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
             @click="goDetail('property_all_risks',9)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/industrial-all-risks.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{ $t("property_all_risks") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4>{{ $t("property_all_risks") }}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
          </v-card>
        </v-col>
        <!-- 4 -->
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('loss_of_profit',10)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/loss-of-profit.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{$t('loss_of_profit')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
              <div class="flex-1 ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('loss_of_profit')}}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('marine_cargo',11)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/marine50x50.png"
            />
            <div class="flex-1  ml-1" v-if="lang == '/en'">
              <h4>{{$t('marine_cargo')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1  ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('marine_cargo')}}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('Medi+',12)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/medi.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>Medi+</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">Medi+</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('money',13)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/money.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{$t('money')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
             <div class="flex-1 ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('money')}}</p>
            </div>
          </v-card>
        </v-col>
        <!-- 5 -->
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
              @click="goDetail('oil_and_gas',14)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/oil50x50.png"
            />
            <div class="flex-1  ml-1" v-if="lang == '/en'">
              <h4>{{$t('oil_and_gas')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
              <div class="flex-1  ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('oil_and_gas')}}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('plate_glass',15)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/plate-glass.png"
            />
            <div class="flex-1  ml-1" v-if="lang == '/en'">
              <h4>{{$t('plate_glass')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1  ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('plate_glass')}}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('professional_indemnity',16)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/professional-indemnity.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{$t('professional_indemnity')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('professional_indemnity')}}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('public_product_liability',17)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/public-and-product-liability.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{$t('public_product_liability')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('public_product_liability')}}</p>
            </div>
          </v-card>
        </v-col>
        <!-- 6 -->
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
             @click="goDetail('travlller_trip',18)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/trip-multi-insurance.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{$t('travlller_trip')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('travlller_trip')}} </p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
             @click="goDetail('boiler_explosion',19)"
          >
            <img
              style="width:50px;height:50px"
              src="@/assets/insurance/boiler-and.png"
            />
            <div class="flex-1  ml-1" v-if="lang == '/en'">
              <h4>{{$t('boiler_explosion')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1  ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('boiler_explosion')}} </p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
            @click="goDetail('director_officers_liability',20)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/directors-and.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{$t('director_officers_liability')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4> {{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('director_officers_liability')}}</p>
            </div>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" cols="12" class="">
          <v-card
            elevation="0"
            class="box_shawdow d-flex"
             @click="goDetail('contractors_plant_equipment',21)"
          >
            <img
              style="width:55px;height:55px"
              src="@/assets/insurance/contractors-plant.png"
            />
            <div class="flex-1 ml-1" v-if="lang == '/en'">
              <h4>{{$t('contractors_plant_equipment')}}</h4>
              <p class="primary--text text-bold my-1">{{ $t("insurance") }}</p>
            </div>
            <div class="flex-1 ml-1" v-else>
              <h4>{{ $t("insurance") }}</h4>
              <p class="primary--text text-bold my-1">{{$t('contractors_plant_equipment')}} </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { i18n } from "@/i18n";
export default {
  name: "MyPolicies",
  data: () => ({}),
  computed: {
    lang() {
      return "/" + i18n.locale;
    },
  },
  methods:{
    goDetail(title, index){
      this.$router.push({
        name: 'InsuranceDetail',
        params: { title: title, index:index },
      });
    }
  }
};
</script>
<style scoped>
.auto_right {
  text-align: right;
}
.box_shawdow{
  transition: .3s ease-in;
}
.box_shawdow:hover{
  
  box-shadow: -2px 1px 5px 3px rgba(184, 184, 184, 0.8) !important;
  -webkit-box-shadow: -2px 1px 5px 3px rgba(184, 184, 184, 0.8);
  -moz-box-shadow: -2px 1px 5px 3px rgba(184, 184, 184, 0.8);
}
</style>
