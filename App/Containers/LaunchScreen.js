import React from 'react'
import { ScrollView, ListView, Text, Image, View, TextInput, Button, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import CustomNavBar from '../Components/CustomNavBar'
import BarChart from '../Components/BarChart'
import Config from 'react-native-config'

// Styles
import styles from './Styles/LaunchScreenStyles'
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class LaunchScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = { artist: '', song: '', dataSource: ds, errorMessage: '', barData: [ ] }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  parseBarObjects (arr){
    let result = [];

    arr.forEach((tag) => {
      let tagObj = {};
      tagObj["v"] = tag.count / 10;
      tagObj["name"] = tag.name;
      result.push(tagObj)
    });

    return result;
  }

  handleSubmit (e) {
    const { artist, song } = this.state

    let fetchUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getTopTags&api_key=${Config.LAST_FM_API_KEY}&format=json&artist=${artist}&track=${song}`
    if (song.length === 0) {
      fetchUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags&artist=${artist}&api_key=${Config.LAST_FM_API_KEY}&format=json`
    }
    return fetch(fetchUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        if (typeof responseJson.error !== 'undefined') {
          this.setState({ errorMessage: responseJson.message, dataSource: ds })
        } else {
          this.setState({ dataSource: ds.cloneWithRows(responseJson.toptags.tag.slice(0, 10)), errorMessage: '' })
          let barObjects = this.parseBarObjects(responseJson.toptags.tag.slice(0,10));
          this.setState({ barData: barObjects });
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  renderErrors () {
    const { errorMessage } = this.state

    if (errorMessage.length === 0) {
      return null
    } else {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionText}>{errorMessage}</Text>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.groupContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <CustomNavBar />
        <ScrollView style={styles.container}>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {'Enter the artist.'}
            </Text>
            <View style={{height: 30, width: 200}}>
              <TextInput style={styles.songInput}
                onChangeText={(text) => this.setState({artist: text})}
                value={this.state.artist}
                placeholder={'Artist Name'} />
            </View>

          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {'Enter the song.'}
            </Text>
            <View style={{height: 30, width: 200}}>
              <TextInput style={styles.songInput}
                onChangeText={(text) => this.setState({song: text})}
                value={this.state.song}
                placeholder={'Song Title'} />
            </View>

          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.submitOpacity}
              color='#000'>
              <Button title={'Submit'}
                style={styles.submitOpacity}
                color='#000'
                onPress={this.handleSubmit} />
            </TouchableOpacity>
          </View>

          {this.renderErrors()}

          <View style={styles.tagList}>
            <ListView
              enableEmptySections
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text style={styles.tagRow}>{rowData.name}</Text>}
              />
          </View>

          <BarChart data = {this.state.barData} />

        </ScrollView>
      </View>
    )
  }
}
