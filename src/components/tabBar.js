import React, { Component } from 'react';
import { View, Text,Image,StatusBar,Platform } from 'react-native';
import { TabView } from 'teaset';

class TabBar extends Component {

    renderCustomButton(item) {
        let bigIcon = (
            <View style={{
              width: 54,
              height: 54,
              borderRadius: 27,
              shadowColor: '#ccc',
              shadowOffset: {height: -1},
              shadowOpacity: 0.5,
              shadowRadius: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                style={{width: 44, height: 44, borderRadius: 22}}
                source={item.icon}
                />
            </View>
        );
        return (
          <TabView.Sheet
            type='button'
            title={item.title}
            icon={bigIcon}
            iconContainerStyle={{justifyContent: 'flex-end'}}
            onPress={() => alert(item.url)}
            />
        );
      }

      renderView = ()=>{
        return null;
      }
    render() {
        let {children,activeIndex} = this.props;
        let customBarStyle = Platform.OS == 'android'  ? null : {
            borderTopWidth: 0,
            shadowColor: '#ccc',
            shadowOffset: {height: -1},
            shadowOpacity: 0.4,
            shadowRadius: 0.5,
          };
          let renderData = [
                {
                  title:'首页',
                  icon:require('../constants/images/录客户.png'),
                  activeIcon:require('../constants/images/录客户.png'),
                  url:'Home'
                },
                {
                    title:'创建',
                    icon:require('../constants/images/录客户.png'),
                    activeIcon:require('../constants/images/录客户.png'),
                    url:'Application'
                },
                {
                    title:'创建',
                    icon:require('../constants/images/加号.png'),
                    url:'Application',
                },
                {
                    title:'信用中心',
                    icon:require('../constants/images/录客户.png'),
                    activeIcon:require('../constants/images/录客户.png'),
                    url:'Statistics'
                },
                {
                    title:'个人中心',
                    icon:require('../constants/images/录客户.png'),
                    activeIcon:require('../constants/images/录客户.png'),
                    url:'Personal'
                }
          ];
        return (
            <TabView style={{flex: 1,backgroundColor:'#fff'}} type='projector' activeIndex={activeIndex} >
                {renderData.map((item,index)=>{
                    if (index == 2){
                        return this.renderCustomButton(item);
                    }
                    if (index == activeIndex){
                        return <TabView.Sheet
                        key={index}
                            title={item.title}
                            icon={item.icon}
                            activeIcon={item.activeIcon}
                            onPress={() => alert(item.url)}
                        >
                        {children}
                        </TabView.Sheet>
                    }else{
                        return <TabView.Sheet
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            activeIcon={item.activeIcon}
                            onPress={() => alert(item.url)}
                        />
                    }
                })}
            </TabView>
        )
    }
}

export default TabBar;

