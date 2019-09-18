package com.sos.smartopenspace.service

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class OpenSpaceService(private val openSpaceRepository: OpenSpaceRepository) {
  fun create(openSpace: OpenSpace) = openSpaceRepository.save(openSpace)
  fun findAll() = openSpaceRepository.findAll().toList()
}
