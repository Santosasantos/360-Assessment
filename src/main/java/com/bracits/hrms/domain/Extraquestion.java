package com.bracits.hrms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A Extraquestion.
 */
@Entity
@Table(name = "extraquestion")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Extraquestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "questionfeedback")
    private String questionfeedback;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "requesters", "responders", "sessions" }, allowSetters = true)
    private Feedback extras;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Extraquestion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return this.question;
    }

    public Extraquestion question(String question) {
        this.setQuestion(question);
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestionfeedback() {
        return this.questionfeedback;
    }

    public Extraquestion questionfeedback(String questionfeedback) {
        this.setQuestionfeedback(questionfeedback);
        return this;
    }

    public void setQuestionfeedback(String questionfeedback) {
        this.questionfeedback = questionfeedback;
    }

    public Feedback getExtras() {
        return this.extras;
    }

    public void setExtras(Feedback feedback) {
        this.extras = feedback;
    }

    public Extraquestion extras(Feedback feedback) {
        this.setExtras(feedback);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Extraquestion)) {
            return false;
        }
        return getId() != null && getId().equals(((Extraquestion) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Extraquestion{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", questionfeedback='" + getQuestionfeedback() + "'" +
            "}";
    }
}
