import React, { useState } from "react";
import { Grid, Typography, TextField, Box } from "@material-ui/core";

function Inputs() {
  const [values, setValues] = useState({
    salary: undefined,
    bonuses: 0,
    "taxable interest": 0,
    rollovers: 0,
    dividends: 0,
    "capital gains short term": 0,
    "capital gains long term": 0
  });

  const income = [
    "salary",
    "bonuses",
    "taxable interest",
    "rollovers",
    "dividends",
    "capital gains short term",
    "capital gains long term"
  ];

  const deductions = [
    "401k contributions",
    "Traditional IRA Contributions",
    "HSA Contributions",
    "Student Loan Interest Deduction",
    "Mortgage Interest Deduction",
    "Tuition and Fees"
  ];

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  return (
    <form>
      <Typography variant="h4" gutterBottom align="center">
        Income ${ income.reduce((a,c) => a + parseInt(values[c]), 0)}
      </Typography>
      <Grid container spacing={3}>
        {income.map((item, i) => (
          <Grid item xs={12} md={6}>
            <TextField
              key={i}
              id={"income-" + i}
              label={item}
              value={values[item]}
              onChange={handleChange(item)}
              margin="normal"
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" gutterBottom align="center">
        Deductions ${parseInt(values.salary) + parseInt(values.bonuses)}
      </Typography>
      <Grid container spacing={3}>
        {deductions.map((item, i) => (
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              key={i}
              id={"income-" + i}
              label={item}
              value={values[item]}
              onChange={handleChange(item)}
              margin="normal"
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
    </form>
  );
}

export default Inputs;
