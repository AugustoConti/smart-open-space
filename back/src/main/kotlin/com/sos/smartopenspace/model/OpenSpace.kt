package com.sos.smartopenspace.model

import java.time.LocalDate
import java.time.LocalTime
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.validation.Valid
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

@Entity
class OpenSpace(
  @field:NotEmpty(message = "Please provide a name")
  @field:NotBlank(message = "Name may not be blank")
  val name: String,
  @field:Valid
  @field:NotEmpty(message="At least one room is required")
  @OneToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
  val rooms: List<Room>,
  val date: LocalDate,
  val startTime: LocalTime,
  val endTime: LocalTime,
  @Id @GeneratedValue
  val id: Long = 0
)
