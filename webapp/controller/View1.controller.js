sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("fragment.controller.View1", {

        onInit: function () {
            var oData = {
                employees: [
                    { id: "1001", name: "Sravani", role: "UI5 Developer" },
                    { id: "1002", name: "Meghana", role: "SAP Consultant" },
                    { id: "1003", name: "Praveen", role: "Backend Developer" }
                ]
            };

            var oModel = new JSONModel(oData);

            this.getView().setModel(oModel, "empModel");
        },

        onOpenDialog: async function () {

            if (!this.oDialog) {

                this.oDialog = await Fragment.load({
                    id: this.getView().getId(),
                    name: "fragment.fragment.TableDialog",
                    controller: this
                });

                this.getView().addDependent(this.oDialog);
            }

            this.oDialog.open();
        },

        onCloseDialog: function () {
            this.oDialog.close();
        },

      onPress: function () {

        this.getOwnerComponent().getRouter().navTo("RouteView2");

}

    });
});