package com.sos.smartopenspace.domain

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalTime

class QueueTest {

  private fun anyOS(talks: MutableSet<Talk> = mutableSetOf()) =
    OpenSpace(
      "os", emptySet(), setOf(
        TalkSlot(LocalTime.parse("09:00"), LocalTime.parse("10:00")),
        TalkSlot(LocalTime.parse("10:00"), LocalTime.parse("11:00")),
        TalkSlot(LocalTime.parse("11:00"), LocalTime.parse("12:00"))
      ),
      talks
    )

  private fun anyUser(oss: MutableSet<OpenSpace> = mutableSetOf(), talks: MutableSet<Talk> = mutableSetOf()) =
    User("augusto@sos.sos", "augusto", "Augusto", oss, talks)

  private fun anyTalk() = Talk("Talk1")

  private fun anyOSWithActiveQueue(talks: MutableSet<Talk> = mutableSetOf()): OpenSpace {
    val os = anyOS(talks)
    val user = anyUser(mutableSetOf(os))
    os.activeQueue(user)
    return os
  }

  @Test
  fun `No puedo activar encolamiento si no soy el organizador`() {
    val os = anyOS()
    anyUser(mutableSetOf(os))
    assertThrows(NotTheOrganizerException::class.java) {
      os.activeQueue(anyUser())
    }
  }

  @Test
  fun `Se crea un nuevo openSpace tiene el encolamiento pendiente`() {
    assertTrue(anyOS().isPendingQueue())
  }

  @Test
  fun `Como organizador activo encolamiento`() {
    assertTrue(anyOSWithActiveQueue().isActiveQueue())
  }

  @Test
  fun `Os sin charlas encoladas, no tiene charla actual`() {
    val os = anyOS()
    assertNull(os.currentTalk())
  }

  @Test
  fun `Os sin charlas encoladas, no puedo pasar a la siguiente charla`() {
    val os = anyOS()
    val user = anyUser(mutableSetOf(os))
    assertThrows(EmptyQueueException::class.java) {
      os.nextTalk(user)
    }
  }

  @Test
  fun `Encolar una charla`() {
    val talk = anyTalk()
    val os = anyOSWithActiveQueue(mutableSetOf(talk))
    talk.enqueue()
    assertEquals(talk, os.currentTalk())
  }

  @Test
  fun `No puedo encolar una charla que no pertenece al os`() {
    val talk = anyTalk()
    val os = anyOSWithActiveQueue()
    assertThrows(TalkDoesntBelongException::class.java) {
      os.enqueueTalk(talk)
    }
  }

  @Test
  fun `No puedo encolar la misma charla 2 veces`() {
    val talk = anyTalk()
    anyOSWithActiveQueue(mutableSetOf(talk))
    talk.enqueue()
    assertThrows(TalkAlreadyEnqueuedException::class.java) {
      talk.enqueue()
    }
  }

  @Test
  fun `No puedo encolar una segunda charla del mismo speaker`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    anyOSWithActiveQueue(mutableSetOf(talk1, talk2))
    anyUser(talks = mutableSetOf(talk1, talk2))
    talk1.enqueue()
    assertThrows(AnotherTalkIsEnqueuedException::class.java) {
      talk2.enqueue()
    }
  }

  @Test
  fun `Charlas se encolan en orden`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val talk3 = anyTalk()
    val os = anyOSWithActiveQueue(mutableSetOf(talk1, talk2, talk3))
    anyUser(talks = mutableSetOf(talk1))
    anyUser(talks = mutableSetOf(talk2))
    anyUser(talks = mutableSetOf(talk3))
    talk1.enqueue()
    talk2.enqueue()
    talk3.enqueue()
    assertIterableEquals(listOf(talk1, talk2, talk3), os.queue)
  }

  @Test
  fun `El speaker actual puede terminar la charla`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val os = anyOSWithActiveQueue(mutableSetOf(talk1, talk2))
    val speaker = anyUser(talks = mutableSetOf(talk1))
    anyUser(talks = mutableSetOf(talk2))
    talk1.enqueue()
    talk2.enqueue()
    os.nextTalk(speaker)
    assertEquals(talk2, os.currentTalk())
  }

  @Test
  fun `El organizador puede terminar la charla`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val os = anyOS(mutableSetOf(talk1, talk2))
    val organizer = anyUser(mutableSetOf(os))
    anyUser(talks = mutableSetOf(talk1))
    anyUser(talks = mutableSetOf(talk2))
    os.activeQueue(organizer)
    talk1.enqueue()
    talk2.enqueue()
    os.nextTalk(organizer)
    assertEquals(talk2, os.currentTalk())
  }

  @Test
  fun `Si no soy el organizador o el speaker, no puedo terminar la charla`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val os = anyOSWithActiveQueue(mutableSetOf(talk1, talk2))
    anyUser(talks = mutableSetOf(talk1))
    val speaker = anyUser(talks = mutableSetOf(talk2))
    talk1.enqueue()
    talk2.enqueue()
    assertThrows(CantFinishTalkException::class.java) {
      os.nextTalk(speaker)
    }
  }

  @Test
  fun `Termina la primer charla es el turno de la segunda`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val os = anyOSWithActiveQueue(mutableSetOf(talk1, talk2))
    val speaker = anyUser(talks = mutableSetOf(talk1))
    anyUser(talks = mutableSetOf(talk2))
    talk1.enqueue()
    talk2.enqueue()
    os.nextTalk(speaker)
    assertEquals(talk2, os.currentTalk())
  }

  @Test
  fun `Termina la primer charla, esta disponible para agendar`() {
    val talk = anyTalk()
    val os = anyOSWithActiveQueue(mutableSetOf(talk))
    val speaker = anyUser(talks = mutableSetOf(talk))
    talk.enqueue()
    os.nextTalk(speaker)
    assertIterableEquals(setOf(talk), os.toSchedule)
  }

  @Test
  fun `No se puede encolar una charla, si no esta activo el encolamiento`() {
    val talk = anyTalk()
    anyOS(talks = mutableSetOf(talk))
    assertThrows(InactiveQueueException::class.java) {
      talk.enqueue()
    }
  }

  @Test
  fun `Solo el organizador puede cerrar el encolamiento`() {
    val os = anyOS()
    anyUser(mutableSetOf(os))
    assertThrows(NotTheOrganizerException::class.java) {
      os.finishQueuing(anyUser())
    }
  }

  @Test
  fun `Cuando cierra el encolamiento, la queue esta finalizada`() {
    val talk = anyTalk()
    val os = anyOS(mutableSetOf(talk))
    val organizer = anyUser(mutableSetOf(os))
    os.finishQueuing(organizer)
    assertTrue(os.isFinishedQueue())
  }

  @Test
  fun `Cuando cierra el encolamiento, no se pueden encolar charlas`() {
    val talk = anyTalk()
    val os = anyOS(mutableSetOf(talk))
    val organizer = anyUser(mutableSetOf(os))
    os.finishQueuing(organizer)
    assertThrows(FinishedQueuingException::class.java) {
      talk.enqueue()
    }
  }

  @Test
  fun `Cuando cierra el encolamiento, no se pueden cargar charlas`() {
    val os = anyOS()
    val organizer = anyUser(mutableSetOf(os))
    os.finishQueuing(organizer)
    assertThrows(FinishedQueuingException::class.java) {
      os.addTalk(anyTalk())
    }
  }

  @Test
  fun `No puedo activar el encolamiento dos veces`() {
    val os = anyOS()
    val organizer = anyUser(mutableSetOf(os))
    os.activeQueue(organizer)
    assertThrows(AlreadyActivedQueuingException::class.java) {
      os.activeQueue(organizer)
    }
  }

  @Test
  fun `Se cierra el encolamiento, se descartan las charlas en la cola`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val os = anyOS(mutableSetOf(talk1, talk2))
    val organizer = anyUser(mutableSetOf(os), mutableSetOf(talk1))
    anyUser(talks = mutableSetOf(talk2))
    os.activeQueue(organizer)
    talk1.enqueue()
    talk2.enqueue()
    os.finishQueuing(organizer)
    assertTrue(os.queue.isEmpty())
    assertNull(os.currentTalk())
  }
}
