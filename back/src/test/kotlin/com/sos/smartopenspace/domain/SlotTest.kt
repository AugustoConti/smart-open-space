package com.sos.smartopenspace.domain

import com.sos.smartopenspace.anOpenSpace
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDate
import java.time.LocalTime

class SlotTest {
  private val room1 = Room("1")
  private val talk1 = Talk("talk1")
  private val talk2 = Talk("talk2")

  private fun anyUser(talk: Talk) = User("augusto@sos.sos", "Augusto", "Augusto", mutableSetOf(), mutableSetOf(talk))

  private fun anyOpenSpaceWithActiveQueued(talks: Set<Talk>): OpenSpace {
    val openSpace = anOpenSpace(talks = talks.toMutableSet(), rooms = setOf(room1))
    val organizer = User("augusto@sos.sos", "augusto", "Augusto", mutableSetOf(openSpace))
    openSpace.activeQueue(organizer)
    talks.forEach {
      anyUser(it)
      it.enqueue()
      openSpace.nextTalk(organizer)
    }
    return openSpace
  }

  private fun anyOpenSpaceWithOrganizer(talks: MutableSet<Talk> = mutableSetOf(talk1, talk2)): OpenSpace {
    val OpenSpace = anyOpenSpace(talks.toMutableSet())
    val organizer = User("augusto@sos.sos", "augusto", "Augusto", mutableSetOf(OpenSpace))
    OpenSpace.activeQueue(organizer)
    return OpenSpace
  }

  @Test
  fun `Si una charla no esta para agendar, no se puede agendar`() {
    val openSpace = anyOpenSpaceWithOrganizer()
    assertThrows(TalkIsNotForScheduledException::class.java) {
      openSpace.scheduleTalk(talk1, room = room1, user = anyUser(talk1), slot = openSpace.slots.first() as TalkSlot)
    }
  }

  @Test
  fun `El organizador puede agendar una charla siempre`() {
    val openSpace = anyOpenSpaceWithOrganizer()

    val slot = openSpace.scheduleTalk(talk1, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)

    assertTrue(slot.startAt(LocalTime.parse("09:30")))
    assertEquals(room1, slot.room)
    assertEquals(talk1, slot.talk)
  }

  @Test
  fun `Asignar una charla en un horario y en una sala`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1))
    val slot = openSpace.scheduleTalk(talk1, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)
    assertTrue(slot.startAt(LocalTime.parse("09:00")))
    assertEquals(room1, slot.room)
    assertEquals(talk1, slot.talk)
  }

  @Test
  fun `No se puede agendar una charla fuera de horario`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1))
    assertThrows(SlotNotFoundException::class.java) {
      openSpace.scheduleTalk(talk1, room = room1, user = openSpace.organizer, slot = openSpace.slots.first() as TalkSlot)
    }
  }

  @Test
  fun `Asignar una charla pero el slot esta ocupado`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1, talk2))
    openSpace.scheduleTalk(talk1, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)
    assertThrows(BusySlotException::class.java) {
      openSpace.scheduleTalk(talk2, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)
    }
  }

  @Test
  fun `Asignar una charla que no pertenece al open space`() {
    val openSpace = anyOpenSpaceWithOrganizer()
    assertThrows(TalkDoesntBelongException::class.java) {
      val talk = Talk("otra")
      openSpace.scheduleTalk(talk, room =  room1, user = anyUser(talk), slot = openSpace.slots.first() as TalkSlot)
    }
  }

  @Test
  fun `Asignar una charla que ya se encuentra asignada`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1))
    openSpace.scheduleTalk(talk1, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)
    assertThrows(TalkAlreadyAssignedException::class.java) {
      openSpace.scheduleTalk(talk1, room =  room1,user= openSpace.organizer, slot = openSpace.slots.first() as TalkSlot)
    }
  }

  @Test
  fun `Open space sin charlas agendadas, tiene los slots libres`() {
    val openSpace = anOpenSpace(talks = mutableSetOf(talk1, talk2), rooms = setOf(room1))
    val freeSlots = openSpace.freeSlots()
    assertIterableEquals(
      listOf(LocalTime.parse("09:00"), LocalTime.parse("09:30"), LocalTime.parse("10:45")),
      slotStartTimes(freeSlots)
    )
  }

  @Test
  fun `Asignar una charlas, ese slot no esta mas libre`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1))
    openSpace.scheduleTalk(talk1, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)
    val freeSlots = openSpace.freeSlots()
    assertFalse(slotStartTimes(freeSlots).contains(LocalTime.parse("09:30")))
  }

  @Test
  fun `Todos los slots asignados no quedan lugares libres`() {
    val talk3 = Talk("3")
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1, talk2, talk3))
    openSpace.scheduleTalk(talk1, room = room1, user = openSpace.organizer, slot = openSpace.slots.first() as TalkSlot)
    openSpace.scheduleTalk(talk2, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)
    openSpace.scheduleTalk(talk3, room =  room1, user = openSpace.organizer, slot = openSpace.slots.first() as TalkSlot)
    val freeSlots = openSpace.freeSlots()
    assertTrue(freeSlots.isEmpty())
  }

  @Test
  fun `Cambiar charla de slot a uno vacio`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1))
    openSpace.scheduleTalk(talk1, room = room1, user = openSpace.organizer, slot = openSpace.slots.first() as TalkSlot)
    openSpace.exchangeSlot(talk1, LocalTime.parse("09:30"), room1, openSpaceDate)
    val freeSlots = openSpace.freeSlots()
    assertTrue(slotStartTimes(freeSlots).contains(LocalTime.parse("09:00")))
    assertFalse(slotStartTimes(freeSlots).contains(LocalTime.parse("09:30")))
  }

  @Test
  fun `Cambiar charla de slot a uno ocupado`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1, talk2))
    openSpace.scheduleTalk(talk1, room = room1, user = openSpace.organizer, slot = openSpace.slots.first() as TalkSlot)
    openSpace.scheduleTalk(talk2, openSpace.organizer, openSpace.slots.first() as TalkSlot, room1)
    openSpace.exchangeSlot(talk1, LocalTime.parse("09:30"), room1, openSpaceDate)
    assertEquals(talk1, openSpace.assignedSlots.find { it.room == room1 && it.startAt(LocalTime.parse("09:30")) }?.talk)
    assertEquals(talk2, openSpace.assignedSlots.find { it.room == room1 && it.startAt(LocalTime.parse("09:00")) }?.talk)
  }

  @Test
  fun `Cambiar charla de slot pero la charla no esta agendada`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1))
    assertThrows(TalkIsNotScheduledException::class.java) {
      openSpace.exchangeSlot(talk1, LocalTime.parse("09:30"), room1, openSpaceDate)
    }
  }

  @Test
  fun `Cambiar charla de slot a un horario inexistente`() {
    val openSpace = anyOpenSpaceWithActiveQueued(setOf(talk1))
    openSpace.scheduleTalk(talk1, room = room1, user = openSpace.organizer, slot = openSpace.slots.first() as TalkSlot)
    assertThrows(SlotNotFoundException::class.java) {
      openSpace.exchangeSlot(talk1, LocalTime.parse("01:00"), room1, openSpaceDate)
    }
  }

  private fun slotStartTimes(freeSlots: List<Pair<Room, List<Slot>>>) =
    freeSlots[0].second.map { it.startTime }

}
