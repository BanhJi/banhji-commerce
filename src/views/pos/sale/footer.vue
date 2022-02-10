<v-col sm="12" col="12" class="pa-0 pl-3" style="align-items: flex-end;display: flex;">
    <v-row>
        <v-col sm="3" cols="12">
                <ParkSaleReport/>
        </v-col>
        <v-col sm="3" cols="12" class="">
            <v-card
                color="third"
                height="70"
                elevation="0"
                class="pa-4 rounded-0 d-flex justify-center align-center"
            >
                <h3 class="white--text text-uppercase">
                    {{ $t("invoice") }}
                </h3>
            </v-card>
        </v-col>
        <v-col sm="3" cols="12" class="">
            <v-card
                color="third"
                height="70"
                
                elevation="0"
                class="pa-4 rounded-0 d-flex justify-center align-center"
            >
                <h3 class="white--text text-uppercase">
                    {{ $t("delivery") }}
                </h3>
            </v-card>
        </v-col>
        <v-col sm="3" cols="12" class="">
            <v-card
                color="third"
                height="70"
                
                elevation="0"
                class="pa-4 rounded-0 d-flex justify-center align-center"
            >
                <h3 class="white--text text-uppercase">
                    {{ $t("orders") }}
                </h3>
            </v-card>
        </v-col>
    </v-row>
</v-col>