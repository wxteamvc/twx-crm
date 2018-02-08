
//域名
export const DOMAIN = 'http://www.wxdevelop.com';
//服务器api地址
export const BASIC_URL = DOMAIN + "/laravel-cms/public/api";
//发送jpush注册号
export const Add_jpush = BASIC_URL + '/addJpush';
//注册
export const Register_url = BASIC_URL + '/register';
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
export const TASKLIST_URL = BASIC_URL + '/getTasks';

//获取任务表单数据
export const Get_task_form_options = BASIC_URL + '/getTaskFormOptions';

//提交任务表单
export const Submit_task = BASIC_URL + '/addAssignedTask';

//请求订单列表
export const Get_orderList = BASIC_URL + '/getOrderList';

//请求订单信息
export const Get_orderInfo = BASIC_URL + '/getOrderInfo';

//获取客服id
export const GetContactId_url = BASIC_URL + '/getContacts';

//发送聊天消息
export const SendMsg_url = BASIC_URL + '/sendMsg';

//获取聊天历史消息
export const ChatHistory_url = BASIC_URL + '/getChatHistory';

//获取首页数据
export const HomeInfo_url = BASIC_URL + '/getAppHome';

//修改公司主页内容
export const SetCompanyHome = BASIC_URL + '/setCompanyHome';
//获取员工列表
export const StaffList_url = BASIC_URL + '/getStaffList';
//搜索用户
export const SearchUser_url = BASIC_URL + '/searchUser';
//申请添加员工
export const AddStaff_url = BASIC_URL + '/addStaff';
//企业认证
export const Company_authentication_url = BASIC_URL + '/companyAuth';
//获取公司首页数据
export const CompanyHome_url = BASIC_URL + '/getCompanyHome';
//关注公司
export const FollowCompany_url = BASIC_URL + '/followCompany';