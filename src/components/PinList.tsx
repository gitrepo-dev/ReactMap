import { usePins } from '../context/PinContext';
import PinItem from './PinItem';

function PinList() {
    const { pins, loading } = usePins();
    return (
        <div className="bg-white overflow-hidden shadow rounded-tl-lg rounded-tr-lg lg:rounded-lg sm:absolute h-[45vh] sm:h-[90vh] lg:h-[88vh] z-[1000] sm:min-w-80 sm:max-w-80 bottom-[0] lg:top-[55%] transform lg:-translate-y-[55%] sm:left-[20px] flex flex-col">
            {/* Header stays fixed */}
            <h2 className="lg:text-lg font-bold border-b p-2 lg:p-4">Pin Lists</h2>

            {/* loading skelaton */}
            {loading ? new Array(10).fill(0).map((el: number, idx:number) => <div key={el + idx} className="mx-auto w-full max-w-sm rounded-md p-4 opcity-0.2">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 rounded bg-gray-200"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                            </div>
                            <div className="h-2 rounded bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>) : null}



            {/* Content */}
            {!pins.length ? (
                <div className={"flex-1 flex sm:block sm:mt-10 flex-col items-center justify-center text-center"}>
                    <picture className="inline-block mb-4">
                        <source media="(max-width: 640px)" srcSet="./icons/location.png" />
                        <source media="(min-width: 641px)" srcSet="./icons/search.png" />
                        <img src="./icons/search.png" alt="Responsive image" />
                    </picture>
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
