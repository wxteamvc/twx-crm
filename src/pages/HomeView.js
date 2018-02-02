import React, { Component } from 'react';
import { View, Text, Image, ScrollView, FlatList, StatusBar, Platform, BackHandler ,TouchableOpacity} from 'react-native';
import { Grid, WhiteSpace, Carousel, Flex ,WingBlank,Icon} from 'antd-mobile';
import { styles } from '../constants/styles'
import { ScreenWidth } from '../constants/global';
import { connect } from 'react-redux';
import { Item } from 'antd-mobile/lib/tab-bar';
import Notices from '../components/notices';

class Home extends Component {
    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {

    }

    renderCarouselItem = () => {
        const { banner } = this.props.home;
        const items = banner.map((item, index) => {
            return (
                <Image resizeMode={'cover'} source={{ uri: item }} style={{ width: ScreenWidth, height: 180 }} key={index} />
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
                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                </Flex>
            </Flex>
        )
    }

    renderActivityList = ({ item }) => {
        return (
            <View style={[styles.flex_row_columncenter, styles.companyHome_content_activity_listItem_body]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.flex_center, { flex: 0.2 }]}>
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={item.img ? { uri: item.img } : require('../constants/images/activity.png')}
                        />
                    </View>
                    <View style={{ flex: 0.03 }}></View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[styles.fontsize12, { color: '#000' }]}>{item.title}</Text>
                        <WhiteSpace size={'xs'} />
                        <Text style={styles.fontsize10} numberOfLines={1}>{item.content}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { modules, home, isLogin } = this.props;
        const { notices, activityData, home_activity } = home;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={true}
                    backgroundColor='rgba(0,0,0,0.3)'
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Carousel
                        dots={false}
                        autoplay={true}
                        infinite={true}
                    >
                        {this.renderCarouselItem()}
                    </Carousel>
                    <WhiteSpace size={'sm'} />
                    <Notices data={notices} imageSize={30} callBack={(item) => { alert('我要去' + item.goUrl) }} />
                    <WhiteSpace size={'sm'} />
                    <FlatList
                        style={{ backgroundColor: '#fff' }}
                        ListHeaderComponent={
                            <View style={[styles.flex_row_columncenter, styles.home_activity_title]}>
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
                    <WhiteSpace size={'sm'} />
                    <FlatList
                        style={{ backgroundColor: '#fff' }}
                        ListHeaderComponent={
                            <View style={[styles.flex_row_between, styles.home_activity_title]}>
                                <View style={[styles.home_activity_title_View, { borderColor: '#CC0000' }]}>
                                    <Text style={styles.fontsize10}>精彩活动</Text>
                                </View>
                                <TouchableOpacity style={styles.flex_row_columncenter} activeOpacity={1} onPress={() => alert('查看更多')}>
                                    <Text style={styles.fontsize10}>更多</Text>
                                    <WingBlank size={'sm'}><Icon type={'right'} size={10} color={'#ccc'}/></WingBlank>
                                </TouchableOpacity>
                            </View>
                        }
                        data={activityData}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderActivityList}
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
        init: state.initReducer,
        isLogin: state.personalReducer.isLogin,
    }
}
export default connect(mapStateToProps)(Home);

