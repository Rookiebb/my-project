-- teriteri 数据库初始化脚本
-- 使用方法：mysql -u root -p < sql/teriteri.sql，或在 Navicat/DataGrip 等工具中直接执行

CREATE DATABASE IF NOT EXISTS `teriteri` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `teriteri`;

CREATE TABLE IF NOT EXISTS `user` (
    `uid`          INT          NOT NULL AUTO_INCREMENT COMMENT '用户id',
    `username`     VARCHAR(16)  NOT NULL COMMENT '用户名',
    `password`     VARCHAR(100) NOT NULL COMMENT '密码（BCrypt 加密）',
    `nickname`     VARCHAR(32)  NOT NULL COMMENT '昵称',
    `avatar`       VARCHAR(255)          DEFAULT '/img/avatar/default.png' COMMENT '头像',
    `background`   VARCHAR(255)          DEFAULT '/img/background/default.png' COMMENT '空间背景图',
    `gender`       TINYINT               DEFAULT 2 COMMENT '性别，0女性 1男性 2无性别',
    `description`  VARCHAR(255)          DEFAULT '这个人很懒，什么都没有写~' COMMENT '个人简介',
    `exp`          INT                   DEFAULT 0 COMMENT '经验值',
    `coin`         DECIMAL(10, 1)        DEFAULT 0.0 COMMENT '硬币数，保留一位小数',
    `vip`          TINYINT               DEFAULT 0 COMMENT '0普通 1月度大会员 2季度大会员 3年度大会员',
    `state`        TINYINT               DEFAULT 0 COMMENT '0正常 1封禁中 2已注销',
    `role`         TINYINT               DEFAULT 0 COMMENT '0普通用户 1普通管理员 2超级管理员',
    `auth`         TINYINT               DEFAULT 0 COMMENT '0普通 1个人认证 2机构认证',
    `auth_msg`     VARCHAR(255)          DEFAULT NULL COMMENT '认证信息',
    `create_date`  DATETIME              DEFAULT NULL COMMENT '注册时间',
    `delete_date`  DATETIME              DEFAULT NULL COMMENT '注销时间',
    PRIMARY KEY (`uid`),
    UNIQUE KEY `uk_username` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT ='用户表';
