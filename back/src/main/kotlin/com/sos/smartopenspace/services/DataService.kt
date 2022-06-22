package com.sos.smartopenspace.services

import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.domain.OtherSlot
import com.sos.smartopenspace.domain.Room
import com.sos.smartopenspace.domain.Talk
import com.sos.smartopenspace.domain.TalkSlot
import com.sos.smartopenspace.domain.User
import com.sos.smartopenspace.persistence.UserRepository
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.LocalTime

@Service
@Transactional
class DataService(private val userRepository: UserRepository) {

  private val date = LocalDate.now()

  @EventListener
  fun appReady(event: ApplicationReadyEvent) {
    if (userRepository.count() > 0) return

    val winter = Talk(
      "Winter: Framework de videojuegos 2D en Smalltalk",
      "Winter es un framework para desarrollar videojuegos en 2D en Pharo Smalltalk"
    )
    val agileMeetings = Talk(
      "Agile meetings",
      "Stand ups, Dailies, Retros, Plannings, 1on1s, Synchups. No será mucho? Y cuándo codeamos? Un recorrido por las reuniones ágiles y por qué tienen tanta importancia como el código. Un caso concreto de equipos distribuidos en 10pines."
    )
    val dessAgil = Talk(
      "Desarrollo de Software Ágil en 10Pines",
      "Todavía recuerdo mi reunión con Emilio Gutter, hasta ese momento un ex colega y amigo de la comunidad Ágil, en la cual me invitó a ser parte de 10Pines. Me contó que habían fundado una empresa donde las personas y la calidad humana prevalecían y cuyo objetivo principal era generar valor haciendo lo que mejor sabíamos hacer: desarrollo de software ágil. La oferta fue muy tentadora: formar parte, desde los inicios, de una empresa concebida bajo los valores ágiles. ¡Eso sucedió hace 10 años y hoy sigo aquí!\nDurante estos años, los pinos (quienes formamos parte de 10Pines) elaboramos nuestros procesos, seleccionamos herramientas y estandarizamos artefactos. En resumen, co-creamos nuestra Metodología, que recientemente sentí la necesidad de observar con detenimiento, estudiar y describir. Escribí un libro con el resultado de dicho proceso. En esta charla quisiera describirles los conceptos principales abordados para que sirva como una invitación para que lean el resto!"
    )
    val proy = Talk("Proyectos de software con impacto social")
    val desSinJefe = Talk("Desarrollando software sin jefes ni competencia")
    val cuis = Talk(
      "Creando un framework web en Cuis",
      "Contar la travesía de implementar un framework web para Cuis smalltalk y luego hacer una aplicación con él, usando con D3.js y visor 3D de proteínas, deployar todo eso en una raspberry pi."
    )
    val api = Talk(
      "Armemos una API REST",
      "La idea es contar experiencias consumiendo y manteniendo APIs rest, repasar y contar buenas prácticas y mostrar brevemente una implementación usando Spring Boot y Java.\nLa idea es hablar sobre:\n- Qué significa REST\n- Aspectos Destacados & tips sobre: \n- Manejo de errores\n- Logs\n- Versionado\n- Tests\n- Respuestas Complejas"
    )
    val dessDeberia = Talk(
      "El Desarrollo de Software como debería ser",
      "¿Es el desarrollo de software como “debería ser”? ¿Nos informaron durante nuestra formación y la historia de nuestra profesión sobre los problemas con los que nos encontraríamos? La realidad es que sí pero en la mayoría de los casos lo desoímos. Espero poder mostrarle cómo podría se el desarrollo de software y lograr divertirlos con esta gran parodia de nuestra profesión"
    )
    val js = Talk(
      "Evaluando JavaScript con Haskell",
      "Hace algún tiempo, gracias a Mumuki, Ludat tuvo la rara oportunidad de escribir un intérprete para Javascript en un proyecto del mundo real, y en Haskell nada menos!\nEn esta charla, vamos a estar explorando el extraño mundo de evaluar lenguajes de programación, redescubriendo cosas que para todos son obvias en cualquier lenguaje moderno y entendiendo porque los lenguajes actuales son como son.\nTodo esto mientras aprendemos un poco de las poderosas abstracciones en Haskell que permitieron que todo esto pasara en el tiempo que 10Pines amablemente nos donó para completar este desarrollo: poco menos de una semana."
    )
    val room213 = Room("Aula 213")
    val room60 = Room("Aula 60")
    val room37b = Room("Aula 37b")
    val cpi = OpenSpace(
      "CPI-Conf",
      setOf(room213, room60, room37b),
      setOf(
        OtherSlot(LocalTime.parse("14:00"), LocalTime.parse("14:30"), "Marketplace", date),
        TalkSlot(LocalTime.parse("14:30"), LocalTime.parse("15:00"), date),
        TalkSlot(LocalTime.parse("15:00"), LocalTime.parse("16:00"), date),
        OtherSlot(LocalTime.parse("16:00"), LocalTime.parse("16:15"), "Break", date),
        TalkSlot(LocalTime.parse("16:15"), LocalTime.parse("17:00"), date),
        TalkSlot(LocalTime.parse("17:00"), LocalTime.parse("18:00"), date)
      ),
      mutableSetOf(winter, agileMeetings, dessAgil, proy, desSinJefe, cuis, api, dessDeberia, js),
      "http://www.unq.edu.ar/images/logo_unqui.png"
    )

    val master = Talk(
      "TODOS HACIA MASTER",
      "trunk-based development con ayuda de feature toggles"
    )
    val front = Talk(
      "FrontEnd 2.0",
      "La idea es contar algunas experiencias que tuve laburando en tecnologias completamente diferentes como ser C# con WebForms o .NET, Ruby con Ruby on Rails o en Javascript con algo tipo Vue o React y Node o Serveless para backend.\nVamos a hablar en particular sobre el desarrollo del front end utilizando estas tecnologias."
    )
    val judo = Talk("JUDO", "BDD en SQL Server")
    val testear = Talk("Testear siendo DEV")
    val contrato = Talk("Pruebas de contrato")
    val appLenta = Talk("La app anda lenta")
    val troika = Talk("Troika consultora TEC")
    val flutter = Talk("Flutter + Dart")

    val roja = Room("Roja")
    val amarilla = Room("Amarilla")
    val verde = Room("Verde")
    val naranja = Room("Naranja")

    val practicas = OpenSpace(
      "Prácticas Técnicas - 4° edición",
      setOf(roja, amarilla, verde, naranja),
      (19..21).map {
        TalkSlot(LocalTime.of(it, 0), LocalTime.of(it + 1, 0))
      }.toSet(),
      mutableSetOf(master, front, judo, testear, contrato, appLenta, troika, flutter),
      "https://secure.meetupstatic.com/photos/event/7/1/a/f/highres_482189103.jpeg"
    )

    val charla1 = Talk("Charla 1")
    val os1 = OpenSpace(
      "OS 1",
      setOf(Room("Sala 1")),
      (19..21).map {
        TalkSlot(LocalTime.of(it, 0), LocalTime.of(it + 1, 0))
      }.toSet(),
      mutableSetOf(charla1)
    )

    val augusto = User(
      "augusto@sos.sos", "Augusto", "Augusto",
      mutableSetOf(cpi, practicas), mutableSetOf(master, winter, agileMeetings, contrato)
    )
    userRepository.saveAll(
      setOf(
        augusto,
        User(
          "fede@sos.sos", "Fede", "Fede",
          mutableSetOf(), mutableSetOf(dessAgil, front, proy, appLenta)
        ),
        User(
          "juan@sos.sos", "Juan", "Juan",
          mutableSetOf(os1), mutableSetOf(testear, desSinJefe, charla1)
        ),
        User(
          "maria@sos.sos", "Maria", "Maria",
          mutableSetOf(), mutableSetOf(judo, cuis, api, flutter)
        ),
        User(
          "andrea@sos.sos", "Andrea", "Andrea",
          mutableSetOf(), mutableSetOf(dessDeberia, js, troika)
        )
      )
    )

    cpi.activeQueue(augusto)
    practicas.activeQueue(augusto)

    judo.enqueue()
    troika.enqueue()
    testear.enqueue()
    front.enqueue()
    master.enqueue()
    desSinJefe.enqueue()
    cuis.enqueue()
    dessDeberia.enqueue()
  }
}
