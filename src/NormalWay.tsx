import { useEffect, useState } from "react";

const api = "YOUR_BACKEND_API_ENDPOINT";

const NormalWay = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
          setLocation(null);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const sendData = async () => {
    if (!location) return; // Prevent sending data if location is not available
    setIsLoading(true);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      });
      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message); // Safe to access 'message' now
          } else {
            console.error("An unknown error occurred:", error);
          }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      sendData();
    }
  }, [location]);

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      {isLoading && <p>Loading...</p>}
      {location && (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NormalWay;

