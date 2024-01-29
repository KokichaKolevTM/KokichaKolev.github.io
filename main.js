"use strict";

let selectedCity, map;

// main function
(function () {
    navBarListener();
    detailsButtonListener();

    if (sessionStorage.getItem("last_viewed_city")) {
        eval(`selectedCity = ${sessionStorage.getItem("last_viewed_city")}`);
        showCity();
    }

    // setup map
    map = L.map("map");
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

})();

function showCity() {
    $("#city").show();
    $("#city .card-title").text(selectedCity.name);
    $("#city .card-text").text(selectedCity.main_text);
    $("#city .card-img-top").attr("src", selectedCity.img_path);
}

function navBarListener() {
    $("#nav_bar > a[id]").on("click", (e) => {
        eval(`selectedCity = ${e.currentTarget.id};`);
        sessionStorage.setItem("last_viewed_city", e.currentTarget.id);
        showCity();
    });
}

function detailsButtonListener() {
    const addNewLines = (s) => s.replaceAll("• ", "<br>• ");
    $('button[data-bs-toggle="modal"]').on("click", () => {
        $("#cityExtraInfo .modal-title").text(selectedCity.name);
        $("#cityExtraInfo .modal-body > p").html(
            addNewLines(selectedCity.modal_text)
        );
        setTimeout(() => {
            map.setView(selectedCity.map_coords, 12);
        }, 250);
    });
}
