package com.bracits.hrms.repository;

import com.bracits.hrms.domain.TeachOther;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TeachOther entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachOtherRepository extends JpaRepository<TeachOther, Long> {}
