<template>
  <v-row class="">
    <v-col sm="12" cols="12">
      <v-row>
        <v-col sm="12" cols="12" class="pt-0">
          <div class="a4">
         <div style="height: 42px;" class="mb-2">
              <v-btn
                color="primary"
                class=" text-capitalize float-right"
                @click="EdtiForm(3)"
              >
                {{ $t("edit") }}
              </v-btn>
              <v-btn
                color="secondary"
                class=" text-capitalize float-right mx-3"
                @click="_print(3)"
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
            <v-icon class="btn_close" @click="dialog = false">close</v-icon>
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
                <label>{{ $t("hide_address_section") }}</label>
                <v-checkbox
                  class="mt-0"
                  @change="UpdateFormChange"
                  v-model="invoice_setting.header"
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

                <v-row>
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
                  <v-col sm="12" cols="4" class="text-center d-flex pt-2">
                    <input
                      class="color_option"
                      type="color"
                      @change="UpdateFormChange"
                      v-model="invoice_setting.color.color2"
                    />
                    <input
                      class="color_option"
                      type="color"
                      @change="UpdateFormChange"
                      v-model="invoice_setting.color.background2"
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
                </v-row>
              </v-col>
              <v-col sm="9" cols="11" class="bg_white">
                <div class="ma-3 mt-6">
                  <div
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
import { PurchaseDeposite, print } from "@/form/Purchases.js";
// import { i18n } from "@/i18n";
// import LoadingMe from '@/components/Loading'
// const axios = require("axios");
const {
  getFormSetting,
  formSettingCreate,
  deleteFormSetting,
} = require("@/scripts/settingsHandler.js");
import { i18n } from "@/i18n";
let def = {
  title: {
    en: { name: "Purchase Deposit", status: true },
    kh: { name: "បញ្ញើនៃការទិញប្រាក់", status: true },
  },
  logo: { width: 140, height: 80, position: "left", hide: false },
  header: false,
  page: "A4",
  color: {
    background: "#3B393E",
    color: "#ffffff",
    background2: "#000000",
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
  },
  language: "English",
  address: { title: "St, 120 Phnom Penh", align: "left" },
};
export default {
  components: {
    // LoadingMe
  },
  data() {
    return {
      sk: "",
      pk: "",
      invoice_setting: def,
      form_invoice: PurchaseDeposite(this.items, def),
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
            this.form_invoice = PurchaseDeposite(
              this.items,
              this.invoice_setting
            );
          } else {
            this.$snotify.error(i18n.t("failed"));
          }
        });
      }
    },
    saveForm() {
      let data = {
        type: "form",
        formType: "Purchase Deposit",
        settings: this.invoice_setting,
        sk: this.sk,
        pk: this.pk,
      };
      formSettingCreate(data).then((res) => {
        window.console.log(res);
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
      let params = "?formType=Purchase Deposit";
      getFormSetting(params).then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.data.length > 0) {
            this.sk = res.data.data["0"].sk;
            this.pk = res.data.data["0"].pk;
            this.invoice_setting = res.data.data["0"].settings;
            this.form_invoice = PurchaseDeposite(
              this.items,
              this.invoice_setting
            );
          }
        }
      });
    },
    UpdateFormChange() {
      this.form_invoice = PurchaseDeposite(this.items, this.invoice_setting);
    },
    logoPosition(pos) {
      this.invoice_setting.logo.position = pos;
      this.form_invoice = PurchaseDeposite(this.items, this.invoice_setting);
    },
    selectedForm(val) {
      this.selected_form = val;
    },
    _print(id) {
      print(this.items, id, this.invoice_setting);
    },
    EdtiForm() {
      this.form_invoice = PurchaseDeposite(this.items, this.invoice_setting);
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
    this.loadFormSetting();
    this.getFormSettingS();
  },
};
</script>
<style scoped>
.a4 {
  width: 210mm;
  /* to centre page on screen*/
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
.v-application--is-ltr .v-messages {
  text-align: left;
  display: none !important;
}

@media (max-width: 576px) {
}
</style>
