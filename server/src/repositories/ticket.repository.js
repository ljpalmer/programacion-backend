import TicketsDAO from '../daos/tickets.dao.js'

export default class TicketRepository {
    constructor() {
        this.ticketDAO = new TicketsDAO();
    }
    async create(ticketData) {
        try {
            return this.ticketDAO.createTicket(ticketData);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo crear el ticket');
        }
    }
}