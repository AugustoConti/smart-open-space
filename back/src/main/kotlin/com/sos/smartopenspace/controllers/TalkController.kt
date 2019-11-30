package com.sos.smartopenspace.controllers

import com.sos.smartopenspace.services.TalkService
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalTime

@RestController
@RequestMapping("talk")
class TalkController(private val talkService: TalkService) {
  @PutMapping("/schedule/{talkID}/{roomID}/{time}")
  fun scheduleTalk(@PathVariable talkID: Long, @PathVariable roomID: Long, @PathVariable time: LocalTime) =
    talkService.scheduleTalk(talkID, roomID, time)

  @PutMapping("/exchange/{talkID}/{roomID}/{time}")
  fun exchangeTalk(@PathVariable talkID: Long, @PathVariable roomID: Long, @PathVariable time: LocalTime) =
    talkService.exchangeTalk(talkID, roomID, time)

  @PutMapping("/nextTalk/{userID}/{osID}")
  fun nextTalk(@PathVariable userID: Long, @PathVariable osID: Long) =
    talkService.nextTalk(userID, osID)
}
