import React from "react";
import Grid from '@mui/material/Grid';
import Navigation from "../Navigation/Navigation";

export default function Layout(){
    return (
    <Grid item xs={2}>
      <Navigation />
    </Grid>
    );
}