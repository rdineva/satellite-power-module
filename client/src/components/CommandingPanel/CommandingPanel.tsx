import { PayloadType, Payloads } from '../../types';
import './CommandingPanel.css';
import ApiService from '../../services/api-service';

interface Props {
  payloads: Payloads;
}

const CommandingPanel = ({ payloads }: Props) => {
  const onClicked = async (payloadType: PayloadType) => {
    try {
      const payload = payloads[payloadType];
      if (payload.connected) {
        ApiService.disconnectPayload(payloadType);
      } else {
        ApiService.connectPayload(payloadType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="commanding-panel">
      <div>Commanding</div>
      <div className="buttons-container">
        <button className="button" onClick={() => onClicked(PayloadType.OBC)}>
          {payloads.OBC.connected ? 'Disconnect' : 'Connect'} OBC
        </button>
        <button className="button" onClick={() => onClicked(PayloadType.Camera)}>
          {payloads.Camera.connected ? 'Disconnect' : 'Connect'} Camera
        </button>
      </div>
    </div>
  );
};

export default CommandingPanel;
