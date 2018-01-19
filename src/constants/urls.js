
//域名
export const DOMAIN = 'http://www.wxdevelop.com';
//服务器api地址
export const BASIC_URL = DOMAIN + "/laravel-cms/public/api";
//登陆
export const Login_url = BASIC_URL + '/login';
//获取用户信息
export const UserInfo_url = BASIC_URL + '/getUserInfo';

//获取客户列表信息
export const CustomerList_url = BASIC_URL + '/getCustomerList';

//获取客户详细信息
export const CustomerInfo_url = BASIC_URL + '/getCustomerInfo';


//获取公司列表信息
export const CompanyList_url = BASIC_URL + '/getCompanyList';


//创建带参数的url
// export function buildUrlWithParams( url,params = ''){
//     return _get(url);
//     // let url = _get(url);
//     // if (url){
//     //     return `${url}/${params}`;
//     // }
// }