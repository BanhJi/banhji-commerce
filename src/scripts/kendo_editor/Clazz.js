import kendo from '@progress/kendo-ui';
import store from '@/store';

const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.setting.class_get + "?type=class_item&clazzId=&classTypeId=&classGroupId=";

// Get local data
function getLocalData(code) {
    let localDS = new kendo.data.DataSource({
        data: store.state.classes.list.filter(value => value.clazz.code.toLowerCase() === code)
    })

    return localDS;
}

// Definde dropdownlist
function setDropDownList (container, options) {
    return kendo.jQuery('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "name",
                dataValueField: "id",
                optionLabel: "--- Select ---",
                dataSource: []
            }).data("kendoDropDownList");
}

// Initial Editors
let editors = [];

editors.class1 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(!store.state.classes.isLoaded){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlPath,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "id"
                },
                data: function (response) {
                    /* Add to store */
                    store.dispatch('classes/addList', response.data);
                    
                    return response.data.filter(value => value.clazz.code.toLowerCase() === 'c1');
                },
            },
        })
        
        ddl.setDataSource(remoteDS);
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("c1"));
    }

    return ddl;
};

editors.class2 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.state.classes.list.length === 0){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlPath,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "uuid"
                },
                data: function (response) {
                    /* Add to store */
                    store.dispatch('classes/addList', response.data);
                    
                    return response.data.filter(value => value.clazz.code.toLowerCase() === 'c2');
                },
            },
        })
        
        ddl.setDataSource(remoteDS);
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("c2"));
    }

    return ddl;
};

editors.class3 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.state.classes.list.length === 0){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlPath,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "uuid"
                },
                data: function (response) {
                    /* Add to store */
                    store.dispatch('classes/addList', response.data);
                    
                    return response.data.filter(value => value.clazz.code.toLowerCase() === 'c3');
                },
            },
        })
        
        ddl.setDataSource(remoteDS);
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("c3"));
    }

    return ddl;
};

editors.class4 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.state.classes.list.length === 0){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlPath,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "uuid"
                },
                data: function (response) {
                    /* Add to store */
                    store.dispatch('classes/addList', response.data);
                    
                    return response.data.filter(value => value.clazz.code.toLowerCase() === 'c4');
                },
            },
        })
        
        ddl.setDataSource(remoteDS);
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("c4"));
    }

    return ddl;
};

editors.class5 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.state.classes.list.length === 0){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlPath,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "uuid"
                },
                data: function (response) {
                    /* Add to store */
                    store.dispatch('classes/addList', response.data);
                    
                    return response.data.filter(value => value.clazz.code.toLowerCase() === 'c5');
                },
            },
        })
        
        ddl.setDataSource(remoteDS);
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("c5"));
    }

    return ddl;
};

export default editors