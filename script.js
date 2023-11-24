"use strict";
let selectedCity;

$(document).ready(function () {
    navBarClickListener();
    detailsButtonListener();
});

function navBarClickListener() {
    $("#nav_bar > p[id]").on("click", function () {
        eval(`selectedCity = ${$(this).attr("id")};`);
        $("#city").show();
        $("#city .card-title").text(selectedCity.name);
        $("#city .card-text").text(selectedCity.main_text);
        $("#city img").attr("src", selectedCity.img_path);
    });
}

function detailsButtonListener() {
    $('button[data-bs-toggle="modal"]').on("click", function () {
        $(".modal-title").text(selectedCity.name);
        $(".modal-body > p").html(addNewLines(selectedCity.modal_text));
        // prettier-ignore
        $("#map").attr("src", "https://www.openstreetmap.org/export/embed.html?bbox=" + selectedCity.map_code);
    });
    // $(".modal .btn-close").on("click", function () {
    //     $("#map").removeAttr("src");
    // });
}

function addNewLines(s) {
    return s.replaceAll("• ", "<br>• ");;
}