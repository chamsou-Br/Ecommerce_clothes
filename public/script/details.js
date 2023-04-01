$(document).ready(function () {
    console.log(product.items[0],"kkk",product.items[1])
    $(".color").each(function(){

        $(this).click(function() {
            let index = $(".color").index(this);
            $("#itemActive").val(index)
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

    
})





