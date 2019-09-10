package com.sos.smartopenspace.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.validation.constraints.NotEmpty

@Entity
class Room(
  @NotEmpty(message = "Please provide a name")
  val name: String,
  @Id @GeneratedValue
  val id: Long = 0
)
