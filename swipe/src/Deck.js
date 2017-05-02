import React, { Component } from 'react';
import {
     View, 
     Animated,
     PanResponder,
     Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_OUT_DURATION = 250; // millisec

class Deck extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY(); // current position

        // pan gesture responder
        const panResponder = PanResponder.create({
            // if true, we respond when exec any time a User PRESS DOWN on a component
            onStartShouldSetPanResponder: () => true,
            // callback exec'd when item DRAGGED (move item)
            // called many, many times as User DRAGGING item on the screen
            onPanResponderMove: (event, gesture) => {
                // debugger;
                // console.log(gesture); // debug
                /// Gesture system and Animation system are totally de-coupled!!
                /// WE have to tie them together
                // SET NEW POSITION using gesture
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            // callback exce'd when user RELEASES item (after click/drag)
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {  
                    // Swipe RIGHT
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) { 
                    // Swipt LEFT
                    this.forceSwipe('left');
                } else {    
                    // Not a meaningful gesture
                    this.resetPosition();
                }
            }
        });

        // save ref to pan responder (state not really used by PanR)
        // we could as well do 'this.panResponder = panResponder'
        this.state = { panResponder, position };
        // BETTER to use this.position = position
    } // ctor


    // 
    getCardStyle() {
        // interpolation between dx,dy and the rotation calculated
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],   // horizontal scale
            outputRange: ['-120deg', '0deg', '120deg']      // amount of rotation
        });

        return {
            ...position.getLayout(),     // position in x/y coords
            transform: [{ rotate: rotate }]        // one additional prop
        };
    }

    // Force Swipe in the given direction (left/right)
    forceSwipe(direction) {
        // no fancy movements - just linear
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(this.state.position, {
            toValue: { x: x, y: 0 },    // WAY to the Right
            duration: SWIPE_OUT_DURATION       // msec
        }).start(() => this.onSwipeComplete(direction));
    }

    // When Swiping animation is done
    onSwipeComplete(direction) {
        // handle to the callbacks
        const { onSwipeLeft, onSwipeRight } = this.props;

        direction === 'right' ? onSwipeRight() : onSwipeLeft();
    }

     // callback when Pan Gesture released
    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    // show all cards
    renderCards() {
        // for each card in the 'data' prop, 
        // render it via the 'renderCard()' func in main.js
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                      key={item.id}
                      style={this.getCardStyle()}
                      {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return this.props.renderCard(item);
        });
    }

    // main render
    render() {
        return (
            // tie up the panResponder to elements using {...this.panResponder.pandHandlers}
            <View>
                {this.renderCards()}
            </View>
        );
    }
} // class Deck

// export
export default Deck;
