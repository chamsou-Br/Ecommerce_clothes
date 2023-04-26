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
            $("#product-modal input[name='id']").val(data.id)
            $("#product-modal input[name='name']").val(data.nom)
            $("#product-modal input[name='mark']").val(data.marque)
            $("#product-modal input[name='type']").val(data.type)
            $("#product-modal input[name='style']").val(data.style)
            $("#product-modal input[name='price']").val(data.prix)
            data.items.forEach(it => {
                const labels = ["S[]","M[]","L[]","XL[]","XXL[]"];
                const values = ["quantites","quantitem","quantitel","quantitexl","quantitexxl"]
                var h1 = $('<h1>').addClass('exTitle').text( it.color + ' :');
                var id = $('<input>').addClass('info').attr('type', 'hidden').attr('name', "itemsId[]").attr("value",it.id);
                $("#product-modal .edit-container").append(h1);
                $("#product-modal .edit-container").append(id);
                var div1 = $('<div>').addClass('exContainer');
                for (let i =0 ; i< 5;i++) {         
                    var div2 = $('<div>').addClass('sizeContainer');
                    var label = $('<label>').text(labels[i].split("[")[0] +  ' :');
                    var input = $('<input>').addClass('info').attr('type', 'number').attr('name', labels[i]).attr('placeholder', 'Size').attr("value",it[values[i]]);
                    $(div2).append(label).append(input);
                    $(div1).append(div2);
                }
                $("#product-modal .edit-container").append(h1).append(div1);
          })
    })
})

$(".addModal").click(function(){
    const labels = ["S[]","M[]","L[]","XL[]","XXL[]"];
    var colors = ['rouge', 'bleu', 'blanc', 'noir'];
    var select = $('<select name="color[]" class="color" >');
    for (var i = 0; i < colors.length; i++) {
    $('<option>').val(colors[i]).text(colors[i]).appendTo(select);
    }
    var div1 = $('<div>').addClass('exContainer');
    for (let i =0 ; i< 5;i++) {         
        var div2 = $('<div>').addClass('sizeContainer');
        var label = $('<label>').text(labels[i].split("[")[0] +  ' :');
        var input = $('<input>').addClass('info').attr('type', 'number').attr('name', labels[i]).attr('placeholder', 'Qte');
        $(div2).append(label).append(input);
        $(div1).append(div2);
    }
    $("#add-product-modal .edit-container .addModal").before(select);
    $("#add-product-modal .edit-container .addModal").before(div1);
})

})