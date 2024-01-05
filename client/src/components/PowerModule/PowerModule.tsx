import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPowerModuleState } from '../../store/power-module/actions';
import { AppState, AppDispatch } from '../../store';
import './PowerModule.css';
import ParameterDisplay from '../ParameterDisplay/ParameterDisplay';
import CommandingPanel from '../CommandingPanel/CommandingPanel';
import NotificationsPanel from '../NotificationsPanel/NotificationsPanel';

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
        <ParameterDisplay payloads={payloads}></ParameterDisplay>
        <CommandingPanel payloads={payloads}></CommandingPanel>
      </div>
      <NotificationsPanel />
    </div>
  );
};

export default PowerModuleDisplay;
