/*
 * Last modified : 3/25/21, 11:11 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
export default {
    name: 'Input_return',

    components: {},

    mixins: [],

    props: ['oneReturn'],

    data () {
        return {
            menuJDate: false,
            txn_date: new Date().toISOString().substr(0, 10),
            dataFormList: [],
        }
    },

    computed: {
        dataForm: {
            set(oneReturn) {
                this.oneReturn.dataForm = oneReturn
            },
            get() {
                if (this.oneReturn) {
                    window.console.log('result',this.oneReturn)
                    if (this.oneReturn.hasOwnProperty('dataForm')) {
                        return this.oneReturn.dataForm
                    } else {
                        return {}
                    }
                } else {
                    return {code: 0}
                }
            }
        },
        code: {
            get() {
                if (this.oneReturn) {
                    if (this.oneReturn.hasOwnProperty('dataForm')) {
                        if (this.oneReturn.dataForm.hasOwnProperty('code')) {
                            return this.oneReturn.dataForm.code
                        } else {
                            return 0
                        }
                    } else {
                        return {}
                    }
                } else {
                    return 0
                }
            },
            set(oneReturn) {
                this.oneReturn.dataForm.code = oneReturn
            }
        },
        isEnable() {
            if (this.oneReturn.hasOwnProperty('status')) {
                if (this.oneReturn.status.code === 1) {
                    if (this.$route.query.type === 'edit') {
                        return true
                    } else if (this.$route.query.type === 'view') {
                        return false
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        isDisabled() {
            if (this.oneReturn.hasOwnProperty('status')) {
                if (this.oneReturn.status.code === 1) {
                    if (this.$route.query.type === 'edit') {
                        return false
                    } else if (this.$route.query.type === 'view') {
                        return true
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            } else {
                return true
            }
        }
    },

    watch: {},

    created () {},

    methods: {
        linkRouteImportData() {
            this.$router.push({
                path: 'import_data' + `/${this.oneReturn.id}`,
                name: 'Import Data',
                params: {id: this.oneReturn.id, oneReturn: this.oneReturn},
                query: {type: this.$route.query.type}
            })
        },
        linkRouteLinkImport() {
            this.$router.push({
                path: 'link_data' + `/${this.oneReturn.id}`,
                name: 'Link Data',
                params: {id: this.oneReturn.id, oneReturn: this.oneReturn},
                query: {type: this.$route.query.type}
            })
        },
        onLoadDataSource() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // axios.get(apiUrl.data_source_get).then(res => {
                    //     let data = res.data.data
                    //     this.dataFormList = data.filter(i => i.code !== 4)
                    // })
                })
            })
        },
        onUpdate(data) {
            this.$emit('onUpdate', data ? data : {})
            window.console.log('test123', this.oneReturn)
        },
        selectDataForm() {
            window.console.log(this.oneReturn)
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // let data = {
                    //     id: this.oneReturn.id,
                    //     dataForm: this.dataForm,
                    //     monthOf: this.oneReturn.monthOf,
                    //     submissionId: this.oneReturn.submissionId,
                    //     exChangeRate: this.oneReturn.exChangeRate,
                    //     amountPaid: this.oneReturn.amountPaid,
                    //     editDate: this.oneReturn.editDate,
                    //     status: this.oneReturn.status
                    // }
                    // this.onUpdate(data)
                    // axios.post(apiUrl.return_post, data).then(response => {
                    //     this.oneReturn = response.data.data[0]
                        // window.console.log(response.data.data)
                    // }).catch(e => {
                    //     this.errors.push(e)
                    // })
                }, 300);
            })
        }
    }
}
