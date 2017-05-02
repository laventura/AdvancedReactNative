import React, { Component } from 'react';
import { View, Animated } from 'react-native';


class Ball extends Component {
    // one time
    componentWillMount() {
        // init position
        this.position = new Animated.ValueXY(0, 0);  // current position
        // final position, with animation
        Animated.spring(this.position, {
            toValue: { x: 200, y: 500 }             // new position
        }).start();                                 // default: 1 seconds
    }

    // main render
    render() {
        // NOTE: Animated.View is rendered exactly ONCE - since the Animation component runs separately from regular React!!
        // Actual element being animated on UI is 'Animated.View', not the Ball per se
        return (
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.ball} />
            </Animated.View>
        );
    }
}

// styling
const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black'
    }
};

// export
export default Ball;
