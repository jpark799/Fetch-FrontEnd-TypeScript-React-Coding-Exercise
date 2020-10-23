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
			.then((data) => {
				console.log(data);
				setLoadComplete(true);
			})
	}, []);
	return (
	<div className="App">

	</div>
	);
}
