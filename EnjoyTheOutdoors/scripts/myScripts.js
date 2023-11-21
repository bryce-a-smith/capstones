"use strict";

// import { locationsArray } from "./locationData";
// import { mountainsArray } from "./mountainData";
// import { nationalParksArray } from "./nationalParkData";
// import { parkTypesArray } from "./parkTypeData";

function init() {
  //Get html elements
  const searchBySelect = document.querySelector("#search-by-select");
  const criteriaSelect = document.querySelector("#criteria-select");
  const parkListSelect = document.querySelector("#park-list-select");
  const displayP = document.querySelector("#display-p");

  function clearParkList() {
    displayP.innerText = "";
  }

  function resetCriteriaSelect() {
    criteriaSelect.options.length = 0;

    let selectOption = new Option("Select...", "");

    criteriaSelect.appendChild(selectOption);
  }

  function resetParkListSelect() {
    parkListSelect.options.length = 0;

    let displayOption = new Option("Display...", "");
    let allOption = new Option("Display All", "all");

    parkListSelect.appendChild(displayOption);
    parkListSelect.appendChild(allOption);
  }

  function loadCriteriaSelect(searchOption) {
    resetCriteriaSelect();
    resetParkListSelect();

    if (searchOption == "location") {
      locationsArray.forEach((location) => {
        let option = new Option(location, location);
        criteriaSelect.appendChild(option);
      });
    } else if (searchOption == "type") {
      parkTypesArray.forEach((type) => {
        let option = new Option(type, type);
        criteriaSelect.appendChild(option);
      });
    } else if (searchOption == "") {
      resetCriteriaSelect();
    }
  }

  function loadParkListSelect(searchOption) {
    clearParkList();

    if (searchOption == "location") {
      loadParksByLocation(criteriaSelect.value);
    } else if (searchOption == "type") {
      loadParksByType(criteriaSelect.value);
    } else if (searchOption == "") {
      clearParkList();
    }
  }

  function loadParksByLocation(loc) {
    let parkList = nationalParksArray.filter((p) => p.State == loc);
    parkList.forEach((p) => {
      let option = new Option(p.LocationName, p.LocationID);
      parkListSelect.appendChild(option);
    });
  }

  function loadParksByType(type) {
    let parkList = nationalParksArray.filter((p) => p.LocationName.includes(type));
    parkList.forEach((p) => {
      let option = new Option(p.LocationName, p.LocationID);
      parkListSelect.appendChild(option);
    });
  }

  function onSelectionChanged() {
    if (searchBySelect.value == "") {
      resetCriteriaSelect();
      resetParkListSelect();
    } else {
      loadCriteriaSelect(searchBySelect.value);
    }
  }

  function onCriteriaSelectionChanged() {
    clearParkList();
    resetParkListSelect();
    loadParkListSelect(searchBySelect.value);
  }

  function onParkSelectionChanged() {
    clearParkList();

    populateParks();
  }

  function displayPark(park) {
    displayP.innerText += `${park.LocationName}\n`;
  }

  function populateParksByLocation(loc) {
    let parkList = nationalParksArray.filter((p) => p.State == loc);
    parkList.forEach((park) => {
      displayPark(park);
    });
  }

  function populateParksByType(type) {
    let parkList = nationalParksArray.filter((p) => p.LocationName.includes(type));
    parkList.forEach((park) => {
        displayPark(park);
    });
  }

  function populateParks() {
    clearParkList();

    if (parkListSelect.value == "all") {
      if (searchBySelect.value == "location") {
        populateParksByLocation(criteriaSelect.value);
      } else if (searchBySelect.value == "type") {
        populateParksByType(criteriaSelect.value);
      }
    } else {
      let park = nationalParksArray.find((p) => p.LocationID == parkListSelect.value);

      displayPark(park);
    }
  }

  //main
  loadCriteriaSelect();

  //Wire-up
  searchBySelect.addEventListener("change", onSelectionChanged);
  criteriaSelect.addEventListener("change", onCriteriaSelectionChanged);
  parkListSelect.addEventListener("change", onParkSelectionChanged);
}

window.onload = init;
