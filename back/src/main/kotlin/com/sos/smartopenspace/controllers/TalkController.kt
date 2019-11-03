package com.sos.smartopenspace.controllers

import com.sos.smartopenspace.services.TalkService
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("talk")
class TalkController(private val talkService: TalkService) {
  @PutMapping("/schedule/{talkID}/{roomID}/{hour}")
  fun scheduleTalk(@PathVariable talkID: Long, @PathVariable roomID: Long, @PathVariable hour: Int) =
    talkService.scheduleTalk(talkID, roomID, hour)

  @PutMapping("/nextTalk/{userID}/{osID}")
  fun nextTalk(@PathVariable userID: Long, @PathVariable osID: Long) =
    talkService.nextTalk(userID, osID)
}
