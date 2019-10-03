package com.sos.smartopenspace.model

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDate
import java.time.LocalTime

class SlotTest {
  private val hour1 = 10
  private val room1 = Room("1")
  private val talk1 = Talk("talk1")
  private val talk2 = Talk("talk2")

  private fun anyOS(talks: MutableSet<Talk> = mutableSetOf(talk1, talk2)) = OpenSpace(
    "os", LocalDate.now(), LocalTime.of(9, 0),
    LocalTime.of(11, 0), setOf(room1), talks
  )

  @Test
  fun `Asignar una charla en un horario y en una sala`() {
    val os = anyOS()
    val slot = os.scheduleTalk(talk1, hour1, room1)
    assertEquals(hour1, slot.hour)
    assertEquals(room1, slot.room)
    assertEquals(talk1, slot.talk)
  }

  @Test
  fun `Asignar una charla pero el slot esta ocupado`() {
    val os = anyOS()
    os.scheduleTalk(talk1, hour1, room1)
    assertThrows(BusySlotException::class.java) {
      os.scheduleTalk(talk2, hour1, room1)
    }
  }

  @Test
  fun `Asignar una charla que no pertenece al open space`() {
    val os = anyOS()
    assertThrows(TalkDoesntBelongException::class.java) {
      os.scheduleTalk(Talk("otra"), hour1, room1)
    }
  }

  @Test
  fun `Asignar una charla que ya se encuentra asignada`() {
    val os = anyOS()
    os.scheduleTalk(talk1, hour1, room1)
    assertThrows(TalkAlreadyAssignedException::class.java) {
      os.scheduleTalk(talk1, hour1 + 1, room1)
    }
  }

  @Test
  fun `Open space sin charlas agendadas, tiene los slots libres`() {
    val os = anyOS()
    val freeSlots = os.freeSlots()
    assertIterableEquals(listOf(9, 10, 11), freeSlots[0].second)
  }

  @Test
  fun `Asignar una charlas, ese slot no esta mas libre`() {
    val os = anyOS()
    os.scheduleTalk(talk1, 10, room1)
    val freeSlots = os.freeSlots()
    assertIterableEquals(listOf(9, 11), freeSlots[0].second)
  }

  @Test
  fun `Todos los slots asignados no quedan lugares libres`() {
    val talk3 = Talk("3")
    val os = anyOS(mutableSetOf(talk1, talk2, talk3))
    os.scheduleTalk(talk1, 9, room1)
    os.scheduleTalk(talk2, 10, room1)
    os.scheduleTalk(talk3, 11, room1)
    val freeSlots = os.freeSlots()
    assertIterableEquals(listOf<Int>(), freeSlots[0].second)
  }
}
