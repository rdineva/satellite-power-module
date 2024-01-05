import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPowerModuleState } from '../../store/power-module/actions';
import { AppState, AppDispatch } from '../../store';
import './PowerModule.css';
import CommandingPanel from '../CommandingPanel/CommandingPanel';
import NotificationsPanel from '../NotificationsPanel/NotificationsPanel';
import PayloadDisplay from '../PayloadDisplay/PayloadDisplay';

const PowerModuleDisplay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const intervalTime = 1000;

  const payloads = useSelector((state: AppState) => state.powerModule.fetchPowerModuleState);

  useEffect(() => {
    dispatch(fetchPowerModuleState());

    const intervalId = setInterval(() => {
      dispatch(fetchPowerModuleState());
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [dispatch, intervalTime]);

  return (
    <div className="power-module-display">
      <div className="power-module-state">
        <PayloadDisplay payloads={payloads} />
        <CommandingPanel payloads={payloads} />
      </div>
      <NotificationsPanel />
    </div>
  );
};

export default PowerModuleDisplay;
