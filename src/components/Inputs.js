import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import totalizer from "../utilities/totalizer";
import { FormField, TextInput, Paragraph, Form } from "grommet";

function Inputs({ items, handleChange, title }) {
  // left off here CHECK ME OUT!!!!!!!!!!!!!!!!
  return (
    <>
      <Paragraph color="brand" fill margin="medium" size="large">
        {title}
      </Paragraph>
      <Form>
        {Object.keys(items).map((item, i) => (
          <FormField label={item} margin="medium" key={i}>
            <TextInput
              value={items[item]}
              onChange={handleChange(item)}
              size='large'
            ></TextInput>
          </FormField>
        ))}
      </Form>
      <Paragraph color="brand" fill margin="medium" size="large">
        ${totalizer(items)}
      </Paragraph>
    </>
  );
}

export default Inputs;
