import React from "react";
import range from "../utilities/range";
import { Form } from "semantic-ui-react";

function FilingStatus({
  status,
  handleStatusChange,
  year,
  handleYearChange,
  pes,
  handlePEChange
}) {
  const years = range(2014, new Date().getFullYear());
  const familyMembers = range(1, 10);
  const statuses = [
    "Single",
    "Married Filing Jointly",
    "Married Filing Separately",
    "Head of Household",
    "Qualifying widow(er) with dependent child"
  ];

  return (
    <Form>
      <Form.Group>
        <Form.Select
          label="Filing Status"
          placeholder="filing status"
          options={statuses.map((c,i) => {
            return { value: i, text: c };
          })}
          onChange={handleStatusChange}
          value={status}
        ></Form.Select>
        <Form.Select
          label="Family Members"
          placeholder="1"
          options={familyMembers.map(c => {
            return { value: c, text: c };
          })}
          onChange={handlePEChange}
          value={pes}
        ></Form.Select>
        <Form.Select
          label="Year"
          options={years.map(c => {
            return { value: c, text: c };
          })}
          onChange={handleYearChange}
          value={year}
        ></Form.Select>
      </Form.Group>
    </Form>
    // <Grid container spacing={5} align="center" justify="center">
    //   <Grid item>
    //     <FormControl>
    //       <InputLabel htmlFor="age-helper">Filing Status</InputLabel>
    //       <Select
    //         value={status}
    //         onChange={handleStatusChange}
    //         inputProps={{
    //           name: "age",
    //           id: "age-helper"
    //         }}
    //       >
    //         {statuses.map((c,i) => (
    //           <MenuItem value={i} key={i}>
    //             {c}
    //           </MenuItem>
    //         ))}
    //       </Select>
    //       <FormHelperText>Choose Filing Status</FormHelperText>
    //     </FormControl>
    //   </Grid>
    //   <Grid item>
    //     <FormControl>
    //       <InputLabel htmlFor="year">Tax Year</InputLabel>
    //       <Select
    //         value={year}
    //         onChange={handleYearChange}
    //         inputProps={{
    //           name: "year",
    //           id: "year"
    //         }}
    //       >
    //         {years.map(c => (
    //           <MenuItem value={c} key={c}>
    //             {c}
    //           </MenuItem>
    //         ))}
    //       </Select>
    //       <FormHelperText>Choose Tax Year</FormHelperText>
    //     </FormControl>
    //   </Grid>
    //   <Grid item>
    //     <FormControl>
    //       <InputLabel htmlFor="year">Family Members</InputLabel>
    //       <Select
    //         value={pes}
    //         onChange={handlePEChange}
    //         inputProps={{
    //           name: "PE",
    //           id: "pe"
    //         }}
    //       >
    //         {familyMembers.map(c => (
    //           <MenuItem value={c} key={'family'+c}>
    //             {c}
    //           </MenuItem>
    //         ))}
    //       </Select>
    //       <FormHelperText># of Personal Exemptions Claimed</FormHelperText>
    //     </FormControl>
    //   </Grid>
    // </Grid>
  );
}

export default FilingStatus;
