 <template>
    <v-row>
        <v-col sm="12" cols="12">
            <div style="background-color: #fff; padding: 0 0 5px;">
                <v-tabs vertical class="tab_setting" slider-color="grayBg" slider-size="7" :class="{ tab_product_service_hide: isHide, tab_product_service_show: !isHide}">
                    <span class="hideAbs">
                        <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
                        >mdi-chevron-left-circle
                        </v-icon>
                        <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
                        >mdi-chevron-right-circle
                        </v-icon>
                    </span>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('tasks_status') }}
                        </span>
                    </v-tab>
<!--                    <v-tab>-->
<!--                        <span class="hidden-sm-and-up">-->
<!--                            <v-icon left>mdi-pen</v-icon>-->
<!--                        </span>-->
<!--                        <span class="hidden-sm-and-down text-capitalize text-left">-->
<!--                            {{ $t('task_categories') }}-->
<!--                        </span>-->
<!--                    </v-tab>-->
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('task_types') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
                            {{ $t('task_sub_types') }}
                        </span>
                    </v-tab>

                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                               <TaskStatus/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
<!--                    <v-tab-item>-->
<!--                        <v-row>-->
<!--                            <v-col sm="12" cols="12" class="pl-6 pt-0">-->
<!--                                <TaskCategories/>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-tab-item>-->
                      <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                               <TaskTypes/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                                <TaskSubTypes/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
            
                </v-tabs>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Sales',
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
            TaskStatus: () => import('./TaskStatus'),
            TaskTypes: () => import('./TaskTypes'),
            TaskSubTypes: () => import('./TaskSubTypes'),
        },
    };
</script>
<style scoped>
    .arr_icon {
        color: #2CA01C;
    }
    .arr_icon1 {
        color: #4c9aff;
        color: #2CA01C;
    }
    .v-tab {
        justify-content: left;
        font-size: 16px;
    }

    .v-tab--active {
        background-color: rgb(255, 255, 255);
    }

    .tab_setting .v-tab--active {
        font-weight: 700;
        color: #000;
    }
    .theme--light.v-card > .v-card__text, .theme--light.v-card .v-card__subtitle {
        color: rgba(0, 0, 0, 1)  !important;
    }

    .v-tab--active {
        background-color: #ffffff !important;
        border-bottom: 4px solid #92d050;
        border-left: none;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }

</style>