$(document).ready(function () {


    if ($('.accessoireId').length == 0) {
        $("#accessoireContainer .price").text("");
    }

    $(".product.colors .color").each(function(){
        $(this).click(function() {
            let index = $(".product.colors .color").index(this);
            $("#itemActive").val(product.items[index].color)
            $('.color').each(function() {
                $(this).removeClass("active")
            })
            $(this).addClass("active");

            // disabled si quantite rgale zero
            product.items[index].quantites == 0 ? $("#S").prop("disabled", true) : $("#S").prop("disabled", false);
            product.items[index].quantitem == 0 ? $("#M").prop("disabled", true) : $("#M").prop("disabled", false); 
            product.items[index].quantitel == 0 ? $("#L").prop("disabled", true) : $("#L").prop("disabled", false); 
            product.items[index].quantitexl == 0 ? $("#XL").prop("disabled", true) : $("#XL").prop("disabled", false); 
            product.items[index].quantitexxl == 0 ? $("#XXL").prop("disabled", true) : $("#XXL").prop("disabled", false);  
                       
        })
    });
    $(".products-combination").each(function(){
        let ProductIndex = $(".products-combination").index(this);
        let productItem = $(this);
        productItem.find(".view").click(function () {
            
            if (!product.items[ProductIndex].picture.includes("http")) {
                $("img").attr("src","../../" + product.items[ProductIndex].picture)
               } else { 
                $("img").attr("src",product.items[ProductIndex].picture)
                
               }  
            $(".view").each(function(){
                $(this).removeClass("active")
            })
            $(this).addClass("active")
        })
        productItem.find(".color").each(function(){
            let color = $(this);
            color.click(function() {
                let index = productItem.find(".color").index(this);
                productItem.find("#itemActive").val(product.items[ProductIndex].productsItems[index].color)
                productItem.find(".color").each(function() {
                    $(this).removeClass("active")
                })
                $(this).addClass("active");
                product.items[ProductIndex].productsItems[index].quantites == 0 ?  productItem.find("#S").prop("disabled", true) : $("#S").prop("disabled", false);
                product.items[ProductIndex].productsItems[index].quantitem == 0 ? productItem.find("#M").prop("disabled", true) : $("#M").prop("disabled", false); 
                product.items[ProductIndex].productsItems[index].quantitel == 0 ? productItem.find("#L").prop("disabled", true) : $("#L").prop("disabled", false); 
                product.items[ProductIndex].productsItems[index].quantitexl == 0 ? productItem.find("#XL").prop("disabled", true) : $("#XL").prop("disabled", false); 
                product.items[ProductIndex].productsItems[index].quantitexxl == 0 ? productItem.find("#XXL").prop("disabled", true) : $("#XXL").prop("disabled", false); 

            })
        });

    })



    $(".Accesscard .iconContainer").each(function(){
        $(this).click(function(){
           
              const value = $(this).attr('accId')
              const type = $(this).attr('accType')
              if ($(this).text() == "+") {

                $(this).text('✔')
                $('<input>').attr({
                  type: 'hidden',
                  class : "accessoireId",
                  name: 'accessoire[]',
                  value: value,
                  data : type
                }).appendTo('form');

            
                $("#accessoireContainer .price").text("Accessoires");
                var mySpan = $('<span>').text(JSON.parse(value).type + ' - ' + JSON.parse(value).marque + ' - '  + " | ");
                $("#accessoireContainer").append(mySpan); 

              }else {
                $(this).text('+');
                let i = 0;
                $('.accessoireId').filter(function() {
                    i = $(".accessoireId").index(this)
                    return $(this).val() === value;
                  }).each(function() {
                    // Delete the input element
                    $(this).remove();
                  });
                  $("#accessoireContainer span")[i].remove()
                  if ($('.accessoireId').length == 0) {
                    $("#accessoireContainer .price").text("");
                  }
            
              }
        })
    })

    $('#closeModal').click(function () {
        $("#accessoireContainer .price").text("");
        $('.accessoireId').each(function() {
            $(this).remove();            
        })
        $(".Accesscard .iconContainer").each(function(){
            $(this).text('+');  
        })
        $("#accessoireContainer span").each(function(){
            $(this).remove(); 
        })
    })


    
})





