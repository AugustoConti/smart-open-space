package com.sos.smartopenspace.websocket

import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.domain.Slot
import com.sos.smartopenspace.services.OpenSpaceService
import org.springframework.stereotype.Component

@Component
class ScheduleSocket(private val openSpaceService: OpenSpaceService) : AbstractSocket<List<Slot>>() {
  override fun getData(id: Long) = openSpaceService.findSlotsById(id)
  override fun getData(os: OpenSpace) = os.slots.toList()
}
