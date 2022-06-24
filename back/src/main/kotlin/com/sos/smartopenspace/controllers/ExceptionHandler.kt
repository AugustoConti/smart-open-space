package com.sos.smartopenspace.controllers

import com.sos.smartopenspace.domain.CallForPapersClosedException
import com.sos.smartopenspace.domain.NotTheOrganizerException
import com.sos.smartopenspace.domain.TalkIsNotForScheduledException
import com.sos.smartopenspace.services.TalkNotFoundException
import com.sos.smartopenspace.domain.UserDidntVoteThisTalkException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus

@ControllerAdvice
class ExceptionHandler {


    @ExceptionHandler(
            TalkIsNotForScheduledException::class,
            NotTheOrganizerException::class,
            TalkNotFoundException::class,
            UserDidntVoteThisTalkException::class)
    fun badRequestHandler(exception: Exception) : ResponseEntity<BadRequestException> {
        return ResponseEntity(BadRequestException(exception.message), HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(CallForPapersClosedException::class)
    fun unprocessableEntityHandler(exception: Exception) : ResponseEntity<UnprocessableEntityException> {
        return ResponseEntity(UnprocessableEntityException(exception.message), HttpStatus.UNPROCESSABLE_ENTITY)
    }

}

@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadRequestException(message: String?) : RuntimeException(message)

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
class UnprocessableEntityException(message: String?) : RuntimeException(message)