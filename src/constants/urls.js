
//域名
export const DOMAIN = 'http://www.wxdevelop.com';
//服务器api地址
export const BASIC_URL = DOMAIN + "/laravel-cms/public/api";
//发送jpush注册号
export const Add_jpush = BASIC_URL + '/addJpush';
//登陆
export const Login_url = BASIC_URL + '/login';
//微信登陆
export const Login_wechat_url = BASIC_URL + '/wxLogin';

//获取用户信息
export const UserInfo_url = BASIC_URL + '/getUserInfo';

//获取客户列表信息
export const CustomerList_url = BASIC_URL + '/getCustomerList';

//获取客户详细信息
export const CustomerInfo_url = BASIC_URL + '/getCustomerInfo';


//获取公司列表信息
export const CompanyList_url = BASIC_URL + '/getCompanyList';

//上传头像
export const Upload_avatar = BASIC_URL + '/upload/avatar';

//绑定微信
export const Bind_wechat = BASIC_URL + '/bindWeChat';
//绑定微信
export const Unbind_wechat = BASIC_URL + '/unbindWeChat';
//获取验证码
export const Get_captcha = BASIC_URL + '/getCaptcha';
//绑定手机
export const Bind_tel = BASIC_URL + '/bindTel';

//提交反馈意见
export const Submit_feed_back = BASIC_URL + '/submitFeedBack';

//获取任务列表
export const TASKLIST_URL =  BASIC_URL + '/getTasks';

//获取任务表单数据
export const Get_task_form_options =  BASIC_URL + '/getTaskFormOptions';

//提交任务表单
export const Submit_task =  BASIC_URL + '/addAssignedTask';