package com.teriteri.backend.mapper;

import com.teriteri.backend.pojo.entity.User;
import org.apache.ibatis.annotations.Param;

/**
 * 用户表 mapper，由启动类上的 @MapperScan 扫描注册
 */
public interface UserMapper {

    /**
     * 根据用户名查询用户
     * @param username 用户名
     * @return 用户实体，不存在时返回 null
     */
    User selectByUsername(@Param("username") String username);

    /**
     * 插入新用户
     * @param user 用户实体
     * @return 受影响行数
     */
    int insert(User user);
}
