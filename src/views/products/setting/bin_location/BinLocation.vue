<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-left">
                        {{ $t('zone') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('section') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-left">
                        {{ $t('rack') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down ">
                        {{ $t('level') }}
                    </span>
                </v-tab>
                <v-tab-item >
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0">
                           <Zone/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item >
                    <v-row>
                        <v-col  sm="12" cols="12" class="pt-0">
                           <Section/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item >
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0">
                           <Rack/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item >
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0">
                           <Level/>
                        </v-col>
                    </v-row>
                </v-tab-item>
          
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: '',
        data: () => ({
            isHide: false
        }),
        props: {},
        methods: {
            clickMe(data) {
                // alert(data.link)
                this.$router.push(`${data.link}`);
                //this.$event.target.classList.toggle(active)
                //eslint-disable-next-line no-console
                console.log(data.link)
                //eslint-disable-next-line no-console
                //console.log(data)
            }, 
            hideTabs(){
				this.isHide = !this.isHide;
			},
        },
        components: {
            Zone: () => import('./Zone'),
            Section: () => import('./Section'),
            Rack: () => import('./Rack'),
            Level: () => import('./Level'),
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