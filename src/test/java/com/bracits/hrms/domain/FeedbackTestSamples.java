package com.bracits.hrms.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FeedbackTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Feedback getFeedbackSample1() {
        return new Feedback().id(1L).status("status1");
    }

    public static Feedback getFeedbackSample2() {
        return new Feedback().id(2L).status("status2");
    }

    public static Feedback getFeedbackRandomSampleGenerator() {
        return new Feedback().id(longCount.incrementAndGet()).status(UUID.randomUUID().toString());
    }
}
