sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fragment.controller.View6", {
        //  onInit: function () {

        //     var oData = {
        //         name: "Sravani",
        //         department: "IT",
        //         location: "Hyderabad"
        //     };

//        onInit: function () {

//             var oData = {
//                 employees: [
//                     {
//                         id: "E001",
//                         name: "Sravani",
//                         department: "IT",
//                         location: "Hyderabad"
//                     },
//                     {
//                         id: "E002",
//                         name: "Meghana",
//                         department: "HR",
//                         location: "Vizag"
//                     },
//                     {
//                         id: "E003",
//                         name: "Karthik",
//                         department: "Finance",
//                         location: "Chennai"
//                     }
//                 ]
//             };

//             var oModel = new JSONModel(oData);
//             this.getView().setModel(oModel, "empModel");

//         },

//         onEmployeePress: function (oEvent) {

//             var oSelectedItem = oEvent.getParameter("listItem");

//             if (!oSelectedItem) {
//                 console.log("No row selected");
//                 return;
//             }

//             var oContext = oSelectedItem.getBindingContext("empModel");

//             if (!oContext) {
//                 console.log("No binding context found");
//                 return;
//             }

//             var sPath = oContext.getPath();

//             console.log("Selected Path:", sPath);

//             this.byId("employeeForm").bindElement({
//                 path: sPath,
//                 model: "empModel"
//             });
//         }

//     });
// });

 onInit: function () {

            var oData = {
                active: true,
                salary: 60000
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "empModel");
        }

    });
});