package com.bracits.hrms.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class YearTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Year getYearSample1() {
        return new Year().id(1L).year(1);
    }

    public static Year getYearSample2() {
        return new Year().id(2L).year(2);
    }

    public static Year getYearRandomSampleGenerator() {
        return new Year().id(longCount.incrementAndGet()).year(intCount.incrementAndGet());
    }
}
