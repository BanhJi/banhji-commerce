<template>
  <v-row >
    <v-col sm="4" cols="12" class="pr-4 pb-0">
      <v-card
          outlined
          dense
          class="pa-3 no_border mb-md-4 mb-xs-0"
          color="grayBg"
          height="182px"
      >
        <v-text-field
            class=""
            v-model="search"
            @change="onSupplierTypeChanged"
            outlined
            :placeholder="$t('search')"
            append-icon="search"
            clearable
        />
        <v-select
            class=""
            :items="supplierTypes"
            @change="onSupplierTypeChanged"
            item-value="id"
            item-text="name"
            v-model="mSupplierType"
            :placeholder="$t('customer_type')"
            clearable
            outlined
        />
        <v-select
            class=""
            item-value="id"
            item-text="name"
            :placeholder="$t('customer_group')"
            clearable
            outlined
        />
      </v-card>
      <v-card
          outlined
          dense
          class="pa-3 no_border hidden-sm-and-down"
          color="grayBg"
      >
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
        />
        <kendo-datasource
            ref="supplierTermDS"
            :data="suppliers"
            :schema="schemaDefinition"
        />

        <kendo-grid
            id="gridSupplierTerm"
            class="grid-center center_heigth"
            :change="onChanged"
            :data-source-ref="'supplierTermDS'"
            :selectable="true"
            :persistSelection="true"
            :noRecords="true"
            :scrollable="true"
            :height="535"
            :pageable-numeric="false"
            :pageable-previous-next="false"
            :pageable-messages-display="'Showing {2} data items'"
        >
          <kendo-grid-column
              :field="'name'"
              :attributes="{ class: 'tb_name_td' }"
              :title="'name'"
              :hidden="true"
              :group-header-template="'#=value#'"
          />
          <kendo-grid-column
              :field="'name'"
              :title="'&nbsp;'"
              :template="'<span>#= supplierType.abbr#-#=number# - #=name#</span>'"
          />
        </kendo-grid>
      </v-card>
    </v-col>
    <v-col class="pb-0" sm="8" cols="12">
      <v-row>
        <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
          <v-tabs>
            <v-tab>
              <span class="text-upercase">
                {{ $t("credit_limit") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="text-upercase">
                {{ $t("payment_term") }}
              </span>
            </v-tab>

            <!-- Credit Limit -->
            <v-tab-item  class="pa-0">
              <CredtLimit :vendor="supplier"/>
            </v-tab-item>

            <!-- Payment term -->
            <v-tab-item  class="pa-0">
              <PaymentTerm :vendor="supplier"/>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import SupplierModel from "@/scripts/model/Supplier";
import kendo from "@progress/kendo-ui";

const supplierModel = new SupplierModel({});
// const $ = require("jquery")
const supplierTypeHandler = require("@/scripts/supplierTypeHandler");
const supplierHandler = require("@/scripts/supplierHandler");

export default {
  name: "SupplierCenter",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    CredtLimit: () => import('./CredtLimit'),
    PaymentTerm: () => import('./PaymentTerm')
  },
  data: () => ({
    showLoading: true,
    info: {},
    suppliers: [],
    supplierTypes: [],
    mSupplierType: {},
    supplier: supplierModel,
    dateSorters: ["Today", "This Week", "This Month", "This Year"],
    search: "",
    isLoaded: false,
    schemaDefinition: {
      model: {id: "id"},
    },
    groupDefinition: {
      field: "account_type.name",
      compare: function (a, b) {
        if (a.items[0].number === b.items[0].number) {
          return 0;
        } else if (a.items[0].number > b.items[0].number) {
          return 1;
        } else {
          return -1;
        }
      },
    },
  }),
  methods: {
    onSorterChanges() {
    },
    searchTransaction() {
    },
    goEdit() {
    },
    onSupplierTypeChanged() {
      this.showLoading = true;
      this.loadSupplierCenter();
    },
    // async customerInfo() {
    //   this.$emit("onUpdate", this.supplier);
    // },
    async onChanged() {
      let grid = kendo.jQuery("#gridSupplierTerm").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.supplier = selectedItem;
      // this.$emit("onUpdate", selectedItem);
      // window.console.log(selectedItem, 'selected')
    },
    async loadSupplierType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          supplierTypeHandler.get().then((res) => {
            this.supplierTypes = res;
            if (this.supplierTypes.length > 0) {
              this.mSupplierType = this.supplierTypes[0];
              this.loadSupplierCenter();
            }
          });
        }, 10);
      });
    },
    async loadSupplierCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.suppliers = [];
          let supplierTypeId = undefined;
          if (this.mSupplierType) {
            supplierTypeId = this.mSupplierType.hasOwnProperty("id")
                ? this.mSupplierType.id
                : this.mSupplierType;
          }
          supplierHandler.center(supplierTypeId, this.search).then((res) => {
            this.showLoading = true;
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.suppliers = res.data.data;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    callback() {
      if (
          this.$route.params !== null &&
          this.$route.params.hasOwnProperty("data")
      ) {
        const supplier = this.$route.params.data;
        const index = this.suppliers.findIndex((item) => {
          return supplier.id === item.id;
        });
        if (index < 0) {
          this.suppliers.push(supplier);
        } else {
          this.suppliers.splice(index, 1, supplier);
        }
      }
      window.console.log("im changed", this.$route.params);
    },
  },
  mounted() {
    this.loadSupplierType();
  },
  computed: {
    btnEnabled() {
      return !this.supplier.name;
    },
    routerTo() {
      if (this.supplier.type === "Individual") {
        return (
            "individual_supplier" + `/${this.supplier ? this.supplier.id : ""}`
        );
      } else if (this.supplier.type === "Company") {
        return "company_supplier" + `/${this.supplier ? this.supplier.id : ""}`;
      }
      return "";
    },
  },
  watch: {
    $route: "callback",
  },
};
</script>
<style scoped>
.grid-center.center_heigth {
  height: 353px !important;
}
.dropdown_view.theme--light.v-btn.v-btn--icon {
  color: rgba(0, 0, 0, 0.54);
  padding: 0px 40px 0px 50px;
}

.v-menu__content {
  top: 595px !important;
  left: 1243px !important;
}

.v-menu__content .v-list .v-list-item {
  min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
  font-size: 12px;
}

.v-card {
  background-color: rgb(237, 241, 245);
}

.v-card.bg_blue {
  background-color: #92d050;
  color: #fff;
  min-height: 88px;
}

.v-card.bg_black {
  background-color: #333;
  color: #fff;
  min-height: 72px;
}

.v-card.bg_blue p.title {
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn_edit {
  background-color: #00b050 !important;
  color: #fff;
  font-size: 16px;
  height: 33px !important;
  padding: 0px 10px;
}

.v-card.bg_blue p {
  color: #fff;
}

.v-card.third {
  background-color: #2ca01c;
  color: #fff;
  display: grid;
  min-height: 52px;
}

p.title {
  margin-bottom: 0;
  font-weight: 700;
  color: #333;
  text-align: left;
}

.v-tab--active {
  background-color: rgb(237, 241, 245);
}

.tab_txn_att .v-tab--active {
  font-weight: 700;
}

.bg_white {
  background-color: #fff;
}

.no_border .v-data-table {
  height: 470px;
  overflow-y: scroll !important;
}

.no_border.hidden-sm-and-down .v-data-table td {
  height: 40px;
}

.custom_vcard.v-card {
  overflow-wrap: initial;
}

.k-grid td.k-state-selected,
.k-grid tr.k-state-selected > td {
  background-color: rgba(67, 168, 52, 0.25);
}

.attachment_file {
  background-color: #efeded;
  border-radius: 0 !important;
}

.view_action {
  text-transform: uppercase;
}

.funct_3 {
  min-height: 40px;
  background-color: #00b050;
  font-weight: bold;
  color: #fff;
}

.funct_back {
  min-height: 40px;
  background-color: #181717;
  font-weight: bold;
  color: #fff;
}

.bg_blue_in {
  background-color: #92d050;
  color: #fff;
  min-height: 48px;
}

.disabled-header.k-grid tr * {
  cursor: pointer;
}

@media (max-width: 576px) {
  .v-tab {
    min-width: auto !important;
  }

  .paddingLeft {
    margin-left: 15px;
  }
}

.b-search:before {
  color: #fff !important;
}
</style>
