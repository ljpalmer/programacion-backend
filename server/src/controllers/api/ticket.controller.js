import { request } from "express"
import TicketService from "../../services/db/ticket.service.js"
import TicketDto from "../../daos/dtos/ticket.dto.js";

const ticketService = new TicketService();

export default class TicketApiController {
    async createTicket(req = request, res){
        const { purchase_datetime, amount, purchaser } = req.body
        try {
            await ticketService.createTicket(purchase_datetime, amount, purchaser);

            res.send({message: "Ticket created"});
        } catch (error) {
            console.log(error);
        }
    }
}