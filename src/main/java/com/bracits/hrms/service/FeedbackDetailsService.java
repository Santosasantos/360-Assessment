package com.bracits.hrms.service;

import com.bracits.hrms.domain.FeedbackDetails;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.bracits.hrms.domain.FeedbackDetails}.
 */
public interface FeedbackDetailsService {
    /**
     * Save a feedbackDetails.
     *
     * @param feedbackDetails the entity to save.
     * @return the persisted entity.
     */
    FeedbackDetails save(FeedbackDetails feedbackDetails);

    /**
     * Updates a feedbackDetails.
     *
     * @param feedbackDetails the entity to update.
     * @return the persisted entity.
     */
    FeedbackDetails update(FeedbackDetails feedbackDetails);

    /**
     * Partially updates a feedbackDetails.
     *
     * @param feedbackDetails the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FeedbackDetails> partialUpdate(FeedbackDetails feedbackDetails);

    /**
     * Get all the feedbackDetails.
     *
     * @return the list of entities.
     */
    List<FeedbackDetails> findAll();

    /**
     * Get all the feedbackDetails with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FeedbackDetails> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" feedbackDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FeedbackDetails> findOne(Long id);
    Optional<Double> findAverageRatingfromOther(String pin, String feedbacksubname, Integer year);
    Optional<Double> findSelfRating(String pin, String feedbacksubname, Integer year);
    /**
     * Delete the "id" feedbackDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
