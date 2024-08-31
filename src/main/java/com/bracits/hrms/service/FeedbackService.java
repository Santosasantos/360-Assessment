package com.bracits.hrms.service;

import com.bracits.hrms.domain.Feedback;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.bracits.hrms.domain.Feedback}.
 */
public interface FeedbackService {
    /**
     * Save a feedback.
     *
     * @param feedback the entity to save.
     * @return the persisted entity.
     */
    Feedback save(Feedback feedback);

    /**
     * Updates a feedback.
     *
     * @param feedback the entity to update.
     * @return the persisted entity.
     */
    Feedback update(Feedback feedback);
    void updateStatusanddate(Long id, String status, LocalDate date);
    /**
     * Partially updates a feedback.
     *
     * @param feedback the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Feedback> partialUpdate(Feedback feedback);

    /**
     * Get all the feedbacks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Feedback> findAll(Pageable pageable);

    /**
     * Get all the feedbacks with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Feedback> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" feedback.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Feedback> findOne(Long id);
    List<Feedback> findAllForRequester(String pin, Integer year);
    /**
     * Delete the "id" feedback.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
