$(document).ready(function() {
    let customer = JSON.parse(sessionStorage.getItem("customerList"));

    $("#ordernumber").html(customer[0]);
    $("#epostThankYou").html(customer[1]);
    $("#phoneThankYou").html(customer[2]);
    $("#nameThankYou").html(customer[3]);
    $("#adressThankYou").html(customer[4]);
    $("#cityThankYou").html(customer[5]);
    $("#zipcodeThankYou").html(customer[6]);
});