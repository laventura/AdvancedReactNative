import React, { Component } from 'react';
import {
     View, 
     Animated,
     PanResponder,
     Dimensions,
     LayoutAnimation, 
     UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_OUT_DURATION = 250; // millisec

class Deck extends Component {

    // default Props - to handle the case of blank callbacks that may/maynot be passed by caller
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props) {
        // NOTE: 
        // both renderCard() and renderNoMoreCards() are callbacks passed in by the caller (main.j)

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
        // index: index of the card being swiped
        this.state = { panResponder, position, index: 0 };
        // BETTER to use this.position = position
    } // ctor

    // Lifecycle method - called when new Props are received by Component
    componentWillReceiveProps(nextProps) {
        // reset the state index, if new data (list of Cards)
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 });
        }
    }

    // Lifecycle method - when Component will be updated
    componentWillUpdate() {
        // next line for Android only
        UIManager.setLayoutAnimationEnabledExperimental && 
        UIManager.setLayoutAnimationEnabledExperimental(true);
        // tell RN to animate the changes made to the Component itself
        LayoutAnimation.spring();
    }


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
            toValue: { x: x, y: 0 },    // WAY to the Right / Left
            duration: SWIPE_OUT_DURATION       // msec
        }).start(() => this.onSwipeComplete(direction));
    }

    // When Swiping animation is done - call one of the callbacks to handle LEFT/RIGHT
    onSwipeComplete(direction) {
        // handle to the callbacks
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];    // index of card being swiped

        // pass the item to the callbacks
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        // reset position - for the next card
        this.state.position.setValue({ x: 0, y: 0 });  // really, a misuse of state
        // next item: increment new state
        this.setState({ index: this.state.index + 1 });
    }

     // callback when Pan Gesture released
    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    // show all cards
    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        // for each card in the 'data' prop, 
        // render it via the 'renderCard()' func in main.js
        return this.props.data.map((item, ix) => {
            if (ix < this.state.index) { return null; } // do not render

            if (ix === this.state.index) {  // only attach handlers if ix matches this.state.index
                return (
                    <Animated.View
                      key={item.id}
                      style={[this.getCardStyle(), styles.cardStyle]}
                      {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            // else, just render the card (w/o panHandlers)
            // pass in thru a View to apply our cardStyle
            // Stack the cards by specifying the 'top' value
            return (
                <Animated.View 
                  key={item.id} 
                  style={[styles.cardStyle, { top: 10 * (ix - this.state.index) }]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse(); // put bottom most item at the top
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

// Styling
const styles = {
    // 
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
};

// export
export default Deck;
