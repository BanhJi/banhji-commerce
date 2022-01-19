<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('resident') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('non_resident') }}
                    </span>
                </v-tab>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Resident :withholding="withholdings"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <NoResident :withholding="withholdings"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>

const withhildingHandler = require('@/scripts/compliance/handler/withholdingTaxHandler')
export default {
    data: () => ({
        withholdings: [],
    }),
    props: {},
    methods: {
        async onloadWht() {
            await withhildingHandler.getAll().then(res => {
                this.withholdings = res.data.data
            })
        },
    },
    async mounted() {
        await this.onloadWht()
    },
    computed: {},
    components: {
        Resident: () => import('./wht/Resident'),
        NoResident: () => import('./wht/NoResident'),
    },
};
</script>

<style scoped>
.v-tab--active {
    background-color: #E5EFFA;
    color: #000;
}

.v-tab {
    min-width: 30px;
    font-size: 17px;
    text-transform: capitalize;
}
</style>
