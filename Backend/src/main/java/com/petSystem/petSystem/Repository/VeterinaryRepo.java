package com.petSystem.petSystem.Repository;

import com.petSystem.petSystem.Model.BoardingPlace;
import com.petSystem.petSystem.Model.VeterinaryModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VeterinaryRepo extends MongoRepository<VeterinaryModel,String> {
    public VeterinaryModel save(VeterinaryModel res);

    List<VeterinaryModel> findByClinicLocationContaining(String clinicLocation);

}
