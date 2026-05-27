sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fragment.controller.View10", {
onLanguageChange: function (oEvent) {
      var lang = oEvent.getSource().getSelectedKey();
      sap.ui.getCore().getConfiguration().setLanguage(lang);
    }
 
  });
 
});