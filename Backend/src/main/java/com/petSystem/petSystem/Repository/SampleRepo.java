package com.petSystem.petSystem.Repository;

import com.petSystem.petSystem.Model.SampleMod;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SampleRepo extends MongoRepository<SampleMod,String> {

}