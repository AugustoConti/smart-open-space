package com.sos.smartopenspace.model

import java.time.LocalDate
import java.time.LocalTime
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.validation.constraints.NotEmpty

@Entity
class OpenSpace(
  @NotEmpty(message = "Please provide a name")
  val name: String,
  @OneToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
  val rooms: List<Room>,
  val date: LocalDate,
  val startTime: LocalTime,
  val endTime: LocalTime,
  @Id @GeneratedValue
  val id: Long = 0
)
