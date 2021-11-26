package com.petSystem.petSystem.Repository;

import com.petSystem.petSystem.Model.BoardingPlace;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BoardingPlaceRepository extends MongoRepository<BoardingPlace, String> {
    List<BoardingPlace> findByPlaceCityContaining(String placeCity);
}
