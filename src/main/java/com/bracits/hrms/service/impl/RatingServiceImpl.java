package com.bracits.hrms.service.impl;

import com.bracits.hrms.domain.Rating;
import com.bracits.hrms.repository.RatingRepository;
import com.bracits.hrms.service.RatingService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.bracits.hrms.domain.Rating}.
 */
@Service
@Transactional
public class RatingServiceImpl implements RatingService {

    private static final Logger log = LoggerFactory.getLogger(RatingServiceImpl.class);

    private final RatingRepository ratingRepository;

    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public Rating save(Rating rating) {
        log.debug("Request to save Rating : {}", rating);
        return ratingRepository.save(rating);
    }

    @Override
    public Rating update(Rating rating) {
        log.debug("Request to update Rating : {}", rating);
        return ratingRepository.save(rating);
    }

    @Override
    public Optional<Rating> partialUpdate(Rating rating) {
        log.debug("Request to partially update Rating : {}", rating);

        return ratingRepository
            .findById(rating.getId())
            .map(existingRating -> {
                if (rating.getRating() != null) {
                    existingRating.setRating(rating.getRating());
                }
                if (rating.getRatingvalue() != null) {
                    existingRating.setRatingvalue(rating.getRatingvalue());
                }

                return existingRating;
            })
            .map(ratingRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Rating> findAll() {
        log.debug("Request to get all Ratings");
        return ratingRepository.findAll();
    }

    @Override
    public Optional<Rating> findByRatingvalue(Integer ratingvalue) {
        return ratingRepository.findByRatingvalue(ratingvalue);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Rating> findOne(Long id) {
        log.debug("Request to get Rating : {}", id);
        return ratingRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rating : {}", id);
        ratingRepository.deleteById(id);
    }
}
