import { usePins } from '../context/PinContext';
import PinItem from './PinItem';

function PinList() {
    const { pins } = usePins();
    return (
        <div className="bg-white overflow-hidden shadow rounded-tl-lg rounded-tr-lg lg:rounded-lg sm:absolute h-[45vh] lg:h-[88vh] z-[1000] sm:min-w-80 sm:max-w-80 bottom-[0] lg:top-[55%] transform lg:-translate-y-[55%] sm:left-[20px] flex flex-col">
            {/* Header stays fixed */}
            <h2 className="lg:text-lg font-bold border-b p-2 lg:p-4">Pin Lists</h2>

            {/* Content */}
            {!pins.length ? (
                <div className={"flex-1 flex lg:block lg:mt-10 flex-col items-center justify-center text-center"}>
                    <picture className="inline-block mb-4">
                        <source media="(max-width: 640px)" srcSet="./icons/location.png" />
                        <source media="(min-width: 641px)" srcSet="./icons/search.png" />
                        <img src="./icons/search.png" alt="Responsive image" />
                    </picture>
                    {/* <img
                        src="./icons/search.png"
                        alt="Search location icon"
                        title="No result found"
                        className="inline-block mb-4 mt-20 sm:mt-0"
                    /> */}
                    <p>
                        No Result found <br />
                        <small>Your map pin list will show here</small>
                    </p>
                </div>
            ) : (
                <ul className="flex-1 overflow-y-auto">
                    {pins.map((pin, idx) => (
                        <PinItem key={pin.id} pins={pins} pin={pin} orderId={idx + 1} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default PinList
