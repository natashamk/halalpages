import React, { Component } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CityPage from "./CityPage";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const styles = theme => ({
  container: {
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "auto"
  },
  formControl: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
    float: "left",
    marginLeft: "10px"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginBottom: "30px",
    width: 600
  }
});

class App extends Component {
  state = {
    city: "",
    open: false,
    tabIndex: "",
    position: "unknown",
    search: "",
    citygeo: ""
  };
  handleOpen = event => {
    this.setState({
      open: true,
      tabIndex: event.target.id
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  getValueOfSelectOne = value => {
    console.log(value);
  };
  updateSearch = search => {
    this.setState({ search });
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ position });
        console.log("position", this.state.position);
      },

      error => console.log(error),

      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  mapSearch = () => {
    let inputValue = document.getElementById("searchBar").value
    
  }

  render() {
    const { open, tabIndex } = this.state;
    const { classes } = this.props;

    // const routing = (
    //   <Router>
    //     <div>
    //       <ul>
    //         <li>
    //           <Link to="/los-angeles">Los Angeles</Link>
    //         </li>
    //         <li>
    //           <Link to="/new-york-city">New York</Link>
    //         </li>
    //         <li>
    //           <Link to="/seattle">Seattle</Link>
    //         </li>
    //       </ul>
    //       <Route exact path="/los-angeles" component={CityPage} />
    //       <Route path="/new-york-city" component={CityPage} />
    //       <Route path="/seattle" component={CityPage} />
    //     </div>
    //   </Router>
    // )

    if (open == true) {
      return (
        <CityPage
          open={open}
          handleClose={this.handleClose}
          tabIndex={tabIndex}
        />
      );
    }
    return (
      <Grid container spacing={16} className="App" id="images">
       <header className="App-header">
            <p>HALAL.PAGES</p>
          </header>
        <Grid
          container
          spacing={16}
          className="home"
          direction="column"
          justify="flex-end"
          alignItems="center"
          style={{ "paddingTop": 10, "paddingBottom": 10 }}
        >
          <Grid>
            <TextField
              required
              id="searchBar"
              placeholder="Search"
              className="searchBar"
              variant="outlined"
            />
          </Grid>
          <Grid>
            <Button
              className="searchButton"
              variant="contained"
              color="white"
              onClick={this.mapSearch}
            >
              Find Me Food
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={24} className="App" id="images">
          <Grid item xs={12} md={12}>
            <header className="App-header">
              <p>Explore</p>
            </header>
          </Grid>
          <Grid item xs={3} md={2}>
            <img
              id="1"
              onClick={this.handleOpen}
              className="city-img"
              src={require("./images/la.jpeg")}
              responsive
              alt="LA"
            />
            {open && <CityPage open={open} handleClose={this.handleClose} />}
          </Grid>
          <Grid item xs={3} md={2}>
            <img
              id="2"
              citygeo = "{{lat: 37.7749, lng: -122.4194}}"
              onClick={this.handleOpen}
              className="city-img"
              src={require("./images/sf.jpg")}
              responsive
              alt="San Francisco"
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <img
              id="3"
              onClick={this.handleOpen}
              className="city-img"
              src={require("./images/nyc.jpeg")}
              responsive
              alt="New York"
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <img
              id="4"
              onClick={this.handleOpen}
              className="city-img"
              src={require("./images/atl.jpeg")}
              responsive
              alt="Atlanta"
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <img
              id="5"
              onClick={this.handleOpen}
              className="city-img"
              src={require("./images/chi.jpg")}
              responsive
              alt="Chicago"
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <img
              id="6"
              onClick={this.handleOpen}
              className="city-img"
              src={require("./images/sea.jpeg")}
              responsive
              alt="Seattle"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
