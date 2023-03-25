import React, { useEffect, useRef } from 'react';

export default function MapComponent({ center, zoom, points }) {
  const ref = useRef();
  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627,
  //   },
  //   zoom: 11,
  // };

  console.log('points', points);

  center = center || defaultProps.center;
  zoom = zoom || defaultProps.zoom;

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    const pin = new google.maps.Marker(
      {
        position: center,
        title: 'Is this thing on?',
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
  }, []);

  return <div className="h-96 w-96" ref={ref} id="map" />;
}
