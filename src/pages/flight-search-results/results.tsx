import PageLayout from "../page-layout";
import SearchResults from "./flight-search-results";

export default function Results() {
    return (
        <PageLayout
            title="Results"
            content={<SearchResults />}
        />
    );
}