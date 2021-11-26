package com.petSystem.petSystem.Controller;


import com.petSystem.petSystem.Model.SampleMod;
import com.petSystem.petSystem.Service.SampleServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleCon {

    @Autowired
    public SampleServ peru;

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public boolean test(@RequestBody SampleMod sam){
        return peru.testMethod(sam);
    }

}