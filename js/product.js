$(document).ready(function() {
    countQuantity ();
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let productId = parseInt(getParameterByName("id")); // parseInt gör om string till nummer, så att den ska matcha productPage[i].artnr
    
    let productPage = JSON.parse(localStorage.getItem("prodList"));
    let thisObject;

    for (let i = 0; i < productPage.length; i++) {
        if (productPage[i].artnr === productId) {
            let productLeftContainer = $("<div>").addClass("productleftcontainer").appendTo($("#productpageLeft"));
            let productPageImageContainer = $("<div>").addClass("productpageimagecontainer").appendTo(productLeftContainer);
            let productImage = $("<img>").attr("src", "../" + productPage[i].image1).attr("alt", productPage.name).attr("id", "largeImage").appendTo(productPageImageContainer);
            let productPageThumbnailContainer = $("<div>").addClass("productpagethumbnailcontainer").appendTo(productLeftContainer);
            let productThumbnail1 = $("<img>").addClass("thumbnail").attr("src", "../" + productPage[i].image2).attr("alt", productPage[i].name).appendTo(productPageThumbnailContainer);
            let productThumbnail2 = $("<img>").addClass("thumbnail").attr("src", "../" + productPage[i].image3).attr("alt", productPage[i].name).appendTo(productPageThumbnailContainer);
            let productThumbnail3 = $("<img>").addClass("thumbnail").attr("src", "../" + productPage[i].image4).attr("alt", productPage[i].name).appendTo(productPageThumbnailContainer);

            let productRightContainer = $("<div>").addClass("productrightcontainer").appendTo($("#productpageRight"));
            let productTitle = $("<h3>").html("<b>" + productPage[i].name + "</b>").attr("id", "productTitle").appendTo(productRightContainer);
            let productBrand = $("<p>").html(productPage[i].brand).attr("id", "productBrand").appendTo(productRightContainer);
            let productPrice = $("<p>").html("<b><i>" + productPage[i].price + ":-" + "</b></i>").attr("id", "productPrice").appendTo(productRightContainer);
            let productDescription = $("<p>").html(productPage[i].description).appendTo(productRightContainer);
            let productStock = $("<p>").html(productPage[i].stock).attr("id", "productStock").appendTo(productRightContainer);

            let addToBasketButton = $("<button>").attr({
                type: "button",
                id: "addToBasket",
                class: "btn-lg btn-dark",
            }).html("Lägg i varukorg &nbsp;").appendTo(productRightContainer);
            $("<span>").html("<i class='fas fa-shopping-basket'</i>").appendTo(addToBasketButton);

            let productArtnr = $("<p>").html("Artikelnummer: " + productPage[i].artnr).attr("id", "productArtnr").appendTo(productRightContainer);
            thisObject = productPage[i];
            thisObject.quantity = 1;
        }
    }

    // Loop for lookalike
    for (let i = 0; i < 4; i++) {
        let productContainer = $("<div>").addClass("productContainer lookalike col-6 col-lg-3").attr("id", productPage[i].artnr).appendTo($("#lookalike"));

        let imageContainer = $("<div>").addClass("imageContainer").appendTo(productContainer);
        let image = $("<img>").attr("src", "../" + productPage[i].image1).attr("alt", productPage[i].name)
            .mouseover(function() {
                image.attr("src", "../" + productPage[i].image2);
            })
            .mouseout(function() {
                image.attr("src", "../" + productPage[i].image1);
            })
            .appendTo(imageContainer);  

        let infoContainer = $("<div>").addClass("infoContainer mt-3").appendTo(productContainer);
        let brand = $("<p>").html("<b>" + productPage[i].brand + "</b>").addClass("pBrand").appendTo(infoContainer);
        let name = $("<p>").html(productPage[i].name).addClass("pName").appendTo(infoContainer);
        let price = $("<p>").html("<b>" + productPage[i].price + " kr" + "</b>").addClass("pPrice").appendTo(infoContainer);
    }

    $(".lookalike").on("click", function() {
        window.open("product.html?id=" + $(this).attr("id"), "_self");
    });

    $("#input").keypress(function(event) {
        if (event.keyCode == 13) {
            window.open("search.html?search=" + $("#input").val());
            let searchString = $("#input").val()
            localStorage.setItem("search", JSON.stringify(searchString));
        }
    });

    $(".thumbnail").on("click", function() {
        let lg = $("#largeImage").attr("src");

        $("#largeImage").attr("src", $(this).attr("src"));
        $(this).attr("src", lg);
    });

    $("#addToBasket").on("click", function() {
        let setNewBasket = [];

        if (localStorage.getItem("currentBasket")) {
            let getCurrentBasket = JSON.parse(localStorage.getItem("currentBasket")) || [];

            for (let i = 0; i < getCurrentBasket.length; i++) {
                setNewBasket.push(getCurrentBasket[i]);
            }

            let alreadyInCart = false;
            for (let i = 0; i < setNewBasket.length; i++) {
                if (setNewBasket[i].artnr === thisObject.artnr) {
                    alreadyInCart = true;
                    setNewBasket[i].quantity++; 
                }
            }

            if (!alreadyInCart) {
                setNewBasket.push(thisObject);
            }
        }
        else{
            setNewBasket.push(thisObject);
        }


        localStorage.setItem("currentBasket", JSON.stringify(setNewBasket));
        createModalHtml();
        getTotalPrice();
    });


    function createModalHtml() {
        $(".modal-body").html('');

        countQuantity ();
        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));

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
            
            $("<img>").addClass("img-fluid").attr("src", "../" + productInfo[i].image1).appendTo(modalCol1).on("click", function(){
            });
            $("<p>").html(productInfo[i].name).attr("id", "basketName").appendTo(modalCol2);
            $("<p>").html(productInfo[i].brand).attr("id", "basketBrand").appendTo(modalCol2);
            $("<p>").html("<b>" + productInfo[i].price + "kr" + "</b>").attr("id", "basketPrice").appendTo(modalCol2);
            $("<p>").html("&times;").attr("id", "basketRemove").appendTo(modalCol3).on("click", function(){
                removeItem(i);
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

    function basketDecreasing(i) {
        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));

        if (productInfo[i].quantity <= 1) {
            let a = productInfo;
            a.splice(i, 1);
            localStorage.setItem("currentBasket", JSON.stringify(productInfo));
        }
        else {
            productInfo[i].quantity--;
            localStorage.setItem("currentBasket", JSON.stringify(productInfo));
        }

        createModalHtml();
        getTotalPrice();
    }
    
    function basketIncreasing(i) {
        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));

        productInfo[i].quantity++;
        localStorage.setItem("currentBasket", JSON.stringify(productInfo));

        createModalHtml();
        getTotalPrice();

    }
    function removeItem(i) {
        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));

            let removed = productInfo;
            removed.splice(i, 1);
            localStorage.setItem("currentBasket", JSON.stringify(productInfo));

        
        getTotalPrice();

    }

    function getTotalPrice(i){
        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));
    
    
        let totalPrices = 0;
        $(productInfo).each(function(i){
            totalPrices += productInfo[i].price * productInfo[i].quantity;
        });    

       
        
       $("#modalTotalPrice").html("Totalbelopp: " + totalPrices + "kr")

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

    //GOING TO CHECKOUT
    $("#goToCheckout").on("click", function() {
        window.open("checkout.html", "_self");
    });

});