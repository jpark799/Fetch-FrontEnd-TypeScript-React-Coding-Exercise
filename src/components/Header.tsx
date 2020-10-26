import { makeStyles } from "@material-ui/core/";
import React from "react";

const useStyles = makeStyles(() => ({
	header: {
    overflow: "hidden",
    background: "#f1f1f1",
    textAlign: "center"
  }
}));

export const Header = () => {
  const classes = useStyles();

	return (
		<div className={classes.header}>
			<h1>
					<span role="img" aria-label="camera"> </span> Fetch Front-End Coding Challenge - <a href="https://www.linkedin.com/in/jason-park-0790aab6/" rel="noopener noreferrer" target="_blank">	Jason Park</a>
			</h1>
		</div>
	);
};
