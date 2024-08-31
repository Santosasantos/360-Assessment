package com.bracits.hrms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A SkillDevelopmentDetails.
 */
@Entity
@Table(name = "skill_development_details")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SkillDevelopmentDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "requesters", "responders", "sessions" }, allowSetters = true)
    private Feedback skilldevelopment;

    @ManyToOne(fetch = FetchType.LAZY)
    private SkillDevelopmentType skilldevelopmenttypes;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SkillDevelopmentDetails id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Feedback getSkilldevelopment() {
        return this.skilldevelopment;
    }

    public void setSkilldevelopment(Feedback feedback) {
        this.skilldevelopment = feedback;
    }

    public SkillDevelopmentDetails skilldevelopment(Feedback feedback) {
        this.setSkilldevelopment(feedback);
        return this;
    }

    public SkillDevelopmentType getSkilldevelopmenttypes() {
        return this.skilldevelopmenttypes;
    }

    public void setSkilldevelopmenttypes(SkillDevelopmentType skillDevelopmentType) {
        this.skilldevelopmenttypes = skillDevelopmentType;
    }

    public SkillDevelopmentDetails skilldevelopmenttypes(SkillDevelopmentType skillDevelopmentType) {
        this.setSkilldevelopmenttypes(skillDevelopmentType);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SkillDevelopmentDetails)) {
            return false;
        }
        return getId() != null && getId().equals(((SkillDevelopmentDetails) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SkillDevelopmentDetails{" +
            "id=" + getId() +
            "}";
    }
}
