$(document).ready(function() {

    $(function(){
        onPageLoad();
    });
    
    
        if (localStorage.getItem("currentBasket")) {
            
            function onPageLoad() {
    
                $(".modal-body").html('');
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
    
                countQuantity();
    
        
                for (let i = 0; i < productInfo.length; i++) {
                    let modalBody = $(".modal-body").addClass("container");
                    let modalRow = $("<div>").attr("id", "basketObject").addClass("row align-items-center");
                    let modalCol1 = $("<div>").addClass("col-5").attr("id", "imageCol");
                    let modalCol2 = $("<div>").addClass("col-4").attr("id", "infoCol");
                    let modalCol3 = $("<div>").addClass("col-3").attr("id", "qtyCol");
                    modalRow.appendTo(modalBody);
                    modalCol1.appendTo(modalRow);
                    modalCol2.appendTo(modalRow);
                    modalCol3.appendTo(modalRow);
                    
                    $("<img>").addClass("img-fluid").attr("src", "../" + productInfo[i].image1).appendTo(modalCol1);
                    $("<p>").html(productInfo[i].name).attr("id", "basketName").appendTo(modalCol2);
                    $("<p>").html(productInfo[i].brand).attr("id", "basketBrand").appendTo(modalCol2);
                    $("<p>").html("<b>" + productInfo[i].price + "kr" + "</b>").attr("id", "basketPrice").appendTo(modalCol2);
                    $("<p>").html("&times;").attr("id", "basketRemove").appendTo(modalCol3).on("click", function(){
                        removeItem(i)
                    });
                    $("<p>").html("Antal: " + productInfo[i].quantity).attr("id", "basketQuantity").appendTo(modalCol3);
                    $("<button>").html("-").addClass("btn btn-dark").attr("id", "basketDecrease").appendTo(modalCol3).on("click", function () {
                        basketDecreasing(i);
                    })
                    $("<button>").html("+").addClass("btn btn-dark").attr("id", "basketIncrease").appendTo(modalCol3).on("click", function () {
                        basketIncreasing(i);
                    })
                    
                    
        
                    getTotalPrice();
                }
        
            }
            //DECREASE QUANTITY OF ITEM
            function basketDecreasing(i) {
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
                // countQuantityDeacrease();
        
                if (productInfo[i].quantity <= 1) {
                    let a = productInfo;
                    a.splice(i, 1);
                    localStorage.setItem("currentBasket", JSON.stringify(productInfo));
                }
                else {
                    productInfo[i].quantity--;
                    localStorage.setItem("currentBasket", JSON.stringify(productInfo));
                }
        
                onPageLoad();
                getTotalPrice();
            }
            
            //INCREASE QUANTITY OF ITEM
            function basketIncreasing(i) {
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
        
                productInfo[i].quantity++;
                localStorage.setItem("currentBasket", JSON.stringify(productInfo));
    
                onPageLoad();
                getTotalPrice();
        
            }
            //REMOVING ITEM FROM ARRAY FIXME:
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
                        $("#shoppingModal .close").click()
                    }
        
                onPageLoad();
                getTotalPrice();
        
            }
            // GETTING THE FULL PRICE OF ALL ITEMS
            function getTotalPrice(i){
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
            
                
                let totalPrices = 0;
                $(productInfo).each(function(i){
                    totalPrices += productInfo[i].price * productInfo[i].quantity;});    
        
                $("#modalTotalPrice").html("Totalbelopp: " + totalPrices + "kr");
        
            }
            // ADDING QUANTITY
            function countQuantity(i){
                let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
                let totalQuantity = 0;
                $(productInfo).each(function(i){
                totalQuantity += productInfo[i].quantity;
               
                }); 
                $("#number").html(totalQuantity);
                
            }
            // SUBTRACTING QUANTITY
        
            
            $("#goToCheckout").on("click", function() {
                window.open("checkout.html", "_self");
            });
    
    };
    

    let productPage = JSON.parse(localStorage.getItem("prodList"));
    let searchitem = JSON.parse(localStorage.getItem("search"));
    $("#searchstring").html(searchitem);
    
    $("#productlist").empty();
    productPage.forEach(function(searchProduct) {
        if(searchProduct.brand.indexOf(searchitem) >= 0 || searchProduct.price.toString().indexOf(searchitem) >= 0) {
            let productContainer = $("<div>").addClass("productContainer prodlink col-6 col-lg-3").attr("id", searchProduct.artnr).appendTo($("#productlist"));
            let imageContainer = $("<div>").addClass("imageContainer").appendTo(productContainer);
            let image = $("<img>").attr("src", "../" + searchProduct.image1).attr("alt", searchitem.name)
                .mouseover(function() {
                    image.attr("src", "../" + searchProduct.image2);
                })
                .mouseout(function() {
                    image.attr("src", "../" + searchProduct.image1);
                })
                .appendTo(imageContainer); 

            let infoContainer = $("<div>").addClass("infoContainer mt-3").appendTo(productContainer);
            let brand = $("<p>").html("<b>" + searchProduct.brand + "</b>").addClass("pBrand").appendTo(infoContainer);
            let name = $("<p>").html(searchProduct.name).addClass("pName").appendTo(infoContainer);
            let price = $("<p>").html("<b>" + searchProduct.price + " kr" + "</b>").addClass("pPrice").appendTo(infoContainer);
            
            $(".prodlink").on("click", function() {
                window.open("product.html?id=" + $(this).attr("id"), "_self");
            });
        }
    });
   
    $("#input").on("keyup", function() {
        $("#productlist").empty();
    
        let search = $("#input").val();
        $("#searchstring").html(search);
        
        productPage.forEach(function(value) {
            if(value.brand.indexOf(search) >= 0 || value.price.toString().indexOf(search) >= 0) {
                let productContainer = $("<div>").addClass("productContainer prodlink col-6 col-lg-3").attr("id", value.artnr).appendTo($("#productlist"));
                let imageContainer = $("<div>").addClass("imageContainer").appendTo(productContainer);
                let image = $("<img>").attr("src", "../" + value.image1).attr("alt", value.name)
                    .mouseover(function() {
                        image.attr("src", "../" + value.image2);
                    })
                    .mouseout(function() {
                        image.attr("src", "../" + value.image1);
                    })
                    .appendTo(imageContainer);

                let infoContainer = $("<div>").addClass("infoContainer mt-3").appendTo(productContainer);
                let brand = $("<p>").html("<b>" + value.brand + "</b>").addClass("pBrand").appendTo(infoContainer);
                let name = $("<p>").html(value.name).addClass("pName").appendTo(infoContainer);
                let price = $("<p>").html("<b>" + value.price + " kr" + "</b>").addClass("pPrice").appendTo(infoContainer);
               
                $(".prodlink").on("click", function() {
                    window.open("product.html?id=" + $(this).attr("id"), "_self");
                });
            }  
        });
    });

    // let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
    // for (let i = 0; i < productInfo.length; i++) {
    //     let number = $("#number");
    //     number.html(productInfo[i].quantity);
    //     number.addClass("number");
    // }

    let quantitynumber = JSON.parse(localStorage.getItem("currentBasket"));
    
    // Do not open shoppingcart if no content
    $("#openModal").on("click", function(){
        if (quantitynumber.length == 0) {
            $("#openModal").removeAttr("data-toggle");
        }
    });

    $("#goToCheckout").on("click", function() {
        window.open("checkout.html", "_self");
    });
    
});