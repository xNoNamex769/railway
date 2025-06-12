import type { Request, Response } from "express";
import { GestionEvento } from "../models/GestionEvento";

//esto esta bien 
export class GestionEventoController {
    static getAll = async (req : Request, res : Response) => {
        try {   
            const GestionesEventos = await GestionEvento.findAll({
                order : [
                    ["createdAt" ,  "ASC"]
                ]
            })
            res.json(GestionesEventos)

        } catch (error) {
            res.status(500).json({error : "Hubo un error "})
        }
    }

    static getGestionEventoId = async (req : Request, res : Response) => {
        try {
            const {id} = req.params
            const Gestion = await GestionEvento.findByPk(id)
            if (!Gestion) {
                res.status(404).json({error: "Gestion de Evento no encontrada."})
            }
            res.json(Gestion)
        } catch (error) {
            res.status(500).json({error : "Hubo un error."})
        }
    }

    static crearGestioEvento = async (req : Request, res : Response) => {
        try {
            const gestionEvento = new GestionEvento(req.body)
            await gestionEvento.save()
            res.status(201).json("Gestion de Evento creada correctamente")
        }
        catch (error) {
            res.status(500).json("Error al crear nueva gestion de evento")
        }
    }

    static actualizarGestionEventoId = async (req : Request, res : Response) => {
        try {
            const {id} = req.params
            const GestionActualizar = await GestionEvento.findByPk(id)
            if (!GestionActualizar) {
                res.status(404).json({error : "Gestion de Evento no encontrada."})
            }

            await GestionActualizar?.update(req.body)
            res.json("Gestion de Evento actualizada correctamente.")

        } catch (error) {
            res.status(500).json({error: "Hubo un error"})
        }
    }

    static eliminarGestionEventoId = async (req : Request, res : Response) => {
        try {
            const {id} = req.params
            const GestionBorrar = await GestionEvento.findByPk(id)
            if (!GestionBorrar) {
                res.status(404).json({error : "Gestion de Evento no encontrada."})
                return
            }

            await GestionBorrar?.destroy()
            res.json("Gestion de Evento eliminada correctamente.")

        } catch (error) {
            res.status(500).json({error: "Hubo un error"})
        }
    }

}