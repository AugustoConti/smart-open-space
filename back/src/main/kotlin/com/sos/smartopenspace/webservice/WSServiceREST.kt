package com.sos.smartopenspace.webservice

import com.sos.smartopenspace.service.WSService
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping

@ServiceREST
@RequestMapping("ws")
class WSServiceREST(private val wsService: WSService) {
  @PutMapping("/schedule/{talkID}/{roomID}/{hour}")
  fun scheduleTalk(@PathVariable talkID: Long, @PathVariable roomID: Long, @PathVariable hour: Int) =
    wsService.scheduleTalk(talkID, roomID, hour)

  @PutMapping("/nextTalk/{userID}/{osID}")
  fun nextTalk(@PathVariable userID: Long, @PathVariable osID: Long) =
    wsService.nextTalk(userID, osID)
}
