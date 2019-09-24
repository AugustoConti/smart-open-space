package com.sos.smartopenspace.service

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Talk
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

class OpenSpaceNotFoundException : RuntimeException("OpenSpace no encontrado")

@Service
@Transactional
class OpenSpaceService(private val openSpaceRepository: OpenSpaceRepository) {

  fun create(openSpace: OpenSpace) = openSpaceRepository.save(openSpace)

  fun findAll() = openSpaceRepository.findAll().toList()

  fun findById(id: Long): OpenSpace = openSpaceRepository.findById(id).orElseThrow { OpenSpaceNotFoundException() }

  fun createTalk(id: Long, talk: Talk): OpenSpace {
    val os = findById(id)
    os.talks.add(talk)
    return os
  }
}
