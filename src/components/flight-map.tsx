import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Line,
} from 'react-simple-maps';
import React from 'react';
import type { AirportCoordsLeg } from '../types/flight-map';

const geoUrl =
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';


type Props = {
    legsCoords: AirportCoordsLeg[];
};

export const FlightMap: React.FC<Props> = ({ legsCoords: legs }) => {
    return (
        <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{
                scale: 200,
                center: [12, 10],
            }}
            style={{
                width: '100%',
                backgroundColor: '#0066cc',
                overflow: 'hidden',
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

            {legs.map(({ from, to }, index) => (
                <React.Fragment key={index}>
                    {/* From marker */}
                    {from.coordinates && (
                        <Marker coordinates={from.coordinates}>
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

                    {/* To marker */}
                    {to.coordinates && (
                        <Marker coordinates={to.coordinates}>
                            <circle r={5} fill="white" />
                            <text
                                textAnchor="middle"
                                y={-10}
                                style={{ fill: 'white', fontSize: 10 }}
                            >
                                {to.code}
                            </text>
                        </Marker>
                    )}

                    {/* Line between from and to */}
                    {from.coordinates && to.coordinates && (
                        <Line
                            from={from.coordinates}
                            to={to.coordinates}
                            stroke="#fff"
                            strokeWidth={2}
                            strokeLinecap="round"
                        />
                    )}
                </React.Fragment>
            ))}
        </ComposableMap>
    );
};
