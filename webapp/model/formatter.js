sap.ui.define([], function () {
    "use strict";

    return {

        getFullName: function (firstName, lastName) {
            if (!firstName || !lastName) {
                return "";
            }
            return firstName + " " + lastName;
        },

        formatSalary: function (salary) {
            if (!salary) {
                return "";
            }
            return "₹ " + salary + " per month";
        },

        formatRating: function (rating) {
            if (rating >= 4.5) {
                return "Excellent";
            } else if (rating >= 3) {
                return "Good";
            } else {
                return "Average";
            }
        },

        formatStatus: function (isActive) {
            return isActive ? "Active" : "Inactive";
        }

    };
});