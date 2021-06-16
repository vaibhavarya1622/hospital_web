import React, { useEffect, useState, useContext } from "react";
import "../../css/Maphomepage.css";
import Geocode from "react-geocode";
import "font-awesome/css/font-awesome.min.css";
import { ContactSupportOutlined } from "@material-ui/icons";
var service, map, infoWindow, markers, a, b;
Geocode.setApiKey("AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU");
Geocode.setLanguage("en");

const HomePageSideMap = (props) => {
  const [myposition, setmyposition] = useState([]);
  function toggleBounce() {
    if (markers.getAnimation() !== null) {
      markers.setAnimation(null);
    } else {
      markers.setAnimation(window.google.maps.Animation.BOUNCE);
    }
  }

  const [mylocationcoordinates, setlocationcoordinates] = useState([]);
  const [myaddress, setaddress] = useState("");
  /*--------------user current location------*/
    const myLocation = () => {
    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setmyposition(pos);
          markers.setPosition(pos);
          map.setCenter(pos);
           Geocode.fromLatLng(pos.lat, pos.lng).then(
             (response) => {
               var address = response.results[0].formatted_address;
               console.log(address);
               infoWindow.setContent(address);

               // map.panTo(place.geometry.location);

               infoWindow.open(map, markers);
               setaddress(address);
             },
             (error) => {
               console.error(error);
             }
           );
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  
  };
  /*-------------user cyrrent location------------*/

  useEffect(() => {
    renderMap();
  }, []);

  const renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=places&callback=initMap"
    );
    window.initMap = initMap;
  };
  var initMap = () => {
   
    if (document.getElementById("map")) {
      
      map = new window.google.maps.Map(document.getElementById("map"), {
        // center: { lat: 22.9734229, lng: 78.6568942 },
        zoom: 13,
        streetViewControl: true,
        mapTypeControl: true,
        zoomControlOptions: true,
      });
      /*---marker icon style----*/
      var markericon = {
        url: "https://www.carmelindustries.com/wp-content/uploads/2020/07/location-icon.png", // url
        scaledSize: new window.google.maps.Size(50, 50), // scaled size
        origin: new window.google.maps.Point(0, 0), // origin
        anchor: new window.google.maps.Point(0, 0), // anchor
      };

      /*---marker icon style----*/

      infoWindow = new window.google.maps.InfoWindow({});

      infoWindow.setContent("Location found.");
      markers = new window.google.maps.Marker({
        map,
        // icon: markericon,
        animation: window.google.maps.Animation.DROP,
        draggable: true,
        // position: { lat: 22.9734229, lng: 78.6568942 },
      });
      myLocation();

      markers.addListener("click", toggleBounce);

     
      new window.google.maps.event.addListener(markers, "dragend", (event) => {
        props.setGuardianCoords([
          markers.getPosition().lat(),
          markers.getPosition().lng(),
        ]);

        console.log("iam dragged");
        Geocode.fromLatLng(
          markers.getPosition().lat(),
          markers.getPosition().lng()
        ).then(
          (response) => {
            var address = response.results[0].formatted_address;
            console.log(address);
            infoWindow.setContent(address);
            // markers.setPosition(place.geometry.location);
            // // map.panTo(place.geometry.location);
            // infoWindow.setPosition(place.geometry.location);
            // infoWindow.open(map, markers);
            setaddress(address);
          },
          (error) => {
            console.error(error);
          }
        );
        infoWindow.open(map, markers);
        infoWindow.setPosition(npos);
        map.panTo(npos);

        var lat, lng;
        var npos = {
          lat: markers.getPosition().lat(),
          lng: markers.getPosition().lng(),
        };
        console.log(npos);
      });

      const input = document.getElementById("mapsearch");
      const searchBox = new window.google.maps.places.SearchBox(input);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }
        // For each place, get the icon, name and location.
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }

          const mypositioncoordinates = [
            place.geometry.location.lat(),
            place.geometry.location.lng(),
          ];

          // setaddressCoordinates([
          //   mypositioncoordinates[0],
          //   mypositioncoordinates[1]
          // ]);
          props.setGuardianCoords([
            mypositioncoordinates[0],
            mypositioncoordinates[1],
          ]);

          console.log(mylocationcoordinates);
          var address = "";

          Geocode.fromLatLng(
            mypositioncoordinates[0],
            mypositioncoordinates[1]
          ).then(
            (response) => {
              address = response.results[0].formatted_address;
              console.log(address);
              infoWindow.setContent(address);
              markers.setPosition(place.geometry.location);
              // map.panTo(place.geometry.location);
              infoWindow.setPosition(place.geometry.location);
              infoWindow.open(map, markers);
              setaddress(address);
            },
            (error) => {
              console.error(error);
            }
          );
          console.log(address);
          https: map.setZoom(15);
        });
        map.fitBounds(bounds);
      });
      //searchbox end
    }

    //geolocation start
  
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(
      //     (position) => {
      //       const pos = {
      //         lat: position.coords.latitude,
      //         lng: position.coords.longitude,
      //       };
      //       setmyposition(pos);
      //       map.setCenter(pos);
      //       map.setZoom(15);
      //     },
      //     () => {
      //       handleLocationError(true, infoWindow, map.getCenter());
      //     }
      //   );
      // } else {
      //   // Browser doesn't support Geolocation
      //   handleLocationError(false, infoWindow, map.getCenter());
      // }
    
  };
  useEffect(() => {
    if (markers && map && props.myusers.location) {
      var address = "";

      Geocode.fromLatLng(
        props.myusers.location.coordinates[0],
        props.myusers.location.coordinates[1]
      ).then(
        (response) => {
          address = response.results[0].formatted_address;
          console.log(address);
          infoWindow.setContent(address);
        },
        (error) => {
          console.error(error);
        }
      );

      // map.panTo(place.geometry.location);
      infoWindow.setPosition({
        lat: props.myusers.location.coordinates[0],
        lng: props.myusers.location.coordinates[1],
      });
      infoWindow.open(map, markers);
      markers.setPosition({
        lat: props.myusers.location.coordinates[0],
        lng: props.myusers.location.coordinates[1],
      });
      map.panTo({
        lat: props.myusers.location.coordinates[0],
        lng: props.myusers.location.coordinates[1],
      });
    }
  }, [props.myusers]);
  //geolocation end
  return (
    <main>
      <div id="searchbar">
        <input
          placeholder="Search the Location                              &#xF002;"
          // placeholder="Search the Location                              🔍"
          className="input"
          id="mapsearch"
        />
      </div>

      {/* <span>Address: <input style={{outline:"none",margin:"4px 0" ,width:"50%",padding:'4px',borderRadius:"30px"}}value={myaddress}></input></span> */}
      <div className="indexMaphomepage" id="map"></div>
    </main>
  );
};

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default HomePageSideMap;
