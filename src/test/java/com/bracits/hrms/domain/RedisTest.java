package com.bracits.hrms.domain;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedisTest {
    @Autowired
    private RedisTemplate redisTemplate;


    @Test
    public void test() {
        redisTemplate.opsForValue().set("test", "test");
        int a = 1;
//        System.out.println(redisTemplate.opsForValue().get("test"));
    }
}
