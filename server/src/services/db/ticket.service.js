import TicketRepository from "../../repositories/ticket.repository.js"
import TicketDTO from "../../daos/dtos/ticket.dto.js";

const ticketRepository = new TicketRepository();
export default class TicketService{
    async createTicket(purchase_datetime, amount, purchaser){
        try {
            return await ticketRepository.create(purchase_datetime, amount, purchaser)
        } catch (error) {
            console.log(error);
        }
    }
}

//export default TicketService