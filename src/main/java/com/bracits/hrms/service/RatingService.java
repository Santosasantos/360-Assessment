package com.bracits.hrms.service;

import com.bracits.hrms.domain.Rating;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.bracits.hrms.domain.Rating}.
 */
public interface RatingService {
    /**
     * Save a rating.
     *
     * @param rating the entity to save.
     * @return the persisted entity.
     */
    Rating save(Rating rating);

    /**
     * Updates a rating.
     *
     * @param rating the entity to update.
     * @return the persisted entity.
     */
    Rating update(Rating rating);

    /**
     * Partially updates a rating.
     *
     * @param rating the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Rating> partialUpdate(Rating rating);

    /**
     * Get all the ratings.
     *
     * @return the list of entities.
     */
    List<Rating> findAll();
    Optional<Rating> findByRatingvalue(Integer ratingvalue);
    /**
     * Get the "id" rating.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Rating> findOne(Long id);

    /**
     * Delete the "id" rating.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
