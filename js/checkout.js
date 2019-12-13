$(document).ready(function() {

    let customers = [];

    $("form").on("submit", function(event) {
        // $("main").addClass("d-none");
        // $("article").addClass("d-block");

        event.preventDefault();
        
        let ordernumber = Math.floor(Math.random()*999999);
        customers.push(ordernumber);

        let epost = $("#epost").val();
        customers.push(epost);
        // $("#epostInput").html(epost);

        let phone = $("#phone").val();
        customers.push(phone);
        // $("#phoneInput").html(phone);
        
        let name = $("#name").val();
        customers.push(name);
        // $("#nameInput").html(name);

        let adress = $("#adress").val();
        customers.push(adress);
        // $("#adressInput").html(adress);

        let city = $("#city").val();
        customers.push(city);
        // $("#cityInput").html(city);

        let zipcode = $("#zipcode").val();
        customers.push(zipcode);
        // $("#zipcodeInput").html(zipcode);

        sessionStorage.setItem("customerList", JSON.stringify(customers));
    
        if($(this).hasClass("was-validated"))
            window.open("thankyou.html", "_self");
    });
});