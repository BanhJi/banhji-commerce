<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-row>
        <v-col sm="6" cols="12" class="py-0">
          <h2 class="mb-0 font_20">{{ $t('bill_of_material') }}</h2>
        </v-col>
        <v-col sm="6" cols="12" class="py-0">
          <v-btn to="bom" color="primary" class=" white--text float-right text-capitalize">
            {{ $t('new_bom') }}
          </v-btn>
        </v-col>

      </v-row>
      <v-row class="mt-0">
        <v-col sm="12" cols="12" class="">
          <v-row class="">
            <v-col sm="10" cols="12" class="py-0">
              <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                              :initEndDate="endDate" @emitEndDate="endDate = $event"/>
            </v-col>
            <v-col sm="1" cols="12" class="pt-1">
              <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)" @click="loadBOM">
                 <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>


      <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
          <template>
            <kendo-datasource ref="bomDS"
                              :data="bomList"
            />
            <kendo-grid id="gridBOM" class="grid-function"
                        :data-source-ref="'bomDS'"
                        :sortable="false"
                        :filterable="false"
                        :column-menu="true"
                        :editable="false"
                        :scrollable-virtual="true"
            >
              <kendo-grid-column
                  :template="rowNumberOP"
                  :title="$t('no.')"
                  :width="55"
                  :column-menu="false"
                  :headerAttributes="{
                                                        style: 'background-color: #EDF1F5;',
                                                        class: 'text-variants'
                                                    }"
                  :attributes="{
                                                        style: 'text-align: variants'
                                                    }"/>
              <kendo-grid-column :field="'referenceNo'"
                                 :title="$t('bom_number')"
                                 :width="160"
                                 :template="referenceTemplate"
                                 :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
              <kendo-grid-column :field="'itemName'"
                                 :title="$t('item')"
                                 :width="200"
                                 :template="itemTemplate"
                                 :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
              <kendo-grid-column :field="'typeBom'"
                                 :title="$t('bom_type')"
                                 :width="150"
                                 :template="BOMTypeTemplate"
                                 :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
              <kendo-grid-column :field="'buom'"
                                 :title="$t('base_uom')"
                                 :width="150"
                                 :template="UOMTemplate"
                                 :editable="()=>{ return false}"
                                 :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                 :attributes="{style: 'text-align: right; '}"/>
              <kendo-grid-column :field="'status'"
                                 :title="$t('status')"
                                 :width="150"
                                 :template="statusTemplate"
                                 :headerAttributes="{
                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                        }"
                                 :attributes="{
                                                            style: 'text-align: right'
                                                        }"/>
            </kendo-grid>
          </template>
        </v-col>
      </v-row>
    </v-col>
    <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
    />
  </v-row>
</template>
<script>

import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const bomHandler = require("@/scripts/bomHandler")
export default {
  components: {
    'app-searchdate': () => import('@/components/custom_templates/SearchDate'),
    LoadingMe: () => import("@/components/Loading")
  },
  data: () => ({
    showLoading: false,
    mDateSorter: 'Today',
    startDate: '',
    endDate: '',
    dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
    bomList: [],
  }),
  props: ['dataBom'],
  methods: {
    referenceTemplate(data) {
      let url = `bom_view/${data.id}`
      let args = {
        text: data.referenceNo,
        url: url,
        data: data,
      }
      return {
        template: LinkTemplate,
        templateArgs: args
      }
    },
    rowNumberOP(dataItem) {
      let ds = this.$refs.bomDS.kendoWidget(),
          index = ds.indexOf(dataItem);
      return index + 1;
    },
    itemTemplate(dataItem) {
      try {
        const item = dataItem
        if (item) {
          return `<span>${item.itemName ? item.itemName : ``}</span>`
        } else {
          return ``
        }
      } catch (e) {
        return ''
      }
    },
    BOMTypeTemplate(dataItem) {
      const bType = dataItem.typeBom
      if (bType) {
        return `<span>${bType.name ? bType.name : ``}</span>`
      } else {
        return ``
      }
    },
    UOMTemplate(dataItem) {
      const uom = dataItem.buom
      if (uom) {
        return `<span>${uom.name ? uom.name : ``}</span>`
      } else {
        return ``
      }
    },
    statusTemplate(dataItem) {
      const status = dataItem.status
      let statusText = ''
      switch (status) {
        case 1:
          statusText = 'Open'
          break
        case 2:
          statusText = 'Used'
          break
        case 3:
          statusText = 'Closed'
          break
        default:
          break
      }
      return statusText
    },
    async loadBOM() {
      this.showLoading = true
      let strFilter = ''

      if (this.startDate !== '' && this.endDate !== '') {
        strFilter = '?start=' + this.startDate + '&end=' + this.endDate
      }
      window.console.log(strFilter, 'this.startDate')
      await bomHandler.getAll(strFilter).then(res => {
        this.bomList = res
        this.showLoading = false
      })
    },
    onUpdate() {
      if (this.dataBom) {
        this.bomList.push(this.dataBom)
      }
    }
  },
  watch: {'bomData': 'onUpdate'},
  async mounted() {
    await this.loadBOM()
  },
  computed: {
    bomData() {
      if (this.dataBom) {
        return this.dataBom
      } else {
        return {}
      }
    }
  },
};
</script>

<style scoped>

.function_footer {
  padding: 15px;
  display: inline-block;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}

@media (max-width: 576px) {
}
</style>
