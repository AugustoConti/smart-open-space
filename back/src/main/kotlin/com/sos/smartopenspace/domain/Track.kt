package com.sos.smartopenspace.domain

import org.hibernate.validator.constraints.Length
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.validation.constraints.Size

@Entity
class Track(
    val name: String,

    @Length(min=0, max=200)
    val description: String = "",

    val color: String,
    @Id
    @GeneratedValue
    var id: Long = 0
) {
}