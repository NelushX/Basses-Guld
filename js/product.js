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
        } 
    }
    $("#input").keypress(function(event) {
        if (event.keyCode == 13) {
            window.open("search.html?search=" + $("#input").val(), "_self");
            let searchString = $("#input").val()
            localStorage.setItem("search", JSON.stringify(searchString));
        }
    
    });
    
    $(".thumbnail").on("click", function() {
        let lg = $("#largeImage").attr("src");

        $("#largeImage").attr("src", $(this).attr("src"));
        $(this).attr("src", lg);
    });
});