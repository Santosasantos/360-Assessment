package com.bracits.hrms.repository;

import com.bracits.hrms.domain.FeedbackDetails;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the FeedbackDetails entity.
 */
@Repository
public interface FeedbackDetailsRepository extends JpaRepository<FeedbackDetails, Long> {
    default Optional<FeedbackDetails> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<FeedbackDetails> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<FeedbackDetails> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select feedbackDetails from FeedbackDetails feedbackDetails left join fetch feedbackDetails.feedbacksubtypes left join fetch feedbackDetails.ratings",
        countQuery = "select count(feedbackDetails) from FeedbackDetails feedbackDetails"
    )
    Page<FeedbackDetails> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select feedbackDetails from FeedbackDetails feedbackDetails left join fetch feedbackDetails.feedbacksubtypes left join fetch feedbackDetails.ratings"
    )
    List<FeedbackDetails> findAllWithToOneRelationships();

    @Query(
        "select feedbackDetails from FeedbackDetails feedbackDetails left join fetch feedbackDetails.feedbacksubtypes left join fetch feedbackDetails.ratings where feedbackDetails.id =:id"
    )
    Optional<FeedbackDetails> findOneWithToOneRelationships(@Param("id") Long id);

    @Query(
        "SELECT ROUND(AVG(r.ratingvalue), 2) " +
            "FROM FeedbackDetails fd " +
            "JOIN fd.feedbacksubtypes fst " +
            "JOIN fd.ratings r " +
            "JOIN fd.feedbackdetails resp " +
            "WHERE resp.responders.pin = :pin " +
            "AND resp.requesters.pin !=  :pin " +
            "AND resp.sessions.year = :year " +
            "AND fst.feedbacksubname = :feedbacksubname"
    )
    Optional<Double> findAverageRatingforOther(@Param("pin") String pin, @Param("feedbacksubname") String feedbacksubname, @Param("year") Integer year);

    @Query(
        "SELECT ROUND(AVG(r.ratingvalue), 2) " +
            "FROM FeedbackDetails fd " +
            "JOIN fd.feedbacksubtypes fst " +
            "JOIN fd.ratings r " +
            "JOIN fd.feedbackdetails resp " +
            "WHERE resp.requesters.pin = :pin " +
            "AND resp.responders.pin = :pin " +
            "AND resp.sessions.year = :year " +
            "AND fst.feedbacksubname = :feedbacksubname"
    )
    Optional<Double> findRatingforSelf(@Param("pin") String pin, @Param("feedbacksubname") String feedbacksubname, @Param("year") Integer year);
}
