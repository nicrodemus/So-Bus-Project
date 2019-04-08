var btn = document.getElementById("btn");
var reverseBtn = document.getElementById("reverse");
var searchBar = document.querySelectorAll(".searchBar");
var numPassengersBtn = document.querySelectorAll(".numPassengers");
var inpPassengers = document.querySelector("#inpPassengers");
var postBtn = document.getElementById("post");
btn.addEventListener("click", geocode);
btn.addEventListener("click", geocodeDestination);
reverseBtn.addEventListener("click", reverseInput1);
postBtn.addEventListener("click", postfunc);
var openerLogIn = document.querySelector("#openerLogIn");
//function addPassengers
var incremen = 0;
numPassengersBtn.forEach(function(el) {
  el.onclick = function() {
    //inp.value = i + " passengers"
    if (el.textContent == "+") {
      if (incremen > 9) {
        incremen = 9;
      }

      incremen++;

      inpPassengers.value = incremen + " passengers";
      console.log("i uguale a", incremen);
    } else {
      if (incremen > 2) {
        incremen--;
        inpPassengers.value = incremen + " passengers";
        console.log(i);
      } else {
        incremen = 1;
        inpPassengers.value = incremen + " passenger";
      }
    }
  };
});

function activatePlacesSearch() {
  var options = {
    types: ["geocode"],
    componentRestrictions: { country: "fr" }
  };

  searchBar.forEach(function(el) {
    let autocomplete = new google.maps.places.Autocomplete(el, options);
  });
}

activatePlacesSearch();

// first geocode function
function geocode(e) {
  e.preventDefault();
  var location = searchBar[0].value;
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyCoDBXFaIh8pew0NtdoPFt75-T3kw3vsO0"
      }
    })
    .then(function(response) {
      console.log("this is the responseeeeee:", response);

      console.log(response.data.results[0].formatted_address);
      var formattedAddress = response.data.results[0].formatted_address;
      var formattedAddressOutput = `
                <ul>
                    <li >${formattedAddress}<li>
                </ul>`;
      //adress component

      var addressComponents = response.data.results[0].address_components;
      var addressComponentsOutput = "<ul>";
      for (var i = 0; i < addressComponents.length; i++) {
        addressComponentsOutput += `<li> ${
          addressComponents[i].long_name
        }</li>`;
      }
      addressComponentsOutput += "</ul>";
      //coordinates
      var coordinateComponentes = response.data.results[0].geometry.location;
      var coordinateComponentsOutput = `<ul>
                    <li> latitude: ${coordinateComponentes.lat}</li>
                      <li> longitude :${coordinateComponentes.lng}</li>
                </ul>`;
      /////////////output to App
      document.getElementById(
        "formatted-address"
      ).innerHTML = formattedAddressOutput;
      document.getElementById(
        "address-components"
      ).innerHTML = addressComponentsOutput;
      document.getElementById(
        "coordinate-components"
      ).innerHTML = coordinateComponentsOutput;
      document.getElementById("infoFirst").style.backgroundColor =
        " rgba(255, 255, 255, 0.2)";

      console.log(coordinateComponentsOutput);
    })
    .catch(function(error) {
      console.log("there'as error", error);
    });
}
/////////////////////////////second geofunction
function geocodeDestination(e) {
  e.preventDefault();
  var destination = searchBar[1].value;
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: destination,
        key: "AIzaSyCoDBXFaIh8pew0NtdoPFt75-T3kw3vsO0"
      }
    })
    .then(function(response) {
      //log full of response
      console.log("this is the responseeeeee:", response);
      //console.log coordinates
      console.log(response.data.results[0].formatted_address);
      var formattedAddress = response.data.results[0].formatted_address;
      var formattedAddressOutput = `
                <ul>
                    <li>${formattedAddress}<li>
                </ul>`;
      //adress component

      var addressComponents = response.data.results[0].address_components;
      var addressComponentsOutput = "<ul>";
      for (var i = 0; i < addressComponents.length; i++) {
        addressComponentsOutput += `<li> ${
          addressComponents[i].long_name
        }</li>`;
      }
      addressComponentsOutput += "</ul>";
      //coordinates
      var coordinateComponentes = response.data.results[0].geometry.location;
      var coordinateComponentsOutput = `<ul>
                    <li> latitude: ${coordinateComponentes.lat}</li>
                      <li> longitude :${coordinateComponentes.lng}</li>
                </ul>`;
      /////////////output to App
      document.getElementById(
        "formatted-addressDest"
      ).innerHTML = formattedAddressOutput;
      document.getElementById(
        "address-componentsDest"
      ).innerHTML = addressComponentsOutput;
      document.getElementById(
        "coordinate-componentsDest"
      ).innerHTML = coordinateComponentsOutput;
      document.getElementById("infoSecond").style.backgroundColor =
        " rgba(255, 255, 255, 0.4)";
      //format address
    })
    .catch(function(error) {
      console.log("there'as error", error);
    });
}

////function switch value of two searchbar
function reverseInput1(el) {
  el.preventDefault();
  var data1 = searchBar[0].value;
  var data2 = searchBar[1].value;
  searchBar[0].value = data2;
  searchBar[1].value = data1;
  reverseBtn.onclick = function() {
    reverseInput2();
  };
}
function reverseInput2(el) {
  el.preventDefault();
  var data1 = searchBar[1].value;
  var data2 = searchBar[0].value;
  searchBar[1].value = data2;
  searchBar[0].value = data1;
  reverseBtn.onclick = function() {
    reverseInput1();
  };
}
/// function post to SoBus API ///
function postfunc(e) {
  e.preventDefault();
  var location = searchBar[0].value;
  var destination = searchBar[1].value;
  axios
    .all([
      axios.post("https://interview.sobus.fr:8080/autocomplete/", {
        key: "ImBuildingASearchBar",
        locale: "fr",
        term: location
      }),
      axios.post("https://interview.sobus.fr:8080/autocomplete/", {
        key: "ImBuildingASearchBar",
        locale: "fr",
        term: destination
      })
    ])
    .then(
      axios.spread((responseLoc, responseDest) => {
        console.log(
          "POSTSTSTSTSTSTSTSTSTSTSTSTSTSTSTSTS POST RESPONSE",
          responseLoc,
          responseDest
        );
      })
    )
    .catch(err => console.log("ERRRORORORO", err));
}
// Sign up section
openerLogIn.onclick = function() {
  var div = document.getElementById("signIn");
  if (div.style.display !== "none") {
    div.style.display = "none";
  } else {
    div.style.display = "flex";
  }
};
