const Searchbar = ({filterCountries}) => {
    return (
        <div>
            <form>
                find countries
                <input
                    onChange={filterCountries}
                    />
            </form>
        </div>
     );
}

export default Searchbar