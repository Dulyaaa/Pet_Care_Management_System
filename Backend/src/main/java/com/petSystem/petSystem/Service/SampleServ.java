package com.petSystem.petSystem.Service;

import com.petSystem.petSystem.Model.PetAccessoryModel;
import com.petSystem.petSystem.Model.SampleMod;
import com.petSystem.petSystem.Repository.SampleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SampleServ {
    @Autowired
    public SampleRepo obj;

    public boolean testMethod(SampleMod sample){
        SampleMod result=obj.save(sample);
        if(result==null) {
            return false;
        }
        else {
            return true;
        }
    }    
}