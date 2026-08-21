package com.teriteri.backend.common.exception;

import com.teriteri.backend.common.enums.ResultCode;
import lombok.Getter;

/**
 * 业务异常：service 层校验失败时抛出，
 * 由全局异常处理器统一转换为 R 响应，避免 service 里到处 return R.fail(...)
 */
@Getter
public class BusinessException extends RuntimeException {

    private final int code;

    public BusinessException(ResultCode resultCode) {
        super(resultCode.getMessage());
        this.code = resultCode.getCode();
    }

    public BusinessException(ResultCode resultCode, String message) {
        super(message);
        this.code = resultCode.getCode();
    }
}
