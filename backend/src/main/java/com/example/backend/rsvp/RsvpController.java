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

    @PutMapping("/{id}")
    public ResponseEntity<Rsvp> updateRsvp(@PathVariable Long id, @Valid @RequestBody Rsvp rsvpDetails) {
        return repository.findById(id)
                .map(rsvp -> {
                    rsvp.setName(rsvpDetails.getName());
                    rsvp.setGuests(rsvpDetails.getGuests());
                    rsvp.setAttending(rsvpDetails.getAttending());
                    Rsvp updated = repository.save(rsvp);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRsvp(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
