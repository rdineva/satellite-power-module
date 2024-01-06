import './PayloadDisplay.css';
import { PayloadType, Payloads } from '../../types';
import PayloadParameters from '../PayloadParameters/PayloadParameters';

interface Props {
  payloads: Payloads;
}

const PayloadDisplay = ({ payloads }: Props) => {
  const { OBC, Camera } = payloads;

  return (
    <div className="parameters-display">
      <PayloadParameters
        payloadType={PayloadType.OBC}
        voltage={OBC.voltage}
        currentDraw={OBC.currentDraw}
      />
      <PayloadParameters
        payloadType={PayloadType.Camera}
        voltage={Camera.voltage}
        currentDraw={Camera.currentDraw}
      />
    </div>
  );
};

export default PayloadDisplay;
