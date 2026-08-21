package com.teriteri.backend.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 注册参数 DTO（格式校验统一放在注解上，service 只做业务校验）
 */
@Data
public class RegisterDTO {

    @NotBlank(message = "用户名不能为空")
    @Size(min = 6, max = 16, message = "用户名长度须为6~16位")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "用户名只能包含字母、数字、下划线")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 100, message = "密码长度须为6~100位")
    private String password;

    @NotBlank(message = "确认密码不能为空")
    private String confirmedPassword;
}
