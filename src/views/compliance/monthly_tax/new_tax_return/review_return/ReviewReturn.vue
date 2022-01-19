<template>
  <div>
    <v-row>
<!--      <v-col sm="12" cols="12">-->
<!--        <v-row>-->
<!--          <v-col sm="2" cols="12">-->
<!--            <v-skeleton-loader-->
<!--                v-bind="attrs"-->
<!--                type="list-item, list-item, list-item, list-item, list-item, list-item"-->
<!--            ></v-skeleton-loader>-->
<!--          </v-col>-->
<!--          <v-col sm="10" cols="12">-->
<!--            <v-skeleton-loader-->
<!--                v-bind="attrs"-->
<!--                type="table-thead, table-row, table-row, table-row, table-row, table-row"-->
<!--            ></v-skeleton-loader>-->
<!--          </v-col>-->
<!--        </v-row>-->


<!--      </v-col>-->
      <v-col sm="12" cols="12">
        <v-tabs vertical class="tab_setting1" active-class="">
          <v-tab style="max-width: 200px">
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('summary') }}
                        </span>
          </v-tab>
          <v-tab style="max-width: 200px">
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('tax_credit') }}
                        </span>
          </v-tab>
          <v-tab style="max-width: 200px">
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('value_added_tax') }}
                        </span>
          </v-tab>
          <v-tab style="max-width: 200px">
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('value_added_tax()') }}
                        </span>
          </v-tab>
          <v-tab style="max-width: 200px">
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('tax_on_salary') }}
                        </span>
          </v-tab>
          <v-tab style="max-width: 200px">
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('withholding_tax') }}
                        </span>
          </v-tab>

          <v-tab-item>
            <Summary/>
          </v-tab-item>
          <v-tab-item>
            <TaxCredit/>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <PurchaseRecord :monthlyReturn="data"/>
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text>
                <SaleRecord :monthlyReturn="data"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <VatSC/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-overlay :absolute="true" color="white" :value="true"/>
            <TaxSalary/>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <WithholdingTax :monthlyReturn="data"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./_review_return.js" lang="js"></script>
<style lang="css" scoped>
.wt_tbody > tr > :nth-child(3) {
  font-family: "Niradei-Bold", serif;
  text-align: center;
}

.wt_tbody > tr:first-child, .wt_tbody > tr:nth-child(9), .wt_tbody > tr:nth-child(15) > td:nth-child(3) {
  font-family: "Niradei-Bold", serif;
}

.ts_tbody > tr:first-child, .ts_tbody > tr:nth-child(8), .ts_tbody > tr:nth-child(10) {
  font-family: "Niradei-Bold", serif;
}

.vat_tbody > tr:first-child,
.vat_tbody > tr:nth-child(4) > td:nth-child(3),
.vat_tbody > tr:nth-child(5),
.vat_tbody > tr:nth-child(8) > td:nth-child(3),
.vat_tbody > tr:nth-child(9) > td:nth-child(3) {
  font-family: "Niradei-Bold", serif;
}

.ms_tbody > tr:last-child {
  font-family: "Niradei-Bold", serif;
  text-align: right;
}

.mp_tbody > tr:last-child > td:nth-child(3) {
  font-family: "Niradei-Bold", serif;
}

.ppi_tbody > tr:last-child {
  font-family: "Niradei-Bold", serif;
}

.vatTC_tbody > tr:last-child {
  font-family: "Niradei-Bold", serif;
}

.s_tbody > tr:last-child {
  background-color: #D0CECE;
}

/*
thead > tr > th {
    background-color: #222A35 !important;
    color: #FFFFFF !important;
    text-transform: uppercase !important;
} */

.v-tab {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: left;
}

.block-gray {
  min-height: 230px;
}

.block-gray .font40 {
  font-size: 40px !important;
}

.block-gray .font19 {
  font-size: 19px !important;
}

.return-type-table.theme--light.v-data-table {
  background-color: transparent !important;
}

.return-type-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.return-type-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
  border-bottom: 0 !important;
}

.return-type-table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 0 5px 0 0 !important;
  height: 25px !important;
}

.text-green {
  font-size: 35px !important;
}

@media (max-width: 576px) {

}
</style>
