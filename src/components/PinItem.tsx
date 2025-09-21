import { Pin } from '../types/pin';
import { usePins } from '../context/PinContext';

function PinItem({ pins, pin, orderId }: { pins: Pin[]; pin: Pin; orderId: number }) {
  const { removePin, markerRefs } = usePins();

  const handleMouseEnter = () => {
    const marker = markerRefs.current[pin.id];
    if (marker) marker.openPopup();
  };

  const handleMouseLeave = () => {
    const marker = markerRefs.current[pin.id];
    if (marker) marker.closePopup();
  };

  return (
    <li
      className={`grid grid-cols-[auto_1fr_auto] items-center p-4 gap-4 ${
        pins?.length === orderId ? '' : 'border-b'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="h-8 w-8 bg-gray-100 border rounded-full inline-block text-blue-600 text-center leading-[27px]">
        #{orderId || '1'}
      </span>
      <div>
        <p className="text-sm font-medium mb-2 text-xs">
          {pin.address === 'Unknown' ? `Pin #${orderId}` : pin.address}
        </p>
        <p className="text-xs text-gray-500">
          <span className="flex items-center">
            <img
              className="w-3 mr-1"
              src="./icons/location.png"
              alt="Locator Icon"
              title="Locater icon"
            />{' '}
            {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
          </span>
        </p>
      </div>
      <button
        onClick={() => {
            
            removePin(pin.id)
        }}
        className="border border:dark rounded-full h-8 w-8 p-1.5 hover:bg-gray-100 trasition-background duration-75"
      >
        <img src="./icons/delete.png" alt="delete" title="Delete the pinned location" />
      </button>
    </li>
  );
}

export default PinItem;
