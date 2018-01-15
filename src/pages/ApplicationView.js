import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StatusBar,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;


class Application extends Component {
    render() {
        let { initData } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={false}
                />
                <ParallaxScrollView
                    headerBackgroundColor="#333"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View key="background">
                            <Image source={
                                require('../constants/images/infobackground.jpg')
                            }
                                style={{ width: 420, height: PARALLAX_HEADER_HEIGHT }}
                            />
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                width: 420,
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                height: PARALLAX_HEADER_HEIGHT
                            }} />
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" >
                            <Text style={{ color: '#999' }}>我可能是标题吧</Text>
                        </View>
                    )}
                >     
                </ParallaxScrollView>
            </View>


        )
    }
}


function mapStateToProps(state) {
    return {
        initData: state.initReducer
    }
}
export default connect(mapStateToProps)(Application);