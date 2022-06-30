package com.sos.smartopenspace.helpers

import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

class UserLoginDTO(
  @field:NotEmpty(message = "Ingrese un email")
  @field:Email
  val email: String,
  @field:NotEmpty(message = "Ingrese una contraseña")
  @field:NotBlank(message = "Contraseña no puede ser vacía")
  val password: String
)