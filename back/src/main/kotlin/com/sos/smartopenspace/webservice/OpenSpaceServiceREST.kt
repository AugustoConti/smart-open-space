package com.sos.smartopenspace.webservice

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Talk
import com.sos.smartopenspace.service.OpenSpaceService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import javax.validation.Valid

@ServiceREST
@RequestMapping("openSpace")
class OpenSpaceServiceREST(private val openSpaceService: OpenSpaceService) {
  @PostMapping
  fun create(@Valid @RequestBody openSpace: OpenSpace) = openSpaceService.create(openSpace)

  @PostMapping("/talk/{userID}/{osID}")
  fun createTalk(@PathVariable userID: Long, @PathVariable osID: Long, @Valid @RequestBody talk: Talk) =
    openSpaceService.createTalk(userID, osID, talk)

  @GetMapping("/user/{userID}")
  fun findAllByUser(@PathVariable userID: Long) = openSpaceService.findAllByUser(userID)

  @GetMapping("/{id}")
  fun findById(@PathVariable id: Long) = openSpaceService.findById(id)

  @GetMapping("/talks/{userID}/{osID}")
  fun findTalks(@PathVariable userID: Long, @PathVariable osID: Long) = openSpaceService.findTalks(userID, osID)

  @PutMapping("/schedule/{talkID}/{roomID}/{hour}")
  fun scheduleTalk(@PathVariable talkID: Long, @PathVariable roomID: Long, @PathVariable hour: Int) =
    openSpaceService.scheduleTalk(talkID, roomID, hour)
}
