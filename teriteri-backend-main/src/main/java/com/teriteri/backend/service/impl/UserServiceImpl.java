package com.teriteri.backend.service.impl;

import com.teriteri.backend.common.enums.ResultCode;
import com.teriteri.backend.common.exception.BusinessException;
import com.teriteri.backend.common.util.JwtUtil;
import com.teriteri.backend.mapper.UserMapper;
import com.teriteri.backend.pojo.dto.LoginDTO;
import com.teriteri.backend.pojo.dto.RegisterDTO;
import com.teriteri.backend.pojo.entity.User;
import com.teriteri.backend.pojo.vo.UserVO;
import com.teriteri.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public void register(RegisterDTO dto) {
        // 1. 业务校验：两次密码一致（非空、长度、格式已由 DTO 注解校验）
        if (!dto.getPassword().equals(dto.getConfirmedPassword())) {
            throw new BusinessException(ResultCode.BAD_REQUEST, "两次输入的密码不一致");
        }

        // 2. 用户名唯一性校验
        if (userMapper.selectByUsername(dto.getUsername()) != null) {
            throw new BusinessException(ResultCode.USERNAME_EXIST);
        }

        // 3. 组装用户信息，密码使用 BCrypt 加密后入库
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setNickname("用户" + RandomStringUtils.randomNumeric(6));
        user.setAvatar("/img/avatar/default.png");
        user.setBackground("/img/background/default.png");
        user.setGender(2);
        user.setDescription("这个人很懒，什么都没有写~");
        user.setExp(0);
        user.setCoin(0.0);
        user.setVip(0);
        user.setState(0);
        user.setRole(0);
        user.setAuth(0);
        user.setCreateDate(new Date());

        // 4. 写入数据库
        if (userMapper.insert(user) <= 0) {
            throw new BusinessException(ResultCode.REGISTER_FAILED);
        }
    }

    @Override
    public UserVO login(LoginDTO dto) {
        // 1. 查询用户是否存在
        User user = userMapper.selectByUsername(dto.getUsername());
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }

        // 2. 校验账号状态：1 封禁中，2 已注销
        if (user.getState() == 1) {
            throw new BusinessException(ResultCode.FORBIDDEN, "账号已被封禁");
        }
        if (user.getState() == 2) {
            throw new BusinessException(ResultCode.FORBIDDEN, "账号已注销");
        }

        // 3. 校验密码（BCrypt 比对）
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BusinessException(ResultCode.PASSWORD_ERROR);
        }

        // 4. 组装 VO（只暴露前端需要的字段），并下发 JWT
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        userVO.setToken(jwtUtil.createToken(user.getUid(), user.getUsername()));
        return userVO;
    }
}
