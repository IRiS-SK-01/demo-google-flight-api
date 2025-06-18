import FlightSearchForm from "../../components/flight-search-form/flight-search-form";
import PageLayout from "../page-layout";

export default function Home() {
    return (
        <PageLayout
            title="Flights"
            content={<FlightSearchForm />}
        />
    );
}