package com.bracits.hrms.repository;

import com.bracits.hrms.domain.SkillDevelopmentType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SkillDevelopmentType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SkillDevelopmentTypeRepository extends JpaRepository<SkillDevelopmentType, Long> {}
