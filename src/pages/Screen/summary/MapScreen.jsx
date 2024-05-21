import { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { getPlantAll } from '../../../services/Api/Get/GetPlantService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GreenMark from '../../../assets/icons/map/marker-icon2.png';
import RedMark from '../../../assets/icons/map/marker-icon.png';

import L from 'leaflet';

// Define custom icons for different audit statuses
const redIcon = new L.Icon({
  iconUrl: RedMark,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: 'red-marker'
});

const greenIcon = new L.Icon({
  iconUrl: GreenMark,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: 'green-marker'
});

function MapScreen() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getPlantAll();
      const data = response.filter(plant => plant.LAT !== '[NULL]' && plant.LNG !== '[NULL]');
      setPlants(data);
      console.log('Plants data:', data); // Debug: log the plants data
    }
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div style={{ height: '1000px' }}>
        <MapContainer center={[13.736717, 100.523186]} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {plants.map(plant => {
            // Debug: log the audit status of each plant
            console.log(`Plant ${plant.PLANT_NO} audit_status:`, plant.audit_status);

            // Ensure audit_status is treated as a string for comparison
            const auditStatus = String(plant.audit_status);

            return (
              <Marker
                key={plant.PLANT_NO}
                position={[parseFloat(plant.LAT), parseFloat(plant.LNG)]}
                icon={auditStatus === "0" ? redIcon : greenIcon}
              >
                <Popup>
                  {plant.NAME}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </MainLayout>
  );
}

export default MapScreen;
