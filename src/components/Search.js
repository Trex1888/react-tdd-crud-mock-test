function Search({ setSearch, search }) {
  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Search Contacts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
export default Search;
