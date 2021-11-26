package com.petSystem.petSystem.Repository;

import com.petSystem.petSystem.Model.BoardingPlace;
import com.petSystem.petSystem.Model.PetAccessoryModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetAccessoryRepo extends MongoRepository<PetAccessoryModel,String> {
    public PetAccessoryModel save(PetAccessoryModel accessory);
    List<PetAccessoryModel> findByItemNameContaining(String placeCity);

}