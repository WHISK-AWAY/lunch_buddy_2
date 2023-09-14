import React, { useEffect, useRef } from 'react';
import { default as mapPinBlue } from '../assets/icons/map-pin-blue.png';

export default function MapComponent({ center, zoom, points }) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    const pin = new google.maps.Marker(
      {
        position: center,
        icon: {
          url: mapPinBlue,
          scaledSize: new google.maps.Size(20, 30),
        },
        title: 'You are here!',
      },
      []
    );
    pin.setMap(map);

    if (points.businesses?.length > 0) {
      for (let i = 0; i < points.businesses.length; i++) {
        const rest = new google.maps.Marker({
          position: {
            lat: points.businesses[i].coordinates.latitude,
            lng: points.businesses[i].coordinates.longitude,
          },
          title: points.businesses[i].name,
        });

        rest.setMap(map);
      }
    }
  }, [points]);

  return (
    <div
      className="w-full  rounded-lg shadow-md landscape:lg:w-full landscape:lg:h-[80svh] landscape:xl:h-[87svh]  h-[40svh] landscape:h-[70svh] landscape:w-[50svw]"
      ref={ref}
      id="map"
    />
  );
}
