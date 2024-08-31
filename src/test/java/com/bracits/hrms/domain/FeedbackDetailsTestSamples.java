package com.bracits.hrms.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FeedbackDetailsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static FeedbackDetails getFeedbackDetailsSample1() {
        return new FeedbackDetails().id(1L).commentsforfeedbacksubtype("commentsforfeedbacksubtype1");
    }

    public static FeedbackDetails getFeedbackDetailsSample2() {
        return new FeedbackDetails().id(2L).commentsforfeedbacksubtype("commentsforfeedbacksubtype2");
    }

    public static FeedbackDetails getFeedbackDetailsRandomSampleGenerator() {
        return new FeedbackDetails().id(longCount.incrementAndGet()).commentsforfeedbacksubtype(UUID.randomUUID().toString());
    }
}
