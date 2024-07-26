package com.bracits.hrms.service.impl;

import com.bracits.hrms.domain.FeedbackDetails;
import com.bracits.hrms.repository.FeedbackDetailsRepository;
import com.bracits.hrms.service.FeedbackDetailsService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.bracits.hrms.domain.FeedbackDetails}.
 */
@Service
@Transactional
public class FeedbackDetailsServiceImpl implements FeedbackDetailsService {

    private static final Logger log = LoggerFactory.getLogger(FeedbackDetailsServiceImpl.class);

    private final FeedbackDetailsRepository feedbackDetailsRepository;

    public FeedbackDetailsServiceImpl(FeedbackDetailsRepository feedbackDetailsRepository) {
        this.feedbackDetailsRepository = feedbackDetailsRepository;
    }

    @Override
    public FeedbackDetails save(FeedbackDetails feedbackDetails) {
        log.debug("Request to save FeedbackDetails : {}", feedbackDetails);
        return feedbackDetailsRepository.save(feedbackDetails);
    }

    @Override
    public FeedbackDetails update(FeedbackDetails feedbackDetails) {
        log.debug("Request to update FeedbackDetails : {}", feedbackDetails);
        return feedbackDetailsRepository.save(feedbackDetails);
    }

    @Override
    public Optional<FeedbackDetails> partialUpdate(FeedbackDetails feedbackDetails) {
        log.debug("Request to partially update FeedbackDetails : {}", feedbackDetails);

        return feedbackDetailsRepository
            .findById(feedbackDetails.getId())
            .map(existingFeedbackDetails -> {
                if (feedbackDetails.getCommentsforfeedbacksubtype() != null) {
                    existingFeedbackDetails.setCommentsforfeedbacksubtype(feedbackDetails.getCommentsforfeedbacksubtype());
                }

                return existingFeedbackDetails;
            })
            .map(feedbackDetailsRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FeedbackDetails> findAll() {
        log.debug("Request to get all FeedbackDetails");
        return feedbackDetailsRepository.findAll();
    }

    public Page<FeedbackDetails> findAllWithEagerRelationships(Pageable pageable) {
        return feedbackDetailsRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FeedbackDetails> findOne(Long id) {
        log.debug("Request to get FeedbackDetails : {}", id);
        return feedbackDetailsRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete FeedbackDetails : {}", id);
        feedbackDetailsRepository.deleteById(id);
    }

    @Override
    public Optional<Double> findAverageRatingfromOther(String pin, String feedbacksubname, Integer year) {
        return feedbackDetailsRepository.findAverageRatingforOther(pin, feedbacksubname,year);
    }

    @Override
    public Optional<Double> findSelfRating(String pin, String feedbacksubname, Integer year) {
        return feedbackDetailsRepository.findRatingforSelf(pin, feedbacksubname,year);
    }
}
