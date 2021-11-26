package com.petSystem.petSystem.Controller;

import com.petSystem.petSystem.Model.BoardingPlace;
import com.petSystem.petSystem.Repository.BoardingPlaceRepository;
import com.petSystem.petSystem.Service.BoardingPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/boardingPlace")
public class BoardingPlaceController {
    @Autowired
    private BoardingPlaceService boardingPlaceService;

    @Autowired
    private BoardingPlaceRepository boardingPlaceRepository;

    /**
     * @description Create new Boarding Place
     * @param boardingPlace
     * @memberof BoardingPlaceController
     */
    @PostMapping("/create")
    public ResponseEntity<BoardingPlace> createBoardingPlace(@RequestBody BoardingPlace boardingPlace) {
        try{
            boardingPlaceService.createNewBoardingPlace(boardingPlace);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @description Get all Boarding Places
     * @memberof BoardingPlaceController
     */
    @GetMapping("/places")
    public ResponseEntity<List<BoardingPlace>> getAllBoardingPlaces(){
        try{
            List<BoardingPlace> boardingPlaces = new ArrayList<BoardingPlace>();
            boardingPlaceService.getAllBoardingPlace().forEach(boardingPlaces::add);
            if(boardingPlaces.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(boardingPlaces, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * @description Search Boarding Places
     * @memberof BoardingPlaceController
     */
    @GetMapping("/search")
    public ResponseEntity<List<BoardingPlace>> searchBoardingPlaces(@RequestParam(required = false) String placeCity){
        try{
            List<BoardingPlace> boardingPlaces = new ArrayList<BoardingPlace>();
            if(placeCity != null)
                boardingPlaceRepository.findByPlaceCityContaining(placeCity).forEach(boardingPlaces::add);
            if(boardingPlaces.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(boardingPlaces, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @description Delete Boarding Places
     * @memberof BoardingPlaceController
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteBoardingPlace(@PathVariable("id") String id) {
        try {
            boardingPlaceService.deleteBoardingPlace(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @description Get Pet Boarding Place Details
     * @memberof BoardingPlaceController
     * @param id
     */
    @GetMapping("/place/{id}")
    public ResponseEntity<BoardingPlace> getVehicleById(@PathVariable("id") String id) {
        Optional<BoardingPlace> boardingPlaceData = boardingPlaceRepository.findById(id);

        if(boardingPlaceData.isPresent()){
            return new ResponseEntity<>(boardingPlaceData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * @description Get Count of Boarding Places
     * @memberof BoardingPlaceController
     */
    @GetMapping("/count")
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

    /**
     * @description Update Pet Boarding Places
     * @memberof BoardingPlaceController
     * @param id
     * @param boardingPlace
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<BoardingPlace> updateBoardingPlace(@PathVariable("id") String id, @RequestBody BoardingPlace boardingPlace){
        Optional<BoardingPlace> boardingPlaceData = boardingPlaceRepository.findById(id);

        if(boardingPlaceData.isPresent()){
            BoardingPlace _boardingPlace = boardingPlaceData.get();
            _boardingPlace.setPlaceImage(boardingPlace.getPlaceImage());
            _boardingPlace.setPlaceName(boardingPlace.getPlaceName());
            _boardingPlace.setPlaceCity(boardingPlace.getPlaceCity());
            _boardingPlace.setPlaceEmail(boardingPlace.getPlaceEmail());
            _boardingPlace.setPlaceOpeningHours(boardingPlace.getPlaceOpeningHours());
            _boardingPlace.setPlaceServices(boardingPlace.getPlaceServices());

            return new ResponseEntity<>(boardingPlaceRepository.save(_boardingPlace), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
