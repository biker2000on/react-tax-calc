import React from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: 'center'
  },
}));

function ResultItem({ result, title }) {
  const classes = useStyles()

  return (
    <Grid item sm={4}>
      <Paper className={classes.root}>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h4">${result}</Typography>
      </Paper>
    </Grid>
  );
}

export default ResultItem;
