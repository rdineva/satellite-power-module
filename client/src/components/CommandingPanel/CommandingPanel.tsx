import { PayloadType, Payloads } from '../../types';
import './CommandingPanel.css';
import ApiService from '../../services/api-service';
import { useCallback } from 'react';
import CommandingButton from '../CommandingButton/CommandingButton';

interface Props {
  payloads: Payloads;
}

const CommandingPanel = ({ payloads }: Props) => {
  const onClicked = useCallback(async (payloadType: PayloadType) => {
    try {
      const payload = payloads[payloadType];
      payload.connected
        ? await ApiService.disconnectPayload(payloadType)
        : await ApiService.connectPayload(payloadType);
    } catch (error) {
      console.error(error);
    }
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
