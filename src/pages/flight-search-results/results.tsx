import PageLayout from "../page-layout";
import SearchResults from "../../components/flight-search-results/flight-search-results";

export default function Results() {
    return (
        <PageLayout
            title="Results"
            content={<SearchResults />}
        />
    );
}