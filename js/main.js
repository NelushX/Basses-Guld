$(document).ready(function() {
    // Back-to-top icon
    $(".scrollupicon").on("click", function() {
        $("html,body").animate({scrollTop:0},'50');
    });


    // Class-objects
    let prod1 = new Product("Cuff Links Hunter Wild Boar Gold / Green", 10531310, "skultuna", 599, "Manschettknappar från Skultuna. Tillhör The Hunter kollektionen en kollektion som innehåller klassiska djurmotiv, utmärkt gåva till den jaktintresserade.", 17, "Finns i lager", "images/products/1_image0.JPG", "images/products/1_image1.JPG", "images/products/1_image2.JPG", "images/products/1_image3.JPG");
    let prod2 = new Product("Cuff Links Tre Kronor Gold / Royal Blue", 10530010, "skultuna", 599, "Manschettknappar från Skultuna. Tillverkad i 18K guldpläterad mässing och prydd med de tre kronorna, Sveriges heraldiska nationalsymbol.", 17, "Finns i lager", "images/products/2_image0.JPG", "images/products/2_image1.JPG", "images/products/2_image2.JPG", "images/products/2_image3.JPG");
    let prod3 = new Product("Cuff Links Golf Gold / Green", 10529410, "skultuna", 599, "Manschettknappar från Skultuna. En ny produktlinje som hyllar en av Storbritanniens mest klassiska sporter, golf. Tillverkade i guldpläterad mässing.", 17, "Finns i lager", "images/products/3_image0.JPG", "images/products/3_image1.JPG", "images/products/3_image2.JPG", "images/products/3_image3.JPG");
    let prod4 = new Product("Cuff Links Themocracy Gold / Racing Green", 11004010, "skultuna", 599, "Tillsammans med cykelbutiken Themocracy, som är specialiserade på exklusiva cyklar och accessoarer för cyklisten har Skultuna tagit fram dessa cykelinspirerade manschettknappar.", 16, "Finns i lager", "images/products/4_image0.JPG", "images/products/4_image1.JPG", "images/products/4_image2.JPG", "images/products/4_image3.JPG");
    let prod5 = new Product("Cuff Links World Traveler Black", 11630010, "skultuna", 599, "Manschettknappar från Skultuna. Utsmyckade med världskarta inspirerad från flygbolagens logotyper under 1900-talet då globala resor var något nytt.", 17, "Finns i lager", "images/products/5_image0.JPG", "images/products/5_image1.JPG", "images/products/5_image2.JPG", "images/products/5_image3.JPG");
    let prod6 = new Product("Franzisko Cufflinks Black", 12733810, "boss", 649, "Manschettknappar från BOSS. Tillverkade i silverpläterad mässing med infällning i metall och stansad logotyp.", 17, "Finns i lager", "images/products/6_image0.JPG", "images/products/6_image1.JPG", "images/products/6_image2.JPG", "images/products/6_image3.JPG");
    let prod7 = new Product("Franzisko Cufflinks Navy", 12733910, "boss", 649, "Manschettknappar från BOSS. Tillverkade i silverpläterad mässing med infällning i metall och stansad logotyp.", 17, "Finns i lager", "images/products/7_image0.JPG", "images/products/7_image1.JPG", "images/products/7_image2.JPG", "images/products/7_image3.JPG");
    let prod8 = new Product("PIX Steel Cufflinks Blue Resin", 16058610, "montblanc", 2250, "Den enkla men exklusiva designen till dessa manschettknappar från Montblanc är tagen från arkitektrörelsen Bauhaus samt uppkallad efter det historiska PIX-varumärket.", 16, "Finns i lager", "images/products/8_image0.JPG", "images/products/8_image1.JPG", "images/products/8_image2.JPG", "images/products/8_image3.JPG");
    let prod9 = new Product("Steel Meisterstück Cuff Links Blue", 14010310, "montblanc", 3400, "Manschettknappar från varumärket Montblanc. Dessa manschettknappar är tillverkade i rostfritt stål, med en unik yta i mittdelen, skapad av ett hexagonalt mönster av blått lack.", 16, "Finns i lager", "images/products/9_image0.JPG", "images/products/9_image1.JPG", "images/products/9_image2.JPG", "images/products/9_image3.JPG");
    let prod10 = new Product("Big Ben Cufflinks", 15020810, "paul Smith", 1099, "Manschettknappar från Paul Smith tillverkade i koppar och zink. Föreställer avbildning av Big Ben. Logotyp graverad på bakfästena.", 18, "Finns i lager", "images/products/10_image0.JPG", "images/products/10_image1.JPG", "images/products/10_image2.JPG", "images/products/10_image3.JPG");
    let prod11 = new Product("Mother of Pearl Multistripe Cufflinks Ivory", 15043310, "paul Smith", 599, "Mother of Pearl Multistripe Cufflinks Ivory", 18, "Finns i lager", "images/products/11_image0.JPG", "images/products/11_image1.JPG", "images/products/11_image2.JPG", "images/products/11_image3.JPG");
    let prod12 = new Product("Logo Cufflink Copper", 16459610, "paul Smith", 1299, "Manschettknappar från Paul Smith tillverkade i silverfärgad koppar och zink. Prydda med en flerfärgade bricka med logotyp graverat på bricka samt bakfäste.", 16, "Finns i lager", "images/products/12_image0.JPG", "images/products/12_image1.JPG", "images/products/12_image2.JPG", "images/products/12_image3.JPG");

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

    // Loop for lookalike
    for (let i = 0; i < lookalike.length; i++) {
        let productContainer = $("<div>").addClass("productContainer lookalike col-6 col-lg-3").attr("id", lookalike[i].artnr).appendTo($("#lookalike"));

        let imageContainer = $("<div>").addClass("imageContainer").appendTo(productContainer);
        let image = $("<img>").attr("src", "../" + lookalike[i].image1).attr("alt", lookalike[i].name)
            .mouseover(function() {
                image.attr("src", "../" + lookalike[i].image2);
            })
            .mouseout(function() {
                image.attr("src", "../" + lookalike[i].image1);
            })
            .appendTo(imageContainer);  

        let infoContainer = $("<div>").addClass("infoContainer mt-3").appendTo(productContainer);
        let brand = $("<p>").html("<b>" + lookalike[i].brand + "</b>").addClass("pBrand").appendTo(infoContainer);
        let name = $("<p>").html(lookalike[i].name).addClass("pName").appendTo(infoContainer);
        let price = $("<p>").html("<b>" + lookalike[i].price + " kr" + "</b>").addClass("pPrice").appendTo(infoContainer);
    }

    function Product(name, artnr, brand, price, description, size, stock, image1, image2, image3, image4) {
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
    }

    // Searchfunction
    // $("#input").keyup(function() {
    //     let search = $(this).val().toLowerCase();
    //     $(".productContainer").show();
    //     $(".inspiration").hide();
    //     $(".carouselContainer").hide();
    //     $("#favorites").hide();
    //     $(".indexH3").hide();
    //     // Presentera searchResult
        
    //     if (search) $(".productContainer").not(":contains(" + search + ")").hide();

    //     else {
    //         $(".inspiration").show();
    //         $(".carouselContainer").show();
    //         $("#favorites").show();
    //         $(".indexH3").show();
    //     }
    // });
    

    // let searchResult = [];    // Vad gör den här?

    $("#searchButton").on("click", function() {
        $("#productlist").empty();

        let search = $("#input").val();
        $("#searchstring").html(search);

        productPage.forEach(function(value) {
            if(value.brand.indexOf(search) >= 0 || value.price.toString().indexOf(search) >= 0) {
                // searchResult.push(value);      // Vad gör den här?

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

                localStorage.setItem("search", JSON.stringify(search));
            }
        });
            //window.open("html/search.html","_searchpage");

        $(".prodlink").on("click", function() {
            window.open("product.html?id=" + $(this).attr("id"), "_self");
        });
    });
    

    // Shoppingcart
    let basketlist = JSON.parse(localStorage.getItem("prodList"));
    let basketimg = $("<img>").attr("src", "../" + basketlist.image1).addClass("img-fluid");
    
    $("#addToBasket").on("click",function(){

        let currentBasket = [];

        if (localStorage.getItem("basket")) {
            currentBasket = JSON.parse(localStorage.getItem("basket")) || {};
        }

        $("#basketImage").append(basketimg);
        $("#basketTitle").html(basketlist.name);
        $("#basketBrand").html(basketlist.brand);
        $("#basketArtnr").html(basketlist.artnr);
        $("#basketPrice").html("Pris: " + basketlist.price + ":-");
    

            console.log(basketlist);
            console.log(currentBasket);
            currentBasket.push(basketlist);
            localStorage.setItem("basket", JSON.stringify(basket));
    });
    
    $(".prodlink").on("click", function() {
        window.open("html/product.html?id=" + $(this).attr("id"), "_self");
    });

    $(".lookalike").on("click", function() {
        window.open("product.html?id=" + $(this).attr("id"), "_self");
    });
});