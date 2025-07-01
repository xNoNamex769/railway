import React from 'react'
import "./styles/ProjectsHome.css"
import ProjectCardComponent from './HomeComponents/ProjectCardComponent'
import img1 from "../Home/img/actividades.jpg"
import img2 from "../Home/img/Comunidad.avif"
import img3 from "../../../public/img/image.png"
let projects = [
  {
    title: "Gestion Eficiente",
    description: "Optimiza tus procesos y gestiona tus actividades de manera efectiva.",
    image: img1
  },
  {
    title: "Comunidad Activa",
    description: "Conéctate con otros usuarios y comparte conocimientos.",
    image: img2
  },
  {
    title: "Eventos y Actividades",
    description: "Participa en eventos y actividades exclusivas para nuestros usuarios.",
    image: img3
  }
]

export default function ProjectsHome() {
  return (
    <section id="projects" className="projects-section-home">
      <div className="container-home">
        <div className="section-header-home">
          <h2 className='h2-home'>Nuestros Proyectos</h2>
        </div>
     <div className="projects-grid-home">
  {projects.map((project, index) => (
    <ProjectCardComponent
      key={index}
      title={project.title}
      description={project.description}
      image={project.image}
    />
  ))}
</div>
      </div>
    </section>
  )
}
