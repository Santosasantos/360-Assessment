package com.bracits.hrms.service.impl;

import com.bracits.hrms.domain.Extraquestion;
import com.bracits.hrms.repository.ExtraquestionRepository;
import com.bracits.hrms.service.ExtraquestionService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.bracits.hrms.domain.Extraquestion}.
 */
@Service
@Transactional
public class ExtraquestionServiceImpl implements ExtraquestionService {

    private static final Logger log = LoggerFactory.getLogger(ExtraquestionServiceImpl.class);

    private final ExtraquestionRepository extraquestionRepository;

    public ExtraquestionServiceImpl(ExtraquestionRepository extraquestionRepository) {
        this.extraquestionRepository = extraquestionRepository;
    }

    @Override
    public Extraquestion save(Extraquestion extraquestion) {
        log.debug("Request to save Extraquestion : {}", extraquestion);
        return extraquestionRepository.save(extraquestion);
    }

    @Override
    public Extraquestion update(Extraquestion extraquestion) {
        log.debug("Request to update Extraquestion : {}", extraquestion);
        return extraquestionRepository.save(extraquestion);
    }

    @Override
    public Optional<Extraquestion> partialUpdate(Extraquestion extraquestion) {
        log.debug("Request to partially update Extraquestion : {}", extraquestion);

        return extraquestionRepository
            .findById(extraquestion.getId())
            .map(existingExtraquestion -> {
                if (extraquestion.getQuestion() != null) {
                    existingExtraquestion.setQuestion(extraquestion.getQuestion());
                }
                if (extraquestion.getQuestionfeedback() != null) {
                    existingExtraquestion.setQuestionfeedback(extraquestion.getQuestionfeedback());
                }

                return existingExtraquestion;
            })
            .map(extraquestionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Extraquestion> findAll() {
        log.debug("Request to get all Extraquestions");
        return extraquestionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Extraquestion> findOne(Long id) {
        log.debug("Request to get Extraquestion : {}", id);
        return extraquestionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Extraquestion : {}", id);
        extraquestionRepository.deleteById(id);
    }
}
