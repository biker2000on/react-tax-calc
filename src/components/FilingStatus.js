import React from "react";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  Grid
} from "@material-ui/core";
import range from "../utilities/range";

function FilingStatus({status, handleStatusChange, year, handleYearChange, pes, handlePEChange}) {

  const years = range(2014, new Date().getFullYear());
  const familyMembers = range(1,10)
  const statuses = [
    "Single",
    "Married Filing Jointly",
    "Married Filing Separately",
    "Head of Household",
    "Qualifying widow(er) with dependent child"
  ];

  return (
    <Grid container spacing={5} align="center" justify="center">
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="age-helper">Filing Status</InputLabel>
          <Select
            value={status}
            onChange={handleStatusChange}
            inputProps={{
              name: "age",
              id: "age-helper"
            }}
          >
            {statuses.map((c,i) => (
              <MenuItem value={i} key={i}>
                {c}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose Filing Status</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="year">Tax Year</InputLabel>
          <Select
            value={year}
            onChange={handleYearChange}
            inputProps={{
              name: "year",
              id: "year"
            }}
          >
            {years.map(c => (
              <MenuItem value={c} key={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose Tax Year</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="year">Family Members</InputLabel>
          <Select
            value={pes}
            onChange={handlePEChange}
            inputProps={{
              name: "PE",
              id: "pe"
            }}
          >
            {familyMembers.map(c => (
              <MenuItem value={c} key={'family'+c}>
                {c}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText># of Personal Exemptions Claimed</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default FilingStatus;
