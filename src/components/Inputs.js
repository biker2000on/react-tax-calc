import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import totalizer from '../utilities/totalizer'
import { Form } from "semantic-ui-react";
import { groupFields } from "../utilities/groupFields";

function Inputs({items, handleChange, title}) {
  // left off here CHECK ME OUT!!!!!!!!!!!!!!!!
  return (
    <>
    <Form>
      {groupFields(items, 3, handleChange)}
    </Form>
    
    </>
    // <form>
    //   <Typography variant="h4" gutterBottom align="center">
    //     {title}
    //   </Typography>
    //   <Grid container spacing={3}>
    //     {Object.keys(items).map((item, i) => (
    //       <Grid item xs={12} md={6} key={i}>
    //         <TextField
    //           id={title + '-' + i}
    //           label={item}
    //           value={items[item]}
    //           onChange={handleChange(item)}
    //           margin="normal"
    //           fullWidth
    //         />
    //       </Grid>
    //     ))}
    //   </Grid>
    //   <Typography variant="h3" align="center">${totalizer(items)}</Typography>
    // </form>
  );
}

export default Inputs;
