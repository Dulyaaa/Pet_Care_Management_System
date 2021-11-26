package com.petSystem.petSystem.Controller;

import com.petSystem.petSystem.Model.*;
import com.petSystem.petSystem.Repository.AdminRepository;
import com.petSystem.petSystem.Repository.BoardingPlaceRepository;
import com.petSystem.petSystem.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    BoardingPlaceService boardingPlaceService;

    @Autowired
    PetService petService;

    @Autowired
    PetAccessoryService petAccessoryService;

    @Autowired
    VeterinaryService veterinaryService;

    @Autowired
    AdminRepository adminRepository;

    @GetMapping("login/{email}")
    public Optional<Admin> findUserDetails(@PathVariable String email){
        return (Optional<Admin>) adminService.loginAdmin(email);
    }
    @PostMapping("/add/")
    public ResponseEntity<Admin> addUser(@RequestBody Admin admin){
        try{
            adminRepository.save(admin);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count/places")
    public ResponseEntity<Integer> getCountBoardingPlaces(@RequestParam(required = false) String placeCity){
        try{
            List<BoardingPlace> boardingPlaces = new ArrayList<BoardingPlace>();
            if(placeCity == null)
                boardingPlaceService.getAllBoardingPlace().forEach(boardingPlaces::add);
            if(boardingPlaces.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            int size = boardingPlaces.size();

            return new ResponseEntity<>(size, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count/pets")
    public ResponseEntity<Integer> getCountPets(){
        try{
            List<Pet> pets = new ArrayList<Pet>();
            petService.getAllPets().forEach(pets::add);
            if(pets.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            int size = pets.size();

            System.out.println("size is:" + size);

            return new ResponseEntity<>(size, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count/accessories")
    public ResponseEntity<Integer> getCountAccessories(){
        try{
            List<PetAccessoryModel> accessories = new ArrayList<PetAccessoryModel>();
            petAccessoryService.getAll().forEach(accessories::add);
            if(accessories.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            int size = accessories.size();

            return new ResponseEntity<>(size, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count/services")
    public ResponseEntity<Integer> getCountServices(){
        try{
            List<VeterinaryModel> services = new ArrayList<VeterinaryModel>();
            veterinaryService.showVeterinary().forEach(services::add);
            if(services.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            int size = services.size();

            return new ResponseEntity<>(size, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
