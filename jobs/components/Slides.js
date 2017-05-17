import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

// width of device
const SCREEN_WIDTH = Dimensions.get('window').width;

// use a Scroll View to set scroller to slide left/right 
// use the 'horizontal' prop 

class Slides extends Component {

  renderLastSlide(index) {
      // for last slide, show a Button as well
      // use the callback 'onComplete' passed by WelcomeScreen
      if (index === this.props.data.length - 1) {
          return (
              <Button 
                title="Onwards!"
                raised
                buttonStyle={styles.buttonStyle}
                onPress={this.props.onComplete}
              />
          );
      }
  }

  // render the slides pass in from parent
  renderSlides() {
    // for every slide object, return a view, 
    // a view that is made of each slide (using the map func)
    return this.props.data.map((slide, index) => {
        return (
            <View 
                key={slide.text} 
                style={[styles.slideStyle, { backgroundColor: slide.color }]}
            >
                <Text style={styles.textStyle}>{slide.text}</Text>
                {this.renderLastSlide(index)}
            </View>
        );
    });
  }

  // main render
  render() {
      return (
          // pretty scroller using horizontal and pagingEnabled
        <ScrollView 
          horizontal
          pagingEnabled
          style={{ flex: 1 }}
        >
          {this.renderSlides() }
        </ScrollView>
      );
  }

} // class

const styles = {
    // Note: by adding 'width: SCREEN_WIDTH' we tell it to show only 1 screenful at a time
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30,
        color: 'white'
        
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15
    }
};

export default Slides;
