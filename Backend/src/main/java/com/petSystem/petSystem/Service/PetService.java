package com.petSystem.petSystem.Service;

import com.petSystem.petSystem.Model.Pet;
import com.petSystem.petSystem.Repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    public PetRepository petRepository;

    public Pet savePet(Pet pet){
        return petRepository.save(pet);
    }

    public List<Pet> getAllPets(){
        return petRepository.findAll();
    }

    public void deletePet(String id){
        petRepository.deleteById(id);
    }

    public Optional<Pet> findPetById(String id){
        return petRepository.findById(id);
    }

}
