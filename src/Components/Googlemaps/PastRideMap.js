import React, {useEffect} from "react";
import "./../../css/PastRideMap.css"
import hospitalicon from "../../images/hospitalicon.png";
import usericon from "../../images/usericon.png";

let map,usermarker,hospitalmarker;

const IndexMap =(props)=> {
  useEffect(() => {
    if (map && props.rideDetail.pickupcoordinates.length > 0) {
      map.setCenter({
        lat: props.rideDetail.pickupcoordinates[0],
        lng: props.rideDetail.pickupcoordinates[1],
      });
      usermarker.setPosition({
        lat: props.rideDetail.pickupcoordinates[0],
        lng: props.rideDetail.pickupcoordinates[1],
      });
      usermarker.setMap(map);
      hospitalmarker.setPosition({
        lat: props.rideDetail.hospitalcoordinates[0],
        lng: props.rideDetail.hospitalcoordinates[1],
      });
      hospitalmarker.setMap(map);
    }
  }, [props.rideDetail]);

 const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center:{lat:26,lng:78},
        zoom: 10,
        mapTypeControl: false,
        streetViewControl:false,
        fullscreenControl:false,
      });
      usermarker = new window.google.maps.Marker({
        icon: {
          url: usericon,
          scaledSize: new window.google.maps.Size(60, 60),
        },
        animation: window.google.maps.Animation.DROP,
      });
      hospitalmarker = new window.google.maps.Marker({
        icon: {
          url: hospitalicon,
          scaledSize: new window.google.maps.Size(60, 60),
        },
        animation: window.google.maps.Animation.DROP,
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