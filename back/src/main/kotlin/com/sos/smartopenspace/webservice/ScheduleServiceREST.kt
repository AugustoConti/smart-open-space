package com.sos.smartopenspace.webservice

import com.sos.smartopenspace.service.ScheduleService
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping

@ServiceREST
@RequestMapping("schedule")
class ScheduleServiceREST(private val scheduleService: ScheduleService) {
  @PutMapping("/{talkID}/{roomID}/{hour}")
  fun scheduleTalk(@PathVariable talkID: Long, @PathVariable roomID: Long, @PathVariable hour: Int) =
    scheduleService.scheduleTalk(talkID, roomID, hour)
}