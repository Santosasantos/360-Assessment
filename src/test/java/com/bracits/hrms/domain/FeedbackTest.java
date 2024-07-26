package com.bracits.hrms.domain;

import static com.bracits.hrms.domain.EmployeeTestSamples.*;
import static com.bracits.hrms.domain.FeedbackTestSamples.*;
import static com.bracits.hrms.domain.YearTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.bracits.hrms.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FeedbackTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Feedback.class);
        Feedback feedback1 = getFeedbackSample1();
        Feedback feedback2 = new Feedback();
        assertThat(feedback1).isNotEqualTo(feedback2);

        feedback2.setId(feedback1.getId());
        assertThat(feedback1).isEqualTo(feedback2);

        feedback2 = getFeedbackSample2();
        assertThat(feedback1).isNotEqualTo(feedback2);
    }

    @Test
    void requestersTest() {
        Feedback feedback = getFeedbackRandomSampleGenerator();
        Employee employeeBack = getEmployeeRandomSampleGenerator();

        feedback.setRequesters(employeeBack);
        assertThat(feedback.getRequesters()).isEqualTo(employeeBack);

        feedback.requesters(null);
        assertThat(feedback.getRequesters()).isNull();
    }

    @Test
    void respondersTest() {
        Feedback feedback = getFeedbackRandomSampleGenerator();
        Employee employeeBack = getEmployeeRandomSampleGenerator();

        feedback.setResponders(employeeBack);
        assertThat(feedback.getResponders()).isEqualTo(employeeBack);

        feedback.responders(null);
        assertThat(feedback.getResponders()).isNull();
    }

    @Test
    void sessionsTest() {
        Feedback feedback = getFeedbackRandomSampleGenerator();
        Year yearBack = getYearRandomSampleGenerator();

        feedback.setSessions(yearBack);
        assertThat(feedback.getSessions()).isEqualTo(yearBack);

        feedback.sessions(null);
        assertThat(feedback.getSessions()).isNull();
    }
}
