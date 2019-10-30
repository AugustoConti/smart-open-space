package com.sos.smartopenspace.model

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.validation.Valid
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

@Entity(name = "UserSOS")
class User(
  @field:NotEmpty(message = "Ingrese un email")
  @field:Email
  @Column(unique = true)
  val email: String,

  @field:NotEmpty(message = "Ingrese una contraseña")
  @field:NotBlank(message = "Contraseña no puede ser vacía")
  val password: String,

  @field:NotEmpty(message = "Ingrese un nombre")
  @field:NotBlank(message = "Nombre no puede ser vacío")
  val name: String,

  @field:Valid
  @JsonIgnore
  @OneToMany(mappedBy = "organizer", fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
  val openSpaces: MutableSet<OpenSpace> = mutableSetOf(),

  @field:Valid
  @JsonIgnore
  @OneToMany(mappedBy = "speaker", fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
  val talks: MutableSet<Talk> = mutableSetOf(),

  @Id @GeneratedValue
  var id: Long = 0
) {
  init {
    openSpaces.forEach { it.organizer = this }
    talks.forEach { it.speaker = this }
  }

  fun addTalk(talk: Talk): User {
    talk.speaker = this
    talks.add(talk)
    return this
  }
}
