import kendo from "@progress/kendo-ui";
import UserModel from "@/scripts/model/User.js";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

let model = kendo.data.Model.define({
    id: "uuid", // the identifier of the model
    fields: {
        "number": { type: "string" },
        "name": { type: "string" },
        "bank_account_type_uuid": { type: "string" },
        "bank": { type: "object" },
        "currency": { type: "object" },
        "account": { type: "object" },
        "biller_id": { type: "string" },
        "merchant_id": { type: "string" },
        "is_payable": { type: "number" },
        "is_collectable": { type: "number" },
        "institute_id": { type: "string", defaultValue: instituteId },
        "is_connected": { type: "number" },
        "is_deleted": { type: "number" },

        "created_by": { type: "object", defaultValue: new UserModel() },
        "created_date": { type: "date" },
        "modified_by": { type: "object", defaultValue: new UserModel() },
        "modified_date": { type: "date" },
    }
});

export default model;

/*
    // How To Use:
    import Person from "@/scripts/model/Person.js";

    var person = new Person({
        name: "John Doe",
        age: 42
    });

    // The result can be observed in the DevTools(F12) console of the browser.
    console.log(person.get("name")); // outputs "John Doe"

    // The available dataType options are:
    "string"
    "number"
    "boolean"
    "date"
    "object"
    (Default) "default"

    // More Information:
    https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/define
*/