package com.bracits.hrms.repository;

import com.bracits.hrms.domain.Rating;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the Rating entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("select r from Rating r where r.ratingvalue = :ratingvalue")
    Optional<Rating> findByRatingvalue(@Param("ratingvalue") Integer ratingvalue);
}
