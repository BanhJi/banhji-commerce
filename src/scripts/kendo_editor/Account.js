import kendo from '@progress/kendo-ui';
import store from '@/store';

const apiUrl = require('@/apiUrl.js');

export default (container, options) => {
    // Defind ordering by number
    let compare = function(a, b) {
        if (a.items[0].number === b.items[0].number) {
            return 0;
        } else if (a.items[0].number > b.items[0].number) {
            return 1;
        } else {
            return -1;
        }
    };

    // Defind default group
    let group = { 
        field: store.state.accounting.accountLanguage === 'English' ? "account_type.name" :  "account_type.local_name",
        compare: compare
    };

    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.state.accounting.accounts,
        group: group,
    })
    let acc_language = store.state.accounting.accountLanguage === 'English' ? "name" :  "local_name";
    let acc_template = store.state.accounting.accountLanguage === 'English' ?"<span>#=number# #=name#</span>" :  "<span>#=number# #=local_name#</span>";

    // Definde dropdownlist
    let ddl = kendo.jQuery('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: true,
                autoWidth: true,
                height: 400,
                filter:"contains",
                filtering: function(e) {
                    var filter = e.filter;
                    
                    var newFilter = {
                        logic: "or",
                        filters: [
                            { field: "number", operator: "contains", value: filter.value },
                            { field: "name", operator: "contains", value: filter.value },
                        ]
                    };
                    this.dataSource.filter(newFilter);

                    // Important: stop default filter
                    e.preventDefault();
                },
                dataTextField: acc_language,
                template: acc_template ,
                dataValueField: "uuid",
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");

    // Use remote data
    if(!store.state.accounting.accountLoaded){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: apiUrl.accounts,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "uuid"
                },
                data: (response) => {
                    /* Add to store */
                    store.dispatch('accounting/putAccounts', response);
                    
                    return response;
                },
            },
            group: group
        })

        ddl.setDataSource(remoteDS);
    }
    
    return ddl;
}