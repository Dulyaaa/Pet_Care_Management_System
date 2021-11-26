package com.petSystem.petSystem.Controller;

import com.petSystem.petSystem.Model.BoardingPlace;
import com.petSystem.petSystem.Model.Pet;
import com.petSystem.petSystem.Repository.PetRepository;
import com.petSystem.petSystem.Service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/PetDetails")
public class PetController {

    @Autowired
    public PetService petService;

    @Autowired
    public PetRepository petRepository;

    @PostMapping("/create")
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        try{
            petService.savePet(pet);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Pet>> getAllPets(){
        try{
            List<Pet> pets = new ArrayList<Pet>();
            petService.getAllPets().forEach(pets::add);
            if(pets.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePet(@PathVariable String id) {
        try {
            petService.deletePet(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getById/{id}")
    public Optional<Pet> findPetById(@PathVariable String id){
        return petService.findPetById(id);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Pet> updatePet(@RequestBody Pet pet, @PathVariable String id){
        pet.setId(id);
        petService.savePet(pet);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Pet>> searchPetByBreed(@RequestParam(required = false) String breed){
        try{
            List<Pet> pet = new ArrayList<Pet>();
            if(breed != null)
                petRepository.findByBreed(breed).forEach(pet::add);
            if(pet.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(pet, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
