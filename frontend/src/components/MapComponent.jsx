import React, { useState, useEffect } from 'react';

const MapComponent = () => {
    const [lat, setLat] = useState(28.6139);
    const [lon, setLon] = useState(77.2090);
    const [trackingActive, setTrackingActive] = useState(false);
    const [vehicleType, setVehicleType] = useState('Ambulance');
    const [eta, setEta] = useState('5 mins');
    const [showDoctors, setShowDoctors] = useState(false);

    // City presets
    const cities = [
        { name: "Delhi", lat: 28.6139, lon: 77.2090 },
        { name: "Indore", lat: 22.7196, lon: 75.8577 },
        { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
        { name: "Bangalore", lat: 12.9716, lon: 77.5946 }
    ];

    const nearbyDoctors = [
        { id: 1, name: "Dr. Sharma", specialty: "Cardiologist", distance: "0.8 km away", timing: "10:00 AM - 04:00 PM" },
        { id: 2, name: "Dr. Priya Verma", specialty: "General Physician", distance: "1.5 km away", timing: "09:00 AM - 08:00 PM" },
        { id: 3, name: "Dr. R. K. Gupta", specialty: "Pediatrician", distance: "2.3 km away", timing: "11:00 AM - 06:00 PM" },
    ];

    // Live vehicle movement simulation (Jaise Rapido/Ola mein live chalta hai)
    useEffect(() => {
        let interval;
        if (trackingActive) {
            interval = setInterval(() => {
                setLat((prev) => prev + 0.0005);
                setLon((prev) => prev + 0.0005);
            }, 3000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [trackingActive]);

    const changeCity = (cityLat, cityLon) => {
        setLat(cityLat);
        setLon(cityLon);
        setTrackingActive(false);
    };

    const startAmbulance = () => {
        setVehicleType('Ambulance');
        setTrackingActive(true);
        setEta('3 mins 🚑');
    };

    const startBike = () => {
        setVehicleType('Doctor Bike (Rapido Style)');
        setTrackingActive(true);
        setEta('6 mins 🏍️');
    };

    const startCar = () => {
        setVehicleType('Home Visit Car');
        setTrackingActive(true);
        setEta('10 mins 🚗');
    };

    const bboxMinLon = lon - 0.01;
    const bboxMinLat = lat - 0.01;
    const bboxMaxLon = lon + 0.01;
    const bboxMaxLat = lat + 0.01;
    const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=" + bboxMinLon + "," + bboxMinLat + "," + bboxMaxLon + "," + bboxMaxLat + "&layer=mapnik&marker=" + lat + "," + lon;

    return (
        <div style={{ maxWidth: '650px', margin: '24px auto', padding: '20px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)', fontFamily: 'sans-serif' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                    <h3 style={{ fontWeight: '700', fontSize: '18px', margin: '0 0 4px 0', color: '#111827' }}>
                        🏥 Live Map & Emergency Tracking
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Real-time location & fleet tracking</p>
                </div>
                <span style={{ fontSize: '11px', background: trackingActive ? '#dcfce7' : '#f3f4f6', color: trackingActive ? '#15803d' : '#4b5563', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>
                    {trackingActive ? '🟢 Live Tracking On' : '⚪ Standby'}
                </span>
            </div>

            {/* City Quick Switcher */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', alignSelf: 'center', color: '#374151' }}>City:</span>
                {cities.map((city) => (
                    <button 
                        key={city.name}
                        onClick={() => changeCity(city.lat, city.lon)}
                        style={{ padding: '6px 12px', fontSize: '12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}
                    >
                        📍 {city.name}
                    </button>
                ))}
            </div>

            {/* Emergency & Rapido Style Booking Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <button onClick={startAmbulance} style={{ padding: '10px', fontSize: '12px', fontWeight: '600', background: vehicleType.includes('Ambulance') && trackingActive ? '#dc2626' : '#f9fafb', color: vehicleType.includes('Ambulance') && trackingActive ? '#fff' : '#374151', border: '1px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer' }}>
                    🚑 Ambulance
                </button>
                <button onClick={startBike} style={{ padding: '10px', fontSize: '12px', fontWeight: '600', background: vehicleType.includes('Bike') && trackingActive ? '#2563eb' : '#f9fafb', color: vehicleType.includes('Bike') && trackingActive ? '#fff' : '#374151', border: '1px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer' }}>
                    🏍️ Doctor Bike
                </button>
                <button onClick={startCar} style={{ padding: '10px', fontSize: '12px', fontWeight: '600', background: vehicleType.includes('Car') && trackingActive ? '#16a34a' : '#f9fafb', color: vehicleType.includes('Car') && trackingActive ? '#fff' : '#374151', border: '1px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer' }}>
                    🚗 Home Visit
                </button>
            </div>

            {/* Find Nearby Doctors Toggle Button */}
            <button 
                onClick={() => setShowDoctors(!showDoctors)} 
                style={{ width: '100%', padding: '12px', fontSize: '13px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '16px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
            >
                {showDoctors ? 'Hide Nearby Doctors ✖️' : '🔍 Find Doctors Near My Location'}
            </button>

            {/* Map Container */}
            <div style={{ position: 'relative', height: '280px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e5e7eb', marginBottom: '14px' }}>
                <iframe
                    title="Live Tracking Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    src={mapUrl}
                    style={{ border: 0 }}
                ></iframe>
            </div>

            {/* Tracking Active Status Card */}
            {trackingActive && (
                <div style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                        <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 2px 0' }}>Vehicle en route: {vehicleType}</p>
                        <p style={{ fontSize: '12px', color: '#1d4ed8', margin: 0 }}>Estimated Arrival Time (ETA): <strong style={{ color: '#1e40af' }}>{eta}</strong></p>
                    </div>
                    <button onClick={() => setTrackingActive(false)} style={{ background: '#ef4444', color: '#fff', border: 'none', fontSize: '12px', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                        Cancel Trip
                    </button>
                </div>
            )}

            {/* Nearby Doctors Section */}
            {showDoctors && (
                <div style={{ marginTop: '16px', borderTop: '2px dashed #e5e7eb', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>🏥 Recommended Doctors Near You:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {nearbyDoctors.map((doc) => (
                            <div key={doc.id} style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 2px 0' }}>{doc.name}</p>
                                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px 0' }}>{doc.specialty} • <strong style={{ color: '#2563eb' }}>{doc.distance}</strong></p>
                                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Timing: {doc.timing}</p>
                                </div>
                                <button style={{ background: '#10b981', color: '#fff', border: 'none', fontSize: '12px', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Book
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;