package com.sos.smartopenspace.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate
import java.time.LocalTime
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.OrderColumn
import javax.validation.Valid
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty

class AlreadyActivedQueuingException : RuntimeException("Encolamiento ya se encuentra activo")
class AnotherTalkIsEnqueuedException : RuntimeException("Existe otra charla encolada")
class BusySlotException : RuntimeException("Slot ocupado")
class CantFinishTalkException : RuntimeException("No podes terminar la charla actual")
class EmptyQueueException : RuntimeException("La cola de charlas está vacía")
class FinishedQueuingException : RuntimeException("Encolamiento finalizado")
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

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @field:Valid
  @field:NotEmpty(message = "Ingrese al menos una sala")
  @OneToMany(cascade = [CascadeType.ALL])
  val rooms: Set<Room>,

  @JsonIgnore
  @field:Valid
  @OneToMany(mappedBy = "openSpace", cascade = [CascadeType.ALL])
  val talks: MutableSet<Talk> = mutableSetOf(),

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

  @Enumerated(EnumType.STRING)
  var queueState: QueueState = QueueState.PENDING

  fun isPendingQueue() = queueState == QueueState.PENDING
  fun isActiveQueue() = queueState == QueueState.ACTIVE
  fun isFinishedQueue() = queueState == QueueState.FINISHED

  fun addTalk(talk: Talk): OpenSpace {
    checkIsFinishedQueue()
    talk.openSpace = this
    talks.add(talk)
    return this
  }

  private fun isBusySlot(room: Room, hour: Int) = slots.any { it.hour == hour && it.room == room }

  private fun checkTalkBelongs(talk: Talk) = !talks.contains(talk) && throw TalkDoesntBelongException()

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

  private fun checkIsOrganizer(user: User) = !isOrganizer(user) && throw NotOrganizerException()

  fun activeQueue(user: User): OpenSpace {
    !isPendingQueue() && throw AlreadyActivedQueuingException()
    checkIsOrganizer(user)
    queueState = QueueState.ACTIVE
    return this
  }

  fun currentTalk() = queue.firstOrNull()

  fun checkIsFinishedQueue() = isFinishedQueue() && throw FinishedQueuingException()

  fun enqueueTalk(talk: Talk): OpenSpace {
    isPendingQueue() && throw InactiveQueueException()
    checkIsFinishedQueue()
    checkTalkBelongs(talk)
    queue.contains(talk) && throw TalkAlreadyEnqueuedException()
    queue.any { it.speaker == talk.speaker } && throw AnotherTalkIsEnqueuedException()
    queue.add(talk)
    return this
  }

  private fun isCurrentSpeaker(user: User) = user == currentTalk()?.speaker
  private fun isOrganizer(user: User) = user == organizer

  fun nextTalk(user: User): OpenSpace {
    queue.isEmpty() && throw EmptyQueueException()
    !isCurrentSpeaker(user) && !isOrganizer(user) && throw CantFinishTalkException()
    toSchedule.add(queue.removeAt(0))
    return this
  }

  fun finishQueuing(user: User): OpenSpace {
    checkIsOrganizer(user)
    queueState = QueueState.FINISHED
    queue.clear()
    return this
  }
}

enum class QueueState {
  PENDING,
  ACTIVE,
  FINISHED
}
