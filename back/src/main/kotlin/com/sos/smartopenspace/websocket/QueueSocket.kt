package com.sos.smartopenspace.websocket

import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.domain.Talk
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import com.sos.smartopenspace.services.OpenSpaceNotFoundException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

@Component
class QueueSocket(private val openSpaceRepository: OpenSpaceRepository) : AbstractSocket<List<Talk>>() {
  private fun findById(id: Long) = openSpaceRepository.findByIdOrNull(id) ?: throw OpenSpaceNotFoundException()

  override fun getData(id: Long) = findById(id).queue.toList()
  override fun getData(os: OpenSpace) = os.queue.toList()
}