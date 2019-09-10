package com.sos.smartopenspace.service

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Room
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.LocalTime

@Service
@Transactional
class DataService(private val openSpaceRepository: OpenSpaceRepository) {
  @EventListener
  fun appReady(event: ApplicationReadyEvent) {
    openSpaceRepository.saveAll(
      listOf(
        OpenSpace(
          "CPI-Conf",
          listOf(Room("213")),
          LocalDate.now().plusDays(2),
          LocalTime.of(14, 0),
          LocalTime.of(21, 0)
        ),
        OpenSpace(
          "Prácticas Técnicas - 4° edición",
          listOf(
            Room("Roja"),
            Room("Amarilla"),
            Room("Verde"),
            Room("Naranja")
          ),
          LocalDate.now().plusDays(5),
          LocalTime.of(19, 0),
          LocalTime.of(21, 0)
        )
      )
    )
  }
}