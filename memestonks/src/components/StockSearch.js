import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const StockSearch = (props) => {
	return (
		<form
			method='POST'
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
            <Autocomplete
                id="combo-box-demo"
                options={ [
                    { ticker: 'Tsla', name:"Tesla"},
                    {ticker: 'AAPL', name:"Apple"},
                    {ticker: 'GME', name:"GameStop"}
                ]}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) =><TextField {...params} label="Top 100 Stocks" variant="outlined" />}
                onChange={(event, newValue) => {
                    props.searchValue(newValue);
                  }}
            />
		</form>
	);
};

export default StockSearch;
