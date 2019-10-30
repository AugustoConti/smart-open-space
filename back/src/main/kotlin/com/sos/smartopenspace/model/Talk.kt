package com.sos.smartopenspace.model

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

@Entity
class Talk(
  @field:NotEmpty(message = "Ingrese un nombre")
  @field:NotBlank(message = "Nombre no puede ser vacío")
  val name: String,

  @Column(columnDefinition = "VarChar")
  val description: String = "",

  @Id
  @GeneratedValue
  val id: Long = 0
) {
  @ManyToOne
  lateinit var speaker: User

  @ManyToOne
  @JsonIgnore
  lateinit var openSpace: OpenSpace

  fun schedule(hour: Int, room: Room): OpenSpace {
    openSpace.scheduleTalk(this, hour, room)
    return openSpace
  }

  fun enqueue(): OpenSpace = openSpace.enqueueTalk(this)
}
