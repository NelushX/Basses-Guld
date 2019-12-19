$(document).ready(function() {

    if (localStorage.getItem("currentBasket")) {

        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));

        for (let i = 0; i < productInfo.length; i++) {
            //Setting modal-body div attributes
            let findRow = $("#productcart");
            let findCol1 = $("<div>").addClass("col-5").attr("id", "imageColumn");
            let findCol2 = $("<div>").addClass("col-4").attr("id", "infoColumn").addClass("align-middle");
            let findCol3 = $("<div>").addClass("col-3").attr("id", "qtyColumn");
            findCol1.appendTo(findRow);
            findCol2.appendTo(findRow);
            findCol3.appendTo(findRow);

            // Image
            let findImg = $("<img>").attr("src", "../" + productInfo[i].image1).attr("class", "img-fluid");
            findImg.appendTo(findCol1);

            //productInfo
            $("<p>").html(productInfo[i].name).attr("id", "basketName").appendTo(findCol2);

            $("<p>").html(productInfo[i].brand).attr("id", "basketBrand").appendTo(findCol2);

            $("<p>").html("<b>" + productInfo[i].price + "kr" + "</b>").attr("id", "basketPrice").appendTo(findCol2);

            $("<p>").html("&times;").attr("id", "basketRemove").appendTo(findCol3);

            $("<p>").html("Antal: " + productInfo[i].quantity).attr("id", "basketQuantity").appendTo(findCol3);

            $("<button>").html("-").addClass("btn btn-dark").attr("id", "basketDecrease").appendTo(findCol3);

            $("<button>").html("+").addClass("btn btn-dark").attr("id", "basketIncrease").appendTo(findCol3);

            let findTotalPrice = $("#modalTotalPrice");
            findTotalPrice.html("Totalbelopp: " + productInfo[i].price + "kr").attr("id", "modalTotalPriceH5").appendTo(findTotalPrice);
            console.log(productInfo);
        }

    }

    else {

    }


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