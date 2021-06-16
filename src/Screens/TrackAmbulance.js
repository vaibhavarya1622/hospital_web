import React from 'react'
import Header from "../Components/Myheader/Header";
import Activerideslist from "../Components/Googlemaps/ActiveridesList.js"
const TrackAmbulance = () => {
    return (
      <div>
        <Header location="track" />
        <Activerideslist/>
   

      </div>
    );
}

export default TrackAmbulance
