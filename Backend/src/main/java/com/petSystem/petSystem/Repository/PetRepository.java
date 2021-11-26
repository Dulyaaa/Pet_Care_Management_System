package com.petSystem.petSystem.Repository;

import com.petSystem.petSystem.Model.BoardingPlace;
import com.petSystem.petSystem.Model.Pet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends MongoRepository<Pet ,String> {

    List<Pet> findByBreed(String breed);


}
