import kendo from '@progress/kendo-ui';
import store from '@/store';

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
        data: store.state.accounting.secondaryAccounts,
        group: group,
        filter: { field: "primary_account_uuid", operator: "eq", value: options.model.account.uuid }
    })
    let acc_language = store.state.accounting.accountLanguage === 'English' ? "name" :  "local_name";
    let acc_template = store.state.accounting.accountLanguage === 'English' ?"<span>#=number# #=name#</span>" :  "<span>#=number# #=local_name#</span>";

    // Definde dropdownlist
    let ddl = kendo.jQuery('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: true,
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: acc_language,
                dataValueField: "uuid",
                template: acc_template,
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");

    return ddl;
}