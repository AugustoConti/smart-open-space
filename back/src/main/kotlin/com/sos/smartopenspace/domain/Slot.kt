package com.sos.smartopenspace.domain

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonSubTypes.Type
import com.fasterxml.jackson.annotation.JsonTypeInfo
import java.time.LocalTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToOne

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
  Type(value = TalkSlot::class),
  Type(value = OtherSlot::class)
)
@Entity
abstract class Slot(
  val startTime: LocalTime,
  val endTime: LocalTime,
  @Id
  @GeneratedValue
  val id: Long = 0
) {
  abstract fun isAssignable(): Boolean
}

@Entity
class TalkSlot(startTime: LocalTime, endTime: LocalTime) : Slot(startTime, endTime) {
  override fun isAssignable() = true
}

@Entity
class OtherSlot(startTime: LocalTime, endTime: LocalTime, val description: String) : Slot(startTime, endTime) {
  override fun isAssignable() = false
}

@Entity
class AssignedSlot(
  @ManyToOne
  var slot: TalkSlot,
  @ManyToOne
  var room: Room,
  @OneToOne
  val talk: Talk,
  @Id
  @GeneratedValue
  val id: Long = 0
) {
  fun startAt(time: LocalTime) = slot.startTime == time

  fun moveTo(slot: TalkSlot, room: Room) {
    this.slot = slot
    this.room = room
  }
}
