import TicketModel from '../daos/mongo/ticket.mongo.js';

export default class TicketsDAO {
    async  createTicket(purchase_datetime, amount, purchaser){
        try {
            return await TicketModel.create({purchase_datetime, amount, purchaser})
        } catch (error) {
            console.log(error);
        }
    }
}