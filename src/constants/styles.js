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
    //垂直居中 ,水平靠右
    flex_row_end: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
    //````````````````````````通知组件````````````````````````````````
    //通知组件身体样式
    notices_body: {
        padding: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'
    },
})