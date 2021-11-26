package com.petSystem.petSystem.Service;

import com.petSystem.petSystem.Model.BoardingPlace;
import com.petSystem.petSystem.Repository.BoardingPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardingPlaceService {
    public final BoardingPlaceRepository boardingPlaceRepository;

    @Autowired
    public BoardingPlaceService(BoardingPlaceRepository boardingPlaceRepository){
        this.boardingPlaceRepository = boardingPlaceRepository;
    }

    /**
     * @description Add new BoardingPlace
     * @param boardingPlace
     * @memberof BoardingPlaceService
     */
    public void createNewBoardingPlace(BoardingPlace boardingPlace){
        boardingPlaceRepository.insert(boardingPlace);
    }

    /**
     * @description Get all Conferences
     * @memberof BoardingPlaceService
     */
    public List<BoardingPlace> getAllBoardingPlace(){
        return boardingPlaceRepository.findAll();
    }

    /**
     * @description Delete BoardingPlace
     * @param id
     * @memberof BoardingPlaceService
     */
    public void deleteBoardingPlace(String id) {
        boardingPlaceRepository.deleteById(id);
    }
}
