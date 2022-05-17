package com.sos.smartopenspace.controllers

import com.sos.smartopenspace.domain.TalkIsNotForScheduledException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus

@ControllerAdvice
class ExceptionHandler {

    @ExceptionHandler(TalkIsNotForScheduledException::class)
    fun exceptionHandler(exception: Exception) : ResponseEntity<BadRequestException> {
        return ResponseEntity(BadRequestException(exception.message), HttpStatus.BAD_REQUEST)
    }
}

@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadRequestException(msg: String?) : RuntimeException(msg)