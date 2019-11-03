package com.sos.smartopenspace.domain

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
import javax.persistence.OrderColumn
import javax.validation.Valid
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

class AnotherTalkIsEnqueuedException : RuntimeException("Existe otra charla encolada")
class BusySlotException : RuntimeException("Slot ocupado")
class CantFinishTalkException : RuntimeException("No podes terminar la charla actual")
class EmptyQueueException : RuntimeException("La cola de charlas está vacía")
class InactiveQueueException : RuntimeException("No está activo el encolamiento")
class NotOrganizerException : RuntimeException("No sos el organizador")
class TalkAlreadyAssignedException : RuntimeException("Charla ya está agendada")
class TalkAlreadyEnqueuedException : RuntimeException("Charla ya está encolada")
class TalkIsNotForScheduledException : RuntimeException("Charla no está para agendar")
class TalkDoesntBelongException : RuntimeException("Charla no pertence al Open Space")

@Entity
class OpenSpace(
  @field:NotEmpty(message = "Ingrese un nombre")
  @field:NotBlank(message = "Nombre no puede ser vacío")
  val name: String,
  val date: LocalDate,
  val startTime: LocalTime,
  val endTime: LocalTime,

  @JsonIgnore
  @field:Valid
  @field:NotEmpty(message = "Ingrese al menos una sala")
  @OneToMany(cascade = [CascadeType.ALL])
  val rooms: Set<Room>,

  @JsonIgnore
  @field:Valid
  @OneToMany(cascade = [CascadeType.ALL])
  val talks: MutableSet<Talk> = mutableSetOf(),

  var isActiveQueue: Boolean = false,
  @Id @GeneratedValue
  val id: Long = 0
) {

  init {
    talks.forEach { it.openSpace = this }
  }

  @ManyToOne
  lateinit var organizer: User

  @JsonIgnore
  @OneToMany(cascade = [CascadeType.ALL])
  val slots: MutableSet<Slot> = mutableSetOf()

  @OrderColumn
  @JsonIgnore
  @OneToMany(fetch = FetchType.EAGER)
  val queue: MutableList<Talk> = mutableListOf()

  @OneToMany
  val toSchedule: MutableSet<Talk> = mutableSetOf()

  fun addTalk(talk: Talk): OpenSpace {
    talk.openSpace = this
    talks.add(talk)
    return this
  }

  private fun isBusySlot(room: Room, hour: Int) = slots.any { it.hour == hour && it.room == room }

  private fun checkTalkBelongs(talk: Talk) = talks.contains(talk) || throw TalkDoesntBelongException()

  private fun checkScheduleTalk(talk: Talk, hour: Int, room: Room) {
    checkTalkBelongs(talk)
    slots.any { it.talk == talk } && throw TalkAlreadyAssignedException()
    !toSchedule.contains(talk) && throw TalkIsNotForScheduledException()
    isBusySlot(room, hour) && throw BusySlotException()
  }

  fun scheduleTalk(talk: Talk, hour: Int, room: Room): Slot {
    checkScheduleTalk(talk, hour, room)
    val slot = Slot(talk, hour, room)
    slots.add(slot)
    return slot
  }

  private fun slotsHours() = startTime.hour until endTime.hour + 1

  @JsonProperty
  fun freeSlots() = rooms.map { room -> room to slotsHours().filter { !isBusySlot(room, it) } }

  fun activeQueue(user: User): OpenSpace {
    user !== organizer && throw NotOrganizerException()
    isActiveQueue = true
    return this
  }

  fun currentTalk() = queue.firstOrNull()

  fun enqueueTalk(talk: Talk): OpenSpace {
    !isActiveQueue && throw InactiveQueueException()
    checkTalkBelongs(talk)
    queue.contains(talk) && throw TalkAlreadyEnqueuedException()
    queue.any { it.speaker == talk.speaker } && throw AnotherTalkIsEnqueuedException()
    queue.add(talk)
    return this
  }

  fun nextTalk(user: User): OpenSpace {
    queue.isEmpty() && throw EmptyQueueException()
    val isSpeaker = user == currentTalk()?.speaker
    val isOrganizer = user == organizer
    !isSpeaker && !isOrganizer && throw CantFinishTalkException()
    toSchedule.add(queue.removeAt(0))
    return this
  }
}
