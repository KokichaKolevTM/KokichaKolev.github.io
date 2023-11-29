"use strict";
let selectedCity;
let map;

$(document).ready(function () {
    navBarListener();
    detailsButtonListener();
    map = L.map("map");
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
});

function navBarListener() {
    $("#nav_bar > a[id]").on("click", function () {
        eval(`selectedCity = ${$(this).attr("id")};`);
        $("#city").show();
        $("#city .card-title").text(selectedCity.name);
        $("#city .card-text").text(selectedCity.main_text);
        $("#city .card-img-top").attr("src", selectedCity.img_path);
    });
}

function detailsButtonListener() {
    $('button[data-bs-toggle="modal"]').on("click", function () {
        $(".modal-title").text(selectedCity.name);
        $(".modal-body > p").html(addNewLines(selectedCity.modal_text));
        setTimeout(() => {
            map.setView(selectedCity.map_code, 12);
        }, 250);
    });
}

function addNewLines(s) {
    return s.replaceAll("• ", "<br>• ");
}
