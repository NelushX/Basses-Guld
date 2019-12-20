$(document).ready(function() {

    // Back-to-top icon
    $(".scrollupicon").on("click", function() {
        $("html,body").animate({scrollTop:0},'50');
    });

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
                
                $("<img>").addClass("img-fluid").attr("src", productInfo[i].image1).appendTo(modalCol1);
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
        //REMOVING ITEM FROM ARRAY
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
            window.open("html/checkout.html", "_self");
        });

};
    // Class-objects
    let prod1 = new Product("Cuff Links Hunter Wild Boar Gold / Green", 10531310, "skultuna", 599, "Manschettknappar från Skultuna. Tillhör The Hunter kollektionen en kollektion som innehåller klassiska djurmotiv, utmärkt gåva till den jaktintresserade.", 17, "Finns i lager", "images/products/1_image0.JPG", "images/products/1_image1.JPG", "images/products/1_image2.JPG", "images/products/1_image3.JPG", 1);
    let prod2 = new Product("Cuff Links Tre Kronor Gold / Royal Blue", 10530010, "skultuna", 599, "Manschettknappar från Skultuna. Tillverkad i 18K guldpläterad mässing och prydd med de tre kronorna, Sveriges heraldiska nationalsymbol.", 17, "Finns i lager", "images/products/2_image0.JPG", "images/products/2_image1.JPG", "images/products/2_image2.JPG", "images/products/2_image3.JPG", 1);
    let prod3 = new Product("Cuff Links Golf Gold / Green", 10529410, "skultuna", 599, "Manschettknappar från Skultuna. En ny produktlinje som hyllar en av Storbritanniens mest klassiska sporter, golf. Tillverkade i guldpläterad mässing.", 17, "Finns i lager", "images/products/3_image0.JPG", "images/products/3_image1.JPG", "images/products/3_image2.JPG", "images/products/3_image3.JPG", 1);
    let prod4 = new Product("Cuff Links Themocracy Gold / Racing Green", 11004010, "skultuna", 599, "Tillsammans med cykelbutiken Themocracy, som är specialiserade på exklusiva cyklar och accessoarer för cyklisten har Skultuna tagit fram dessa cykelinspirerade manschettknappar.", 16, "Finns i lager", "images/products/4_image0.JPG", "images/products/4_image1.JPG", "images/products/4_image2.JPG", "images/products/4_image3.JPG", 1);
    let prod5 = new Product("Cuff Links World Traveler Black", 11630010, "skultuna", 599, "Manschettknappar från Skultuna. Utsmyckade med världskarta inspirerad från flygbolagens logotyper under 1900-talet då globala resor var något nytt.", 17, "Finns i lager", "images/products/5_image0.JPG", "images/products/5_image1.JPG", "images/products/5_image2.JPG", "images/products/5_image3.JPG", 1);
    let prod6 = new Product("Franzisko Cufflinks Black", 12733810, "boss", 649, "Manschettknappar från BOSS. Tillverkade i silverpläterad mässing med infällning i metall och stansad logotyp.", 17, "Finns i lager", "images/products/6_image0.JPG", "images/products/6_image1.JPG", "images/products/6_image2.JPG", "images/products/6_image3.JPG", 1);
    let prod7 = new Product("Franzisko Cufflinks Navy", 12733910, "boss", 649, "Manschettknappar från BOSS. Tillverkade i silverpläterad mässing med infällning i metall och stansad logotyp.", 17, "Finns i lager", "images/products/7_image0.JPG", "images/products/7_image1.JPG", "images/products/7_image2.JPG", "images/products/7_image3.JPG", 1);
    let prod8 = new Product("PIX Steel Cufflinks Blue Resin", 16058610, "montblanc", 2250, "Den enkla men exklusiva designen till dessa manschettknappar från Montblanc är tagen från arkitektrörelsen Bauhaus samt uppkallad efter det historiska PIX-varumärket.", 16, "Finns i lager", "images/products/8_image0.JPG", "images/products/8_image1.JPG", "images/products/8_image2.JPG", "images/products/8_image3.JPG", 1);
    let prod9 = new Product("Steel Meisterstück Cuff Links Blue", 14010310, "montblanc", 3400, "Manschettknappar från varumärket Montblanc. Dessa manschettknappar är tillverkade i rostfritt stål, med en unik yta i mittdelen, skapad av ett hexagonalt mönster av blått lack.", 16, "Finns i lager", "images/products/9_image0.JPG", "images/products/9_image1.JPG", "images/products/9_image2.JPG", "images/products/9_image3.JPG", 1);
    let prod10 = new Product("Big Ben Cufflinks", 15020810, "paul Smith", 1099, "Manschettknappar från Paul Smith tillverkade i koppar och zink. Föreställer avbildning av Big Ben. Logotyp graverad på bakfästena.", 18, "Finns i lager", "images/products/10_image0.JPG", "images/products/10_image1.JPG", "images/products/10_image2.JPG", "images/products/10_image3.JPG", 1);
    let prod11 = new Product("Mother of Pearl Multistripe Cufflinks Ivory", 15043310, "paul Smith", 599, "Mother of Pearl Multistripe Cufflinks Ivory", 18, "Finns i lager", "images/products/11_image0.JPG", "images/products/11_image1.JPG", "images/products/11_image2.JPG", "images/products/11_image3.JPG", 1);
    let prod12 = new Product("Logo Cufflink Copper", 16459610, "paul Smith", 1299, "Manschettknappar från Paul Smith tillverkade i silverfärgad koppar och zink. Prydda med en flerfärgade bricka med logotyp graverat på bricka samt bakfäste.", 16, "Finns i lager", "images/products/12_image0.JPG", "images/products/12_image1.JPG", "images/products/12_image2.JPG", "images/products/12_image3.JPG", 1);

    let productlist = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12];
    let favorites = [prod6, prod9, prod12, prod10];
    let lookalike = [prod5, prod7, prod11, prod2];

    localStorage.setItem("prodList", JSON.stringify(productlist));

    
    // Loop for favoritelist
    for (let i = 0; i < favorites.length; i++) {
        let productContainer = $("<div>").addClass("productContainer prodlink col-6 col-lg-3").attr("id", favorites[i].artnr).appendTo($("#favorites"));

        let imageContainer = $("<div>").addClass("imageContainer").appendTo(productContainer);
        let image = $("<img>").attr("src", favorites[i].image1).attr("alt", favorites[i].name)
            .mouseover(function() {
                image.attr("src", favorites[i].image2);
            })
            .mouseout(function() {
                image.attr("src", favorites[i].image1);
            })
            .appendTo(imageContainer);  

        let infoContainer = $("<div>").addClass("infoContainer mt-3").appendTo(productContainer);
        let brand = $("<p>").html("<b>" + favorites[i].brand + "</b>").addClass("pBrand").appendTo(infoContainer);
        let name = $("<p>").html(favorites[i].name).addClass("pName").appendTo(infoContainer);
        let price = $("<p>").html("<b>" + favorites[i].price + " kr" + "</b>").addClass("pPrice").appendTo(infoContainer);
    }

    // Loop for productlist
    for (let i = 0; i < productlist.length; i++) {
        let productContainer = $("<div>").addClass("productContainer prodlink col-6 col-lg-3").attr("id", productlist[i].artnr).appendTo($("#productlist"));

        let imageContainer = $("<div>").addClass("imageContainer").appendTo(productContainer);
        let image = $("<img>").attr("src", productlist[i].image1).attr("alt", productlist[i].name)
            .mouseover(function() {
                image.attr("src", productlist[i].image2);
            })
            .mouseout(function() {
                image.attr("src", productlist[i].image1);
            })
            .appendTo(imageContainer);  

        let infoContainer = $("<div>").addClass("infoContainer mt-3").appendTo(productContainer);
        let brand = $("<p>").html("<b>" + productlist[i].brand + "</b>").addClass("pBrand").appendTo(infoContainer);
        let name = $("<p>").html(productlist[i].name).addClass("pName").appendTo(infoContainer);
        let price = $("<p>").html("<b>" + productlist[i].price + " kr" + "</b>").addClass("pPrice").appendTo(infoContainer);
    }

   

    function Product(name, artnr, brand, price, description, size, stock, image1, image2, image3, image4, quantity) {
        this.name = name;
        this.artnr = artnr;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.size = size;
        this.stock = stock;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        this.quantity = quantity;
    }


    $(".prodlink").on("click", function() {
        window.open("html/product.html?id=" + $(this).attr("id"), "_self");
    });


    $(".lookalike").on("click", function() {
        window.open("product.html?id=" + $(this).attr("id"), "_self");
    });


    $("#input").on("keypress", function() {
        $(".carouselContainer, .productCategoriText, #favorites, .indexH3, .inspiration, #productlist").empty();

        let search = $("#input").val();

        productlist.forEach(function(value) {
            if(value.brand.indexOf(search) >= 0 || value.price.toString().indexOf(search) >= 0) {

                let productContainer = $("<div>").addClass("productContainer prodlink col-6 col-lg-3").attr("id", value.artnr).appendTo($("#favorites"));
                let imageContainer = $("<div>").addClass("imageContainer").appendTo(productContainer);
                let image = $("<img>").attr("src", value.image1).attr("alt", value.name)
                    .mouseover(function() {
                        image.attr("src", value.image2);
                    })
                    .mouseout(function() {
                        image.attr("src", value.image1);
                    })
                    .appendTo(imageContainer);

                let infoContainer = $("<div>").addClass("infoContainer mt-3").appendTo(productContainer);
                let brand = $("<p>").html("<b>" + value.brand + "</b>").addClass("pBrand").appendTo(infoContainer);
                let name = $("<p>").html(value.name).addClass("pName").appendTo(infoContainer);
                let price = $("<p>").html("<b>" + value.price + " kr" + "</b>").addClass("pPrice").appendTo(infoContainer);
               
                localStorage.setItem("search", JSON.stringify(search));
            }
        });

        $(".prodlink").on("click", function() {
            window.open("html/product.html?id=" + $(this).attr("id"), "_self");
        });
    });

    // number of items in basket
    let quantitynumber = JSON.parse(localStorage.getItem("currentBasket"));
   


    // Do not open shoppingcart if no content
    $("#openModal").on("click", function(){
        if (quantitynumber.length == 0) {
            $("#openModal").removeAttr("data-toggle");
        }
    });

}); 
