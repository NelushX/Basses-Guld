$(document).ready(function() {
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

    console.log(thisObject);

    
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
        }

        setNewBasket.push(thisObject);
        localStorage.setItem("currentBasket", JSON.stringify(setNewBasket));

        createModalHtml();
    });


    function createModalHtml() {
        // $(".modal-body").html('');

        let modalBody = $(".modal-body").addClass("container");
        let modalRow = $("<div>").attr("id", "basketObject").addClass("row align-items-center");
        let modalCol1 = $("<div>").addClass("col-5").attr("id", "imageCol");
        let modalCol2 = $("<div>").addClass("col-4").attr("id", "infoCol");
        modalCol3 = $("<div>").addClass("col-3").attr("id", "qtyCol");
        modalRow.appendTo(modalBody);
        modalCol1.appendTo(modalRow);
        modalCol2.appendTo(modalRow);
        modalCol3.appendTo(modalRow);


        let img1 = $("<img>").attr("class", "img-fluid")
        .appendTo(modalCol1);

        let p1 = $("<p>").attr("id", "basketName")
        p1.appendTo(modalCol2);

        let p2 = $("<p>").attr("id", "basketBrand")
        p2.appendTo(modalCol2);

        let p3 = $("<p>").attr("id", "basketPrice")
        p3.appendTo(modalCol2);

        let p4 = $("<p>").attr("id", "basketQuantity")
        p4.appendTo(modalCol3);

        let p5 = $("<button>").addClass("btn btn-dark").attr("id", "basketDecrease");
        p5.appendTo(modalCol3);

        let p6 = $("<button>").addClass("btn btn-dark").attr("id", "basketIncrease")
        p6.appendTo(modalCol3);
        
        let p7 = $("<p>").attr("id", "basketRemove")
        p7.appendTo(modalCol3);

        

        let productInfo = JSON.parse(localStorage.getItem("currentBasket"));

        for (let i = 0; i < productInfo.length; i++) {
            img1.attr("src", "../" + productInfo[i].image1)
            p1.html(productInfo[i].name);
            p2.html(productInfo[i].brand);
            p3.html("<b>" + productInfo[i].price + "kr" + "</b>");
            p4.html("Antal: " + productInfo[i].quantity);
            p5.html("-").on("click", function(){
                if (productInfo[i].quantity <= 0) {
                    let a = productInfo;
                    a.splice(0);
                }
                else {
                productInfo[i].quantity--
                
                localStorage.setItem("currentBasket", JSON.stringify(productInfo));

                createModalHtml();
                }
            });

            p6.html("+").on("click", function() {
                productInfo[i].quantity++;
                localStorage.setItem("currentBasket", JSON.stringify(productInfo));
                var z = productInfo[i].quantity * productInfo[i].price;
                let findTotalPrice = $("#modalTotalPrice");
                findTotalPrice.html(z);

                createModalHtml();
            });

            p7.html("&times;")
        }

        let quantitynumber = JSON.parse(localStorage.getItem("currentBasket")) || [];
        let basketnumber = [];

        for (let i = 0; i < quantitynumber.length; i++) {
            if (quantitynumber.length >= 1) {
            let number = $("#number").html(quantitynumber.length);
            number.addClass("number");
            basketnumber.push(quantitynumber[i]);
            }  
        }

    }
});