import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Paper, Card, Typography } from "@material-ui/core/";
import { Header } from "./components";
import "./App.css";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
	},
	paperColumn: {
		width: 200,
		padding: "5%",
	},
	padding: {
		padding: "5%",
	},
	container: {
		width: "100%",
		margin: 0,
	},
}));

export default function App() {
	const classes = useStyles();
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
		// Had to use enableCrossOriginRequests to get around CORS issues
		const enableCrossOriginRequests = "https://cors-anywhere.herokuapp.com/";
		const requestUrl = "https://fetch-hiring.s3.amazonaws.com/hiring.json";
		fetch(enableCrossOriginRequests + requestUrl)
			.then((response) => response.json())
			.then((data: IItems[]) => {

				// Filtered out all nulls and empty strings
				const filteredItems = data.filter((item: IItems) => item.name !== null && item.name.length !== 0);

				// Javascript's native .sort() method by itself sorts lexically so I wanted to stay away from that. e.g.: Item 1, Item 11, Item 2, Item 23,
				// This is a natural sort method that I found which fits the use case I need. e.g.: Item 1, Item 2, Item 11, Item 23
				filteredItems.sort((a: IItems, b: IItems) =>
					a.name.localeCompare(b.name, navigator.languages[0] || navigator.language, {
						numeric: true,
						ignorePunctuation: true,
					})
				);

				// Created an array of all the unique ListIds to populate my columns
				const availableListIds = filteredItems.map((item) => item.listId);
				const uniqueListIds = [...new Set(availableListIds.sort())];

				setListIds(uniqueListIds);
				setItems(filteredItems);
				setLoadComplete(true);
			});
	}, []);

	return (
		<div className={classes.root}>
			<Header />
			{loadComplete ? (
				<Grid className={classes.container} container justify="center" spacing={10}>
					{listIds.map((listId: any) => (
						<Grid key={listId} item>
							<Paper className={classes.paperColumn}>
								<Typography className={classes.padding} align="center" variant={"h5"}>
									<strong> List Id: {listId} </strong>
								</Typography>
								<Typography align="center">
									<strong> Total Count: {items.filter((item) => item.listId === listId).length} </strong>
								</Typography>
								{items.map(
									(data: IItems) =>
										data.listId === listId && (
											<div key={data.id} className={classes.padding}>
												<Card className={classes.padding}>
													Id: {data.id}
													<br />
													Name: {data.name}
												</Card>
											</div>
										)
								)}
							</Paper>
						</Grid>
					))}
				</Grid>
			) : (
				<div> Loading... </div>
			)}
		</div>
	);
}
