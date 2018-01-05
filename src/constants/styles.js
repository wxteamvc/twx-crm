import { StyleSheet } from 'react-native';
import { fontSizeScaler } from '../constants/global';
export const styles = StyleSheet.create({
    //垂直布局垂直靠下
    flex_column_end: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    //垂直布局居中
    flex_column_center: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //水平布局居中
    flex_row_center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
     //水平布局水平靠左垂直居中
     flex_row_columnCenter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //字体大小
    fontsize12: {
        fontSize: 12 * fontSizeScaler
    },
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
    }
})