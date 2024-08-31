package com.bracits.hrms.web.rest;

import com.bracits.hrms.domain.Year;
import com.bracits.hrms.repository.YearRepository;
import com.bracits.hrms.service.YearService;
import com.bracits.hrms.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.bracits.hrms.domain.Year}.
 */
@RestController
@RequestMapping("/api/years")
public class YearResource {

    private static final Logger log = LoggerFactory.getLogger(YearResource.class);

    private static final String ENTITY_NAME = "year";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final YearService yearService;

    private final YearRepository yearRepository;

    public YearResource(YearService yearService, YearRepository yearRepository) {
        this.yearService = yearService;
        this.yearRepository = yearRepository;
    }

    /**
     * {@code POST  /years} : Create a new year.
     *
     * @param year the year to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new year, or with status {@code 400 (Bad Request)} if the year has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Year> createYear(@Valid @RequestBody Year year) throws URISyntaxException {
        log.debug("REST request to save Year : {}", year);
        if (year.getId() != null) {
            throw new BadRequestAlertException("A new year cannot already have an ID", ENTITY_NAME, "idexists");
        }
        year = yearService.save(year);
        return ResponseEntity.created(new URI("/api/years/" + year.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, year.getId().toString()))
            .body(year);
    }

    /**
     * {@code PUT  /years/:id} : Updates an existing year.
     *
     * @param id the id of the year to save.
     * @param year the year to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated year,
     * or with status {@code 400 (Bad Request)} if the year is not valid,
     * or with status {@code 500 (Internal Server Error)} if the year couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Year> updateYear(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Year year)
        throws URISyntaxException {
        log.debug("REST request to update Year : {}, {}", id, year);
        if (year.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, year.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!yearRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        year = yearService.update(year);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, year.getId().toString()))
            .body(year);
    }

    /**
     * {@code PATCH  /years/:id} : Partial updates given fields of an existing year, field will ignore if it is null
     *
     * @param id the id of the year to save.
     * @param year the year to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated year,
     * or with status {@code 400 (Bad Request)} if the year is not valid,
     * or with status {@code 404 (Not Found)} if the year is not found,
     * or with status {@code 500 (Internal Server Error)} if the year couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Year> partialUpdateYear(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Year year
    ) throws URISyntaxException {
        log.debug("REST request to partial update Year partially : {}, {}", id, year);
        if (year.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, year.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!yearRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Year> result = yearService.partialUpdate(year);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, year.getId().toString())
        );
    }

    /**
     * {@code GET  /years} : get all the years.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of years in body.
     */
    @GetMapping("")
    public List<Year> getAllYears() {
        log.debug("REST request to get all Years");
        return yearService.findAll();
    }

    /**
     * {@code GET  /years/:id} : get the "id" year.
     *
     * @param id the id of the year to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the year, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Year> getYear(@PathVariable("id") Long id) {
        log.debug("REST request to get Year : {}", id);
        Optional<Year> year = yearService.findOne(id);
        return ResponseUtil.wrapOrNotFound(year);
    }

    /**
     * {@code DELETE  /years/:id} : delete the "id" year.
     *
     * @param id the id of the year to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteYear(@PathVariable("id") Long id) {
        log.debug("REST request to delete Year : {}", id);
        yearService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
