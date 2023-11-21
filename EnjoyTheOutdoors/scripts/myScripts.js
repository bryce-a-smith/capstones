"use strict";

// import { locationsArray } from "./locationData";
// import { mountainsArray } from "./mountainData";
// import { nationalParksArray } from "./nationalParkData";
// import { parkTypesArray } from "./parkTypeData";

function init() {
  //Get html elements
  const searchBySelect = document.querySelector("#search-by-select");
  const criteriaSelect = document.querySelector("#criteria-select");
  const displayP = document.querySelector("#display-p");

  //Functions
  // function getLocationList() {
  //     let locationList = [];
  //     nationalParksArray.forEach(park => {
  //         let isPresent = false;
  //         for (const l of locationList) {
  //             if(park.LocationID == l.locationId) {
  //                 isPresent = true;
  //             }
  //         }
  //         if(!isPresent) {
  //             let newLocation = {
  //                 locationId: park.LocationID,
  //                 locationName: park.LocationName
  //             }
  //             locationList.push(newLocation);
  //         }
  //     });
  //     return locationList;
  // }

  function clearParkList() {
    displayP.innerText = "";
  }

  function resetCriteriaSelect() {
    criteriaSelect.options.length = 0;

    let selectOption = new Option("Select...", "");

    criteriaSelect.appendChild(selectOption);
  }

  function loadCriteriaSelect(searchOption) {
    resetCriteriaSelect();

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

  function onSelectionChanged() {
    if (searchBySelect.value == "") {
      resetCriteriaSelect();
    } else {
      loadCriteriaSelect(searchBySelect.value);
    }
  }

  function onCriteriaSelectionChanged() {
    clearParkList();
    loadCriteriaBasedList(searchBySelect.value);
  }

  function populateParksByLocation(loc) {
    let parkList = nationalParksArray.filter((p) => p.State == loc);
    parkList.forEach((park) => {
      displayP.innerText += `${park.LocationName}\n`;
    });
  }

  function populateParksByType(type) {
    let parkList = nationalParksArray.filter((p) => p.LocationName.includes(type));
    parkList.forEach((park) => {
      displayP.innerText += `${park.LocationName}\n`;
    });
  }

  function loadCriteriaBasedList(searchOption) {
    if (searchOption == "location") {
      populateParksByLocation(criteriaSelect.value);
    } else if (searchOption == "type") {
      populateParksByType(criteriaSelect.value);
    } else if (searchOption == "") {
      clearParkList();
    }
  }

  //main
  loadCriteriaSelect();

  //Wire-up
  searchBySelect.addEventListener("change", onSelectionChanged);
  criteriaSelect.addEventListener("change", onCriteriaSelectionChanged);
}

window.onload = init;
