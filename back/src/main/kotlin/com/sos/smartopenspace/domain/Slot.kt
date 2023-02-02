package com.sos.smartopenspace.domain
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonSubTypes.Type
import com.fasterxml.jackson.annotation.JsonTypeInfo
import java.time.LocalDate
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

  val date: LocalDate? = null,
  @Id
  @GeneratedValue
  override val id: Long = 0
) : OpenSpaceItemCollection {
  abstract fun isAssignable(): Boolean
  abstract fun cloneWithDate(date: LocalDate): Slot
}

@Entity
class TalkSlot(startTime: LocalTime, endTime: LocalTime, date: LocalDate? = null) : Slot(startTime, endTime, date) {
  override fun isAssignable() = true
  override fun cloneWithDate(date: LocalDate): Slot {
    return TalkSlot(startTime, endTime, date)
  }
}

@Entity
class OtherSlot(startTime: LocalTime, endTime: LocalTime, val description: String, date: LocalDate? = null) : Slot(startTime, endTime, date) {
  override fun isAssignable() = false
  override fun cloneWithDate(date: LocalDate): Slot {
    return OtherSlot(startTime, endTime, description, date)
  }
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

  fun hasDate(date: LocalDate?): Boolean {
    return slot.date == date
  }
}
