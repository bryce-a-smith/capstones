"use strict";

import { locationsArray } from "./locationData";
import { mountainsArray } from "./mountainData";
import { nationalParksArray } from "./nationalParkData";
import { parkTypesArray } from "./parkTypeData";

function init() {
//Get html elements
const searchBySelect = document.querySelector("#search-by-select");
const criteriaSelect = document.querySelector("#criteria-select");

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

function resetCriteriaSelect() {
    criteriaSelect.options.length = 0;

    let selectOption = new Option("Select...", "");

    criteriaSelect.appendChild(selectOption);
}

function loadCriteriaSelect(searchOption) {
    resetCriteriaSelect();

    if(searchOption == "location") {
        locationsArray.forEach(location => {
            let option = new Option(location, location);
            criteriaSelect.appendChild(option);
        });
    } else if (searchOption == "type") {
        parkTypesArray.forEach(type => {
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

//main
loadCriteriaSelect();

//Wire-up
searchBySelect.addEventListener("change", onSelectionChanged);


}

window.onload = init;