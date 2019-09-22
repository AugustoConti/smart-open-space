package com.sos.smartopenspace.webservice

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.service.OpenSpaceService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import javax.validation.Valid

@ServiceREST
@RequestMapping("openSpace")
class OpenSpaceServiceREST(private val openSpaceService: OpenSpaceService) {
  @PostMapping
  fun create(@Valid @RequestBody openSpace: OpenSpace) = openSpaceService.create(openSpace)

  @GetMapping
  fun findAll() = openSpaceService.findAll()
}
