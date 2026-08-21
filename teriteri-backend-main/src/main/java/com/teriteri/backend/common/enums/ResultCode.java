package com.teriteri.backend.common.enums;

import lombok.Getter;

@Getter
public enum ResultCode {
    SUCCESS(200, "OK"),
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未登录或登录已过期"),
    FORBIDDEN(403, "无权访问"),
    NOT_FOUND(404, "资源不存在"),
    SERVER_ERROR(500, "服务器内部错误"),
    USER_NOT_FOUND(1001, "用户不存在"),
    PASSWORD_ERROR(1002, "密码错误"),
    USERNAME_EXIST(1003, "用户名已存在"),
    REGISTER_FAILED(1004, "注册失败，请稍后重试"),
    FILE_UPLOAD_FAILED(2001, "文件上传失败"),
    VIDEO_NOT_FOUND(3001, "视频不存在"),
    COMMENT_NOT_FOUND(4001, "评论不存在"),
    DANMU_SEND_FAILED(5001, "弹幕发送失败"),
    CHAT_SEND_FAILED(6001, "消息发送失败");

    private final int code;
    private final String message;

    ResultCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
