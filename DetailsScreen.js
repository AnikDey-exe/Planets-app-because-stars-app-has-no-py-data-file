

import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `https://79ce-2600-1700-3070-bc90-d401-3715-f5db-328.ngrok.io?planet=${this.props.navigation.getParam("planet_name")}`,
      listData: [],
      number: this.props.navigation.getParam("number")
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        console.log(response.data[0].data)
        this.setDetails(response.data[0].data[this.state.number]);
        return this.setState({
          listData: response.data[0].data
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/planet_type/gas_giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/planet_type/terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/planet_type/super_earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/planet_type/neptune_like.png");
        break;
      default:
        imagePath = require("../assets/planet_type/gas_giant.png");
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath
    });
  };

  render() {
    const { details, imagePath } = this.state;
      return (
        <View style={styles.container}>
            <View>
              <Text
                style={styles.cardItem}
              >Distance from Earth : {this.state.listData.distance_from_earth}</Text>
               <Text
                style={styles.cardItem}
              >{`Name: ${details.name}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Speed : ${details.orbital_speed}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Mass : ${details.planet_mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Radius : ${details.planet_radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Type : ${details.planet_type}`}</Text>
            </View>
          
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});