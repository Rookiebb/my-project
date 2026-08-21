package com.teriteri.backend.common.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 工具类：负责 token 的生成与解析
 */
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expire}")
    private long expire;    // token 有效期，单位毫秒

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 根据用户信息生成 JWT
     * @param uid 用户id
     * @param username 用户名
     * @return JWT 字符串
     */
    public String createToken(Integer uid, String username) {
        Date now = new Date();
        return Jwts.builder()
                .subject(String.valueOf(uid))
                .claim("username", username)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expire))
                .signWith(getKey())
                .compact();
    }

    /**
     * 解析 JWT，token 无效或已过期时抛出 JwtException / IllegalArgumentException
     * @param token JWT 字符串
     * @return 载荷（含 subject=uid、username 等声明）
     */
    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
