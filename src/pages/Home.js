import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView } from 'react-native';
import { Grid, WhiteSpace, Carousel } from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import Notices from '../components/notices';

class Home extends Component {

    renderCarouselItem = () => {
        const { banner } = this.props;
        const items = banner.map((item, index) => {
            return (
                <Image  resizeMode={'cover'} source={{ uri: item }} style={{ width: ScreenWidth, height: 150 }} key={index} />
            )
        })
        return items
    }

    render() {
        const { home_top, modules, notices } = this.props;
        const selectModules = [];
        modules.map(function (item) {
            if (item.selected) {
                selectModules.push(item)
            }
        })
        selectModules.push(
            {
                name: '更多',
                icon: require('../constants/images/更多.png'),
                goUrl: 'EditModules'
            },
        )
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.home_top, styles.flex_column_end]}>
                        <View style={[styles.home_top_content]}>
                            <Grid data={home_top}
                                columnNum={4}
                                hasLine={false}
                                onClick={(item, index) => {
                                    this.props.navigation.navigate(item.goUrl)
                                }}
                                itemStyle={styles.flex_center}
                                renderItem={(dataItem, index) => {
                                    return (
                                        <View style={styles.flex_center}>
                                            <Image source={dataItem.icon} style={{ width: 30, height: 30, }} />
                                            <Text style={[styles.fontsize10, { color: '#fff' }]}>{dataItem.name}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff' }}>
                        <Grid data={selectModules}
                            columnNum={4}
                            isCarousel={true}
                            carouselMaxRow={2}
                            hasLine={false}
                            onClick={(item, index) => {
                                this.props.navigation.navigate(item.goUrl)
                            }}
                            itemStyle={styles.flex_center}
                            renderItem={(dataItem, index) => {
                                return (
                                    <View style={styles.flex_center}>
                                        <Image source={dataItem.icon} style={{ width: 30, height: 30 }} />
                                        <Text style={styles.fontsize10}>{dataItem.name}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <WhiteSpace size={'sm'} />
                    <Notices data={notices} imageSize={30} callBack={(item) => { alert('我要去' + item.goUrl) }} />
                    <WhiteSpace size={'sm'} />
                    <Carousel
                        dots={false}
                        autoplay={true}
                        infinite={true}
                    >
                        {this.renderCarouselItem()}
                    </Carousel>
                </ScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        home_top: state.localConfigReducer.home_top,
        modules: state.localConfigReducer.modules,
        notices: state.localConfigReducer.notices,
        banner: state.localConfigReducer.banner
    }
}
export default connect(mapStateToProps)(Home);

