sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fragment.controller.View7", {

        onInit: function () {

            // Category Data
            var oData = {
                categories: [
                    { key: "1", name: "Responsive Controls", desc: "Responsive Controls are used for mobile UI." },
                    { key: "2", name: "Layout Controls", desc: "Layout Controls arrange UI structure." },
                    { key: "3", name: "Core & Base Controls", desc: "Basic controls like Button, Label." },
                    { key: "4", name: "Flexible Layout Controls", desc: "Dynamic layouts like FCL." },
                    { key: "5", name: "Charts & Visualization", desc: "Used for charts and graphs." }
                ]
            };

            // Set Category Model
            this.getView().setModel(new JSONModel(oData), "catModel");

            // UI Model
            this.getView().setModel(new JSONModel({
                description: ""
            }), "ui");
        },

        onGo: function () {

            var oCombo = this.byId("combo");

            //  IMPORTANT: use getSelectedItem() (more reliable)
            var oItem = oCombo.getSelectedItem();

            if (!oItem) {
                this.getView().getModel("ui")
                    .setProperty("/description", "Please select a category");
                return;
            }

            // Get full object directly from context
            var oContext = oItem.getBindingContext("catModel");
            var oData = oContext.getObject();

            // Set description
            this.getView().getModel("ui")
                .setProperty("/description", oData.desc);
        },

        onClear: function () {
            this.byId("combo").setSelectedKey("");
            this.getView().getModel("ui").setProperty("/description", "");
        }

    });
});