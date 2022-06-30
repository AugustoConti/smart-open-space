package com.sos.smartopenspace.controllers

import com.sos.smartopenspace.domain.User
import com.sos.smartopenspace.helpers.UserLoginDTO
import com.sos.smartopenspace.services.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@RestController
@RequestMapping("user")
class UserServiceREST(private val userService: UserService) {
  @PostMapping
  fun create(@Valid @RequestBody user: User) = userService.create(user)

  @PostMapping("/auth")
  fun auth(@Valid @RequestBody user: UserLoginDTO) = userService.auth(user.email, user.password)

}
