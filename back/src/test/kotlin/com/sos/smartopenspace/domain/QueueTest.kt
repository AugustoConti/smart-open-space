package com.sos.smartopenspace.domain

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDate
import java.time.LocalTime

class QueueTest {

  private fun anyOS(isActiveQueue: Boolean = false, talks: MutableSet<Talk> = mutableSetOf()) = OpenSpace(
    "os", LocalDate.now(), LocalTime.of(9, 0),
    LocalTime.of(11, 0), setOf(), talks, isActiveQueue
  )

  private fun anyUser(oss: MutableSet<OpenSpace> = mutableSetOf(), talks: MutableSet<Talk> = mutableSetOf()) =
    User("augusto@sos.sos", "augusto", "Augusto", oss, talks)

  private fun anyTalk() = Talk("Talk1")

  @Test
  fun `No puedo activar encolamiento si no soy el organizador`() {
    val os = anyOS()
    anyUser(mutableSetOf(os))
    assertThrows(NotOrganizerException::class.java) {
      os.activeQueue(anyUser())
    }
  }

  @Test
  fun `Se crea un nuevo openSpace tiene el encolamiento desactivado`() {
    assertFalse(anyOS().isActiveQueue)
  }

  @Test
  fun `Como organizador activo encolamiento`() {
    val os = anyOS()
    val user = anyUser(mutableSetOf(os))
    os.activeQueue(user)
    assertTrue(os.isActiveQueue)
  }

  @Test
  fun `Os sin charlas encoladas, no tiene charla actual`() {
    val os = anyOS(true)
    assertNull(os.currentTalk())
  }

  @Test
  fun `Os sin charlas encoladas, no puedo pasar a la siguiente charla`() {
    val os = anyOS(true)
    val user = anyUser(mutableSetOf(os))
    assertThrows(EmptyQueueException::class.java) {
      os.nextTalk(user)
    }
  }

  @Test
  fun `Encolar una charla`() {
    val talk = anyTalk()
    val os = anyOS(true, mutableSetOf(talk))
    talk.enqueue()
    assertEquals(talk, os.currentTalk())
  }

  @Test
  fun `No puedo encolar una charla que no pertenece al os`() {
    val talk = anyTalk()
    val os = anyOS(true)
    assertThrows(TalkDoesntBelongException::class.java) {
      os.enqueueTalk(talk)
    }
  }

  @Test
  fun `No puedo encolar la misma charla 2 veces`() {
    val talk = anyTalk()
    anyOS(true, mutableSetOf(talk))
    talk.enqueue()
    assertThrows(TalkAlreadyEnqueuedException::class.java) {
      talk.enqueue()
    }
  }

  @Test
  fun `No puedo encolar una segunda charla del mismo speaker`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val os = anyOS(true, mutableSetOf(talk1, talk2))
    anyUser(mutableSetOf(os), mutableSetOf(talk1, talk2))
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
    val os = anyOS(true, mutableSetOf(talk1, talk2, talk3))
    anyUser(mutableSetOf(os), mutableSetOf(talk1))
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
    val os = anyOS(true, mutableSetOf(talk1, talk2))
    anyUser(mutableSetOf(os))
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
    val os = anyOS(true, mutableSetOf(talk1, talk2))
    val organizer = anyUser(mutableSetOf(os))
    anyUser(talks = mutableSetOf(talk1))
    anyUser(talks = mutableSetOf(talk2))
    talk1.enqueue()
    talk2.enqueue()
    os.nextTalk(organizer)
    assertEquals(talk2, os.currentTalk())
  }

  @Test
  fun `Si no soy el organizador o el speaker, no puedo terminar la charla`() {
    val talk1 = anyTalk()
    val talk2 = anyTalk()
    val os = anyOS(true, mutableSetOf(talk1, talk2))
    anyUser(mutableSetOf(os))
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
    val os = anyOS(true, mutableSetOf(talk1, talk2))
    val speaker = anyUser(mutableSetOf(os), mutableSetOf(talk1))
    anyUser(talks = mutableSetOf(talk2))
    talk1.enqueue()
    talk2.enqueue()
    os.nextTalk(speaker)
    assertEquals(talk2, os.currentTalk())
  }

  @Test
  fun `Termina la primer charla, esta disponible para agendar`() {
    val talk = anyTalk()
    val os = anyOS(true, mutableSetOf(talk))
    val speaker = anyUser(mutableSetOf(os), mutableSetOf(talk))
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
}
