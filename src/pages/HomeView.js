import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import { Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import Notices from '../components/notices';

class Home extends Component {

    renderCarouselItem = () => {
        const { banner } = this.props.home;
        const items = banner.map((item, index) => {
            return (
                <Image resizeMode={'cover'} source={{ uri: item }} style={{ width: ScreenWidth, height: 150 }} key={index} />
            )
        })
        return items
    }

    renderFlatListItem = ({ item }) => {
        return (
            <Flex direction={'row'} align={'center'} style={styles.home_activity_title_item}>
                <Flex direction={'column'} align={'center'} style={{ flex: 0.7 }}>
                    <Text numberOfLines={1} style={styles.fontsize10}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.fontsize8}>{item.content}</Text>
                </Flex>
                <Flex justify={'center'} align={'center'} style={{ flex: 0.3 }}>
                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40,borderRadius:20 }} />
                </Flex>
            </Flex>
        )
    }

    render() {
        const {modules,home} = this.props;
        const { home_top, notices, home_activity } = home;
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
                    <WhiteSpace size={'sm'} />
                    <FlatList
                        style={{ backgroundColor: '#fff' }}
                        ListHeaderComponent={
                            <View style={[styles.flex_row_columncenter,styles.home_activity_title]}>
                                <View style={styles.home_activity_title_View}>
                                    <Text style={styles.fontsize10}>生活服务</Text>
                                </View>
                            </View>
                        }
                        data={home_activity}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderFlatListItem}
                    />
                </ScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        modules: state.localConfigReducer.modules,
        home: state.homeReducer,    
    }
}
export default connect(mapStateToProps)(Home);

