package com.sos.smartopenspace.domain

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDate
import java.time.LocalTime

class SlotTest {
  private val room1 = Room("1")
  private val talk1 = Talk("talk1")
  private val talk2 = Talk("talk2")

  private fun anyOS(talks: MutableSet<Talk> = mutableSetOf(talk1, talk2)) = OpenSpace(
    "os", LocalDate.now(), setOf(room1),
    setOf(
      TalkSlot(LocalTime.parse("09:00"), LocalTime.parse("09:30")),
      TalkSlot(LocalTime.parse("09:30"), LocalTime.parse("10:45")),
      TalkSlot(LocalTime.parse("10:45"), LocalTime.parse("12:00"))
    ), talks
  )

  private fun anyUser(talk: Talk) = User("augusto@sos.sos", "Augusto", "Augusto", mutableSetOf(), mutableSetOf(talk))

  private fun anyOsWithQueued(talks: Set<Talk>): OpenSpace {
    val os = anyOS(talks.toMutableSet())
    val organizer = User("augusto@sos.sos", "augusto", "Augusto", mutableSetOf(os))
    os.activeQueue(organizer)
    talks.forEach {
      anyUser(it)
      it.enqueue()
      os.nextTalk(organizer)
    }
    return os
  }

  @Test
  fun `Si una charla no esta para agendar, no se puede agendar`() {
    val os = anyOS()
    assertThrows(TalkIsNotForScheduledException::class.java) {
      os.scheduleTalk(talk1, LocalTime.parse("09:30"), room1)
    }
  }

  @Test
  fun `Asignar una charla en un horario y en una sala`() {
    val os = anyOsWithQueued(setOf(talk1))
    val slot = os.scheduleTalk(talk1, LocalTime.parse("09:30"), room1)
    assertTrue(slot.startAt(LocalTime.parse("09:30")))
    assertEquals(room1, slot.room)
    assertEquals(talk1, slot.talk)
  }

  @Test
  fun `No se puede agendar una charla fuera de horario`() {
    val os = anyOsWithQueued(setOf(talk1))
    assertThrows(SlotNotFoundException::class.java) {
      os.scheduleTalk(talk1, LocalTime.parse("03:00"), room1)
    }
  }

  @Test
  fun `Asignar una charla pero el slot esta ocupado`() {
    val os = anyOsWithQueued(setOf(talk1, talk2))
    os.scheduleTalk(talk1, LocalTime.parse("09:30"), room1)
    assertThrows(BusySlotException::class.java) {
      os.scheduleTalk(talk2, LocalTime.parse("09:30"), room1)
    }
  }

  @Test
  fun `Asignar una charla que no pertenece al open space`() {
    val os = anyOS()
    assertThrows(TalkDoesntBelongException::class.java) {
      os.scheduleTalk(Talk("otra"), LocalTime.parse("09:30"), room1)
    }
  }

  @Test
  fun `Asignar una charla que ya se encuentra asignada`() {
    val os = anyOsWithQueued(setOf(talk1))
    os.scheduleTalk(talk1, LocalTime.parse("09:30"), room1)
    assertThrows(TalkAlreadyAssignedException::class.java) {
      os.scheduleTalk(talk1, LocalTime.parse("10:45"), room1)
    }
  }

  @Test
  fun `Open space sin charlas agendadas, tiene los slots libres`() {
    val os = anyOS()
    val freeSlots = os.freeSlots()
    assertIterableEquals(
      listOf(LocalTime.parse("09:00"), LocalTime.parse("09:30"), LocalTime.parse("10:45")),
      freeSlots[0].second
    )
  }

  @Test
  fun `Asignar una charlas, ese slot no esta mas libre`() {
    val os = anyOsWithQueued(setOf(talk1))
    os.scheduleTalk(talk1, LocalTime.parse("09:30"), room1)
    val freeSlots = os.freeSlots()
    assertFalse(freeSlots[0].second.contains(LocalTime.parse("09:30")))
  }

  @Test
  fun `Todos los slots asignados no quedan lugares libres`() {
    val talk3 = Talk("3")
    val os = anyOsWithQueued(setOf(talk1, talk2, talk3))
    os.scheduleTalk(talk1, LocalTime.parse("09:00"), room1)
    os.scheduleTalk(talk2, LocalTime.parse("09:30"), room1)
    os.scheduleTalk(talk3, LocalTime.parse("10:45"), room1)
    val freeSlots = os.freeSlots()
    assertTrue(freeSlots.isEmpty())
  }

  @Test
  fun `Cambiar charla de slot a uno vacio`() {
    val os = anyOsWithQueued(setOf(talk1))
    os.scheduleTalk(talk1, LocalTime.parse("09:00"), room1)
    os.exchangeSlot(talk1, LocalTime.parse("09:30"), room1)
    val freeSlots = os.freeSlots()
    assertTrue(freeSlots[0].second.contains(LocalTime.parse("09:00")))
    assertFalse(freeSlots[0].second.contains(LocalTime.parse("09:30")))
  }

  @Test
  fun `Cambiar charla de slot a uno ocupado`() {
    val os = anyOsWithQueued(setOf(talk1, talk2))
    os.scheduleTalk(talk1, LocalTime.parse("09:00"), room1)
    os.scheduleTalk(talk2, LocalTime.parse("09:30"), room1)
    os.exchangeSlot(talk1, LocalTime.parse("09:30"), room1)
    assertEquals(talk1, os.assignedSlots.find { it.room == room1 && it.startAt(LocalTime.parse("09:30")) }?.talk)
    assertEquals(talk2, os.assignedSlots.find { it.room == room1 && it.startAt(LocalTime.parse("09:00")) }?.talk)
  }

  @Test
  fun `Cambiar charla de slot pero la charla no esta agendada`() {
    val os = anyOsWithQueued(setOf(talk1))
    assertThrows(TalkIsNotScheduledException::class.java) {
      os.exchangeSlot(talk1, LocalTime.parse("09:30"), room1)
    }
  }

  @Test
  fun `Cambiar charla de slot a un horario inexistente`() {
    val os = anyOsWithQueued(setOf(talk1))
    os.scheduleTalk(talk1, LocalTime.parse("09:00"), room1)
    assertThrows(SlotNotFoundException::class.java) {
      os.exchangeSlot(talk1, LocalTime.parse("01:00"), room1)
    }
  }

}
