<template>
    <v-row class="">
        <!-- not modal -->
        <v-col sm="12" cols="12" class="pt-0">
            <v-row align-content="stretch">
                <v-col style="min-height: 400px">
                    <label>ឈ្មោះមុខងារ | Function Name</label>
                    <v-list three-line class="list1">
                        <drop-list :items="items1" @reorder="$event.apply(items1)" @insert="insert1" mode="cut" style="min-height: 400px;">
                            <template v-slot:item="{item, reorder}">
                                <drag :key="item.title" :data="item" @cut="remove(items1, item)">
                                    <v-list-item style="background-color: #e0e0e0!important; min-height: 0"
                                                    :style="reorder ? {borderLeft: '2px solid #1976D2', marginLeft:'-2px'} : {}">
                                        <v-list-item-content>
                                            <v-list-item-title v-html="item.title"/>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider/>
                                </drag>
                            </template>
                            <template v-slot:inserting-drag-image="{data}">
                                <v-list-item-avatar style="transform:translate(-50%, -50%) scale(1.5)">
                                    <img :src="data.avatar">
                                </v-list-item-avatar>
                            </template>
                            <template v-slot:reordering-drag-image/>
                            <template v-slot:feedback="{data}">
                                <v-skeleton-loader
                                        type="list-item-avatar-three-line"
                                        :key="data.title"
                                        style="border-left: 2px solid #1976D2; margin-left: -2px;"
                                />
                            </template>
                        </drop-list>
                    </v-list>
                </v-col>
                <v-col style="background: #eee;min-height: 400px">
                    <label>បញ្ជាទិញ | Orders Flow</label>
                    <drop-list style="min-height: 400px;" class="list2" :items="items2" @reorder="$event.apply(items2)" @insert="insert2"
                                mode="cut">
                        <template v-slot:item="{item,reorder}">
                            <drag :key="item.title" class="chip" :data="item" @cut="remove(items2, item)">
                                <v-chip :color="reorder ? 'primary' : null" style="border-radius: 0!important;width:100%;">{{item.title}}</v-chip>
                            </drag>
                        </template>
                        <template v-slot:feedback="{data}">
                            <div class="chip" :key="data.title">
                                <v-chip color="primary" style="border-radius: 0!important;width:100%;">{{data.title}}</v-chip>
                            </div>
                        </template>
                        <template v-slot:inserting-drag-image="{data}">
                            <v-chip :key="data.title" style="transform: translate(-50%, -50%)">{{data.title}}
                            </v-chip>
                        </template>
                    </drop-list>
                    <p style="background: #ccc; width: 100%; margin: 0; padding: 10px;">Select Product</p>
                </v-col>
            </v-row>
            <v-divider/>
            <v-card outlined dense class="no_border function_footer">
                <v-btn color="primary" class="float-right white--text" @click="onSaveClose">
                    {{ $t('save') }}
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {Drag,DropList} from "vue-easy-dnd";
import generalSettingModel from "@/scripts/commerce/model/GeneralSetting"
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
export default {
    components: {
        Drag,
        DropList,
    },
    data: () => ({
        g: new generalSettingModel({}),
        items1: [
            {
                name: "pin",
                title: "PIN"
            },
            {
                name: "guestCount",
                title: "Guest Count"
            },
            {
                name: "loyalty",
                title: "Loyalty"
            },
            {
                name: "partner",
                title: "Partner"
            }
        ],
        items2: [
        ],
        showLoading: false,
        id: ""
    }),
    methods: {
        async onSaveClose() {
            window.console.log(this.items2, 'ittmememem')
            this.showLoading = true
            this.g.orderFlow = this.items2
            commerceHandler.settingCreate(new generalSettingModel(this.g)).then(response => {
                if (response.data.statusCode === 201) {
                    const res = response.data.data
                    this.g = res
                    this.$snotify.success('Update Successfully')
                    this.showLoading = false
                }
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                this.showLoading = false
            })
        },
        insert1(event) {
            this.items1.splice(event.index, 0, event.data);
        },
        insert2(event) {
            this.items2.splice(event.index, 0, event.data);
        },
        remove(array, value) {
            let index = array.indexOf(value);
            array.splice(index, 1);
        },
        async loadSaleFormContent() {
            this.showLoading = true
            commerceHandler.settingGet().then(res => {
                this.showLoading = false
                this.items2 = []
                if (res.data.statusCode === 200) {
                    const data = res.data.data
                    let d = data.filter((o) => {return o.type == 'retail'})
                    if (d.length > 0) {
                        this.g = d[0]
                        this.g.id = d[0].pk
                        if(this.g.orderFlow.length > 0){
                            this.items2 = this.g.orderFlow
                        }
                    }
                }
            })
        },
    }
    ,
    mounted: async function () {
        await this.loadSaleFormContent()
    }
}
;
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
    border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.drag-no-handle {
    background: #e0e0e0!important;
    margin-bottom: 5px;
}
.btn_save {
    color: #ffffff;
    text-transform: capitalize;
}

.w_100 {
    width: 100px !important;
}

.float-right {
    margin-top: 0px !important;
}

.float-left {
    margin-top: 0px !important;

}

.v-input--switch {
    margin-top: 0px;
    height: 30px;
}

.attachment_table .v-data-table__wrapper {
    border-bottom: none !important;
}


</style>