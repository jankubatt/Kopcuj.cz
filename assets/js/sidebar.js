/*
Copyright © Jan Kubát 2021 - present
api.mapy.cz
*/

$("#btnSidebar").on("click", function() {
    if($(".sidebar").width() == 50) 
        $(".sidebar").animate({width: '300px'}, 100, function () {
            $("#sidebarContentAll").show();
            $("#btnSidebar").html(`<i class="fas fa-angle-double-left fa-2x"></i>`);
        });

    else {
        $("#sidebarContentAll").hide();
        $(".sidebar").animate({width: '50px'}, 100, function() {
            $("#btnSidebar").html(`<i class="fas fa-angle-double-right fa-2x"></i>`);
        });
    }   
})