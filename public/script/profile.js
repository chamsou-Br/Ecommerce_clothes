$(document).ready(function () {


  
    $('#upload-form i').on("click",function () { 
        $("#uplaod-picture").click();
    });

    $("#uplaod-picture").on('change', function() {
        $('#upload-form').submit();
    })

})