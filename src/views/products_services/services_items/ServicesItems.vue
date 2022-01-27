<template>
  <v-row class="">
    <v-col sm="4" cols="12" class="py-0 pr-2">
      <v-card
        outlined
        dense
        color="grayBg"
        class="pa-3 no_border mb-4"
        height="180px"
      >
        <div class="d-flex">
          <v-text-field
            class=""
            outlined
            :placeholder="$t('name')"
            append-icon="search"
            v-model="search"
            @change="onCategoryChanged"
            clearable
          />
            <v-btn icon @click="loadData">
              <v-icon>refresh</v-icon>
            </v-btn>
        </div>
        <v-select
          class=""
          tage="Product Category"
          v-model="mCategory"
          :items="categories"
          item-value="id"
          :item-text="(item) => `${item.abbr} - ${item.name}`"
          @change="onCategoryChanged"
          return-object
          :placeholder="$t('category')"
          clearable
          outlined
        />
        <v-select
          class=""
          :items="groups"
          v-model="mGroup"
          item-value="id"
          item-text="name"
          @change="onCategoryChanged"
          return-object
          :placeholder="$t('group')"
          clearable
          outlined
        />
      </v-card>
      <v-card
        outlined
        dense
        color="grayBg"
        class="pa-3  no_border hidden-sm-and-down"
      >
        <v-card outlined dense class="no_border hidden-sm-and-down">
          <!-- loading -->
          <div>
            <LoadingMe
              :isLoading="showLoading"
              type="loading"
              :fullPage="false"
              :myLoading="true"
            />
          </div>
          <kendo-datasource
            ref="serviceItemDS"
            :data="serviceItems"
            :schema="gridSchema"
          >
          </kendo-datasource>
          <kendo-grid
            id="gridService"
            class="grid-center center_heigth"
            :change="onChanged"
            :data-source-ref="'serviceItemDS'"
            :selectable="true"
            :persistSelection="true"
            :noRecords="true"
            :scrollable="true"
            :navigatable="true"
            :height="535"
            :pageable-numeric="false"
            :pageable-previous-next="false"
            :pageable-messages-display="'Showing {2} data items'"
          >
            <kendo-grid-column
              :field="'name'"
              :attributes="{ class: 'tb_name_td' }"
              :title="'Name'"
              :group-header-template="'#=value#'"
            />
          </kendo-grid>
        </v-card>
      </v-card>
    </v-col>
    <v-col sm="8" cols="12" class="py-0 pl-2">
      <v-tabs>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-information-variant</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("info") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("txn_") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("uom") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("price") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("image") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Info :service="info" @onUpdate="callback" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Transactions :service="info" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Uom :service="info" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Price :service="info" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-col sm="12" cols="12" class="pt-0 pr-0 pl-0">
            <v-row class="grayBg">
              <v-col sm="12" cols="12" class="">
                <v-card outlined color="white" class="pa-3">
                  <Images :service="info" @onUpdate="callback" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";

// const $ = require("jquery")
const serviceItemHandler = require("@/scripts/serviceItemHandler");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
export default {
  // props: ['service'],
  components: {
    Transactions: () => import(`./Transactions`),
    Info: () => import(`./Info`),
    Uom: () => import(`./Uom`),
    Price: () => import(`./Price`),
    Images: () => import(`./Images`),
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    serviceItems: [],
    isLoaded: true,
    showLoading: false,
    info: {},
    mCategory: "",
    categories: [],
    search: "",
    gridSchema: {
      model: {
        id: "id",
      },
    },
    groups: [],
    mGroup: {},
  }),
  watch: {
    service() {
      window.console.log("hello");
    },
  },
  async mounted() {
    await this.loadCategory();
    await this.loadGroup();
  },
  methods: {
    async loadData(){
      await this.loadCategory();
      await this.loadGroup();
    },
    async serviceInfo() {
      this.$emit("onUpdate", this.service);
    },
    async onChanged() {
      let grid = kendo.jQuery("#gridService").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.info = selectedItem;
      if (this.info.hasOwnProperty("saleUOM")) {
        const sUOMId = this.info.saleUOM.id;
        if (sUOMId.startsWith("s-") === false) {
          this.info.saleUOM.id = "s-" + sUOMId;
        } else {
          this.info.saleUOM.id = sUOMId;
        }
      }
      if (this.info.hasOwnProperty("purchaseUOM")) {
        const pUOMId = this.info.purchaseUOM.id;
        if (pUOMId.startsWith("p-") === false) {
          this.info.purchaseUOM.id = "p-" + pUOMId;
        } else {
          this.info.purchaseUOM.id = pUOMId;
        }
      }
      this.$emit("onUpdate", selectedItem);
      window.console.log("service", this.info);
    },
    async loadProducts() {
      this.isLoaded = true;
      this.showLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          serviceItemHandler.get().then((res) => {
            this.showLoading = false;
            this.isLoaded = false;
            this.serviceItems = res;
            window.console.log(res);
          });
        }, 100);
      });
    },
    async onCategoryChanged() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.isLoaded = true;
          this.showLoading = true;
          let cateId = "",
            groupId = "",
            search = "";
          if (this.mCategory) {
            cateId = this.mCategory.id;
          }
          if (this.mGroup) {
            groupId = this.mGroup.id;
          }
          if (this.search) {
            search = this.search;
          }
          let strFilter = "?";
          if (cateId) {
            strFilter += "cateId=" + cateId;
          }
          if (groupId) {
            strFilter += "&groupId=" + groupId;
          }
          if (search) {
            strFilter += "&search=" + search;
          }
          // window.console.log('search', strFilter)
          serviceItemHandler.filter(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.isLoaded = false;
              this.serviceItems = res.data.data;
            }

            // window.console.log(res)
          });
        }, 300);
      });
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.isLoaded = true;
          this.showLoading = true;
          groupHandler.get().then((res) => {
            this.groups = res.filter((m) => m.category.type.name === "Service");
            window.console.log(res, "group");
          });
        }, 300);
      });
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.isLoaded = true;
          this.showLoading = true;
          categoryHandler.get().then((res) => {
            this.showLoading = false;
            this.isLoaded = false;
            this.categories = res;
            this.categories = this.categories.filter(
              (m) => m.hasOwnProperty("type") && m.type.name === "Service"
            );
            if (this.categories.length > 0) {
              this.mCategory = this.categories[0];
              this.onCategoryChanged();
            }
          });
        }, 300);
      });
    },
    callback(service) {
      // this.service = service
      const index = this.serviceItems.findIndex((item) => {
        return service.id === item.id;
      });
      if (index < 0) {
        this.serviceItems.push(service);
      } else {
        this.serviceItems.splice(index, 1, service);
      }
      // window.console.log('from Info', this.serviceItems)
    },
  },
};
</script>
<style scoped>
.v-tab {
  justify-content: left;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.v-menu__content {
  top: 141px !important;
  left: 1098px !important;
}

.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 15px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.Light_grey {
  background-color: #f8f8f9 !important;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: none !important;
}

.v-tabs-bar {
  border-bottom: none !important;
}

.v-card__text {
  padding: 0 !important;
}

.v-window-item--active {
  padding-left: 12px !important;
  padding-right: 12px !important;
}

.grayBg {
  background-color: #f8f8f9;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

@media (max-width: 576px) {
  .v-tab {
    min-width: auto !important;
  }

  .paddingLeft {
    margin-left: 15px;
  }
}
</style>
