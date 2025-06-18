import {
    ComposableMap,
    Geographies,
    Geography,
    Line,
    Marker,
} from 'react-simple-maps';

const geoUrl =
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';


type AirportCoord = {
    code: string;
    coordinates: [number, number] | null; // [longitude, latitude]
};

type Props = {
    from: AirportCoord;
    to: AirportCoord;
};

export const FlightMap: React.FC<Props> = ({ from, to }) => {
    const fromCoordinates = from.coordinates;
    const toCoordinates = to.coordinates;

    return (
        <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{
                scale: 200,           // Zoom in
                center: [12, 10]       // Move the map center away from the poles
            }}
            style={{
                width: '100%', backgroundColor: "#0066cc", overflow: 'hidden',      // important to clip the border radius
            }}
        >
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#4399EEFF"
                            stroke="#0066cc"
                        />
                    ))
                }
            </Geographies>

            {/* Origin Marker */}
            {fromCoordinates && (
                <Marker coordinates={fromCoordinates}>
                    <circle r={5} fill="white" />
                    <text
                        textAnchor="middle"
                        y={-10}
                        style={{ fill: 'white', fontSize: 10 }}
                    >
                        {from.code}
                    </text>
                </Marker>
            )}

            {/* Destination Marker */}
            {toCoordinates && (<Marker coordinates={toCoordinates}>
                <circle r={5} fill="white" />
                <text
                    textAnchor="middle"
                    y={-10}
                    style={{ fill: 'white', fontSize: 10 }}
                >
                    {to.code}
                </text>
            </Marker>)}

            {/* Curved Flight Line */}
            {fromCoordinates && toCoordinates && (<Line
                from={fromCoordinates}
                to={toCoordinates}
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
            // curve={0.5}
            />)}
        </ComposableMap>
    );
};
