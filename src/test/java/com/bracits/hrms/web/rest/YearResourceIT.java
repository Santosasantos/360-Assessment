package com.bracits.hrms.web.rest;

import static com.bracits.hrms.domain.YearAsserts.*;
import static com.bracits.hrms.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.bracits.hrms.IntegrationTest;
import com.bracits.hrms.domain.Year;
import com.bracits.hrms.repository.YearRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link YearResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class YearResourceIT {

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    private static final String ENTITY_API_URL = "/api/years";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private YearRepository yearRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restYearMockMvc;

    private Year year;

    private Year insertedYear;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Year createEntity(EntityManager em) {
        Year year = new Year().year(DEFAULT_YEAR);
        return year;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Year createUpdatedEntity(EntityManager em) {
        Year year = new Year().year(UPDATED_YEAR);
        return year;
    }

    @BeforeEach
    public void initTest() {
        year = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedYear != null) {
            yearRepository.delete(insertedYear);
            insertedYear = null;
        }
    }

    @Test
    @Transactional
    void createYear() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Year
        var returnedYear = om.readValue(
            restYearMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(year)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Year.class
        );

        // Validate the Year in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertYearUpdatableFieldsEquals(returnedYear, getPersistedYear(returnedYear));

        insertedYear = returnedYear;
    }

    @Test
    @Transactional
    void createYearWithExistingId() throws Exception {
        // Create the Year with an existing ID
        year.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(year)))
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkYearIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        year.setYear(null);

        // Create the Year, which fails.

        restYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(year)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllYears() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.saveAndFlush(year);

        // Get all the yearList
        restYearMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(year.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)));
    }

    @Test
    @Transactional
    void getYear() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.saveAndFlush(year);

        // Get the year
        restYearMockMvc
            .perform(get(ENTITY_API_URL_ID, year.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(year.getId().intValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR));
    }

    @Test
    @Transactional
    void getNonExistingYear() throws Exception {
        // Get the year
        restYearMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingYear() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.saveAndFlush(year);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the year
        Year updatedYear = yearRepository.findById(year.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedYear are not directly saved in db
        em.detach(updatedYear);
        updatedYear.year(UPDATED_YEAR);

        restYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedYear.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedYear))
            )
            .andExpect(status().isOk());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedYearToMatchAllProperties(updatedYear);
    }

    @Test
    @Transactional
    void putNonExistingYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(put(ENTITY_API_URL_ID, year.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(year)))
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(year))
            )
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(year)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateYearWithPatch() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.saveAndFlush(year);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the year using partial update
        Year partialUpdatedYear = new Year();
        partialUpdatedYear.setId(year.getId());

        restYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedYear))
            )
            .andExpect(status().isOk());

        // Validate the Year in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertYearUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedYear, year), getPersistedYear(year));
    }

    @Test
    @Transactional
    void fullUpdateYearWithPatch() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.saveAndFlush(year);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the year using partial update
        Year partialUpdatedYear = new Year();
        partialUpdatedYear.setId(year.getId());

        partialUpdatedYear.year(UPDATED_YEAR);

        restYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedYear))
            )
            .andExpect(status().isOk());

        // Validate the Year in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertYearUpdatableFieldsEquals(partialUpdatedYear, getPersistedYear(partialUpdatedYear));
    }

    @Test
    @Transactional
    void patchNonExistingYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(patch(ENTITY_API_URL_ID, year.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(year)))
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(year))
            )
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(year)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteYear() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.saveAndFlush(year);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the year
        restYearMockMvc
            .perform(delete(ENTITY_API_URL_ID, year.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return yearRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Year getPersistedYear(Year year) {
        return yearRepository.findById(year.getId()).orElseThrow();
    }

    protected void assertPersistedYearToMatchAllProperties(Year expectedYear) {
        assertYearAllPropertiesEquals(expectedYear, getPersistedYear(expectedYear));
    }

    protected void assertPersistedYearToMatchUpdatableProperties(Year expectedYear) {
        assertYearAllUpdatablePropertiesEquals(expectedYear, getPersistedYear(expectedYear));
    }
}
