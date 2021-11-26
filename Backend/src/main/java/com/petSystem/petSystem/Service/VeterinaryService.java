package com.petSystem.petSystem.Service;

import com.petSystem.petSystem.Model.VeterinaryModel;
import com.petSystem.petSystem.Repository.VeterinaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeterinaryService {
    @Autowired
    public VeterinaryRepo veterinary;
    public VeterinaryModel saveVeterinary(VeterinaryModel veterinaryModel)
    {
        return  veterinary.save(veterinaryModel);

    }

    public List<VeterinaryModel> showVeterinary() {
        return veterinary.findAll();
    }

    public void deleteVeterinary(String id) {veterinary.deleteById(id);}

    public Optional<VeterinaryModel> findVeterinaryById(String id){
        return veterinary.findById(id);
    }
}
