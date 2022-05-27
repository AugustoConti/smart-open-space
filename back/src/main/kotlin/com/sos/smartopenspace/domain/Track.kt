package com.sos.smartopenspace.domain

import org.hibernate.validator.constraints.Length
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Size

@Entity
class Track(
    @field:NotEmpty
    val name: String,

    @field:Size(max=500)
    val description: String = "",

    @field:Size(min=7, max = 7)
    val color: String,
    @Id
    @GeneratedValue
    var id: Long = 0
) {
}