package com.bracits.hrms.repository;

import com.bracits.hrms.domain.Feedback;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Feedback entity.
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    default Optional<Feedback> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Feedback> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Feedback> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select feedback from Feedback feedback left join fetch feedback.requesters left join fetch feedback.responders left join fetch feedback.sessions",
        countQuery = "select count(feedback) from Feedback feedback"
    )
    Page<Feedback> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select feedback from Feedback feedback left join fetch feedback.requesters left join fetch feedback.responders left join fetch feedback.sessions"
    )
    List<Feedback> findAllWithToOneRelationships();

    @Query(
        "select feedback from Feedback feedback left join fetch feedback.requesters left join fetch feedback.responders left join fetch feedback.sessions where feedback.id =:id"
    )
    Optional<Feedback> findOneWithToOneRelationships(@Param("id") Long id);

    @Query(
        "select feedback from Feedback feedback left join fetch feedback.requesters left join fetch feedback.responders left join fetch feedback.sessions where feedback.responders.pin = :pin and feedback.sessions.year = :year"
    )
    List<Feedback> findAllWithToOneRelationshipsWithResponders(@Param("pin") String pin, @Param("year") Integer year);

    @Modifying
    @Query(
        "update Feedback feedback set feedback.status = :status, feedback.responseDate=:date where feedback.id = :id"
    )
    void updateStatusanddate(@Param("id") Long id, @Param("status") String status, @Param("date") LocalDate date);
}
