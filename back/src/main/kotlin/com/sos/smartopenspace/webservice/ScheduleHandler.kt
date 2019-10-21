package com.sos.smartopenspace.webservice

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Slot
import com.sos.smartopenspace.service.OpenSpaceService
import org.springframework.stereotype.Component

@Component
class ScheduleHandler(private val openSpaceService: OpenSpaceService) : AbstractWSController<List<Slot>>() {
  override fun getData(id: Long)= openSpaceService.findSlotsById(id)
  override fun getData(os: OpenSpace) = os.slots.toList()
}
