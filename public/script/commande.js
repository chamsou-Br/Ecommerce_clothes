$(document).ready(function () {


    
    var screenWidth = $(window).width(); 
    if (screenWidth < 600) {
        console.log($("thead th")[0])
        $("thead th")[0].remove()
        $("tbody th").each(function(){
            $(this).remove()
        })
    }
    $(window).on('resize', function() {
        var screenWidth = $(window).width(); 
        if (screenWidth < 600) {
            console.log($("thead th")[0])
            $("thead th")[0].remove()
            $("tbody th").each(function(){
                $(this).remove()
            })
        }
      });

    $("tr").each(function(){
        $(this).click(function(){
            let link  = "/gerant/commandes/" + $(this).data('id');$
            window.location.href = link
        })

    })

    $(".cardFilter.pennding").click(function () {
        $(".commandes-bag").css({
            'border-top-width': '4px',
            'border-top-style': 'solid',
            'border-top-color': '#f29a62'
          });
        $('tbody tr').each(function () {
            var status = $(this).data('status');
            if (status !=  "EN_ATTENTE") {
                $(this).hide()
            }else {
                $(this).show()
            }
        })
    })

    $(".cardFilter.done").click(function () {
        $(".commandes-bag").css({
            'border-top-width': '4px',
            'border-top-style': 'solid',
            'border-top-color': '#56e164'
          });
          $(this).addClass('activ')
        $('tbody tr').each(function () {
            var status = $(this).data('status');
            if (status !=  "COMPLETE") {
                $(this).hide()
            }else {
                $(this).show()
            }
        })
    })

    $(".cardFilter.canceld").click(function () {
        $(".commandes-bag").css({
            'border-top-width': '4px',
            'border-top-style': 'solid',
            'border-top-color': '#fa5959'
          });
          $(this).addClass('activ')
        $('tbody tr').each(function () {
            var status = $(this).data('status');
            if (status !=  "ANNULER") {
                $(this).hide()
            }else {
                $(this).show()
            }
        })
    })



})