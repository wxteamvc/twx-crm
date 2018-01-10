import { StyleSheet } from 'react-native';
import { fontSizeScaler } from '../constants/global';
export const styles = StyleSheet.create({

    //````````````````````````通用````````````````````````````````
    //垂直布局垂直靠下
    flex_column_end: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    //垂直布局水平居中
    flex_column_rowcenter: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    //水平布局垂直居中
    flex_row_columncenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    //水平布局水平居中
    flex_row_rowcenter: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    //水平布局水平居中
    flex_row_rowcenter: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    //双向居中
    flex_center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    //垂直居中,水平靠右
    flex_row_end: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    //水平布局 两端对齐 垂直居中
    flex_row_between: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    //字体大小10
    fontsize10: {
        fontSize: 10 * fontSizeScaler
    },
    //字体大小8
    fontsize8: {
        fontSize: 8 * fontSizeScaler,
        color: '#ccc'
    },

    //````````````````````````首页````````````````````````````````
    //首页顶部
    home_top: {
        height: 150,
        backgroundColor: '#40a9ff',
    },
    //首页顶部内容
    home_top_content: {
        flex: 0.6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 5,
        marginBottom: 20
    },
    //首页活动列表容器
    home_activity_title: {
        padding: 10,
        borderColor: '#ccc',
        borderBottomWidth: 0.3
    },
    //首页活动列表标题
    home_activity_title_View: {
        paddingLeft: 5,
        borderColor: '#40A9FF',
        borderLeftWidth: 3,
    },
    //首页活动列表item
    home_activity_title_item: {
        flex: 1, paddingTop: 5, paddingBottom: 5, borderColor: '#ccc', borderBottomWidth: 0.3, borderRightWidth: 0.3
    },
    //````````````````````````客户列表页面````````````````````````````````
    //列表元素身体样式
    item_body: {
      marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10,borderColor:'#ccc',borderBottomWidth:0.3
    },
    item_header: {
       paddingBottom:5,borderColor:'#ccc',borderBottomWidth:0.3
    },


    //````````````````````````通知组件````````````````````````````````
    //通知组件身体样式
    notices_body: {
        padding: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'
    },
    //```````````````````````加载页面组件·······················
    loadingBox: { // Loading居中
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
    }
})