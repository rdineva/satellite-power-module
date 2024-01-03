import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPowerModuleState } from '../store/actions';
import { AppState, AppDispatch } from '../store';

const PowerModuleDisplay: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const intervalTime = 1000;

  const payloads = useSelector((state: AppState) => state.fetchPowerModuleState);

  useEffect(() => {
    dispatch(fetchPowerModuleState());

    const intervalId = setInterval(() => {
      dispatch(fetchPowerModuleState());
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [dispatch, intervalTime]);

  return (
    <div>
      <h2>Power Module State</h2>
      {payloads && Object.entries(payloads).map(([key, payload]) => (
        <div key={key}>
          <h3>{key.toUpperCase()}</h3>
          <p>Battery Voltage: {payload.batteryVoltage}V</p>
          <p>Current Draw: {payload.currentDraw}A</p>
          <p>Connected: {payload.connected ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default PowerModuleDisplay;
