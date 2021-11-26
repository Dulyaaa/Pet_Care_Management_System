package com.petSystem.petSystem.Controller;
import com.petSystem.petSystem.Model.BoardingPlace;
import com.petSystem.petSystem.Model.Pet;
import com.petSystem.petSystem.Model.PetAccessoryModel;
import com.petSystem.petSystem.Repository.BoardingPlaceRepository;
import com.petSystem.petSystem.Repository.PetAccessoryRepo;

import com.petSystem.petSystem.PetSystemApplication;
import com.petSystem.petSystem.Service.PetAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/petAccessory")

public class PetAccessoryController {


    @Autowired
    public PetAccessoryService petAccessoryService;
    @Autowired
    private PetAccessoryRepo petAccessoryRepo;

    @RequestMapping(value = "/addAccessory", method = RequestMethod.POST)
    public PetAccessoryModel saveAccessory(@RequestBody PetAccessoryModel accessoryModel){
        return petAccessoryService.saveAccessory(accessoryModel);
    }

    @GetMapping("/")
    public List<PetAccessoryModel> getAllAccessories() {
        return petAccessoryService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAccessory(@PathVariable String id) {
        try {
            petAccessoryService.deleteAccessory(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<PetAccessoryModel>> searchAccessory(@RequestParam(required = false) String itemName){
        try{
            List<PetAccessoryModel> accessory = new ArrayList<PetAccessoryModel>();
            if(itemName != null)
                petAccessoryRepo.findByItemNameContaining(itemName).forEach(accessory::add);
            if(accessory.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(accessory, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("getById/{id}")
    public Optional<PetAccessoryModel> findAccessoryById(@PathVariable String id){
        return petAccessoryService.findAccessoryById(id);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<PetAccessoryModel> updateAccessory(@RequestBody PetAccessoryModel accessory, @PathVariable String id){
        accessory.setId(id);
        petAccessoryService.saveAccessory(accessory);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
