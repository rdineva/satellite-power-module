import './ParameterDisplay.css';
import { Payloads } from '../../types';

interface Props {
  payloads: Payloads;
}

const ParameterDisplay = ({ payloads }: Props) => {
  const { OBC, Camera } = payloads;
  const obcBatteryVoltage = OBC.batteryVoltage;
  const obcCurrentDraw = OBC.currentDraw;
  const cameraBatteryVoltage = Camera.batteryVoltage;
  const cameraCurrentDraw = Camera.currentDraw;

  return (
    <div className="parameters-display">
      <div className="parameters obc">
        <div className="title">OBC</div>
        <div className="voltage-display">
          <div className="parameter-value">{obcBatteryVoltage}V</div>
          <div>Pack 1 voltage</div>
        </div>
        <div className="current-draw-display">
          <div className="parameter-value">{obcCurrentDraw}A</div>
          <div>Payload 1 current draw</div>
        </div>
      </div>
      <div className="parameters">
        <div className="title">Camera</div>
        <div className="voltage-display">
          <div className="parameter-value">{cameraBatteryVoltage}V</div>
          <div>Pack 2 voltage</div>
        </div>
        <div className="current-draw-display">
          <div className="parameter-value">{cameraCurrentDraw}A</div>
          <div>Payload 2 current draw</div>
        </div>
      </div>
    </div>
  );
};

export default ParameterDisplay;
