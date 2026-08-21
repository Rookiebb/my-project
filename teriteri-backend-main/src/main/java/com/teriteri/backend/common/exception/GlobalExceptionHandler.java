package com.teriteri.backend.common.exception;

import com.teriteri.backend.common.enums.ResultCode;
import com.teriteri.backend.common.response.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器：把各种异常统一转换成 R 格式返回给前端，
 * controller / service 里就不用再写 try-catch
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 业务异常：service 主动抛出的可预期错误
     */
    @ExceptionHandler(BusinessException.class)
    public R<Void> handleBusinessException(BusinessException e) {
        return R.fail(e.getCode(), e.getMessage());
    }

    /**
     * 参数校验失败：@Valid 注解校验不通过时触发
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public R<Void> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(FieldError::getDefaultMessage)
                .orElse("请求参数错误");
        return R.fail(ResultCode.BAD_REQUEST.getCode(), message);
    }

    /**
     * 兜底：未预期的异常，记录日志方便排查，避免把堆栈直接暴露给前端
     */
    @ExceptionHandler(Exception.class)
    public R<Void> handleException(Exception e) {
        log.error("服务器内部错误：", e);
        return R.fail(ResultCode.SERVER_ERROR);
    }
}
