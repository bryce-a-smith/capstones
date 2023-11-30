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
  const displayParksDiv = document.querySelector("#display-parks-div");

  const mountainSelect = document.querySelector("#mountain-select");
  const displayMountainsDiv = document.querySelector("#display-mountains-div");

  function clearParkList() {
    while(displayParksDiv.firstChild) {
      displayParksDiv.removeChild(displayParksDiv.firstChild);
    }
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
    let currentCard = document.createElement("div");

    let currentH3 = document.createElement("h3");
    let currentH5 = document.createElement("h5");
    let currentP = document.createElement("p");
    let currentP2 = document.createElement("p");

    currentCard.classList.add("card");


    currentH3.innerText = park.LocationName;
    currentH5.innerText = `${park.Address}\n${park.City}, ${park.State} ${park.ZipCode}`;
    currentP.innerText = `Phone: ${park.Phone}\nFax: ${park.Fax}`;
    currentP2.innerText = `(${park.Latitude},${park.Longitude})`;



    currentCard.appendChild(currentH3);
    currentCard.appendChild(currentH5);
    currentCard.appendChild(currentP);
    currentCard.appendChild(currentP2);

    if(park.Visit) {
      let currentA = document.createElement("a");

      currentA.href = park.Visit;
      currentA.innerText = park.Visit;
      currentA.target = "_blank";

      currentCard.appendChild(currentA);
    }

    displayParksDiv.appendChild(currentCard);
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

  ////

  function clearMountainList() {
    while(displayMountainsDiv.firstChild) {
      displayMountainsDiv.removeChild(displayMountainsDiv.firstChild);
    }
  }

  function displayMountain(m) {
    let currentCard = document.createElement("div");
    let currentImage = document.createElement("img");
    let currentH3 = document.createElement("h3");
    let currentH5 = document.createElement("h5");
    let currentP = document.createElement("p");
    let currentP2 = document.createElement("p");

    currentCard.classList.add("card");

    currentImage.src = `images/${m.img}`;
    currentH3.innerText = m.name;
    currentH5.innerText = m.effort;
    currentP.innerText = m.desc;
    currentP2.innerText = `(${m.coords.lat},${m.coords.lng})`;


    currentCard.appendChild(currentImage);
    currentCard.appendChild(currentH3);
    currentCard.appendChild(currentH5);
    currentCard.appendChild(currentP);
    currentCard.appendChild(currentP2);

    displayMountainsDiv.appendChild(currentCard);
  }

  function populateMountains() {
    if (mountainSelect.value == "all") {
      mountainsArray.forEach((mountain) => {
        displayMountain(mountain);
      });
    } else {
      mountainsArray.forEach((mountain) => {
        if (mountain.name == mountainSelect.value) {
          displayMountain(mountain);
        }
      });
    }
  }

  function loadMountainSelect() {
    let mountainList = [];

    mountainsArray.forEach((mountain) => {
      let option = new Option(mountain.name, mountain.name);
      mountainSelect.appendChild(option);
    });
  }

  function onMountainSelectChanged() {
    clearMountainList();

    populateMountains();
  }

  //Wire-up
  if (searchBySelect) {
    loadCriteriaSelect();

    searchBySelect.addEventListener("change", onSelectionChanged);
    criteriaSelect.addEventListener("change", onCriteriaSelectionChanged);
    parkListSelect.addEventListener("change", onParkSelectionChanged);
  }
  if (mountainSelect) {
    loadMountainSelect();

    mountainSelect.addEventListener("change", onMountainSelectChanged);
  }
}

window.onload = init;
