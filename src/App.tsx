import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
	interface IItems {
		id: number;
		listId: number;
		name: string;
	}

	const initialState: IItems[] = [
		{
			id: 0,
			listId: 0,
			name: ""
		}
	]

	const [items, setItems] = useState(initialState);
	const [loadComplete, setLoadComplete] = useState(false);

	useEffect(() => {
    const enableCrossOriginRequests = "https://cors-anywhere.herokuapp.com/"
    const requestUrl = 'https://fetch-hiring.s3.amazonaws.com/hiring.json'
		fetch(enableCrossOriginRequests+requestUrl)
			.then((response) => response.json())
			.then((data: IItems[]) => {
				const filteredItems = data.filter((item: IItems) => item.name != null && item.name.length != 0)
				filteredItems.sort((a: IItems, b: IItems) => a.name.localeCompare(b.name, navigator.languages[0] || navigator.language, {numeric: true, ignorePunctuation: true}))
				console.log(filteredItems)
				setItems(filteredItems)
				setLoadComplete(true);
			})
	}, []);
	return (
	<div className="App">
		<button onClick={() => console.log(items)} > hihihi </button>
	</div>
	);
}
