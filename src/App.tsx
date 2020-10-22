import React, { useEffect } from "react";
import "./App.css";

export default function App() {
	useEffect(() => {
    const enableCrossOriginRequests = "https://cors-anywhere.herokuapp.com/"
    const requestUrl = 'https://fetch-hiring.s3.amazonaws.com/hiring.json'
		fetch(enableCrossOriginRequests+requestUrl)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
	}, []);
	return (
	<div className="App">

	</div>
	);
}
