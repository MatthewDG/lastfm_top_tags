import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingTop: 60,
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  songInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  submitOpacity: {
    width: 150,
    backgroundColor: '#eee'
  },
  tagList: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  tagRow: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: Colors.transparent,
    marginVertical: 5
  }
})
