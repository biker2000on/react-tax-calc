import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";


function NavigationContent() {
  return (
    <List>
      <ListItem >        
        <ListItemIcon>home</ListItemIcon>
        <ListItemText>Stepper</ListItemText>
      </ListItem>
      <ListItem >
        <ListItemIcon>menu</ListItemIcon>
        <ListItemText>Dashboard</ListItemText>
      </ListItem>
    </List>
  );
}

export default NavigationContent;
