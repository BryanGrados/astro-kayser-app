import { createContext, useState } from "react";

export const CsvDataContext = createContext();

export const CsvDataProvider = (props) => {
	const [csvData, setCsvData] = useState([]);

	return (
		<CsvDataContext.Provider
			value={{
				csvData,
				setCsvData,
			}}
		>
			{props.children}
		</CsvDataContext.Provider>
	);
};
