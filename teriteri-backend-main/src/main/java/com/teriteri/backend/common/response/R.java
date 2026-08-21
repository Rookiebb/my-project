package com.teriteri.backend.common.response;

import com.teriteri.backend.common.enums.ResultCode;
import lombok.Data;

import java.io.Serializable;

/**
 * 统一响应体：所有接口都返回这个格式 { code, message, data }
 */
@Data
public class R<T> implements Serializable {
    private int code;
    private String message;
    private T data;

    private R(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> R<T> ok() {
        return new R<>(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage(), null);
    }

    public static <T> R<T> ok(T data) {
        return new R<>(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage(), data);
    }

    public static <T> R<T> fail(ResultCode code) {
        return new R<>(code.getCode(), code.getMessage(), null);
    }

    public static <T> R<T> fail(int code, String message) {
        return new R<>(code, message, null);
    }
}
