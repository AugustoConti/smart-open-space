package com.sos.smartopenspace.webservice

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin(origins = ["http://localhost:1234", "https://smartopenspace.herokuapp.com"])
annotation class ServiceREST
