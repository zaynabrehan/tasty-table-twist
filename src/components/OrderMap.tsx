import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const riderIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448360.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const restaurantIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const AnimatedRider = ({ start, end, progress }: { start: [number, number]; end: [number, number]; progress: number }) => {
  const map = useMap();
  const [position, setPosition] = useState(start);

  useEffect(() => {
    const lat = start[0] + (end[0] - start[0]) * progress;
    const lng = start[1] + (end[1] - start[1]) * progress;
    setPosition([lat, lng]);
    if (progress > 0) {
      map.flyTo([lat, lng], 14, { duration: 1 });
    }
  }, [progress, start, end, map]);

  if (progress === 0) return null;

  return <Marker position={position} icon={riderIcon} />;
};

interface OrderMapProps {
  branchCoords: [number, number];
  deliveryCoords: [number, number];
  riderProgress: number;
}

const OrderMap = ({ branchCoords, deliveryCoords, riderProgress }: OrderMapProps) => {
  return (
    <MapContainer
      center={branchCoords}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={branchCoords} icon={restaurantIcon} />
      <Marker position={deliveryCoords} icon={homeIcon} />
      <Polyline
        positions={[branchCoords, deliveryCoords]}
        pathOptions={{ color: "#f97316", weight: 4, dashArray: "10, 10" }}
      />
      <AnimatedRider start={branchCoords} end={deliveryCoords} progress={riderProgress} />
    </MapContainer>
  );
};

export default OrderMap;
