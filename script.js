"use strict";
let selectedCity, map;

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
    const addNewLines = s => s.replaceAll("• ", "<br>• ");
    $('button[data-bs-toggle="modal"]').on("click", function () {
        $("#cityExtraInfo .modal-title").text(selectedCity.name);
        $("#cityExtraInfo .modal-body > p").html(addNewLines(selectedCity.modal_text));
        setTimeout(function () {
            map.setView(selectedCity.map_coords, 12);
        }, 250);
    });
}