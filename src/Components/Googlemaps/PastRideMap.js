import React, {useEffect} from "react";
import "./../../css/PastRideMap.css"

let map;

const IndexMap =(props)=> {
 const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center:{lat:26,lng:78},
        zoom: 15,
        mapTypeControl: false,
        streetViewControl:false,
        fullscreenControl:false,
      });

  };
  const renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=geometry&callback=initMap"
    );
    window.initMap = initMap;
  }
  useEffect(()=>{
    renderMap()
  },[])
  
    return (
        <div id="map" className="map"></div>
    );
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
export default IndexMap;