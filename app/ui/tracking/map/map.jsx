"use client";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import LeafletRouting from "./leaflet-routing";

export default function MyMap({ order }) {
  if (!order.deliveryLocation || !order?.riderLocation) {
    return (
      <div className="text-center py-4 bg-black rounded-t">
        <p className="font-semibold">No data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <MapContainer
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletRouting
          startCord={[order?.riderLocation?.lat, order?.riderLocation?.long]}
          endCord={[
            order?.deliveryLocation?.lat,
            order?.deliveryLocation?.long,
          ]}
          deliveryAddress={order?.deliveryAddress}
        />
      </MapContainer>
    </div>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   LayersControl,
//   Marker,
//   Popup,
//   Polyline,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";

// export default function MyMap({ order }) {
//   if (!order.deliveryLocation) {
//     return (
//       <div className="text-center py-4 bg-black rounded-t">
//         <p className="font-semibold">No data available.</p>
//       </div>
//     );
//   }
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current) {
//       const map = mapRef.current.leafletElement;

//       // Initialize Routing Control
//       L.Routing.control({
//         waypoints: [
//           L.latLng(23.340954, 85.311643), // Rider position
//           L.latLng(order?.deliveryLocation?.lat, order?.deliveryLocation?.long), // Delivery location
//         ],
//         routeWhileDragging: true,
//       }).addTo(map);
//     }
//   }, [mapRef, order]);

//   return (
//     <div className="w-full h-[200px]">
//       <MapContainer
//         // center={[order?.deliveryLocation?.lat, order?.deliveryLocation?.long]}
//         center={[23.340954, 85.311643]}
//         zoom={15}
//         scrollWheelZoom={true}
//         style={{ height: "100%", width: "100%" }}
//         ref={mapRef}
//       >
//         <LayersControl position="topright">
//           <LayersControl.BaseLayer checked name="Map">
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <Marker
//               position={[
//                 order?.deliveryLocation?.lat,
//                 order?.deliveryLocation?.long,
//               ]}
//               draggable={true}
//               animate={true}
//             >
//               <Popup>
//                 {order?.deliveryAddress
//                   ? order?.deliveryAddress
//                   : "Delivery Address"}
//               </Popup>
//             </Marker>
//             <Marker
//               position={[23.340954, 85.311643]}
//               draggable={true}
//               animate={true}
//             >
//               <Popup>Rider</Popup>
//             </Marker>
//             {/* <Polyline
//           positions={[
//             [23.340954, 85.311643],
//             [order?.deliveryLocation?.lat, order?.deliveryLocation?.long],
//           ]}
//           color="black"
//         /> */}
//           </LayersControl.BaseLayer>
//         </LayersControl>
//       </MapContainer>
//       <style jsx>{`
//         .leaflet-div-icon {
//           background: #ff0000; /* Set your desired color */
//           border: 2px solid #ffffff; /* Set a border color if needed */
//           border-radius: 50%;
//         }
//       `}</style>
//     </div>
//   );
// }
