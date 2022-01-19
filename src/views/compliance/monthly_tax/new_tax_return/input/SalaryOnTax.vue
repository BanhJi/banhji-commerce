<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('salary') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('fringe_benefits') }}
                    </span>
                </v-tab>

                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Salary :monthlyReturn="monthly" @getSalary="getSalary"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <PringeBenefit/>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>


export default {
    data: () => ({}),
    props: ['monthlyReturn'],
    methods: {
        getSalary(salary) {
            this.onUpdateSalary(salary)
        },
        onUpdateSalary(salary) {
            this.$emit('getSalary', salary)
        }
    },
    mounted() {
    },
    computed: {
        monthly() {
            if (this.monthlyReturn !== undefined) {
                return this.monthlyReturn
            } else {
                return {}
            }
        }
    },
    components: {
        Salary: () => import('./Salary'),
        PringeBenefit: () => import('./PringeBenefit'),

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

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

</style>
