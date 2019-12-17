$(document).ready(function() {

    let customers = [];

    $("#checkout").on('click', function(e) {
        if (!this.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
        }
  
        $(this).addClass('was-validated');
    });


    $("#checkout").on("submit", function(event) {

        event.preventDefault();

        let ordernumber = Math.floor(Math.random()*999999);
        customers.push(ordernumber);

        let epost = $("#epost").val();
        customers.push(epost);

        let phone = $("#phone").val();
        customers.push(phone);
        
        let name = $("#name").val();
        customers.push(name);

        let adress = $("#adress").val();
        customers.push(adress);

        let city = $("#city").val();
        customers.push(city);

        let zipcode = $("#zipcode").val();
        customers.push(zipcode);

        sessionStorage.setItem("customerList", JSON.stringify(customers));
    
        if($(this).hasClass("was-validated"))
            window.open("thankyou.html", "_self");
    });
    
    $("#input").keypress(function(event) {
        if (event.keyCode == 13) {
            window.open("search.html?search=" + $("#input").val());
            let searchString = $("#input").val()
            localStorage.setItem("search", JSON.stringify(searchString));
        }
    });
   
});