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
                    { ticker: 'GME', name: "GameStop" },
                    { ticker: 'PLTR', name: "Palantir Technologies" },
                    { ticker: 'CLOV', name: "Clover Health Investments" },
                    { ticker: 'FUBO', name: "Fubo TV" },
                    { ticker: 'AMC', name: "AMC Entertainment Holdings" },
                    { ticker: 'RKT', name: "Rocket Companies" },
                    { ticker: 'BB', name: "BlackBerry Limited" },
                    { ticker: 'TSLA', name: "Tesla" },
                    { ticker: 'MVIS', name: "MicroVision, Inc." },
                    { ticker: 'ASO', name: "Academy Sports and Outdoors, Inc." },
                    { ticker: 'INO', name: "Inovio Pharmaceuticals, Inc. " },
                    { ticker: 'SNDL', name: "Sundial Growers Inc." },
                    { ticker: 'AMD', name: "Advanced Micro Devices, Inc." },
                    { ticker: 'CLF', name: "Cleveland-Cliffs Inc." },
                    { ticker: 'NIO', name: "NIO Inc." },
                    { ticker: 'CRSR', name: "Corsair Gaming, Inc." },
                    { ticker: 'DAN', name: "Dana Incorporated" },
                    { ticker: 'HA', name: "Hawaiian Holdings, Inc." },
                    { ticker: 'AAPL', name: "Apple Inc." },
                    { ticker: 'KO', name: "The Coca-Cola Company" },
                    { ticker: 'SI', name: "Silvergate Capital Corporation" },
                    { ticker: 'SPCE', name: "Virgin Galactic Holdings, Inc." },
                    { ticker: 'TA', name: "TravelCenters of America Inc." },
                    { ticker: 'TLRY', name: "Tilray, Inc." },
                    { ticker: 'CIA', name: "Citizens, Inc." },
                    { ticker: 'EH', name: "EHang Holdings Limited" },
                    { ticker: 'NKLA', name: "Nikola Corporation" },
                    { ticker: 'SDC', name: "SmileDirectClub, Inc." },
                    { ticker: 'SPOT', name: "Spotify Technology S.A." },
                    { ticker: 'CC', name: "The Chemours Company" },
                    { ticker: 'FI', name: "Frank's International N.V." },
                    { ticker: 'HUYA', name: "HUYA Inc." },
                    { ticker: 'ROOT', name: "Root, Inc." },
                    { ticker: 'SVC', name: "Service Properties Trust" },
                    { ticker: 'UBER', name: "Uber Technologies, Inc." },
                    { ticker: 'AG', name: "First Majestic Silver Corp." },
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
