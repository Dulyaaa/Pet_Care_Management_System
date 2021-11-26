package com.petSystem.petSystem.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "boarding_place")
public class BoardingPlace {
    @Id
    private String placeId;
    private String placeImage;
    private String placeName;
    private String placeCity;
    private String placeEmail;
    private String placeOpeningHours;
    private List placeServices;

    BoardingPlace() {}

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public String getPlaceImage() {
        return placeImage;
    }

    public void setPlaceImage(String placeImage) {
        this.placeImage = placeImage;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public String getPlaceCity() {
        return placeCity;
    }

    public void setPlaceCity(String placeCity) {
        this.placeCity = placeCity;
    }

    public String getPlaceEmail() {
        return placeEmail;
    }

    public void setPlaceEmail(String placeEmail) {
        this.placeEmail = placeEmail;
    }

    public String getPlaceOpeningHours() {
        return placeOpeningHours;
    }

    public void setPlaceOpeningHours(String placeOpeningHours) {
        this.placeOpeningHours = placeOpeningHours;
    }

    public List getPlaceServices() {
        return placeServices;
    }

    public void setPlaceServices(List placeServices) {
        this.placeServices = placeServices;
    }
}
