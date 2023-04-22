$(document).ready(function () {

    $("table.commandes tr").each(function(){
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

    $('.openModal-accessoire').each(function(){
        $(this).click(function () {
            const data = $(this).data("accessoire")
            $("#accessoire-modal input[name='type']").val(data.type)
            $("#accessoire-modal input[name='id']").val(data.id)
            $("#accessoire-modal input[name='mark']").val(data.marque)
            $("#accessoire-modal input[name='qty']").val(data.quantite)
            $("#accessoire-modal input[name='price']").val(data.prix)
          })
    })

    $('.openModal-product').each(function(){
        $(this).click(function () {
            const data = $(this).data("product")
            $("input[name='id']").val(data.id)
            $("input[name='name']").val(data.nom)
            $("input[name='mark']").val(data.marque)
            $("input[name='type']").val(data.type)
            $("input[name='style']").val(data.style)
            $("input[name='price']").val(data.prix)
            data.items.forEach(it => {
                const labels = ["S[]","M[]","L[]","XL[]","XXL[]"];
                const values = ["quantites","quantitem","quantitel","quantitexl","quantitexxl"]
                var h1 = $('<h1>').addClass('exTitle').text( it.color + ' :');
                var id = $('<input>').addClass('info').attr('type', 'hidden').attr('name', "itemsId[]").attr("value",it.id);
                $(".edit-container").append(h1);
                $(".edit-container").append(id);
                var div1 = $('<div>').addClass('exContainer');
                for (let i =0 ; i< 5;i++) {         
                    var div2 = $('<div>').addClass('sizeContainer');
                    var label = $('<label>').text(labels[i].split("[")[0] +  ' :');
                    var input = $('<input>').addClass('info').attr('type', 'number').attr('name', labels[i]).attr('placeholder', 'Size').attr("value",it[values[i]]);
                    $(div2).append(label).append(input);
                    $(div1).append(div2);
                }
                $(".edit-container").append(h1).append(div1);
          })
    })
})

})