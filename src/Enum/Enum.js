export const enums = new Map([

    // 基本返回码
    [101, '成功'],
    [102, '参数错误'],
    [103, '需要登录'],
    [104, '此请求只允许学生账号'],
    [105, '此请求只允许教师账号'],
    [106, '此请求只允许管理员账号'],

    //用户操作返回码
    [201, '登录失败，账号或密码错误'],
    [202, '账号重复'],
    [203, '修改密码失败，账号或密码错误'],

    // 业务异常返回码
    [301, '非教师用户创建试卷'],
    [302, '非试卷创建者'],
    [303, '查找失败'],
    [304, '试卷非可作答状态'],
    [305, '多次作答'],
    [306, '作答他人试卷'],
    [307, '试卷不存在'],
    [308, '题目不存在'],
    [309, '答卷不存在'],
    [310, '试卷不允许变更为此状态'],
    [311, '试卷非创建状态不允许修改'],
    [312, '试卷非结束作答状态不允许导出'],
    [313, '试卷此状态不允许删除'],
    [314, '非试卷创建者不允许导出试卷'],
    [315, '导出excel失败'],

    // 系统错误返回码
    [401, '用户不存在'],
    [402, 'oss客户端初始化失败'],
    [403, '上传文件出错'],
])



// // 基本返回码
// export const SUCCESS = 101
// export const SUCCESS_TEXT = "成功"
// export const PARAM_WRONG = 102
// export const PARAM_WRONG_TEXT = "参数错误"
// export const NEED_TO_LOGIN = 103
// export const NEED_TO_LOGIN_TEXT = "需要登录"
// export const REQUIRE_STUDENT = 104
// export const REQUIRE_STUDENT_TEXT = "此请求只允许学生账号"
// export const REQUIRE_TEACHER = 105
// export const REQUIRE_TEACHER_TEXT = "此请求只允许教师账号"
// export const REQUIRE_ADMIN = 106
// export const REQUIRE_ADMIN_TEXT = "此请求只允许管理员账号"

// // 用户操作返回码
// export const LOGIN_FAILED = 201
// export const LOGIN_FAILED_TEXT = "登录失败，账号或密码错误"
// export const ACCOUNT_RECUR = 202
// export const ACCOUNT_RECUR_TEXT = "账号重复"
// export const CHANGE_PASSWORD_FAILED = 203
// export const CHANGE_PASSWORD_FAILED_TEXT = "修改密码失败，账号或密码错误"

// // 业务异常返回码
// export const NOT_TEACHER_CREATE_PAPER = 301
// export const NOT_TEACHER_CREATE_PAPER_TEXT = "非教师用户创建试卷"
// export const NOT_PAPER_CREATOR = 302
// export const NOT_PAPER_CREATOR_TEXT = "非试卷创建者"
// export const FIND_FAILED = 303
// export const FIND_FAILED_TEXT = "查找失败"
// export const PAPER_STATE_NOT_ANSWERING = 304
// export const PAPER_STATE_NOT_ANSWERING_TEXT = "试卷非可作答状态"
// export const ANSWER_TWICE = 305
// export const ANSWER_TWICE_TEXT = "多次作答"
// export const ANSWER_OTHERS_PAPER = 306
// export const ANSWER_OTHERS_PAPER_TEXT = "作答他人试卷"
// export const PAPER_NOT_EXIST = 307
// export const PAPER_NOT_EXIST_TEXT = "试卷不存在"
// export const PROBLEM_NOT_EXIST = 308
// export const PROBLEM_NOT_EXIST_TEXT = "题目不存在"
// export const PAPER_ANSWER_NOT_EXIST = 309
// export const PAPER_ANSWER_NOT_EXIST_TEXT = "答卷不存在"
// export const PAPER_STATE_CHANGE_NOT_ALLOW = 310
// export const PAPER_STATE_CHANGE_NOT_ALLOW_TEXT = "试卷不允许变更为此状态"
// export const PAPER_STATE_IS_NOT_CREATING = 311
// export const PAPER_STATE_IS_NOT_CREATING_TEXT = "试卷非创建状态不允许修改"
// export const PAPER_STATE_IS_NOT_END_ANSWER = 312
// export const PAPER_STATE_IS_NOT_END_ANSWER_TEXT = "试卷非结束作答状态不允许导出"
// export const PAPER_STATE_CAN_NOT_DELETE = 313
// export const PAPER_STATE_CAN_NOT_DELETE_TEXT = "试卷此状态不允许删除"
// export const NOT_CREATOR_EXPORT_PAPER = 314
// export const NOT_CREATOR_EXPORT_PAPER_TEXT = "非试卷创建者不允许导出试卷"
// export const EXPORT_PAPER_FAILED = 315
// export const EXPORT_PAPER_FAILED_TEXT = "导出excel失败"

// // 系统错误返回码
// export const USER_NOT_EXIST = 401
// export const USER_NOT_EXIST_TEXT = "用户不存在"
// export const OSS_CLIENT_INIT_FAILED = 402
// export const OSS_CLIENT_INIT_FAILED_TEXT = "oss客户端初始化失败"
// export const OSS_UPLOAD_FILE_FAILED = 403
// export const OSS_UPLOAD_FILE_FAILED_TEXT = "上传文件出错"