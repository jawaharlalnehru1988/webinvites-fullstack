package com.example.backend.rsvp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Rsvp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String guests;

    @NotBlank
    private String attending;

    @NotBlank
    private String meal;

    public Rsvp() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGuests() { return guests; }
    public void setGuests(String guests) { this.guests = guests; }
    public String getAttending() { return attending; }
    public void setAttending(String attending) { this.attending = attending; }
    public String getMeal() { return meal; }
    public void setMeal(String meal) { this.meal = meal; }
}
