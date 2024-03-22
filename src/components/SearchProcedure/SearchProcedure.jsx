function SearchProcedures({ onSearch }) {
    const handleChange = (e) => {
      onSearch(e.target.value); 
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Buscar procedimientos"
          onChange={handleChange}
        />
      </div>
    );
  }
  
  export default SearchProcedures;
  