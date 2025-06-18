import { TripType, type OnSubmitSearchForm } from "../../types/flight";
import FlightOneWayFormContent from "./flight-one-way-form";
import RoundTripForm from "./flight-round-form";
import MultiCityFormContent from "./flight-multi-city-form";

type Props = {
    tripType: TripType;
    onSubmit: OnSubmitSearchForm;
};

const TripFormFactory: React.FC<Props> = ({ tripType, onSubmit }) => {
    switch (tripType) {
        case TripType.ROUND_TRIP:
            return <RoundTripForm onSubmit={onSubmit} />;
        case TripType.ONE_WAY:
            return <FlightOneWayFormContent onSubmit = { onSubmit } />;
        case TripType.MULTI_CITY:
            return <MultiCityFormContent onSubmit={onSubmit} />;
        default:
            return null;
    }
};

export default TripFormFactory;
