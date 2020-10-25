import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Paper, Card, Typography } from "@material-ui/core/";
import "./App.css";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: "hidden",
	},
	paper: {
		width: 200,
		padding: "5%",
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
		<div className={classes.root}>
			{loadComplete ? (
				<Grid  className={classes.root} container justify="center" spacing={10}>
					{listIds.map((listId: any) => (
						<Grid key={listId} item>
							<Paper  className={classes.paper}>
								<Typography align="center" > List Id: {listId} </Typography>
								{items.map(
									(data: IItems) =>
										data.listId === listId && (
											<div key={data.id} style={{padding:"5%"}}>
												<Card style={{padding:"5%"}}>
													{" "}
													Name: {data.name} 
													<br/>
													Id: {data.id}
												</Card>
											</div>
										)
								)}
								<br />
							</Paper>
						</Grid>
					))}
				</Grid>
			) : (
				<div> Loading... </div>
			)}

			{/* {items.map((data: IItems) => (
				<div>hi {data.id} {data.listId} {data.name}</div>
			))} */}
		</div>
	);
}
