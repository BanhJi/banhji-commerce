<template>
	<v-row>
		<v-col sm="12" class="py-0" cols="12">
			<v-tabs>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-uppercase text-left">
						{{ $t("list") }}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-uppercase text-left">
						{{ $t("nature") }}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-uppercase text-left">
						{{ $t("type") }}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-uppercase text-left">
						{{ $t("group") }}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-uppercase text-left">
						{{ $t("sub_group") }}
					</span>
				</v-tab>
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-uppercase text-left">
						{{ $t("transaction") }}
					</span>
				</v-tab>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0 pr-0">
							<Class/>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0 pr-0">
							<Nature/>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0 pr-0">
							<Type/>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0 pr-0">
							<Group/>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0 pr-0">
							<SubGroup/>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0 pr-0">
							<Transactions/>
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</v-col>
	</v-row>
</template>

<script>
export default {
  name: "ClassTabs",
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    Class: ()=> import("./Class"),
    Transactions: ()=> import("./Transactions"),
	Nature: ()=> import("./Nature"),
	Type: ()=> import("./Type"),
	Group: ()=> import("./Group"),
	SubGroup: ()=> import("./SubGroup")
  },
};
</script>
<style scoped>
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 17px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.menuable__content__active {
  left: 448px !important;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
