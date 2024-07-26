package com.bracits.hrms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;


@Service
public class DraftService {
//    private final RedisTemplate<String, Object> radisTemplate;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    private static final String DRAFT_PREFIX = "feedback_draft:";

    public DraftService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveDraft(Long feedbackId, Object draftData) {
        String key = DRAFT_PREFIX + feedbackId;

        if(redisTemplate.hasKey(key)) {
            redisTemplate.delete(key);
        }
        redisTemplate.opsForValue().set(key, draftData);
        redisTemplate.expire(key, 24, TimeUnit.HOURS); // Set expiry to 24 hours
    }

    public Object loadDraft(Long feedbackId) {
        String key = DRAFT_PREFIX + feedbackId;
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteDraft(Long feedbackId) {
        String key = DRAFT_PREFIX + feedbackId;
        redisTemplate.delete(key);
    }
}
