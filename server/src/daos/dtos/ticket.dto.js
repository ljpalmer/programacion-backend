export default  class TicketDto{
    constructor(ticket) {
        this.purchase_datetime = ticket.purchase_datetime;
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }
}