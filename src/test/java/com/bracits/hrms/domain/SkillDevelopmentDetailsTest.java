package com.bracits.hrms.domain;

import static com.bracits.hrms.domain.FeedbackTestSamples.*;
import static com.bracits.hrms.domain.SkillDevelopmentDetailsTestSamples.*;
import static com.bracits.hrms.domain.SkillDevelopmentTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.bracits.hrms.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SkillDevelopmentDetailsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SkillDevelopmentDetails.class);
        SkillDevelopmentDetails skillDevelopmentDetails1 = getSkillDevelopmentDetailsSample1();
        SkillDevelopmentDetails skillDevelopmentDetails2 = new SkillDevelopmentDetails();
        assertThat(skillDevelopmentDetails1).isNotEqualTo(skillDevelopmentDetails2);

        skillDevelopmentDetails2.setId(skillDevelopmentDetails1.getId());
        assertThat(skillDevelopmentDetails1).isEqualTo(skillDevelopmentDetails2);

        skillDevelopmentDetails2 = getSkillDevelopmentDetailsSample2();
        assertThat(skillDevelopmentDetails1).isNotEqualTo(skillDevelopmentDetails2);
    }

    @Test
    void skilldevelopmentTest() {
        SkillDevelopmentDetails skillDevelopmentDetails = getSkillDevelopmentDetailsRandomSampleGenerator();
        Feedback feedbackBack = getFeedbackRandomSampleGenerator();

        skillDevelopmentDetails.setSkilldevelopment(feedbackBack);
        assertThat(skillDevelopmentDetails.getSkilldevelopment()).isEqualTo(feedbackBack);

        skillDevelopmentDetails.skilldevelopment(null);
        assertThat(skillDevelopmentDetails.getSkilldevelopment()).isNull();
    }

    @Test
    void skilldevelopmenttypesTest() {
        SkillDevelopmentDetails skillDevelopmentDetails = getSkillDevelopmentDetailsRandomSampleGenerator();
        SkillDevelopmentType skillDevelopmentTypeBack = getSkillDevelopmentTypeRandomSampleGenerator();

        skillDevelopmentDetails.setSkilldevelopmenttypes(skillDevelopmentTypeBack);
        assertThat(skillDevelopmentDetails.getSkilldevelopmenttypes()).isEqualTo(skillDevelopmentTypeBack);

        skillDevelopmentDetails.skilldevelopmenttypes(null);
        assertThat(skillDevelopmentDetails.getSkilldevelopmenttypes()).isNull();
    }
}
