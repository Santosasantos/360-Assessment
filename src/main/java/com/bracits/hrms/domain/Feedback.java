package com.bracits.hrms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A Feedback.
 */
@Entity
@Table(name = "feedback")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Feedback implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "request_date", nullable = false)
    private Instant requestDate;

    @NotNull
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "response_date")
    private LocalDate responseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "supervisor" }, allowSetters = true)
    private Employee requesters;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "supervisor" }, allowSetters = true)
    private Employee responders;

    @ManyToOne(fetch = FetchType.LAZY)
    private Year sessions;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Feedback id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRequestDate() {
        return this.requestDate;
    }

    public Feedback requestDate(Instant requestDate) {
        this.setRequestDate(requestDate);
        return this;
    }

    public void setRequestDate(Instant requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return this.status;
    }

    public Feedback status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getResponseDate() {
        return this.responseDate;
    }

    public Feedback responseDate(LocalDate responseDate) {
        this.setResponseDate(responseDate);
        return this;
    }

    public void setResponseDate(LocalDate responseDate) {
        this.responseDate = responseDate;
    }

    public Employee getRequesters() {
        return this.requesters;
    }

    public void setRequesters(Employee employee) {
        this.requesters = employee;
    }

    public Feedback requesters(Employee employee) {
        this.setRequesters(employee);
        return this;
    }

    public Employee getResponders() {
        return this.responders;
    }

    public void setResponders(Employee employee) {
        this.responders = employee;
    }

    public Feedback responders(Employee employee) {
        this.setResponders(employee);
        return this;
    }

    public Year getSessions() {
        return this.sessions;
    }

    public void setSessions(Year year) {
        this.sessions = year;
    }

    public Feedback sessions(Year year) {
        this.setSessions(year);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Feedback)) {
            return false;
        }
        return getId() != null && getId().equals(((Feedback) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Feedback{" +
            "id=" + getId() +
            ", requestDate='" + getRequestDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", responseDate='" + getResponseDate() + "'" +
            "}";
    }
}
