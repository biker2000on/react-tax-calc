import React from "react";
import { Form, Grid, Statistic } from "semantic-ui-react";

export const groupFields = (items, size, handler) => {
  const keys = Object.keys(items);
  let arr = [];
  for (let i = 0; i < keys.length; i += size) {
    const group = (
      <Form.Group>
        {keys.slice(i, i + size).map(item => (
          <Form.Input
            key={item}
            label={item}
            value={items[item]}
            onChange={handler(item)}
          />
        ))}
      </Form.Group>
    );
    arr.push(group);
  }
  return arr;
};

export const groupGridFields = (items, size) => {
  const keys = Object.keys(items);
  let arr = [];
  for (let i = 0; i < keys.length; i += size) {
    const group = (
      <Grid.Row>
        {keys.slice(i, i + size).map(item => (
          <Grid.Column key={item} width={5} textAlign="center">
            <Statistic
              label={item}
              value={items[item]}
              color={items[item] >= 0 ? "green" : "red"}
            ></Statistic>
          </Grid.Column>
        ))}
      </Grid.Row>
    );
    arr.push(group);
  }
  return arr;
};
