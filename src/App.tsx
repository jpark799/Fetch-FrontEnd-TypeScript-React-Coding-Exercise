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
			name: "",
		},
	];

	const [items, setItems] = useState(initialState);
	const [listIds, setListIds] = useState([0]);
	const [loadComplete, setLoadComplete] = useState(false);

	useEffect(() => {
		const enableCrossOriginRequests = "https://cors-anywhere.herokuapp.com/";
		const requestUrl = "https://fetch-hiring.s3.amazonaws.com/hiring.json";
		fetch(enableCrossOriginRequests + requestUrl)
			.then((response) => response.json())
			.then((data: IItems[]) => {
				const filteredItems = data.filter((item: IItems) => item.name !== null && item.name.length !== 0);
				filteredItems.sort((a: IItems, b: IItems) =>
					a.name.localeCompare(b.name, navigator.languages[0] || navigator.language, {
						numeric: true,
						ignorePunctuation: true,
					})
				);
				const availableListIds = filteredItems.map((item) => item.listId);
				const uniqueListIds = [...new Set(availableListIds.sort())];

				setListIds(uniqueListIds);
				setItems(filteredItems);
				setLoadComplete(true);
			});
	}, []);

	// make an array of ids
	// filter on the map with the ids

	return (
		<div className="App">
			{loadComplete ? (
				<>
					{listIds.map((listId: any) => (
						<div>
							{listId}
							{items.map(
								(data: IItems) =>
									data.listId === listId && (
										<div>
											hi {data.listId} {data.id}
											{data.name}
										</div>
									)
							)}
						</div>
					))}
				</>
			) : (
				<div> Loading... </div>
			)}

			{/* {items.map((data: IItems) => (
				<div>hi {data.id} {data.listId} {data.name}</div>
			))} */}
		</div>
	);
}
