$(document).ready(function () {

    $('.item-commande').each(function () {
        var status = $(this).data('status');
        if (status !=  "EN_ATTENTE") {
            $(this).hide()
        }
    })

    $(".cardFilter.pennding").click(function () {
        $(".commandes-bag").css({
            'border-top-width': '4px',
            'border-top-style': 'solid',
            'border-top-color': '#f29a62'
          });
        $('.item-commande').each(function () {
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
        $('.item-commande').each(function () {
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
        $('.item-commande').each(function () {
            var status = $(this).data('status');
            if (status !=  "ANNULER") {
                $(this).hide()
            }else {
                $(this).show()
            }
        })
    })



})