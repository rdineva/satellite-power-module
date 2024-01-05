import { PayloadType } from '../../types';

interface Props {
  payloadType: PayloadType;
  connected: boolean;
  onClick: (payloadType: PayloadType) => void;
}

const CommandingButton = ({ payloadType, connected, onClick }: Props) => (
  <button className="button" onClick={() => onClick(payloadType)}>
    {connected ? 'Disconnect' : 'Connect'} {payloadType}
  </button>
);

export default CommandingButton;