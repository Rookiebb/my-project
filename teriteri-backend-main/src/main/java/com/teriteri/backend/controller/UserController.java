package com.teriteri.backend.controller;

import com.teriteri.backend.common.response.R;
import com.teriteri.backend.pojo.dto.LoginDTO;
import com.teriteri.backend.pojo.dto.RegisterDTO;
import com.teriteri.backend.pojo.vo.UserVO;
import com.teriteri.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/account")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 注册接口
     * @param dto 包含 username、password、confirmedPassword 的注册参数
     */
    @PostMapping("/register")
    public R<Void> register(@Valid @RequestBody RegisterDTO dto) {
        userService.register(dto);
        return R.ok();
    }

    /**
     * 登录接口
     * @param dto 包含 username、password 的登录参数
     * @return 用户信息（含 token）
     */
    @PostMapping("/login")
    public R<UserVO> login(@Valid @RequestBody LoginDTO dto) {
        return R.ok(userService.login(dto));
    }
}
