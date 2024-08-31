package com.bracits.hrms.domain;

import static com.bracits.hrms.domain.FeedbackSubTypeTestSamples.*;
import static com.bracits.hrms.domain.FeedbackTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.bracits.hrms.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FeedbackSubTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FeedbackSubType.class);
        FeedbackSubType feedbackSubType1 = getFeedbackSubTypeSample1();
        FeedbackSubType feedbackSubType2 = new FeedbackSubType();
        assertThat(feedbackSubType1).isNotEqualTo(feedbackSubType2);

        feedbackSubType2.setId(feedbackSubType1.getId());
        assertThat(feedbackSubType1).isEqualTo(feedbackSubType2);

        feedbackSubType2 = getFeedbackSubTypeSample2();
        assertThat(feedbackSubType1).isNotEqualTo(feedbackSubType2);
    }

    @Test
    void feedbacktypesTest() {
        FeedbackSubType feedbackSubType = getFeedbackSubTypeRandomSampleGenerator();
        FeedbackType feedbackTypeBack = getFeedbackTypeRandomSampleGenerator();

        feedbackSubType.setFeedbacktypes(feedbackTypeBack);
        assertThat(feedbackSubType.getFeedbacktypes()).isEqualTo(feedbackTypeBack);

        feedbackSubType.feedbacktypes(null);
        assertThat(feedbackSubType.getFeedbacktypes()).isNull();
    }
}
