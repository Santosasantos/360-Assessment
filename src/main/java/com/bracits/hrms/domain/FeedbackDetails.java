package com.bracits.hrms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A FeedbackDetails.
 */
@Entity
@Table(name = "feedback_details")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FeedbackDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "commentsforfeedbacksubtype")
    private String commentsforfeedbacksubtype;

    @Column(name = "feedbackstatus")
    private String feedbackstatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "requesters", "responders", "sessions" }, allowSetters = true)
    private Feedback feedbackdetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "feedbacktypes" }, allowSetters = true)
    private FeedbackSubType feedbacksubtypes;

    @ManyToOne(fetch = FetchType.LAZY)
    private Rating ratings;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public FeedbackDetails id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentsforfeedbacksubtype() {
        return this.commentsforfeedbacksubtype;
    }

    public FeedbackDetails commentsforfeedbacksubtype(String commentsforfeedbacksubtype) {
        this.setCommentsforfeedbacksubtype(commentsforfeedbacksubtype);
        return this;
    }

    public void setCommentsforfeedbacksubtype(String commentsforfeedbacksubtype) {
        this.commentsforfeedbacksubtype = commentsforfeedbacksubtype;
    }

    public Feedback getFeedbackdetails() {
        return this.feedbackdetails;
    }

    public void setFeedbackdetails(Feedback feedback) {
        this.feedbackdetails = feedback;
    }

    public FeedbackDetails feedbackdetails(Feedback feedback) {
        this.setFeedbackdetails(feedback);
        return this;
    }

    public FeedbackSubType getFeedbacksubtypes() {
        return this.feedbacksubtypes;
    }

    public void setFeedbacksubtypes(FeedbackSubType feedbackSubType) {
        this.feedbacksubtypes = feedbackSubType;
    }

    public FeedbackDetails feedbacksubtypes(FeedbackSubType feedbackSubType) {
        this.setFeedbacksubtypes(feedbackSubType);
        return this;
    }

    public Rating getRatings() {
        return this.ratings;
    }

    public void setRatings(Rating rating) {
        this.ratings = rating;
    }

    public FeedbackDetails ratings(Rating rating) {
        this.setRatings(rating);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FeedbackDetails)) {
            return false;
        }
        return getId() != null && getId().equals(((FeedbackDetails) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FeedbackDetails{" +
            "id=" + getId() +
            ", commentsforfeedbacksubtype='" + getCommentsforfeedbacksubtype() + "'" +
            "}";
    }
}
