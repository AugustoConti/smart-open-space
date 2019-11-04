package com.sos.smartopenspace.controllers

import com.sos.smartopenspace.domain.User
import com.sos.smartopenspace.services.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

class UserData(
  @field:NotEmpty(message = "Ingrese un email")
  @field:Email
  val email: String,
  @field:NotEmpty(message = "Ingrese una contraseña")
  @field:NotBlank(message = "Contraseña no puede ser vacía")
  val password: String
)

data class Data(val data: User?)

data class DataEmail(
  @field:NotEmpty(message = "Ingrese un email")
  @field:Email
  val email: String
)

@RestController
@RequestMapping("user")
class UserServiceREST(private val userService: UserService) {
  @PostMapping
  fun create(@Valid @RequestBody user: User) = userService.create(user)

  @PostMapping("/auth")
  fun auth(@Valid @RequestBody user: UserData) = userService.auth(user.email, user.password)

  @PostMapping("/identify")
  fun identify(@Valid @RequestBody data: DataEmail) = Data(userService.identify(data.email))
}
