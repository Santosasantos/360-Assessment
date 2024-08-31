package com.bracits.hrms.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A Rating.
 */
@Entity
@Table(name = "rating")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "rating", nullable = false)
    private String rating;

    @NotNull
    @Column(name = "ratingvalue", nullable = false)
    private Integer ratingvalue;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Rating id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRating() {
        return this.rating;
    }

    public Rating rating(String rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Integer getRatingvalue() {
        return this.ratingvalue;
    }

    public Rating ratingvalue(Integer ratingvalue) {
        this.setRatingvalue(ratingvalue);
        return this;
    }

    public void setRatingvalue(Integer ratingvalue) {
        this.ratingvalue = ratingvalue;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rating)) {
            return false;
        }
        return getId() != null && getId().equals(((Rating) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rating{" +
            "id=" + getId() +
            ", rating='" + getRating() + "'" +
            ", ratingvalue=" + getRatingvalue() +
            "}";
    }
}
