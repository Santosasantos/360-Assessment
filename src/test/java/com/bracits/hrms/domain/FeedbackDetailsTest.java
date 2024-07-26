package com.bracits.hrms.domain;

import static com.bracits.hrms.domain.FeedbackDetailsTestSamples.*;
import static com.bracits.hrms.domain.FeedbackSubTypeTestSamples.*;
import static com.bracits.hrms.domain.FeedbackTestSamples.*;
import static com.bracits.hrms.domain.RatingTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.bracits.hrms.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FeedbackDetailsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FeedbackDetails.class);
        FeedbackDetails feedbackDetails1 = getFeedbackDetailsSample1();
        FeedbackDetails feedbackDetails2 = new FeedbackDetails();
        assertThat(feedbackDetails1).isNotEqualTo(feedbackDetails2);

        feedbackDetails2.setId(feedbackDetails1.getId());
        assertThat(feedbackDetails1).isEqualTo(feedbackDetails2);

        feedbackDetails2 = getFeedbackDetailsSample2();
        assertThat(feedbackDetails1).isNotEqualTo(feedbackDetails2);
    }

    @Test
    void feedbackdetailsTest() {
        FeedbackDetails feedbackDetails = getFeedbackDetailsRandomSampleGenerator();
        Feedback feedbackBack = getFeedbackRandomSampleGenerator();

        feedbackDetails.setFeedbackdetails(feedbackBack);
        assertThat(feedbackDetails.getFeedbackdetails()).isEqualTo(feedbackBack);

        feedbackDetails.feedbackdetails(null);
        assertThat(feedbackDetails.getFeedbackdetails()).isNull();
    }

    @Test
    void feedbacksubtypesTest() {
        FeedbackDetails feedbackDetails = getFeedbackDetailsRandomSampleGenerator();
        FeedbackSubType feedbackSubTypeBack = getFeedbackSubTypeRandomSampleGenerator();

        feedbackDetails.setFeedbacksubtypes(feedbackSubTypeBack);
        assertThat(feedbackDetails.getFeedbacksubtypes()).isEqualTo(feedbackSubTypeBack);

        feedbackDetails.feedbacksubtypes(null);
        assertThat(feedbackDetails.getFeedbacksubtypes()).isNull();
    }

    @Test
    void ratingsTest() {
        FeedbackDetails feedbackDetails = getFeedbackDetailsRandomSampleGenerator();
        Rating ratingBack = getRatingRandomSampleGenerator();

        feedbackDetails.setRatings(ratingBack);
        assertThat(feedbackDetails.getRatings()).isEqualTo(ratingBack);

        feedbackDetails.ratings(null);
        assertThat(feedbackDetails.getRatings()).isNull();
    }
}
