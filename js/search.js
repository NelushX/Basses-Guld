$(document).ready(function() {

    if (localStorage.getItem("currentBasket")) {
    
        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));

        for (let i = 0; i < productInfo.length; i++) {
            
            //Setting modal-body div attributes
            let modalBody = $(".modal-body").addClass("container");
            let modalRow = $("<div>").attr("id", "basketObject").addClass("row align-items-center");
            let modalCol1 = $("<div>").addClass("col-5").attr("id", "imageCol");
            let modalCol2 = $("<div>").addClass("col-4").attr("id", "infoCol");
            let modalCol3 = $("<div>").addClass("col-3").attr("id", "qtyCol");
            modalRow.appendTo(modalBody);
            modalCol1.appendTo(modalRow);
            modalCol2.appendTo(modalRow);
            modalCol3.appendTo(modalRow);

            // Image
            let modalImg = $("<img>").attr("src", "../" + productInfo[i].image1).attr("class", "img-fluid");
            modalImg.appendTo(modalCol1);

            //productInfo
            $("<p>").html(productInfo[i].name).attr("id", "basketName").appendTo(modalCol2);

            $("<p>").html(productInfo[i].brand).attr("id", "basketBrand").appendTo(modalCol2);

            $("<p>").html("<b>" + productInfo[i].price + "kr" + "</b>").attr("id", "basketPrice").appendTo(modalCol2);

            $("<p>").html("&times;").attr("id", "basketRemove").appendTo(modalCol3);

            $("<p>").html("Antal: " + productInfo[i].quantity).attr("id", "basketQuantity").appendTo(modalCol3);

            $("<button>").html("-").addClass("btn btn-dark").attr("id", "basketDecrease").appendTo(modalCol3);

            $("<button>").html("+").addClass("btn btn-dark").attr("id", "basketIncrease").appendTo(modalCol3);

            let findTotalPrice = $("#modalTotalPrice");
            findTotalPrice.html("Totalbelopp: " + productInfo[i].price + "kr").attr("id", "modalTotalPriceH5").appendTo(findTotalPrice);
        }
    }

    
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

    $("#goToCheckout").on("click", function() {
        window.open("checkout.html","_self");
    });

});