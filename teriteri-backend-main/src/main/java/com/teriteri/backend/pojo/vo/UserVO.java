package com.teriteri.backend.pojo.vo;

import lombok.Data;

import java.util.Date;

/**
 * 用户信息 VO（返回给前端，不包含密码、注销时间等敏感字段）
 */
@Data
public class UserVO {
    private Integer uid;
    private String username;
    private String nickname;
    private String avatar;
    private String background;
    private Integer gender;
    private String description;
    private Integer exp;
    private Double coin;
    private Integer vip;
    private Integer auth;
    private String authMsg;
    private Date createDate;
    private String token;   // 登录成功后下发的 JWT
}
