sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fragment.controller.View12", {

        onInit: function () {
            var oData = {
                filters: {
                    department: "All",
                    status: "All",
                    month: "All",
                    salaryRange: "All",
                    search: ""
                },

                departments: [
                    { key: "All", text: "All" },
                    { key: "SAP", text: "SAP" },
                    { key: "UI5", text: "UI5" },
                    { key: "ABAP", text: "ABAP" },
                    { key: "Java", text: "Java" },
                    { key: "Testing", text: "Testing" },
                    { key: "HR", text: "HR" }
                ],

                statuses: [
                    { key: "All", text: "All" },
                    { key: "Approved", text: "Approved" },
                    { key: "Pending", text: "Pending" },
                    { key: "Rejected", text: "Rejected" }
                ],

                months: [
                    { key: "All", text: "All" },
                    { key: "Jan", text: "Jan" },
                    { key: "Feb", text: "Feb" },
                    { key: "Mar", text: "Mar" },
                    { key: "Apr", text: "Apr" },
                    { key: "May", text: "May" },
                    { key: "Jun", text: "Jun" }
                ],

                salaryRanges: [
                    { key: "All", text: "All" },
                    { key: "Below40", text: "Below 40000" },
                    { key: "Between40To50", text: "40000 - 50000" },
                    { key: "Above50", text: "Above 50000" }
                ],

                employees: [
                    { EmpId: "E001", Name: "Sravani", Department: "SAP", Designation: "SAP Trainee", Salary: 45000, LeaveStatus: "Approved", Month: "Jan", Experience: 1, Location: "Hyderabad" },
                    { EmpId: "E002", Name: "Meghana", Department: "UI5", Designation: "UI5 Developer", Salary: 52000, LeaveStatus: "Pending", Month: "Jan", Experience: 2, Location: "Bangalore" },
                    { EmpId: "E003", Name: "Rahul", Department: "ABAP", Designation: "ABAP Developer", Salary: 48000, LeaveStatus: "Rejected", Month: "Feb", Experience: 3, Location: "Chennai" },
                    { EmpId: "E004", Name: "Anil", Department: "Java", Designation: "Java Developer", Salary: 40000, LeaveStatus: "Approved", Month: "Feb", Experience: 2, Location: "Pune" },
                    { EmpId: "E005", Name: "Divya", Department: "Testing", Designation: "Tester", Salary: 35000, LeaveStatus: "Pending", Month: "Mar", Experience: 1, Location: "Hyderabad" },
                    { EmpId: "E006", Name: "Kiran", Department: "SAP", Designation: "SAP Consultant", Salary: 60000, LeaveStatus: "Approved", Month: "Mar", Experience: 4, Location: "Mumbai" },
                    { EmpId: "E007", Name: "Sunny", Department: "UI5", Designation: "Fiori Developer", Salary: 55000, LeaveStatus: "Approved", Month: "Apr", Experience: 3, Location: "Bangalore" },
                    { EmpId: "E008", Name: "Charan", Department: "ABAP", Designation: "OData Developer", Salary: 47000, LeaveStatus: "Rejected", Month: "Apr", Experience: 2, Location: "Hyderabad" },
                    { EmpId: "E009", Name: "Swamy", Department: "HR", Designation: "HR Executive", Salary: 30000, LeaveStatus: "Pending", Month: "May", Experience: 1, Location: "Vizag" },
                    { EmpId: "E010", Name: "Bing", Department: "Java", Designation: "Backend Developer", Salary: 42000, LeaveStatus: "Approved", Month: "May", Experience: 2, Location: "Chennai" },
                    { EmpId: "E011", Name: "Aditya", Department: "Testing", Designation: "QA Engineer", Salary: 38000, LeaveStatus: "Approved", Month: "Jun", Experience: 2, Location: "Pune" },
                    { EmpId: "E012", Name: "Henry", Department: "SAP", Designation: "SAP Lead", Salary: 62000, LeaveStatus: "Pending", Month: "Jun", Experience: 5, Location: "Mumbai" },
                    { EmpId: "E013", Name: "Priya", Department: "UI5", Designation: "UI5 Consultant", Salary: 58000, LeaveStatus: "Approved", Month: "Jan", Experience: 4, Location: "Hyderabad" },
                    { EmpId: "E014", Name: "Ravi", Department: "ABAP", Designation: "ABAP Consultant", Salary: 53000, LeaveStatus: "Pending", Month: "Feb", Experience: 3, Location: "Bangalore" },
                    { EmpId: "E015", Name: "Naveen", Department: "Java", Designation: "Senior Java Dev", Salary: 65000, LeaveStatus: "Rejected", Month: "Mar", Experience: 5, Location: "Chennai" },
                    { EmpId: "E016", Name: "Bhavani", Department: "Testing", Designation: "Automation Tester", Salary: 46000, LeaveStatus: "Approved", Month: "Apr", Experience: 3, Location: "Pune" },
                    { EmpId: "E017", Name: "Siva", Department: "SAP", Designation: "OData Developer", Salary: 50000, LeaveStatus: "Pending", Month: "May", Experience: 2, Location: "Hyderabad" },
                    { EmpId: "E018", Name: "Lakshmi", Department: "HR", Designation: "HR Manager", Salary: 70000, LeaveStatus: "Approved", Month: "Jun", Experience: 6, Location: "Bangalore" }
                ],

                filteredEmployees: [],
                deptChart: [],
                leaveChart: [],
                salaryChart: [],
                avgSalaryChart: [],
                joiningChart: [],
                salaryDistChart: [],

                kpi: {
                    totalEmployees: 0,
                    totalSalary: 0,
                    avgSalary: 0,
                    approvedLeaves: 0,
                    pendingLeaves: 0,
                    rejectedLeaves: 0
                }
            };

            this.getView().setModel(new JSONModel(oData), "dash");

            this._applyFilters();
            this._setChartProperties();
        },

        onFilterChange: function () {
            this._applyFilters();
        },

        onSearch: function (oEvent) {
            var sValue = oEvent.getParameter("newValue");
            var oModel = this.getView().getModel("dash");

            oModel.setProperty("/filters/search", sValue);
            this._applyFilters();
        },

        onClear: function () {
            var oModel = this.getView().getModel("dash");

            oModel.setProperty("/filters/department", "All");
            oModel.setProperty("/filters/status", "All");
            oModel.setProperty("/filters/month", "All");
            oModel.setProperty("/filters/salaryRange", "All");
            oModel.setProperty("/filters/search", "");

            this._applyFilters();
        },

        onSortSalary: function () {
            var oModel = this.getView().getModel("dash");
            var aEmployees = oModel.getProperty("/filteredEmployees");

            aEmployees.sort(function (a, b) {
                return b.Salary - a.Salary;
            });

            oModel.setProperty("/filteredEmployees", aEmployees);
        },

        _applyFilters: function () {
            var oModel = this.getView().getModel("dash");
            var aEmployees = oModel.getProperty("/employees");
            var oFilters = oModel.getProperty("/filters");

            var aFiltered = aEmployees.filter(function (emp) {
                var bDept = oFilters.department === "All" || emp.Department === oFilters.department;
                var bStatus = oFilters.status === "All" || emp.LeaveStatus === oFilters.status;
                var bMonth = oFilters.month === "All" || emp.Month === oFilters.month;

                var bSalary = true;

                if (oFilters.salaryRange === "Below40") {
                    bSalary = emp.Salary < 40000;
                } else if (oFilters.salaryRange === "Between40To50") {
                    bSalary = emp.Salary >= 40000 && emp.Salary <= 50000;
                } else if (oFilters.salaryRange === "Above50") {
                    bSalary = emp.Salary > 50000;
                }

                var bSearch = true;

                if (oFilters.search) {
                    bSearch = emp.Name.toLowerCase().includes(oFilters.search.toLowerCase());
                }

                return bDept && bStatus && bMonth && bSalary && bSearch;
            });

            oModel.setProperty("/filteredEmployees", aFiltered);
            oModel.setProperty("/deptChart", this._getDepartmentCount(aFiltered));
            oModel.setProperty("/leaveChart", this._getLeaveStatusCount(aFiltered));
            oModel.setProperty("/salaryChart", this._getMonthlySalary(aFiltered));
            oModel.setProperty("/avgSalaryChart", this._getAverageSalaryByDept(aFiltered));
            oModel.setProperty("/joiningChart", this._getJoiningCountByMonth(aFiltered));
            oModel.setProperty("/salaryDistChart", this._getSalaryDistribution(aFiltered));

            this._setKPI(aFiltered);
        },

        _getDepartmentCount: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                oResult[emp.Department] = (oResult[emp.Department] || 0) + 1;
            });

            return Object.keys(oResult).map(function (dept) {
                return {
                    Department: dept,
                    Count: oResult[dept]
                };
            });
        },

        _getLeaveStatusCount: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                oResult[emp.LeaveStatus] = (oResult[emp.LeaveStatus] || 0) + 1;
            });

            return Object.keys(oResult).map(function (status) {
                return {
                    Status: status,
                    Count: oResult[status]
                };
            });
        },

        _getMonthlySalary: function (aEmployees) {
            var oResult = {};
            var aMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

            aEmployees.forEach(function (emp) {
                oResult[emp.Month] = (oResult[emp.Month] || 0) + emp.Salary;
            });

            return aMonths.map(function (month) {
                return {
                    Month: month,
                    Salary: oResult[month] || 0
                };
            });
        },

        _getAverageSalaryByDept: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                if (!oResult[emp.Department]) {
                    oResult[emp.Department] = {
                        total: 0,
                        count: 0
                    };
                }

                oResult[emp.Department].total += emp.Salary;
                oResult[emp.Department].count++;
            });

            return Object.keys(oResult).map(function (dept) {
                return {
                    Department: dept,
                    AverageSalary: Math.round(oResult[dept].total / oResult[dept].count)
                };
            });
        },

        _getJoiningCountByMonth: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                oResult[emp.Month] = (oResult[emp.Month] || 0) + 1;
            });

            return Object.keys(oResult).map(function (month) {
                return {
                    Month: month,
                    Count: oResult[month]
                };
            });
        },

        _getSalaryDistribution: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                var sRange = "";

                if (emp.Salary < 40000) {
                    sRange = "Below 40000";
                } else if (emp.Salary <= 50000) {
                    sRange = "40000-50000";
                } else {
                    sRange = "Above 50000";
                }

                var sKey = emp.Department + "|" + sRange;

                if (!oResult[sKey]) {
                    oResult[sKey] = {
                        Department: emp.Department,
                        Range: sRange,
                        Count: 0
                    };
                }

                oResult[sKey].Count++;
            });

            return Object.keys(oResult).map(function (key) {
                return oResult[key];
            });
        },

        _setKPI: function (aEmployees) {
            var oModel = this.getView().getModel("dash");

            var iTotalEmployees = aEmployees.length;

            var iTotalSalary = aEmployees.reduce(function (sum, emp) {
                return sum + emp.Salary;
            }, 0);

            var iAvgSalary = iTotalEmployees === 0 ? 0 : Math.round(iTotalSalary / iTotalEmployees);

            var iApproved = aEmployees.filter(function (emp) {
                return emp.LeaveStatus === "Approved";
            }).length;

            var iPending = aEmployees.filter(function (emp) {
                return emp.LeaveStatus === "Pending";
            }).length;

            var iRejected = aEmployees.filter(function (emp) {
                return emp.LeaveStatus === "Rejected";
            }).length;

            oModel.setProperty("/kpi/totalEmployees", iTotalEmployees);
            oModel.setProperty("/kpi/totalSalary", iTotalSalary);
            oModel.setProperty("/kpi/avgSalary", iAvgSalary);
            oModel.setProperty("/kpi/approvedLeaves", iApproved);
            oModel.setProperty("/kpi/pendingLeaves", iPending);
            oModel.setProperty("/kpi/rejectedLeaves", iRejected);
        },

        _setChartProperties: function () {
            var aChartIds = [
                "idDeptChart",
                "idLeaveChart",
                "idSalaryChart",
                "idAvgSalaryChart",
                "idJoiningChart",
                "idDistributionChart"
            ];

            aChartIds.forEach(function (sId) {
                this.byId(sId).setVizProperties({
                    title: {
                        visible: false
                    },
                    plotArea: {
                        dataLabel: {
                            visible: true
                        }
                    },
                    legend: {
                        visible: true
                    }
                });
            }.bind(this));
        }

    });
});