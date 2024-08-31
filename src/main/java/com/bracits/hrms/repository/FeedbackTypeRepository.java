package com.bracits.hrms.repository;

import com.bracits.hrms.domain.FeedbackType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the FeedbackType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeedbackTypeRepository extends JpaRepository<FeedbackType, Long> {}
