import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { Bar } from 'react-native-pathjs-charts'

export default class BarChart extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    let data = this.props.data.map((datum) => {
      return [datum];
    })


    let options = {
      width: 300,
      height: 300,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 1200,
        fillTransition: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: true,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: true,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    if(this.props.data.length > 0){
      return (
        <View>
          <Bar data={data} options={options} accessorKey='v'/>
        </View>
      )

    } else { return null }
  }
}
