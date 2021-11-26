package com.petSystem.petSystem.Service;

import com.petSystem.petSystem.Model.Admin;
import com.petSystem.petSystem.Model.Pet;
import com.petSystem.petSystem.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    public Optional<Admin> loginAdmin(String email){
        return adminRepository.findById(email);
    }
}
