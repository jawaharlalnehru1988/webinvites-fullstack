package com.example.backend.rsvp;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rsvp")
@CrossOrigin(origins = "*")
public class RsvpController {

    private final RsvpRepository repository;

    @Autowired
    public RsvpController(RsvpRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Rsvp> createRsvp(@Valid @RequestBody Rsvp rsvp) {
        Rsvp saved = repository.save(rsvp);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Rsvp>> getRsvps() {
        return ResponseEntity.ok(repository.findAll());
    }
}
