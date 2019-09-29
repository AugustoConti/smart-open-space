package com.sos.smartopenspace.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate
import java.time.LocalTime
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.validation.Valid
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

class BusySlotException : RuntimeException("Slot ocupado")
class TalkDoesntBelongException : RuntimeException("Charla no pertence al Open Space")
class TalkAlreadyAssignedException : RuntimeException("Charla ya se encuentra agendada")

@Entity
class OpenSpace(
  @field:NotEmpty(message = "Ingrese un nombre")
  @field:NotBlank(message = "Nombre no puede ser vacío")
  val name: String,
  val date: LocalDate,
  val startTime: LocalTime,
  val endTime: LocalTime,

  @field:Valid
  @field:NotEmpty(message = "Ingrese al menos una sala")
  @OneToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
  val rooms: Set<Room>,

  @field:Valid
  @JsonIgnore
  @OneToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
  val talks: MutableSet<Talk> = mutableSetOf(),

  @Id @GeneratedValue
  val id: Long = 0
) {

  init {
    talks.forEach { it.openSpace = this }
  }

  @JsonIgnore
  @ManyToOne
  lateinit var organizer: User

  @OneToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
  val slots: MutableSet<Slot> = mutableSetOf()

  fun addTalk(talk: Talk): OpenSpace {
    talk.openSpace = this
    talks.add(talk)
    return this
  }

  private fun isBusySlot(room: Room, hour: Int) = slots.any { it.hour == hour && it.room == room }

  fun scheduleTalk(talk: Talk, hour: Int, room: Room): Slot {
    talks.contains(talk) || throw TalkDoesntBelongException()
    slots.any { it.talk == talk } && throw TalkAlreadyAssignedException()
    isBusySlot(room, hour) && throw BusySlotException()
    val slot = Slot(talk, hour, room)
    slots.add(slot)
    return slot
  }

  private fun slotsHours() = startTime.hour until endTime.hour

  @JsonProperty
  fun freeSlots() = rooms.map { room -> room to slotsHours().filter { !isBusySlot(room, it) } }
}
