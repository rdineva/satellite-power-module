import { PayloadType } from '../../types';
import './PayloadParameters.css';

interface Props {
  payloadType: PayloadType;
  voltage: number;
  currentDraw: number;
}

const PayloadParameters = ({ payloadType, voltage, currentDraw }: Props) => {
  const index = payloadType === PayloadType.OBC ? '1' : '2';
  const isObcClass = payloadType === PayloadType.OBC ? 'obc' : '';

  return (
    <div className={`parameters ${isObcClass}`}>
      <div className="payload-title">{payloadType}</div>
      <div className="parameter">
        <div className="parameter-value">{voltage}V</div>
        <div>Pack {index} label</div>
      </div>
      <div className="parameter">
        <div className="parameter-value">{currentDraw}A</div>
        <div>Payload {index} current draw</div>
      </div>
    </div>
  );
};

export default PayloadParameters;