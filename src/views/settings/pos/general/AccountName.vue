<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('account_name') }}</h2>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-select class="mt-1"
                      v-model="n.name"
                      :items="nameList"
                      item-value="id"
                      item-name="name"
                      :item-text="item =>`${item.name}`"
                      outlined=""/>
                <v-btn color="secondary" class="float-right white--text text-capitalize"
                       @click="save">
                    {{ $t('save') }}
                </v-btn>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import AccountNameModel from "@/scripts/model/pos/AccountName"
const posHandler = require("@/scripts/posHandler")

export default {
    components: {},
    data: () => ({
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        //
        valid: true,
        saveOption: '',
        n: new AccountNameModel({}),
        decimals: [],
        currencyList: [],
        edit: false,
        segment: {},
        nameList: [
            {id: "local_name", name: "Local Name"},
            {id: "name", name: "Name"}
        ]
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    created() {
    },
    methods: {
        async loadSingleName() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    posHandler.accountNameGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            window.console.log(res)
                            if(res.data.data.length > 0) {
                                this.n = res.data.data[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async save() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    window.console.log(this.n)
                    posHandler.accountNamePost(new AccountNameModel(this.n)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e)
                    })
                }, 300);
            })
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
    },
    mounted: async function () {
        await this.loadSingleName()
    }
};
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>