package com.bracits.hrms.repository;

import com.bracits.hrms.domain.Extraquestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Extraquestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtraquestionRepository extends JpaRepository<Extraquestion, Long> {}
