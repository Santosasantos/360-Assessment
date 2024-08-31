package com.bracits.epms.repository;

import com.bracits.epms.domain.Extraquestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Extraquestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtraquestionRepository extends JpaRepository<Extraquestion, Long> {

    List<Extraquestion> findByFeedbackId(Long feedbackId);
}
