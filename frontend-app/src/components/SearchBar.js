import React from "react";
import Button from "@material-ui/core/Button";

function SearchBar() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    return (
        <div className="App">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul>
                <Button>
                    Search
                </Button>
            </ul>
        </div>
    );
}
export default SearchBar;