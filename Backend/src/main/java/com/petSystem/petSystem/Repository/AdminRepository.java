package com.petSystem.petSystem.Repository;

import com.petSystem.petSystem.Model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin,String> {
}
