import React, { Component } from "react";
import "./App.css";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
require('dotenv').config();


class CityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      items: [],
      loading: false
    };
  }
  componentDidMount() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let API =
      "https://sheets.googleapis.com/v4/spreadsheets/18PtwybBwBR-6f73OCZf35fBWAF62IO0Gadzu6ytoMVk/values:batchGet?ranges=Sheet" +
      this.props.tabIndex +
      "&majorDimension=ROWS&key=" +
      API_KEY;
    fetch(API)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }
        this.setState({ items: rows });
        //  console.log(this.state.items);
      });
    // const yelp = require("yelp-fusion");
    // const YELP_API_KEY = process.env.REACT_APP_YELP_API_KEY;
    // const searchRequest = {
    //   term: "Four Barrel Coffee",
    //   location: "San Francisco"
    // };
    // const client = yelp.client(YELP_API_KEY);
    // console.log("client---", client);
    // client
    //   .search(searchRequest)
    //   .then(response => {
    //     const firstResult = response.jsonBody.businesses[0];
    //     let prettyJson = JSON.stringify(firstResult, null, 4);
    //     console.log(prettyJson);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const listItems = this.state.items.map(item => (
      <ListItem>
        <ListItemText
        disableTypography
        primary={<Typography type="body2" style={{ color: 'white' }}> {item.name}
        <br />
        Rating: {item.rating} <br /> {item.address}</Typography>}
      />
      </ListItem>
    ));
    return (
      <Grid container spacing={24} >
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <header className="App-header">
            <p>HALAL PAGES</p>
          </header>
          <Button
            className="button"
            variant="contained"
            
            onClick={this.props.handleClose}
          >
            Back
          </Button>
          <List className="list" >{listItems}</List>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Map
            google={this.props.google}
            zoom={9}
            className="map"
            initialCenter={{ lat: 33.83251, lng: -117.96255 }}
          >
            {this.state.items.map(item => (
              <Marker
                onClick={this.onMarkerClick}
                name={item.name}
                position={{ lat: item.lat, lng: item.lng }}
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <p />
              </div>
            </InfoWindow>
          </Map>{" "}
        </Grid>
      </Grid>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(CityPage);
