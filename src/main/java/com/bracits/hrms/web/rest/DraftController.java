package com.bracits.hrms.web.rest;

import com.bracits.hrms.service.DraftService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drafts")
public class DraftController {
    private final DraftService redisDraftService;

    public DraftController(DraftService redisDraftService) {
        this.redisDraftService = redisDraftService;
    }

    @PostMapping("/{feedbackId}")
    public void saveDraft(@PathVariable Long feedbackId, @RequestBody Object draftData) {
        redisDraftService.saveDraft(feedbackId, draftData);
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<Object> loadDraft(@PathVariable Long feedbackId) {
        Object draft = redisDraftService.loadDraft(feedbackId);
        if (draft != null) {
            return ResponseEntity.ok(draft);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{feedbackId}")
    public void deleteDraft(@PathVariable Long feedbackId) {
        redisDraftService.deleteDraft(feedbackId);
    }
}
