package com.bracits.hrms.domain;

import static com.bracits.hrms.domain.RatingTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.bracits.hrms.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RatingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rating.class);
        Rating rating1 = getRatingSample1();
        Rating rating2 = new Rating();
        assertThat(rating1).isNotEqualTo(rating2);

        rating2.setId(rating1.getId());
        assertThat(rating1).isEqualTo(rating2);

        rating2 = getRatingSample2();
        assertThat(rating1).isNotEqualTo(rating2);
    }
}
