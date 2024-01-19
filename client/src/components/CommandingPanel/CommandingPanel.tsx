import { PayloadType, Payloads } from '../../types';
import './CommandingPanel.css';
import { useCallback } from 'react';
import CommandingButton from '../CommandingButton/CommandingButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { connectPayload, disconnectPayload } from '../../store/power-module/actions';

interface Props {
  payloads: Payloads;
}

const CommandingPanel = ({ payloads }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClicked = useCallback((payloadType: PayloadType) => {
    const payload = payloads[payloadType];
    payload.connected ? dispatch(disconnectPayload(payloadType))
      : dispatch(connectPayload(payloadType));
  }, [payloads]);

  return (
    <div className="commanding-panel">
      <div>Commanding</div>
      <div className="buttons-container">
        <CommandingButton payloadType={PayloadType.OBC} connected={payloads.OBC.connected} onClick={onClicked} />
        <CommandingButton payloadType={PayloadType.Camera} connected={payloads.Camera.connected} onClick={onClicked} />
      </div>
    </div>
  );
};

export default CommandingPanel;
