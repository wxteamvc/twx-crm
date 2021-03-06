import { StyleSheet } from 'react-native';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';

export const styles = StyleSheet.create({

    //````````````````````````通用````````````````````````````````
    //横向排列
    flex_row: {
        flexDirection: 'row'
    },
    //纵向排列
    flex_column: {
        flexDirection: 'column'
    },
    //垂直布局垂直靠下
    flex_column_end: {
        flexDirection: 'column', justifyContent: 'flex-end',
    },
    //垂直布局垂直居中
    flex_column_columncenter: {
        flexDirection: 'column', justifyContent: 'center',
    },
    //垂直布局水平居中
    flex_column_rowcenter: {
        flexDirection: 'column', alignItems: 'center',
    },
    //垂直布局两端对齐
    flex_column_between: {
        flexDirection: 'column', justifyContent: 'space-between',
    },
    //水平布局双向居中
    flex_row_center: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    //水平布局水平居中
    flex_row_rowcenter: {
        flexDirection: 'row', justifyContent: 'center',
    },
    //垂直布局双向居中
    flex_column_center: {
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    },
    //水平布局垂直居中
    flex_row_columncenter: {
        flexDirection: 'row', alignItems: 'center',
    },

    //双向居中
    flex_center: {
        justifyContent: 'center', alignItems: 'center',
    },
    //垂直居中,水平靠右
    flex_row_end: {
        flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    },
    //水平布局 两端对齐 垂直居中
    flex_row_between: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    },
    //字体大小24
    fontsize24: {
        fontSize: 24 * fontSizeScaler
    },
    //字体大小22
    fontsize22: {
        fontSize: 22 * fontSizeScaler
    },
    //字体大小20
    fontsize20: {
        fontSize: 20 * fontSizeScaler
    },
    //字体大小18
    fontsize18: {
        fontSize: 18 * fontSizeScaler
    },
    //字体大小16
    fontsize16: {
        fontSize: 16 * fontSizeScaler
    },
    //字体大小15
    fontsize15: {
        fontSize: 15 * fontSizeScaler
    },
    //字体大小14
    fontsize14: {
        fontSize: 14 * fontSizeScaler
    },
    //字体大小12
    fontsize12: {
        fontSize: 12 * fontSizeScaler
    },
    //字体大小10
    fontsize10: {
        fontSize: 10 * fontSizeScaler
    },
    //字体大小8
    fontsize8: {
        fontSize: 8 * fontSizeScaler, color: '#ccc'
    },
    //全屏半透明黑色View
    blackView: {
        position: 'absolute', width: ScreenWidth, height: ScreenHeight, top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.7)'
    },
    // //正常模式标题背景颜色
    // title_bgc_light: {
    //     backgroundColor: ''
    // },
    // //夜间模式标题背景颜色
    // title_bgc_dark: {
    //     backgroundColor: ''
    // },
    // //正常模式内容背景颜色
    // content_bgc_light: {
    //     backgroundColor: ''
    // },
    // //夜间模式内容背景颜色
    // content_bgc_dark: {
    //     backgroundColor: ''
    // },
    // //正常模式文字颜色
    // text_light: {
    //     color: ''
    // },
    // //夜间模式文字颜色
    // text_dark: {
    //     color: ''
    // },

    //````````````````````````首页````````````````````````````````
    //首页顶部
    home_top: {
        height: 150, backgroundColor: '#40a9ff',
    },
    //首页顶部内容
    home_top_content: {
        flex: 0.6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5, marginBottom: 20
    },
    //首页活动列表容器
    home_activity_title: {
        padding: 10, borderColor: '#ccc', borderBottomWidth: 0.3, backgroundColor: '#fff'
    },
    //首页活动列表标题
    home_activity_title_View: {
        paddingLeft: 5, borderColor: '#40A9FF', borderLeftWidth: 3,
    },
    //首页服务列表item
    home_serve_title_item: {
        padding: 10, borderColor: '#ccc', borderWidth: 0.5, flex: 1
    },
    //首页活动列表item
    home_activity_title_item: {
        padding: 10, borderColor: '#ccc', borderWidth: 0.5, borderRadius: 5, paddingBottom: 5, width: 100
    },
    home_activity_title_item_btn: {
        padding: 3, paddingLeft: 15, paddingRight: 15, borderRadius: 5
    },
    home_activity_title_item_top: {
        height: 30, width: 100, position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', borderTopLeftRadius: 5, borderTopRightRadius: 5
    },
    home_activity_title_item_img_container: {
        padding: 5, backgroundColor: '#fff', borderRadius: 33
    },
    home_activity_title_item_img_img: {
        width: 60, height: 60, borderRadius: 30
    },
    //````````````````````````客户列表页面````````````````````````````````
    //列表元素身体样式
    item_body: {
        marginLeft: 5, marginRight: 5, paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
    //列表元素头部样式
    item_header: {
        padding: 5, backgroundColor: '#009966', borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
    item_header_img: {
        width: 20, height: 20
    },
    item_accordion_btn: {  //点击展开按钮样式
        padding: 10, backgroundColor: '#fff', marginLeft: 5, marginRight: 5
    },
    item_accordion_content: {  //展开部分样式
        backgroundColor: '#fff', marginLeft: 5, marginRight: 5
    },
    //````````````````````````客户详细信息页面````````````````````````````````
    //头部背景样式
    customerInfo_head_bg: {
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    //头部按钮背景样式
    customerInfo_head_btn: {
        width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.3)',
    },

    //````````````````````````通知组件````````````````````````````````
    //通知组件身体样式
    notices_body: {
        padding: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'
    },
    //```````````````````````加载页面组件·······················
    loadingBox: { // Loading居中
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    //```````````````````````客户信息组件样式·······················
    InfoPage_item_body: {
        padding: 10, borderColor: '#ccc', borderBottomWidth: 0.5
    },
    //```````````````````````客户订单列表组件样式·······················
    OrderListPage_item_body: {
        backgroundColor: '#fff', paddingLeft: 10, paddingRight: 10
    },
    OrderListPage_item_header: {
        paddingTop: 5, paddingBottom: 5, borderColor: '#ccc', borderBottomWidth: 0.5
    },
    OrderListPage_item_header_left: {
        paddingLeft: 10, borderColor: '#FF7D87', borderLeftWidth: 3
    },
    OrderListPage_item_header_img: {
        width: 15, height: 15, borderRadius: 7.5, marginRight: 10
    },
    OrderListPage_item_content: {
        paddingTop: 5, paddingBottom: 5, paddingBottom: 10, paddingTop: 10, borderColor: '#ccc', borderBottomWidth: 0.5
    },
    OrderListPage_item_footer: {
        paddingTop: 5, paddingBottom: 5
    },
    //```````````````````````客户联系人组件样式·······················
    CustomerContacts_item_body: {
        padding: 5, backgroundColor: '#fff'
    },
    CustomerContacts_item_image: {
        width: 40, height: 40,
    },
    CustomerContacts_item_rightImg: {
        width: 25, height: 25,
    },
    //```````````````````````添加新客户页面样式·······················
    ApplicationView_item_body: {
        backgroundColor: '#fff', marginLeft: 10, marginRight: 10, paddingBottom: 5,
    },
    //```````````````````````订单详情页面样式·······················
    OrderInfo_container: {
        flex: 1, backgroundColor: '#fff'
    },
    OrderInfo_top: {
        height: 120, backgroundColor: 'rgba(255,255,255,0.3)'
    },
    OrderInfo_top_img: {
        width: 30, height: 30, borderRadius: 10
    },
    OrderInfo_tab_btn: {
        padding: 10, flex: 1
    },
    OrderInfo_tab_Lbtn: {
        marginRight: 10
    },
    OrderInfo_content_header: {
        height: 20, marginTop: 10, marginLeft: 20, marginRight: 20, backgroundColor: '#2A3B61', borderTopLeftRadius: 5, borderTopRightRadius: 5
    },
    OrderInfo_content_container: {
        borderRadius: 5, marginLeft: 10, marginRight: 10
    },
    //```````````````````````订单详情组件样式·······················
    order_info_head: {
        backgroundColor: '#445596', padding: 15, paddingTop: 20, paddingBottom: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5
    },
    order_info_rowItem_body: {
        padding: 10, borderColor: '#ccc', borderBottomWidth: 0.7, paddingLeft: 0, paddingRight: 0
    },
    //```````````````````````订单周期组件样式·······················
    order_cycle_container: {
        flex: 1, marginLeft: 5, marginRight: 5
    },
    order_cycle_listItem: {
        paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'
    },
    order_cycle_whitespace: {
        height: 5, backgroundColor: '#E9E9EF',
    },
    order_cycle_listItem_head: {
        paddingTop: 5, paddingBottom: 5, borderColor: '#ccc', borderBottomWidth: 0.7
    },
    order_cycle_listItem_body: {
        paddingTop: 5, paddingBottom: 5, borderColor: '#ccc', borderBottomWidth: 0.7
    },
    order_cycle_listItem_foot: {
        paddingTop: 5, paddingBottom: 5
    },
    order_cycle_listItem_foot_img: {
        width: 15, height: 15
    },
    //```````````````````````订单管理页面样式·······················
    OrdersView_menu_container: {
        position: 'absolute', top: 0, zIndex: 20, width: ScreenWidth, borderColor: '#ccc', borderBottomWidth: 0.7
    },
    OrdersView_menu_header: {
        width: ScreenWidth, height: 40, backgroundColor: '#fff'
    },
    OrdersView_menu_left: {
        flex: 1, borderColor: '#ccc', borderRightWidth: 1
    },
    OrdersView_menu_content_typeView_item: {
        paddingTop: 5, paddingBottom: 5, flex: 0.5
    },
    OrdersView_content_container: {
        flex: 1, zIndex: 1, marginTop: 40,
    },
    //```````````````````````公司信息页面样式·······················
    companyHome_head_avatar: {
        width: 70, height: 70, borderRadius: 35
    },
    companyHome_head_foot_container: {
        position: 'absolute', bottom: 5, right: 0,
    },
    companyHome_head_foot_text: {
        padding: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#CC3300', borderBottomLeftRadius: 5, borderTopLeftRadius: 5
    },
    companyHome_head_foot_btn: {
        marginRight: 10
    },
    companyHome_head_modify_btn: {
        padding: 2, paddingLeft: 15, paddingRight: 15, backgroundColor: '#445596', borderRadius: 5
    },
    companyHome_content_activity_header: {  //公司活动头部样式
        paddingTop: 10, paddingBottom: 10
    },
    companyHome_content_activity_listItem_body: {
        paddingTop: 10, paddingBottom: 10,
    },
    companyHome_content_synopsis_body: {
        paddingTop: 10
    },
    companyHome_content_synopsis_content: {
        backgroundColor: '#fff', paddingLeft: 15, paddingRight: 15, paddingTop: 25, paddingBottom: 5, marginLeft: 5, marginRight: 5, borderRadius: 5
    },
    companyHome_content_synopsis_position: {
        position: 'absolute', top: 5, left: 5, flexDirection: 'row'
    },
    companyHome_content_synopsis_position_title: {
        backgroundColor: '#FF7D87', padding: 3, paddingLeft: 10, paddingRight: 10
    },
    companyHome_content_synopsis_position_jiao: {
        borderBottomWidth: 5, borderBottomColor: '#993300', borderTopWidth: 5, borderTopColor: 'transparent', borderRightColor: 'transparent', borderRightWidth: 5, position: 'relative', top: -17
    },
    companyHome_count_container: {
        height: 80, marginLeft: 5, marginRight: 5, backgroundColor: '#F75297', borderRadius: 5
    },


    //```````````````````````公司认证页面样式·······················
    CompanyAuthentication_input_container: {
        backgroundColor: '#fff', paddingLeft: 10, borderColor: '#ccc', borderBottomWidth: 0.5
    },
    CompanyAuthentication_input: {
        padding: 5, flex: 0.6
    },
    CompanyAuthentication_upload_container: {
        backgroundColor: '#fff', height: 150
    },
    CompanyAuthentication_upload_img_container: {
        width: 100, height: 100, backgroundColor: '#E9E9EF'
    },
    CompanyAuthentication_upload_img_default: {
        width: 40, height: 40
    },
    CompanyAuthentication_upload_img_photo: {
        width: 100, height: 100
    },
    //```````````````````````客户担保人页面样式·······················

    CustomerContact_add_btn: {
        padding: 10, paddingLeft: 30, paddingRight: 30, backgroundColor: '#fff', borderWidth: 0.7, borderRadius: 5, borderColor: '#ccc'
    },
})  

