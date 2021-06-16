import React from 'react'
import Header from "../Components/Myheader/Header";
import PastRides from "../Components/Googlemaps/PastRidesTable"

const Pastride = () => {
    return (
      <div>
        <Header location="pastride" />
        <PastRides/>
      </div>
    );
}

export default Pastride
