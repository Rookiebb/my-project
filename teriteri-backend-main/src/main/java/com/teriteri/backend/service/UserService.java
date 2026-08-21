package com.teriteri.backend.service;

import com.teriteri.backend.pojo.dto.LoginDTO;
import com.teriteri.backend.pojo.dto.RegisterDTO;
import com.teriteri.backend.pojo.vo.UserVO;

public interface UserService {

    /**
     * 用户注册（校验失败抛出 BusinessException）
     * @param dto 注册参数
     */
    void register(RegisterDTO dto);

    /**
     * 用户登录（校验失败抛出 BusinessException）
     * @param dto 登录参数
     * @return 用户信息（含 token）
     */
    UserVO login(LoginDTO dto);
}
