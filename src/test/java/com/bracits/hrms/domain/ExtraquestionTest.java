package com.bracits.hrms.domain;

import static com.bracits.hrms.domain.ExtraquestionTestSamples.*;
import static com.bracits.hrms.domain.FeedbackTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.bracits.hrms.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ExtraquestionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Extraquestion.class);
        Extraquestion extraquestion1 = getExtraquestionSample1();
        Extraquestion extraquestion2 = new Extraquestion();
        assertThat(extraquestion1).isNotEqualTo(extraquestion2);

        extraquestion2.setId(extraquestion1.getId());
        assertThat(extraquestion1).isEqualTo(extraquestion2);

        extraquestion2 = getExtraquestionSample2();
        assertThat(extraquestion1).isNotEqualTo(extraquestion2);
    }

    @Test
    void extrasTest() {
        Extraquestion extraquestion = getExtraquestionRandomSampleGenerator();
        Feedback feedbackBack = getFeedbackRandomSampleGenerator();

        extraquestion.setExtras(feedbackBack);
        assertThat(extraquestion.getExtras()).isEqualTo(feedbackBack);

        extraquestion.extras(null);
        assertThat(extraquestion.getExtras()).isNull();
    }
}
