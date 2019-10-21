package com.sos.smartopenspace.webservice

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Talk
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import com.sos.smartopenspace.service.OpenSpaceNotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

@Component
class QueueHandler(private val openSpaceRepository: OpenSpaceRepository) : AbstractWSController<List<Talk>>() {
  private fun findById(id: Long) = openSpaceRepository.findByIdOrNull(id) ?: throw OpenSpaceNotFoundException()

  override fun getData(id: Long) = findById(id).queue.toList()
  override fun getData(os: OpenSpace) = os.queue.toList()
}