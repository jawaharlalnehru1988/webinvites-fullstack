package com.example.backend.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @GetMapping("/verify")
    public ResponseEntity<Void> verify() {
        // If the request makes it past Spring Security to this endpoint, 
        // the Basic Auth credentials were valid.
        return ResponseEntity.ok().build();
    }
}
