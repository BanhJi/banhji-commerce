<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
            <v-dialog v-model="dialog" scrollable max-width="80%">
                <template v-slot:activator="{on}">
                    <v-card
                        v-on="on"
                        elevation="0"
                        class=""
                    >
                        <h3 class="parksale text-uppercase">
                        {{ $t('parksale') }}
                        </h3>
                    </v-card>
                </template>

                <v-card class="sm_screen">
                    <v-card-title>{{ $t('parksale_reports') }}</v-card-title>
                    <v-icon class="btn_close" @click="dialog = false">close</v-icon>
                    <v-data-table
                        dense
                        :headers="headers"
                        :items="desserts"
                        item-key="name"
                        class="elevation-1"
                    ></v-data-table>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
const store = require("@/institute")
const instituteHandler = require("@/scripts/instituteHandler")
export default {
    data: () => ({
        desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
        },
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
        },
      ],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
      ],
        fileSizeRules: [
            files => !files || !files.some(file => file.size > 1024 * 1024) || 'Image size should be less than 1 MB!'
        ],
        dialogm1: '',
        dialog: false,
        show1: false,
        mInstitute: {},
        src: '',
        imgFile: '',
        bt: [],
        sectors: [],
        taxRegimes: [],
    }),
    props: {},
    watch: {},
    async mounted() {
        await this.getCookieData()
        await this.loadInstituteInfo()
        await this.loadDataBusiness()
    },
    methods: {
        async onUpdateCompany() {
            this.showLoading = true
            this.company.financialReportingStandards =this.financialReportingStandards
            this.company.businessType = this.businessType
            this.company.sector = this.sector
            this.company.imgProfile = this.src
            await this.saveImage()
            await instituteHandler.addCompany(this.company, this.mInstitute.creator).then(async () => {
                await this.loadInstituteInfo()
                this.showLoading = false
                this.dialog = false
            })
        },
        async saveImage() {
            const data = {data : this.imgFile}
            await instituteHandler.saveImageProfile(data).then(res => {
                this.src = res.url
                this.company.imgProfile = res.url
                window.console.log(res)
            })
        },
        async loadDataBusiness() {
            await instituteHandler.getBt().then(res => {
                this.bt = res
            })
            await instituteHandler.getSector().then(res => {
                this.sectors = res
            })
            await instituteHandler.getTaxRegime().then(res => {
                this.taxRegimes = res
            })
        },
        async onFileChange(e) {
            window.console.log(e)
            // const file = e.target.files[0];
            let input = e
            if (input.size > 1024 * 1024) {
                e.preventDefault();
                alert('File too big (> 1MB)');
                this.src = ''
                this.imgFile = ''
                this.$refs.fileupload.value = null;
            } else {
                // create a new FileReader to read this image and convert to base64 format
                let reader = new FileReader()
                window.console.log(reader)
                // Define a callback function to run, when FileReader finishes its job
                this.imgFile = reader.result
                reader.onloadend = async (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imgFile = e.target.result
                    window.console.log(this.imgFile)
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsBinaryString(input)
                // this.url = input.files[0]
                this.src = URL.createObjectURL(input)
            }
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") c = c.substring(1);
                if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        async getCookieData() {
            const cookie = this.getCookie("banhji-token");
            if (cookie !== "") {
                let data = JSON.parse(cookie);
                this.mInstitute = {
                    id: data.instituteId,
                    name: data.email,
                    email: data.email,
                    user: data.user,
                    creator: data.creator,
                };
            }
            window.console.log(this.mInstitute)
        },
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link)
            //eslint-disable-next-line no-console
            //console.log(data)
        },
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(this.mInstitute.id).then(res => {
                        this.company = res
                        this.src = res.imgProfile
                    })
                    resolve('resolved');
                }, 200);
            });
        },

    },
    components: {},
    computed: {
        company: {
            set(value) {
                store.default.commit("setCompany", value)
            },
            get() {
                return store.default.state.company
            }
        },
        financialReportingStandards() {
            if (this.company.financialReportingStandards) {
                return this.company.financialReportingStandards
            } else {
                return {}
            }
        },
        businessType() {
            if (this.company.businessType) {
                return this.company.businessType
            } else {
                return {}
            }
        },
        sector() {
            if (this.company.sector) {
                return this.company.sector
            } else {
                return {}
            }
        }
    }
};
</script>
<style scoped>
table.acc_setting {
    border: 1px solid #ccc;
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    color: #000;
}

table.acc_setting tr td {
    border: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_setting tr td p.bg_green {
    margin-bottom: 0;
    background-color: #2CA01C;
    padding: 7px 15px;
    color: #fff;
    font-weight: 700;
    text-align: center;
}

table.acc_setting tr td p.text_bold {
    font-weight: 700;
    margin-bottom: 0;
}

table.acc_setting tr td:first-child {
    font-weight: 700;
}

.btn_edit {
    background-color: #21abf6 !important;
    text-transform: capitalize;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}
.parksale{
    text-transform: uppercase;
    font-size: 17px !important;
    font-weight: 700 !important;
    line-height: 30px !important;
    font-family: Niradei-Bold, serif !important;
    color: #000;
    min-height: 40px;
    height: 40px;
    padding: 0 26px;
}
@media (max-width: 576px) {

}
</style>