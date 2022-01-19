<template>
  <v-data-table
    :headers="headers"
    :items="reconcileRules"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
        <v-toolbar
            flat
        >
            <v-toolbar-title>Rules</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            
            <v-spacer></v-spacer>

            <!-- Form Dialog -->
            <v-dialog
            v-model="dialog"
            max-width="500px"
            >
                <!-- Create New Button -->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2 mx-2"
                        @click="refresh"
                    >
                        <v-icon color="white">mdi-reload</v-icon>
                    </v-btn>

                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        {{ $t("create_new") }}
                    </v-btn>
                </template>

                <!-- Form -->
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("rule") }}</v-card-title>
                        <v-icon  @click="close">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row class="pt-2">
                            <v-col sm="9" cols="12" class="py-0">
                                <label class="label">{{ $t("account") }}</label>
                                <div v-if="editedIndex === -1">
                                    <app-account-dropdownlist 
                                        :initAccount="editedItem.account" 
                                        @emitAccount="editedItem.account = $event" />
                                </div>
                                <div v-else>
                                    <v-text-field
                                        v-model="editedItem.account.name"
                                        readonly
                                        outlined
                                    ></v-text-field>
                                </div>
                            </v-col>
                            <v-col sm="3" cols="12" class="py-0">
                                <label class="label">{{
                                    $t("todo_every")
                                }}</label>
                                <v-select
                                    :type="text"
                                    :items="days"
                                    v-model="editedItem.dayOfTheMonth"
                                    outlined
                                ></v-select>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t("instruction") }}</label>
                                <v-textarea
                                    class=""
                                    outlined
                                    v-model="editedItem.note"
                                    no-resize
                                    height="110px"
                                    rows="3"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Delete Dialog -->
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>

        </v-toolbar>
    </template>

    <!-- Account Template -->
    <template v-slot:[`item.account`]="{ item }">
        {{ item.account.name }}
    </template>

    <!-- Edit & Delete -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    <!-- No Data -->
    <template slot="no-data">
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            :myLoading="true"
            type="loading"
        />
    </template>
  </v-data-table>
</template>

<script>
import {i18n} from '@/i18n';
import kendo from "@progress/kendo-ui";
import ReconcileRuleModel from "@/scripts/model/ReconcileRule";
// import AccountModel from "@/scripts/model/Account";
import store from "@/store";
import { mapState } from 'vuex';

const ReconcileRuleHandler = require("@/scripts/handler/accounting/reconcileRule");

export default {
    components: {
        "LoadingMe": () => import('@/components/Loading'),
        "app-account-dropdownlist": () => import('@/components/dropdownlist/Account'),
    },
    data: () => ({
        showLoading : false,
        dialog: false,
        dialogDelete: false,
        days : [],
        headers: [
            {
                text: 'Account',
                align: 'start',
                sortable: false,
                value: 'account',
            },
            { text: 'Todo Every', value: 'dayOfTheMonth' },
            { text: 'Instruction', value: 'note' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
		editedItem: new ReconcileRuleModel(),
		defaultItem: new ReconcileRuleModel(),
    }),
    methods: {
        async initialize () {
            this.showLoading = true;

            store.state.accounting.reconcileRuleLoaded = false;
            
            // Call List
            await this.$store.dispatch('accounting/getReconcileRules');

            /* Parse Day Of The Month to Integer */
            this.reconcileRules.forEach(value => {
                value.dayOfTheMonth = kendo.parseInt(value.dayOfTheMonth);
            });

            this.showLoading = false;
        },
        setDays () {
            if(this.days.length === 0){
                for (let i = 1; i <= 31; i++) {
                    this.days.push(i);
                }
            }
        },
        refresh(){
            this.initialize();
        },
        editItem (item) {
            this.editedIndex = this.reconcileRules.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            this.editedIndex = this.reconcileRules.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm () {
            this.showLoading = true;
            ReconcileRuleHandler.delete({
					data: this.editedItem
				})
                .then(()=>{
                    this.$snotify.success(i18n.t("delete_successful"));
                })
                .finally(()=>{
                    this.showLoading = false;
                });

            this.reconcileRules.splice(this.editedIndex, 1)
            this.closeDelete()
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        validateForm(){
            let valid = true;

            if(this.editedItem.account.uuid === ""){
                valid = false;

                this.$snotify.warning(i18n.t("account_is_required"));
            }

            return valid;
        },
        save () {
            if(this.validateForm()){
                this.showLoading = true;
                ReconcileRuleHandler.save(this.editedItem)
                    .then(()=>{
                        this.$snotify.success(i18n.t("save_successful"));
                    })
                    .finally(()=>{
                        this.showLoading = false;
                    });

                if (this.editedIndex > -1) {
                    Object.assign(this.reconcileRules[this.editedIndex], this.editedItem)
                } else {
                    this.reconcileRules.push(this.editedItem)
                }
                this.close()
            }
        },
    },
    computed: mapState({
        reconcileRules: state => state.accounting.reconcileRules
    }),
    created () {
      this.initialize();
      this.setDays();
    }
};
</script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
        border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
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

    .lightBlue {
        color: #68cbfb;
    }


</style>