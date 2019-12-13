$(document).ready(function() { 

    let productPage = JSON.parse(localStorage.getItem("prodList"));
    
    // let searchResult = [];    // Vad gör den här?

    $("#input").on("keyup", function() {
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

        $(".prodlink").on("click", function() {
            window.open("product.html?id=" + $(this).attr("id"), "_self");
        });

        //window.open("html/search.html","_searchpage");
    });
});