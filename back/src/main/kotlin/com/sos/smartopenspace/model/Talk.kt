package com.sos.smartopenspace.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

@Entity
class Talk(
  @field:NotEmpty(message = "Ingrese un nombre")
  @field:NotBlank(message = "Nombre no puede ser vacío")
  val name: String,
  @Column(columnDefinition="LONGVARCHAR")
  val description: String = "",
  @Id
  @GeneratedValue
  val id: Long = 0
)