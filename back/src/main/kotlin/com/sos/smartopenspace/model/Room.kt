package com.sos.smartopenspace.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

@Entity
class Room(
  @field:NotEmpty(message = "Please provide a name")
  @field:NotBlank(message = "Name may not be blank")
  val name: String,
  @Id @GeneratedValue
  val id: Long = 0
)
