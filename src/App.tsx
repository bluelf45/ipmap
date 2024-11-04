import { useState } from 'react';
import "leaflet/dist/leaflet.css";
import './App.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

const MapView = ({ lat, lng }:{lat:any, lng:any})  => {
  const map = useMap();
  map.setView([lat, lng], map.getZoom()); // Set view to new coordinates
  return <Marker position={[lat, lng]} />;
};

function App() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);

  const handleSearch = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_apifi_key}&ipAddress=${ip}`);
      const json = await response.json();
      if (!json.code) {
        setIp(json.ip);
        setLocation(json.location.country + ', ' + json.location.region);
        setTimezone(json.location.timezone);
        setIsp(json.isp.length < 1 ? "Not Found" : json.isp);
        setLat(json.location.lat);
        setLng(json.location.lng);
      } else {
        alert(json.messages);
        setIp("");
        setLocation("");
        setTimezone("");
        setIsp("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-desktop bg-cover p-10 relative z-10">
        <p className="text-white text-3xl font-semibold flex justify-evenly">IP Address Tracker</p>
        
        <div className="mt-4 relative">
          <form className="max-w-md mx-auto flex" onSubmit={handleSearch}>
            <input 
              type="search" 
              value={ip} 
              onChange={(e) => setIp(e.target.value)} 
              id="default-search" 
              className="p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-l bg-gray-50 focus:ring-blue-500" 
              placeholder="Search..."
            />
            <button type="submit" className="text-white bg-black  hover:invert rounded-r text-sm px-4 py-2">
            <img className=" p-1" src='src\assets\images\icon-arrow.svg' />
            </button>
          </form>
        </div>
        <div className="desktop:w-3/5 mobile:w-3/6 mx-auto mt-10">
          <div className="py-8 grid desktop:grid-cols-4 desktop:divide-x-2 mobile:grid-cols-1  bg-white rounded">
            <div className="px-4 text-center mobile:mt-0 desktop:mt-0">
              <p className="text-slate-600 font-semibold text-xl">IPAddress</p>
              <p className="text-2xl mt-2 font-bold">{ip}</p>
            </div>
            <div className="px-4 text-center mobile:mt-4 desktop:mt-0">
              <p className="text-slate-600 font-semibold text-xl">Location</p>
              <p className="text-2xl mt-2 font-bold">{location}</p>
            </div>
            <div className="px-4 text-center mobile:mt-4 desktop:mt-0">
              <p className="text-slate-600 font-semibold text-xl">Timezone</p>
              <p className="text-2xl mt-2 font-bold">{timezone}</p>
            </div>
            <div className="px-4 text-center mobile:mt-4 desktop:mt-0">
              <p className="text-slate-600 font-semibold text-xl">ISP</p>
              <p className="text-2xl mt-2 font-bold">{isp}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 'calc(100vh - 290px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, zIndex: 0 }}>
          <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapView lat={lat} lng={lng} />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default App;
