sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("fragment.controller.View2", {

        onInit: function () {
            var oData = {
                id: 1001,
                name: "Praveen Nalajala",
                active: true,
                rating: 4.7,
                age: 29,
                email: "praveen@example.com",
                createdAt: "2026-04-21T18:45:00Z",

                address: {
                    street: "MG Road",
                    city: "Hyderabad",
                    state: "Telangana",
                    country: "India",
                    postalCode: 500001
                },

                skills: [
                    {
                        skillName: "Java",
                        icon: "sap-icon://product",
                        avatarColor: "Accent2"
                    },
                    {
                        skillName: "Node.js",
                        icon: "sap-icon://source-code",
                        avatarColor: "Accent3"
                    },
                    {
                        skillName: "JavaScript",
                        icon: "sap-icon://document-text",
                        avatarColor: "Accent4"
                    },
                    {
                        skillName: "SAP CAPM",
                        icon: "sap-icon://sap-ui5",
                        avatarColor: "Accent6"
                    },
                    {
                        skillName: "UI5",
                        icon: "sap-icon://widget",
                        avatarColor: "Accent1"
                    }
                ],

                projects: [
                    {
                        projectId: "P100",
                        name: "SAP BTP Integration",
                        status: "Completed",
                        budget: 15000.50,
                        technologies: ["Java", "Spring Boot", "SAP BTP"],
                        team: {
                            lead: "Praveen",
                            members: 5
                        }
                    },
                    {
                        projectId: "P200",
                        name: "Order Management API",
                        status: "In Progress",
                        budget: 8200,
                        technologies: ["Node.js", "CAPM", "HANA", "JavaScript"],
                        team: {
                            lead: "Ahmed",
                            members: 3
                        }
                    }
                ]
            };

            this.getView().setModel(new JSONModel(oData), "empModel");

            this.getView().setModel(new JSONModel({
                edit: false,
                skillEdit: false
            }), "ui");
        },

        onMainToggle: function (oEvent) {
            var bState = oEvent.getParameter("state");
            this.getView().getModel("ui").setProperty("/edit", bState);
        },

        onSkillToggle: function (oEvent) {
            var bState = oEvent.getParameter("state");
            this.getView().getModel("ui").setProperty("/skillEdit", bState);
        },

        onOpenAddress: async function () {
            if (!this.oAddressDialog) {
                this.oAddressDialog = await Fragment.load({
                    id: this.getView().getId(),
                    name: "fragment.fragment.Address",
                    controller: this
                });
                this.getView().addDependent(this.oAddressDialog);
            }

            this.oAddressDialog.open();
        },

        onSkillPress: async function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var oSkillObject = oItem.getBindingContext("empModel").getObject();
            var sSkill = oSkillObject.skillName;

            var aProjects = this.getView().getModel("empModel").getProperty("/projects");

            var oMatchedProject = aProjects.find(function (oProject) {
                return oProject.technologies.some(function (sTech) {
                    var sTechLower = sTech.toLowerCase();
                    var sSkillLower = sSkill.toLowerCase();

                    return sTechLower === sSkillLower ||
                        sTechLower.includes(sSkillLower) ||
                        sSkillLower.includes(sTechLower);
                });
            });

            if (!oMatchedProject) {
                MessageToast.show("No related project found for selected skill");
                return;
            }

            var oProjectData = {
                projectId: oMatchedProject.projectId,
                name: oMatchedProject.name,
                status: oMatchedProject.status,
                budget: oMatchedProject.budget,
                technologyText: oMatchedProject.technologies.join(", "),
                lead: oMatchedProject.team.lead,
                members: oMatchedProject.team.members
            };

            this.getView().setModel(new JSONModel(oProjectData), "projectModel");

            if (!this.oProjectDialog) {
                this.oProjectDialog = await Fragment.load({
                    id: this.getView().getId(),
                    name: "fragment.fragment.Project",
                    controller: this
                });
                this.getView().addDependent(this.oProjectDialog);
            }

            this.oProjectDialog.open();
        },

        onClose: function (oEvent) {
            oEvent.getSource().getParent().close();
        }
    });
});