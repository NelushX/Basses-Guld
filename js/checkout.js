$(document).ready(function() {


    $(function(){
        onPageLoad();
    });
    
    
        if (localStorage.getItem("currentBasket")) {
            
            function onPageLoad() {
                $("#productcart").html("");
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
        
                for (let i = 0; i < productInfo.length; i++) {
                    let findRow = $("#productcart");
                    let findCol1 = $("<div>").addClass("col-5").attr("id", "imageCol");
                    let findCol2 = $("<div>").addClass("col-4").attr("id", "infoCol");
                    let findCol3 = $("<div>").addClass("col-3").attr("id", "qtyCol");
                    findCol1.appendTo(findRow);
                    findCol2.appendTo(findRow);
                    findCol3.appendTo(findRow);
                    
                    $("<img>").addClass("img-fluid").attr("src", "../" + productInfo[i].image1).appendTo(findCol1);
                    $("<p>").html(productInfo[i].name).attr("id", "basketName").appendTo(findCol2);
                    $("<p>").html(productInfo[i].brand).attr("id", "basketBrand").appendTo(findCol2);
                    $("<p>").html("<b>" + productInfo[i].price + "kr" + "</b>").attr("id", "basketPrice").appendTo(findCol2);
                    $("<p>").html("&times;").attr("id", "basketRemove").appendTo(findCol3).on("click", function() {
                        removeItem(i);
                    });
                    $("<p>").html("Antal: " + productInfo[i].quantity).attr("id", "basketQuantity").appendTo(findCol3);
                    $("<button>").html("-").addClass("btn btn-dark").attr("id", "basketDecrease").appendTo(findCol3).on("click", function () {
                        basketDecreasing(i);
                    });
                    $("<button>").html("+").addClass("btn btn-dark").attr("id", "basketIncrease").appendTo(findCol3).on("click", function () {
                        basketIncreasing(i);
                    });
                    
        
                    getTotalPrice();
                }
        
            }
        

            function basketDecreasing(i) {
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
        
                if (productInfo[i].quantity <= 1) {
                    let removed = productInfo;
                    removed.splice(i, 1);
                    localStorage.setItem("currentBasket", JSON.stringify(productInfo));
                }
                else {
                    productInfo[i].quantity--;
                    localStorage.setItem("currentBasket", JSON.stringify(productInfo));
                }

                let totalQuantity = 0;
                $(productInfo).each(function(i){
                    totalQuantity += productInfo[i].quantity;
                }); 
    
                if (totalQuantity == 0) {
                    $("main").html("");
                    $("<p>").html("Din varukorg är tom.").appendTo($("#checkoutEmpty")).addClass("checkouttext");
                    $("<a>").attr("href", "../index.html").html("Gå tillbaka till startsidan!").appendTo($("#checkoutEmpty")).addClass("checkouttext");
                }
        
                onPageLoad();
                getTotalPrice();
            }
            
        
            function basketIncreasing(i) {
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
        
                productInfo[i].quantity++;
                localStorage.setItem("currentBasket", JSON.stringify(productInfo));
        
                onPageLoad();
                getTotalPrice();
            }


            function removeItem(i) {
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
        
                    let removed = productInfo;
                    removed.splice(i, 1);
                    localStorage.setItem("currentBasket", JSON.stringify(productInfo));

                    let totalQuantity = 0;
                    $(productInfo).each(function(i){
                        totalQuantity += productInfo[i].quantity;
                   
                    }); 
        
                    if (totalQuantity == 0) {
                        $("main").html("");
                        $("<p>").html("Din varukorg är tom.").appendTo($("#checkoutEmpty")).addClass("checkouttext");
                        $("<a>").attr("href", "../index.html").html("Gå tillbaka till startsidan!").appendTo($("#checkoutEmpty")).addClass("checkouttext");
                    }
        
                onPageLoad();
                getTotalPrice();
            }

        
            function getTotalPrice(i){
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
            
                
                let totalPrices = 0;
                $(productInfo).each(function(i){
                    totalPrices += productInfo[i].price * productInfo[i].quantity;
                });    
            
                $("#totalSum1").html("Totalbelopp: " + totalPrices + "kr");
                $("#totalSum2").html("Totalbelopp: " + totalPrices + "kr");
                $("#totalSum3").html("Totalbelopp: " + totalPrices + "kr");
            }
        
            $("#goToCheckout").on("click", function() {
                window.open("checkout.html", "_self");
            });

    };

    
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
            localStorage.removeItem("currentBasket");
    });
    

    $("#input").keypress(function(event) {
        if (event.keyCode == 13) {
            window.open("search.html?search=" + $("#input").val());
            let searchString = $("#input").val()
            localStorage.setItem("search", JSON.stringify(searchString));
        }
    });
   
});