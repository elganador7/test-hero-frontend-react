import FilterForm from "./filterForm";
import { FilterProvider } from "../context/FilterContext";

const FilterFormPage = () => {
    return (
        <FilterProvider>
            <FilterForm />
        </FilterProvider>
    );
};

export default FilterFormPage;