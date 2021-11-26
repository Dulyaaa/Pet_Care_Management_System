package com.petSystem.petSystem.Service;
import com.petSystem.petSystem.Model.Pet;
import com.petSystem.petSystem.Model.PetAccessoryModel;
import com.petSystem.petSystem.Repository.PetAccessoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service

public class PetAccessoryService {
    @Autowired
    public PetAccessoryRepo petAccessoryRepo;
    public PetAccessoryModel saveAccessory(PetAccessoryModel petAccessoryModel)
    {
        return  petAccessoryRepo.save(petAccessoryModel);
    }
    public List<PetAccessoryModel> getAll() {
        return petAccessoryRepo.findAll();
    }

    public void deleteAccessory(String id) {petAccessoryRepo.deleteById(id);}

    public Optional<PetAccessoryModel> findAccessoryById(String id){
        return petAccessoryRepo.findById(id);
    }

}
