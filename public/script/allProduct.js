$(document).ready(function () {

 console.log("first")
function sort(id, index) {
  
    // Declaring Variables
    var geek_list, i, run, li, stop;

    // Taking content of list as input
    geek_list = document.querySelector(".gallery-items");

    run = true;
    while (run) {
        run = false;
        li = geek_list.getElementsByClassName("product");


        // Loop traversing through all the list items
        for (i = 0; i < (li.length - 1); i++) {
            stop = false;
            let val1 = JSON.parse(li[i].getAttribute('data-product'))[id];
            let val2 = JSON.parse(li[i+ 1].getAttribute('data-product'))[id];
            console.log(val1,val2)
            if ( index != 2 && (parseFloat(val1) > parseFloat(val2)) || index == 2 && (parseFloat(val1) < parseFloat(val2))   ) {
                stop = true;
                break;
            }
        }

        /* If the current item is smaller than 
           the next item then adding it after 
           it using insertBefore() method */
        if (stop) {
            li[i].parentNode.insertBefore(
                li[i + 1], li[i]);
            run = true;
        }
    }
}


$("#sort").change(function() {
    // Code to be executed when an option is selected
    var selectedOption = $(this).val();
    var selectedIndex = this.selectedIndex;
    sort(selectedOption,selectedIndex);
  });

  $("#categorie").change(function() {
    var selectedOption = $(this).val();
    var selectedIndex = this.selectedIndex;
    let cpt = 0;
    $(".product").each(function(){
        let current = $(this);
        if (!current.hasClass("disabledMark") && !current.hasClass("disabledStyle")){
            let data = current.data("product")
            if (!data.catgorie || selectedIndex == 0 || data.catgorie == selectedOption ) {
                current.show()
                current.removeClass("disabledCategorie")
                cpt++;
            }else {
                current.addClass("disabledCategorie")
                current.hide()
            }
        }
    })
    $(".productsFound").text( cpt.toString() + " styles trouvés")
  });

  $("#categorieCom").change(function() {
    var selectedOption = $(this).val();
    var selectedIndex = this.selectedIndex;
    let cpt = 0;
    $(".product").each(function(){
        let current = $(this);
            let data = current.data("product")
            console.log(data.items[0],selectedOption,selectedIndex)
            if (!data.items[0].catgorie || selectedIndex == 0 || data.items[0].catgorie == selectedOption ) {
                current.show()
                cpt++;
            }else {
                current.hide()
            }
    })
    $(".productsFound").text( cpt.toString() + " styles trouvés")
  });

  // filter combinaison
  $("#typeComp").change(function() {
    var selectedOption = $(this).val();
    window.location = selectedOption
    
  });
  



  // filter style de produit
  $("#style").change(function() {
    var selectedOption = $(this).val();
    var selectedIndex = this.selectedIndex;
    let cpt = 0;
    $(".product").each(function(){
        let current = $(this);
        if (!current.hasClass("disabledMark") && !current.hasClass("disabledCategorie")){
            let data = current.data("product")
            if (selectedIndex == 0 ||  data.style == selectedOption ) {
                current.show()
                current.removeClass("disabledStyle")
                cpt++;
            }else {
                current.addClass("disabledStyle")
                current.hide()
            }
        }
    })
    $(".productsFound").text( cpt.toString() + " styles trouvés")
  });

  // filter marque de produit
  $("#mark").change(function() {
    var selectedOption = $(this).val();
    var selectedIndex = this.selectedIndex;
    let cpt = 0;
    $(".product").each(function(){
        let current = $(this);
        if (!current.hasClass("disabledStyle") && !current.hasClass("disabledCategorie")){
            let data = current.data("product")
            if (selectedIndex == 0 || data.marque == selectedOption ) {
                current.show()
                current.removeClass("disabledMark")
                cpt++;
            }else {
                current.addClass("disabledMark")
                current.hide()
            }
        }
    })
    $(".productsFound").text( cpt.toString() + " styles trouvés")
  });


  $('.combination').each(function(){
    let data = $(this).data("product");
    let src;
    let i = 0;
    setTimeout(()=> {
        setInterval(()=> {
            i = (i + 1) % data.items.length
            if (!data.items[i].picture.includes("http")) {
                src = "../../" + data.items[i].picture
               } else { 
                src =  data.items[i].picture
               }  
            let img = $(this).find('img')
            img.attr('src', src)
        },2000)
    },1000* parseInt(data.id))


  })



})