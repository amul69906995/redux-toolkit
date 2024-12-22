import { useSelector, useDispatch } from 'react-redux';
import { addLocationToBackend } from './redux/locationSlice';
import { useState } from 'react';
import { RootState,AppDispatch } from './redux/store'; // Assuming you export your RootState from the store

const ReduxWay = () => {
  const [latlng, setLatlng] = useState<{ lat: number | undefined; lng: number | undefined }>({
    lat: undefined,
    lng: undefined,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, location } = useSelector((state: RootState) => state.location);

  const handleSubmit = () => {
    const updatedLatLng = { lat: 25, lng: 25 }; // Example values
    setLatlng(updatedLatLng);
    dispatch(addLocationToBackend(updatedLatLng));
  };

  return (
    <>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Setting Location...' : 'Set Location'}
      </button>
      {error && <p>Error: {error}</p>}
      <p>Current Location: {`Lat: ${location.lat}, Lng: ${location.lng}`}</p>
    </>
  );
};

export default ReduxWay;

