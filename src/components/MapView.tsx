import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { usePins } from '../context/PinContext';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';


const fetchAddress = async (lat: number, lng: number): Promise<string> => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await res.json();
    return data.display_name || 'Unknown';
  } catch {
    return 'Unknown';
  }
};


const MapEvents = () => {
 
  const { addPin, setLoading } = usePins();


  useMapEvents({
    click: async (e) => {
      setLoading(true)
      const { lat, lng } = e.latlng;
      const address = await fetchAddress(lat, lng);
      addPin({ id: uuidv4(), lat, lng, address, draggable: true });
    }
  });
  return null;
};



// Create custom icon
const customIcon = new L.Icon({
  iconUrl: "./icons/MapPin.svg",
  iconSize: [32, 32],      
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32],  
});


function MapView() {

  const { pins, updatePin, markerRefs, setLoading} = usePins();
  return (
    <MapContainer center={[-37.8136, 144.9631]} zoom={13} zoomControl={false} className="h-[55vh] sm:h-[100vh] w-full sm:rounded-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents />
      {pins.map((pin) => (
        <Marker
          icon={customIcon}
          key={pin.id}
          position={[pin.lat, pin.lng]}
          draggable={pin.draggable}
          ref={(marker) => {
            if (marker) markerRefs.current[pin.id] = marker;
          }}
          eventHandlers={{
            dragend: async (e) => {
              const marker = e.target as L.Marker;
              const { lat, lng } = marker.getLatLng();
              const address = await fetchAddress(lat, lng);
              updatePin(pin.id, { lat, lng, address });         
            },
          }}
        >
          <Popup>{pin.address}</Popup>
        </Marker>
      ))}

    </MapContainer>
  )
}

export default MapView
