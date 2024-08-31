package com.bracits.epms.service.impl;

import com.bracits.epms.domain.Employee;
import com.bracits.epms.domain.Feedback;
import com.bracits.epms.domain.FeedbackResponder;
import com.bracits.epms.domain.RatingScale;
import com.bracits.epms.domain.enumeration.FeedbackStatus;
import com.bracits.epms.domain.enumeration.ResponderCategory;
import com.bracits.epms.repository.EmployeeRepository;
import com.bracits.epms.repository.FeedbackRepository;
import com.bracits.epms.repository.RatingScaleRepository;
import com.bracits.epms.service.FeedbackService;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.bracits.epms.domain.Feedback}.
 */
@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {


    private static final Logger log = LoggerFactory.getLogger(FeedbackServiceImpl.class);

    private final FeedbackRepository feedbackRepository;
    private final EmployeeRepository employeeRepository;
    private final RatingScaleRepository ratingScaleRepository;


    public FeedbackServiceImpl(FeedbackRepository feedbackRepository, EmployeeRepository employeeRepository,
                               RatingScaleRepository ratingScaleRepository, RedisTemplate<String, Object> redisTemplate) {
        this.feedbackRepository = feedbackRepository;
        this.employeeRepository = employeeRepository;
        this.ratingScaleRepository = ratingScaleRepository;
    }

    @Override
    public Feedback createFeedbackRequest(Feedback feedback) {
        log.debug("Request to create Feedback : {}", feedback);
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback updateStatus(Long feedbackId, FeedbackStatus feedbackstatus) {
        log.debug("Request to send Feedback to supervisor : {}", feedbackId);
        Feedback feedback = feedbackRepository.findById(feedbackId)
            .orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setStatus(feedbackstatus);
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getFeedbackRequestsByRequester(String requesterPin) {
        log.debug("Request to get Feedbacks for requester : {}", requesterPin);
        return feedbackRepository.findByRequesterPin(requesterPin);
    }
//
//    @Override
//    public void deleteFeedbackRequest(Long feedbackId) {
//        log.debug("Request to delete Feedback : {}", feedbackId);
//        Feedback feedback = feedbackRepository.findById(feedbackId)
//            .orElseThrow(() -> new RuntimeException("Feedback not found"));
//        if (feedback.getStatus() != FeedbackStatus.PENDING_FOR_ASSESSMENT) {
//            throw new RuntimeException("Cannot delete feedback that is not in PENDING status");
//        }
//        feedbackRepository.delete(feedback);
//    }





    // Existing methods

    @Override
    public Feedback save(Feedback feedback) {
        log.debug("Request to save Feedback : {}", feedback);
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback update(Feedback feedback) {
        log.debug("Request to update Feedback : {}", feedback);
        return feedbackRepository.save(feedback);
    }

    @Override
    public Optional<Feedback> partialUpdate(Feedback feedback) {
        log.debug("Request to partially update Feedback : {}", feedback);
        return feedbackRepository
            .findById(feedback.getId())
            .map(existingFeedback -> {
                if (feedback.getRequestDate() != null) {
                    existingFeedback.setRequestDate(feedback.getRequestDate());
                }
                if (feedback.getStatus() != null) {
                    existingFeedback.setStatus(feedback.getStatus());
                }
                if (feedback.getResponseDate() != null) {
                    existingFeedback.setResponseDate(feedback.getResponseDate());
                }
                if (feedback.getCreatedBy() != null) {
                    existingFeedback.setCreatedBy(feedback.getCreatedBy());
                }
                if (feedback.getAssessmentYear() != null) {
                    existingFeedback.setAssessmentYear(feedback.getAssessmentYear());
                }
                return existingFeedback;
            })
            .map(feedbackRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Feedback> findAll(Pageable pageable) {
        log.debug("Request to get all Feedbacks");
        return feedbackRepository.findAll(pageable);
    }

    @Override
    public Page<Feedback> findAllWithEagerRelationships(Pageable pageable) {
        return feedbackRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Feedback> findOne(Long id) {
        log.debug("Request to get Feedback : {}", id);
        return feedbackRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Feedback : {}", id);
        feedbackRepository.deleteById(id);
    }
}
