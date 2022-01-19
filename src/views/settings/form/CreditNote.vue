<template>
  <v-row class="">
    <v-col sm="12" cols="12">
      <v-row>
        <v-col sm="12" cols="12" class="pt-0">
          <div class="a4">
         <div style="height: 42px;" class="mb-2">
              <v-btn class="btn_create_new float-right" @click="EdtiForm(1)">
                {{ $t("edit") }}
              </v-btn>
              <v-btn
                class="btn_create_new float-right mx-3"
                color="secondary"
                @click="_print(1)"
                >{{ $t("preview") }}</v-btn
              >
              <v-btn
                class="text-capitalize float-right mx-0"
                color="primary"
                @click="ResetForm"
                >{{ $t("reset") }}</v-btn
              >
            </div>
            <div
              :style="{
                'padding-left': invoice_setting.margin / 100 + 'in !important',
                'padding-right': invoice_setting.margin / 100 + 'in !important',
              }"
              style="box-shadow: rgb(0 0 0 / 20%) 0px 6px 12px 0px;;padding: 72px;  min-height: 297mm;"
            >
              <div v-html="form_invoice"></div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" scrollable max-width="1024px">
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("account_form") }}</v-card-title>
            <v-icon @click="dialog = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-row>
              <v-col sm="3" cols="12" class="">
                <label class="label">{{ $t("form_title") }}</label>
                <p class="text_tip">Input title form</p>
                <div class="d-flex">
                  <v-checkbox
                    class="mt-0"
                    @change="UpdateFormChange"
                    v-model="invoice_setting.title.en.status"
                  />
                  <v-text-field
                    class=" mb-3"
                    outlined
                    @change="UpdateFormChange"
                    placeholder=""
                    v-model="invoice_setting.title.en.name"
                  />
                </div>
                <div class="d-flex">
                  <v-checkbox
                    class="mt-0"
                    @change="UpdateFormChange"
                    v-model="invoice_setting.title.kh.status"
                  />
                  <v-text-field
                    class=" mb-3"
                    outlined
                    @change="UpdateFormChange"
                    placeholder=""
                    v-model="invoice_setting.title.kh.name"
                  />
                </div>
                <label class="label">{{ $t("table_header") }}</label>
                <v-radio-group
                  class="mt-0 mb-0 custom-radio"
                  @change="UpdateFormChange"
                  v-model="invoice_setting.table_header"
                  row
                >
                  <v-radio :label="$t('uppercase')" :value="1" />
                  <v-radio :label="$t('capitalize')" :value="2" />
                </v-radio-group>
                <label class="label">{{ $t("margin_left_right") }}</label>
                <v-slider
                  @change="UpdateFormChange"
                  v-model="invoice_setting.margin"
                  max="100"
                  min="0"
                  thumb-label
                ></v-slider>

                <label>{{ $t("address_location") }}</label>
                <v-select
                  outlined
                  @change="UpdateFormChange"
                  placeholder=""
                  :items="address_location"
                  v-model="invoice_setting.address.align"
                />

                <label class="label">Position Logo,Size,and Size </label>
                <v-slider
                  @change="UpdateFormChange"
                  v-model="invoice_setting.logo.width"
                  max="400"
                  min="20"
                  thumb-label
                ></v-slider>
                <v-slider
                  @change="UpdateFormChange"
                  v-model="invoice_setting.logo.height"
                  max="400"
                  min="20"
                  thumb-label
                ></v-slider>
                <label>{{ $t("hide_logo") }}</label>
                <v-checkbox
                  class="mt-0"
                  @change="UpdateFormChange"
                  v-model="invoice_setting.logo.hide"
                />
               <label>{{ $t("primary_logo") }}</label>
                <v-checkbox
                  class="mt-0"
                  @change="UpdateFormChange"
                  v-model="invoice_setting.logo.isPrimary"
                />
                <label>{{ $t("hide_address_section") }}</label>
                <v-checkbox
                  class="mt-0"
                  @change="UpdateFormChange"
                  v-model="invoice_setting.header"
                />
                <label>{{ $t("font_size") }}</label>
                <v-text-field
                  class=""
                  @change="UpdateFormChange"
                  outlined
                  placeholder="Prepared by"
                  v-model="invoice_setting.fontSize"
                />
                <label>{{ $t("title_font_size") }}</label>
                <v-text-field
                  class=""
                  @change="UpdateFormChange"
                  outlined
                  placeholder="Prepared by"
                  v-model="invoice_setting.headerFontSize"
                />
                <v-select
                  @change="UpdateFormChange"
                  outlined
                  :items="language"
                  v-model="invoice_setting.language"
                ></v-select>
                <v-row class="mt-0 mb-4">
                  <v-col sm="4" cols="4" class="text-center py-0">
                    <button @click="logoPosition('center')" class="logo_pos">
                      Center
                    </button>
                  </v-col>
                  <v-col sm="4" cols="4" class="text-center py-0">
                    <button @click="logoPosition('left')" class="logo_pos">
                      Left
                    </button>
                  </v-col>
                  <v-col sm="4" cols="4" class="text-center py-0">
                    <button @click="logoPosition('right')" class="logo_pos">
                      Right
                    </button>
                  </v-col>
                </v-row>

                <label class="label">{{ $t("signature") }}</label>
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-radio-group
                      class="mt-0 mb-0 custom-radio"
                      @change="UpdateFormChange"
                      v-model="invoice_setting.signature.option"
                      row
                    >
                      <v-radio :label="$t('option_1')" :value="1" />
                      <v-radio :label="$t('option_2')" :value="2" />
                    </v-radio-group>
                    <div>
                      <label>{{ $t("show_position") }}</label>
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-1"
                        v-model="invoice_setting.signature.position"
                      />
                    </div>
                  </v-col>
                  <v-col sm="2" cols="2" class="text-center py-0">
                    <v-checkbox
                      @change="UpdateFormChange"
                      v-model="invoice_setting.signature.prepared_by.status"
                    />
                  </v-col>
                  <v-col sm="10" cols="10" class="text-center">
                    <v-text-field
                      class=""
                      @change="UpdateFormChange"
                      outlined
                      placeholder="Prepared by"
                      v-model="invoice_setting.signature.prepared_by.text"
                    />
                    <v-text-field
                      class=""
                      @change="UpdateFormChange"
                      outlined
                      placeholder="khmer language"
                      v-model="invoice_setting.signature.prepared_by.text_kh"
                    />
                  </v-col>

                  <v-col sm="2" cols="2" class="text-center pt-0">
                    <v-checkbox
                      @change="UpdateFormChange"
                      class="mt-1"
                      v-model="invoice_setting.signature.reviewed_by.status"
                    />
                  </v-col>
                  <v-col sm="10" cols="10" class="text-center pt-0">
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="Reviewed by"
                      v-model="invoice_setting.signature.reviewed_by.text"
                    />
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="khmer language"
                      v-model="invoice_setting.signature.reviewed_by.text_kh"
                    />
                  </v-col>

                  <v-col sm="2" cols="2" class="text-center pt-0">
                    <v-checkbox
                      @change="UpdateFormChange"
                      class="mt-1"
                      v-model="invoice_setting.signature.verified_by.status"
                    />
                  </v-col>
                  <v-col sm="10" cols="10" class="text-center pt-0">
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="Verified by"
                      v-model="invoice_setting.signature.verified_by.text"
                    />
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="khmer language"
                      v-model="invoice_setting.signature.verified_by.text_kh"
                    />
                  </v-col>

                  <v-col sm="2" cols="2" class="text-center pt-0">
                    <v-checkbox
                      @change="UpdateFormChange"
                      class="mt-1"
                      v-model="invoice_setting.signature.approved_by.status"
                    />
                  </v-col>
                  <v-col sm="10" cols="10" class="text-center pt-0">
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="Approved by"
                      v-model="invoice_setting.signature.approved_by.text"
                    />
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="khmer language"
                      v-model="invoice_setting.signature.approved_by.text_kh"
                    />
                  </v-col>

                  <v-col sm="2" cols="2" class="text-center pt-0">
                    <v-checkbox
                      @change="UpdateFormChange"
                      class="mt-1"
                      v-model="invoice_setting.signature.recorded_by.status"
                    />
                  </v-col>
                  <v-col sm="10" cols="10" class="text-center pt-0">
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="Recorded by"
                      v-model="invoice_setting.signature.recorded_by.text"
                    />
                    <v-text-field
                      class=""
                      outlined
                      @change="UpdateFormChange"
                      placeholder="khmer language"
                      v-model="invoice_setting.signature.recorded_by.text_kh"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <!-- color -->
                  <v-divider />
                  <label>{{ $t("color_background") }}</label>
                  <v-col sm="12" cols="4" class="text-center  d-flex pt-2">
                    <input
                      class="color_option"
                      type="color"
                      @change="UpdateFormChange"
                      v-model="invoice_setting.color.color"
                    />
                    <input
                      class="color_option"
                      type="color"
                      @change="UpdateFormChange"
                      v-model="invoice_setting.color.background"
                    />
                  </v-col>
                  <label>{{ $t("page_size") }}</label>
                  <v-col sm="12" cols="4" class="">
                    <div>
                      <v-btn
                        :class="{
                          'primary--text': invoice_setting.page == 'A4',
                        }"
                        @click="invoice_setting.page = 'A4'"
                        >A4</v-btn
                      >
                      <v-btn
                        :class="{
                          'primary--text': invoice_setting.page == 'A5',
                        }"
                        @click="invoice_setting.page = 'A5'"
                        class="mx-2"
                        >A5</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col sm="12" cols="4" class="pl-0">
                    <p>{{ $t("show_table_column") }}</p>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0 pt-0"
                        v-model="invoice_setting.column.one"
                      />
                      <label>{{ $t("no.") }}</label>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0 pt-0"
                        v-model="invoice_setting.column.two"
                      />
                      <label>{{ $t("number") }}</label>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0 pt-0"
                        v-model="invoice_setting.column.three"
                      />
                      <label>{{ $t("description") }}</label>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0 pt-0"
                        v-model="invoice_setting.column.four"
                      />
                      <label>{{ $t("uom") }}</label>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0"
                        v-model="invoice_setting.column.five"
                      />
                      <label>{{ $t("quantity") }}</label>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0 pt-0"
                        v-model="invoice_setting.column.six"
                      />
                      <label>{{ $t("unit_price") }}</label>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0 pt-0"
                        v-model="invoice_setting.column.seven"
                      />
                      <label>{{ $t("discount") }}</label>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        @change="UpdateFormChange"
                        class="mt-0 pt-0"
                        v-model="invoice_setting.column.eight"
                      />
                      <label>{{ $t("amount") }}</label>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col sm="9" cols="11" class="bg_white">
                <div class="ma-3 mt-6">
                  <div
                    :style="{
                      'padding-left': invoice_setting.margin / 100 + 'in !important',
                      'padding-right': invoice_setting.margin / 100 + 'in !important',
                    }"
                    style="box-shadow: rgb(0 0 0 / 20%) 0px 6px 12px 0px;;padding: 72px;  min-height: 297mm;"
                  >
                    <div v-html="form_invoice"></div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions class="modal_footer">
            <v-btn @click="saveForm" class="btn_save_close float-right">{{
              $t("save_close")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
// const axios = require("axios");
import { CreditNote, print } from "@/form/CreditNote.js";
const {
  getFormSetting,
  formSettingCreate,
  deleteFormSetting,
} = require("@/scripts/settingsHandler.js");
/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

import { i18n } from "@/i18n";

let def = {
  title: {
    en: { name: "Credit Note", status: true },
    kh: { name: "កំណត់សំគាល់ឥណទាន", status: true },
  },
  logo: { width: 140, height: 130, position: "left", hide: false },
  header: false,
  page: "A4",
  form_number: 1,
  table_header: 1,
  margin: 75,
  fontSize: 12,
  headerFontSize: 18,
  color: {
    background: "#3B393E",
    color: "#ffffff",
    background2: "#3B393E",
    color2: "#ffffff",
  },
  signature: {
    prepared_by: { status: true, text: "Prepare By", text_kh: "រៀបចំដោយ" },
    reviewed_by: {
      status: true,
      text: "Reviewed By",
      text_kh: "ត្រួតពិនិត្យដោយ",
    },
    verified_by: { status: true, text: "Approverd By", text_kh: "សំរេចដោយ" },
    approved_by: { status: true, text: "Recorded By", text_kh: "ទូទាត់ដោយ" },
    recorded_by: { status: true, text: "Received By", text_kh: "ទទួលដោយ" },
    option: 1,
    positon: true,
  },
  column: {
    one: true,
    two: false,
    three: true,
    four: true,
    five: true,
    six: true,
    seven: false,
    eight: true,
    nine: false,
    ten: false,
    ten1: false,
    ten2: false,
    ten3: false,
    ten4: false,
    ten5: false,
    ten6: false,
    ten7: false,
    ten8: false,
  },
  language: "English",
  address: { title: "St, 120 Phnom Penh", align: "center" },
};
export default {
  components: {
    // LoadingMe
  },
  data() {
    return {
      pk: "",
      sk: "",
      invoice_setting: def,
      form_invoice: CreditNote(this.items, def),
      slider_widht: 5,
      slider_height: 5,
      image_size: {
        width: "100px",
        height: "100px",
      },
      language: ["English", "Khmer", "Both"],
      address_location: ["center", "left", "right"],
      dialogm1: "",
      dialog: false,
    };
  },

  methods: {
    ResetForm() {
      let params = "?id=" + this.pk;
      if (this.pk != "") {
        deleteFormSetting(params).then((res) => {
          window.console.log(res.data);
          if (res.data.statusCode === 200) {
            this.invoice_setting = def;
            this.$snotify.success(i18n.t("success"));
            this.form_invoice = CreditNote(this.items, this.invoice_setting);
          } else {
            this.$snotify.error(i18n.t("failed"));
          }
        });
      }
    },
    saveForm() {
      let data = {
        institute: instituteId,
        type: "form",
        formType: "Credit Note",
        settings: this.invoice_setting,
        sk: this.sk,
        pk: this.pk,
      };
      formSettingCreate(data).then((res) => {
        if (res.data.statusCode == 201) {
          this.dialog = false;
          this.$snotify.success(i18n.t("success"));
          this.sk = res.data.data.sk;
          this.pk = res.data.data.pk;
        } else {
          this.$snotify.error(i18n.t("failed"));
        }
      });
    },

    getFormSettingS() {
      let params = "?formType=Credit Note";
      getFormSetting(params).then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.data.length > 0) {
            this.sk = res.data.data["0"].sk;
            this.pk = res.data.data["0"].pk;
            this.invoice_setting = res.data.data["0"].settings;
            this.form_invoice = CreditNote(this.items, this.invoice_setting);
          }
        }
      });
    },
    UpdateFormChange() {
      this.form_invoice = CreditNote(this.items, this.invoice_setting);
    },
    logoPosition(pos) {
      this.invoice_setting.logo.position = pos;
      this.form_invoice = CreditNote(this.items, this.invoice_setting);
    },
    selectedForm(val) {
      this.selected_form = val;
    },
    _print(id) {
      print(this.items, id, this.invoice_setting);
    },
    EdtiForm() {
      this.form_invoice = CreditNote(this.items, this.invoice_setting);
      this.dialog = true;
    },
    async loadFormSetting() {
      // new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve("resolved");
      //     axios.get("http://laravelapi.com/api/getformdata").then((res) => {
      //     });
      //   }, 500);
      // });
    },
  },
  computed: {},
  mounted: async function() {
    this.getFormSettingS();
  },
};
</script>
<style scoped>
.a4 {
  width: 210mm;
  /* to centre page on screen*/
  min-height: 297mm;
  margin-left: auto;
  margin-right: auto;
}
.btn_edit {
  background-color: #4e6470 !important;
  color: #fff !important;
  height: 35px;
}
.v-card__actions .v-btn.v-btn {
  padding: 0 16px;
}
.function_footer {
  padding: 15px;
  display: inline-block;
}
.bg_white {
  background-color: #fff;
  padding-left: 0;
  padding-top: 0;
}
.wrapper_form {
  width: 99%;
  margin: 0 auto;
}
.wrapper_form .header .logo_company {
  text-align: center;
  padding-top: 0;
}
.wrapper_form .header .logo_company img {
  width: 100px;
  height: auto;
}
.wrapper_form .header h2 {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 8px;
  font-size: 25px;
}
.wrapper_form .header p {
  text-align: center;
  margin-bottom: 8px;
  width: 93%;
  margin: 0 auto;
}
.wrapper_form .header p.phone_email {
  text-align: center;
}
.wrapper_form .content h3.title {
  text-transform: uppercase;
  text-align: center;
  font-size: 25px !important;
  font-weight: 700 !important;
}
.new_line {
  clear: both;
}

.logo_pos {
  padding: 5px 5px;
  background: #fff;
  width: 60px;
  font-size: 12px;
  border-radius: 6px;
}
.color_option {
  width: 62px;
  border: 1px solid #808080;
  margin-right: 4px;
  height: 37px;
  border-radius: 6px;
}

@media (max-width: 576px) {
}
</style>
