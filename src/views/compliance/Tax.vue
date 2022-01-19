<template>
  <v-row>
    <v-col cols="12" sm="12" class="pb-0">
      <!-- loading -->
      <LoadingMe
          :isLoading="compeletLoading"
          :fullPage="false"
          :myLoading="true"/>
      <v-row>
        <v-col sm="3" cols="12">
          <v-card outlined dense class="pa-4 no_border " color="grayBg" height="90px">
            <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
            <p class="mb-0 text-uppercase  text-right">{{ $t('drafted') }}</p>
          </v-card>
        </v-col>
        <v-col sm="3" cols="12">
          <v-card outlined dense class="pa-4 no_border" color="grayBg" height="90px">
            <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
            <p class="mb-0 text-uppercase  text-right">{{ $t('submitted') }}</p>
          </v-card>
        </v-col>
        <v-col sm="3" cols="12">
          <v-card outlined dense class="pa-4 no_border" color="grayBg" height="90px">
            <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
            <p class="mb-0 text-uppercase  text-right">{{ $t('accepted') }}</p>
          </v-card>
        </v-col>
        <v-col sm="3" cols="12">
          <v-card outlined dense class="pa-4 no_border" color="grayBg" height="90px">
            <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
            <p class="mb-0 text-uppercase  text-right">{{ $t('paid') }}</p>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col sm="2" cols="12" class="pb-0">
          <p class="mb-0 mt-2">{{ $t('search_by_month') }}</p>
        </v-col>
        <v-col sm="3" cols="12" class="pb-0">
          <v-select class=""
                    clearable
                    outlined
                    placeholder="ALL"
          />
        </v-col>
        <v-col sm="1" cols="1" class="">
          <v-btn class="white--text rounded-0" color="primary">
            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
          </v-btn>
        </v-col>
        <v-col sm="3" cols="3" class="pb-0">
          <v-btn to="new_tax_return" class="white--text rounded-0" color="primary">
            <v-icon size="17" class="mr-1">mdi-plus</v-icon>
            {{ $t('new_return') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12" class="pb-0">
      <template>
        <v-simple-table class="attachment_table">
          <template v-slot:default>
            <thead>
            <tr>
              <th>{{ $t('submission_id') }}</th>
              <th>{{ $t('date') }}</th>
              <th>{{ $t('month_of') }}</th>
              <th>{{ $t('amount_paid') }}</th>
              <th>{{ $t('exchange_rate') }}</th>
              <th>{{ $t('status') }}</th>
              <th>{{ $t('action') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="mr in monthlyReturn" v-bind:key="mr.id">
              <td>{{ mr.number }}</td>
              <td>{{ mr.editDate }}</td>
              <td>{{ mr.monthOf }}</td>
              <td>{{ mr.amountPaid }}</td>
              <td>{{ mr.exchangeRate }}</td>
              <td>{{ mr.status.name }}</td>
              <td class="text-center">
                <v-btn @click="viewReturn(mr)" small
                       outlined fab class="text-center no_border">
                  <v-icon
                      size="20"
                  >
                    mdi-eye
                  </v-icon>
                </v-btn>
                <v-btn @click="editReturn(mr)"
                       :disabled="mr.status.id !== 1"
                       color="primary" outlined small
                       fab class="text-center  no_border">
                  <v-icon class="primary--text" size="17">fas fa-edit</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import LoadingMe from '@/components/Loading'

const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
export default {
  name: "",
  components: {
    LoadingMe,
  },
  data: () => ({
    // LoadingMe
    compeletLoading: false,
    monthlyReturn: []
  }),
  methods: {
    async onloadMonthlyReturn() {
      this.compeletLoading = true
      await monthlyReturnHandler.get().then(res => {
        this.monthlyReturn = res.data.data
        this.compeletLoading = false
      })
    },
    viewReturn(data) {
      this.$router.push({
        name: 'New Tax Return',
        path: 'new_tax_return',
        params: {id: data.id, monthlyReturn: data},
        query: {type: 'view'}
      })
    },
    editReturn(data) {
      this.$router.push({
        name: 'New Tax Return',
        path: 'new_tax_return',
        params: {id: data.id, monthlyReturn: data},
        query: {type: 'edit'}
      })
    },
  },
  computed: {},
  activated() {
    this.onloadMonthlyReturn()
  },
  async mounted() {
    await this.onloadMonthlyReturn()
  }
};
</script>
<style scoped>
</style>
