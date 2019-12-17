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


    // Keeping the varukorg
    $(document).ready(function() {

        var productInfo = JSON.parse(localStorage.getItem("currentBasket"))
        for (let i = 0; i < productInfo.length; i++) {
        
            //Setting modal-body div attributes
        let modalBody = $(".modal-body").addClass("container");
        let modalRow = $("<div>").addClass("row");
        let modalCol1 = $("<div>").addClass("col-6").attr("id", "imageCol");
        let modalCol2 = $("<div>").addClass("col-6").attr("id", "infoCol");
        modalRow.appendTo(modalBody)
        modalCol1.appendTo(modalRow);
        modalCol2.appendTo(modalRow);
    
    
        // Image
        let modalImg = $("<img>").attr("src", "../" + productInfo[i].image1).attr("class", "img-fluid");
        modalImg.appendTo(modalCol1);
    
        //productInfo
        let basketTitle = $("<p>").html(productInfo[i].name);
        basketTitle.appendTo(modalCol2);
    
        let basketBrand = $("<p>").html(productInfo[i].brand);
        basketBrand.appendTo(modalCol2);
    
        let basketArtnr = $("<p>").html("Artikelnummer: " + productInfo[i].artnr);
        basketArtnr.appendTo(modalCol2);
    
        let basketPrice = $("<p>").html("Pris: " + productInfo[i].price);
        basketPrice.appendTo(modalCol2);
    
        }});   