import React, { Component } from "react";
import { 
    View, 
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager 
} from "react-native";
import styles from "./swiper.styles"

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

class Swiper extends Component {
    static defaultProps = {
        // if the user does not pass in these props, we just use an empty function
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
        renderNoMoreCards: () => {},
        keyProp: "id"
    }

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, // call back called anytime user taps on screen
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy})
            }, // call back called anytime user drags on screen
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left')
                } else {
                    this.resetPosition();
                }
            } // call back called everytime user release finger on screen
        });
        this.state = { panResponder, position, currentIndex: 0 }; 
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data){
            this.setState({currentIndex: 0});
        }
    }

    componentDidUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(this.state.position, {
            toValue: { x, y: 0},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.currentIndex]
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.state.position.setValue({x: 0, y: 0})

        // increment the index (to signal next card)
        this.setState({
            currentIndex: this.state.currentIndex + 1
        })
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        })
        return {
           // only returning a single object
           // so use spread operator to spread all getLayout properties
           ...position.getLayout(),
           transform: [{ rotate }]
       }
    }

    renderCards() {
        if (this.state.currentIndex >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        } 

        return this.props.data.map((item, index) => {
            if ( index < this.state.currentIndex) {return null; }
            if (index === this.state.currentIndex) {
                return (
                    <Animated.View
                        key={item[this.props.keyProp]}
                        style={[this.getCardStyle(), styles.topCard]} 
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            } 
            return (
                <Animated.View 
                    key={item[this.props.keyProp]} 
                    style={[styles.cardStyle, { top: 10 * (index - this.state.currentIndex)}]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        
        }).reverse();
    }
    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

export default Swiper;