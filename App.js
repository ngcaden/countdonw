import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import moment from 'moment';
import KeepAwake from 'react-native-keep-awake';



class StaticCard extends React.Component {
    spanStyle = function(option) {
        if (option == 'upperCard') {
            return {
                'fontSize': 40,
                'transform': [{ translateY: 30 }],
                'color': '#333333',
            }
        } else {
            return {
                'fontSize': 40,
                'transform': [{ translateY: -30 }],
                'color': '#333333',
            }
        }
    }

    cardStyle = function (option) {
        if (option == 'upperCard') {
            return {
                'display': 'flex',
                'position': 'relative',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderBottomWidth': 0.5,
                'borderBottomColor': 'whitesmoke',
                'borderTopLeftRadius': 3,
                'borderTopRightRadius': 3,
                'width': '100%',
                'height': '50%',
                'overflow': 'hidden',
            }
        } else {
            return {
                'display': 'flex',
                'position': 'relative',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderBottomWidth': 0.5,
                'borderBottomColor': 'whitesmoke',
                'borderTopLeftRadius': 3,
                'borderTopRightRadius': 3,
                'width': '100%',
                'height': '50%',
                'overflow': 'hidden',
            }
        }
    }
    
    render() {
        const {position, digit} = this.props;
        return(
            <View style={this.cardStyle(position)}>
                <Text style={this.spanStyle(position)}>{digit}</Text>
            </View>
        );
    }
}

class AnimatedCard extends React.Component {
    spanStyle1 = function (option) {
        if (option == 'fold') {
            return {
                'fontSize': 40,
                // 'fontWeight': 'lighter',
                'transform': [{ translateY: 30 }],
                'color': '#333333',
            }
        } else {
            return {
                'fontSize': 40,
                // 'fontWeight': 'lighter',
                'transform': [{ translateY: 30 }],
                'color': '#333333',
            }
        }
    }

    cardStyle1 = function (option) {
        if (option == 'fold') {
            return {
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderBottomWidth': 0.5,
                'borderBottomColor': 'whitesmoke',
                'position': 'absolute',
                'left': 0,
                'width': 140,
                'height': 60,
                'overflow': 'hidden',
                // backface - visibility: hidden
                'top': '0%',
                // transform - origin: 50 % 100 %
                'transform': [{rotateX : '0deg'}], // from 0 to -180
                'backgroundColor': 'white',
                // border - top - left - radius: 3px
                // border - top - right - radius: 3px
                // border: 0.5px solid $border
                // border - bottom: 0.5px solid $border
            }
        } else {
            return {
                'justifyContent': 'center',
                'borderBottomWidth': 0.5,
                'borderBottomColor': 'whitesmoke',
                'position': 'absolute',
                'left': 0,
                'width': 140,
                'height': 60,
                'overflow': 'hidden',
                // backface - visibility: hidden
                'top': '50%',
               'alignItems': 'center',
                // transform-origin: 50% 0 %
                'transform': [{ rotateX: '180deg' }], // from 180 to 0
                'backgroundColor': 'white',
                // border - bottom - left - radius: 3px
                // border-bottom - right - radius: 3px
                // border: 1px solid $border
                // border - top: 0.5px solid $border
            }
        }
    }

    render() {
        const { position, digit, animation } = this.props;
        return (
            <View style={this.cardStyle1(animation)}>
                <Text style={this.spanStyle1(animation)}>{digit}</Text>
            </View>
        );
    }
}


class FlipUnitContainer extends React.Component {
    render() {
        const {digit, shuffle, unit} = this.props;

        let now = digit;
        let before = digit - 1;

        // Prevent negative values
        if(unit!='hours') {
            before = before === -1 ? 59 : before;
        } else {
            before = before === -1 ? 23 : before;
        }

        // Add zero
        if (now < 10) {
            now = `0${now}`;
        }
        if(before < 10) {
            before = `0${before}`;
        }

        // Shuffle digits
        const digit1 = shuffle ? before : now;
        const digit2 = !shuffle ? before : now;
        
        const animation1 = shuffle ? 'fold' : 'unfold';
        const animation2 = !shuffle? 'fold' : 'unfold';

        return(
            <View style={styles.flipUnitContainer}>
                <StaticCard position={'upperCard'} digit={now} />
                <StaticCard position={'lowerCard'} digit={before} />
                <AnimatedCard digit={digit1} animation={animation1} />
                {/* <AnimatedCard digit={digit2} animation={animation2} /> */}
            </View>
            
        );
    }
}



export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.deadline = moment('2018-09-02 24:00:00');

        this.state = {
            diff: this.deadline.diff(moment([]), 'days'),
            hours: moment().hours(),
            minutes: moment().minutes(),
            seconds: moment().seconds(),
            hoursShuffle: true,
            minutesShuffle: true,
            secondsShuffle: true,
        };
    }

    componentDidMount() {
        setInterval(() => {
            const hours = moment().hours();
            const minutes = moment().minutes();
            const seconds = moment().seconds();

            if (hours != this.state.hours) {
                const hoursShuffle = !this.state.hoursShuffle;
                this.setState({
                    hours,
                    hoursShuffle
                });
            }
            
            if (minutes != this.state.minutes) {
                const minutesShuffle = !this.state.minutesShuffle;
                this.setState({
                    minutes,
                    minutesShuffle
                });
            }
            
            if (seconds != this.state.seconds) {
                const secondsShuffle = !this.state.secondsShuffle;
                this.setState({
                    seconds,
                    secondsShuffle
                });
            }
        }, 50);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.clock}>
                    <StatusBar hidden={true} />
                    <Text style={styles.text}>{this.state.time}</Text>
                    <Text style={styles.text}>{this.state.diff}</Text>
                </View> */}

                <View style={styles.flipClock}>
                    <FlipUnitContainer 
                        unit={'hours'} 
                        digit={this.state.hours}
                        shuffle={this.state.hoursShuffle}
                    />
                    <FlipUnitContainer
                        unit={'minutes'}
                        digit={this.state.minutes}
                        shuffle={this.state.minutesShuffle}
                    />
                    <FlipUnitContainer
                        unit={'seconds'}
                        digit={this.state.seconds}
                        shuffle={this.state.secondsShuffle}
                    />
                </View>
                {/* <KeepAwake /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,232,75)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    linearGradient: {
        flex: 1
    },

    text: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },

    clock: {
        height:200,
        width:500,
        backgroundColor: 'rgb(0,130,175)'
    },

    flipClock: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 500,
        flexDirection: 'row'
    },

    flipUnitContainer: {
        // flexWrap: 'wrap',
        // alignItems: 'flex-start',
        // flexDirection: 'row',
        position: 'relative',
        width: 140,
        height: 120,
        // perspectiveOrigin: ['50%', '50%'],
        // perspective: 300,
        backgroundColor: 'white',
        borderRadius: 3,
        // box - shadow: 0px 10px 10px - 10px grey
    },
});
