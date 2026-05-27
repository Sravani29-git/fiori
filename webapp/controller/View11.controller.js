sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("fragment.controller.View11", {

        onInit: function () {

        },

        onOrderNow: function () {

            MessageToast.show("Order Now clicked");

        }

    });
});