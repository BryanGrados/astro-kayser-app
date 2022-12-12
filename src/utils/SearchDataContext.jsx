import { createContext, useState } from "react";

export const SearchDataContext = createContext();

export const SearchDataProvider = (props) => {
	const [searchData, setSearchData] = useState("");

	return (
		<SearchDataContext.Provider
			value={{
				searchData,
				setSearchData,
			}}
		>
			{props.children}
		</SearchDataContext.Provider>
	);
};
