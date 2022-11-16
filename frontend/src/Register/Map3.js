import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./map.css"

export default function Map3({ SetPositon }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        libraries: ["places"],
        mapIds: ["768e6ec3c770487c"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <>
        <Map SetPositon={SetPositon} />
    </>
}

function Map({ SetPositon }) {
    const defaultPos = useMemo(() => ({ lat: 13.7298889, lng: 100.7782323 }), []);
    const [viewPort, setViewPort] = useState(defaultPos)
    const [selected, setSelected] = useState(defaultPos);

    function handleOnclick(e) {
        setSelected({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        SetPositon({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} setViewPort={setViewPort} SetPositon={SetPositon} />
            </div>

            {/* <div className="DATA : ">lat = {selected.lat}, lng = {selected.lng}</div> */}

            <GoogleMap
                zoom={15}
                center={viewPort}
                mapContainerClassName="map-container"
                onClick={handleOnclick}
            >
                {selected && <MarkerF position={selected} />}
            </GoogleMap>
        </>
    );
}

const PlacesAutocomplete = ({ setSelected, setViewPort, SetPositon }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
        setViewPort({ lat, lng })
        SetPositon({ lat, lng })
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

//https://www.youtube.com/watch?v=BL2XVTqz9Ek&list=PL2rFahu9sLJ0pXNXfSiBlwqK4UidLIQWJ