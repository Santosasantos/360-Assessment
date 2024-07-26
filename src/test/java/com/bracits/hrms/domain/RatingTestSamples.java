package com.bracits.hrms.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class RatingTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Rating getRatingSample1() {
        return new Rating().id(1L).rating("rating1").ratingvalue(1);
    }

    public static Rating getRatingSample2() {
        return new Rating().id(2L).rating("rating2").ratingvalue(2);
    }

    public static Rating getRatingRandomSampleGenerator() {
        return new Rating().id(longCount.incrementAndGet()).rating(UUID.randomUUID().toString()).ratingvalue(intCount.incrementAndGet());
    }
}
