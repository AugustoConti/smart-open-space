package com.sos.smartopenspace.controllers

import com.sos.smartopenspace.domain.User
import com.sos.smartopenspace.helpers.UserLoginDTO
import com.sos.smartopenspace.helpers.UserValidateTokenDTO
import com.sos.smartopenspace.services.EmailService
import com.sos.smartopenspace.services.UserService
import org.springframework.web.bind.annotation.*
import javax.validation.Valid
import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty

class RecoveryEmailData(
  @field:NotEmpty(message = "Ingrese un email")
  @field:Email
  val email: String
)

@RestController
@RequestMapping("user")
class UserServiceREST(private val userService: UserService, private val emailService: EmailService) {
  @PostMapping
  fun create(@Valid @RequestBody user: User) = userService.create(user)

  @PostMapping("/auth")
  fun auth(@Valid @RequestBody user: UserLoginDTO) = userService.auth(user.email, user.password)

  @PostMapping("/recovery")
  fun sendRecoveryEmail(@Valid @RequestBody user: RecoveryEmailData) = emailService.sendRecoveryEmail(user.email)

  @PostMapping("/reset")
  fun resetPassword(@Valid @RequestBody user: UserValidateTokenDTO) = userService.resetPassword(user.email, user.resetToken, user.password)
}
